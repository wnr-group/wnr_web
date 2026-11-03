"use client";

import { useEffect, useRef, useState, type CSSProperties, type MutableRefObject } from "react";
import { layers } from "@/lib/content";
import { Core } from "./Core";
import { VERT, FRAG } from "./coreShader";

/* ---------------------------------------------------------------------
   <CoreGL/>: the WnR Core rendered in real time with WebGL2.
   • Renders on demand: animates only while something changes, then idles.
   • Adaptive resolution keeps frame time in budget on slower GPUs.
   • HTML layer labels are projected from the same camera, so they stay
     pinned to the geometry.
   • Falls back to the CSS-3D <Core/> if WebGL2 is unavailable.
--------------------------------------------------------------------- */

type Props = {
  /** 0..1 explode amount, read every frame (e.g. scroll progress) */
  progress?: MutableRefObject<number>;
  /** index into bottom→top order (0 = Foundation … 4 = Experience) */
  active?: number | null;
  labels?: boolean;
  /** object width as a fraction of the canvas height */
  size?: number;
  /** object centre offset in canvas-height units (x right, y up) */
  center?: [number, number];
  intro?: boolean;
  /** base exploded amount added to progress */
  baseExplode?: number;
  /** how far the object sinks (canvas-height units) as it explodes */
  drift?: number;
  className?: string;
  style?: CSSProperties;
};

const order = [...layers].reverse(); // bottom → top
const ease = (t: number) => 1 - Math.pow(1 - Math.min(1, Math.max(0, t)), 3);

export function CoreGL({
  progress,
  active = null,
  labels = true,
  size = 0.6,
  center = [0, 0],
  intro = true,
  baseExplode = 0,
  drift = 0,
  className = "",
  style,
}: Props) {
  const wrapRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const labelRefs = useRef<(HTMLDivElement | null)[]>([]);
  const activeRef = useRef<number | null>(active);
  const kick = useRef<() => void>(() => {});
  const [failed, setFailed] = useState(false);

  activeRef.current = active;
  const cfg = useRef({ size, center, drift });
  cfg.current = { size, center, drift };
  useEffect(() => kick.current(), [active, size, center[0], center[1]]);

  useEffect(() => {
    const canvas = canvasRef.current!;
    const wrap = wrapRef.current!;
    const gl = canvas.getContext("webgl2", { premultipliedAlpha: true, alpha: true, antialias: false, powerPreference: "high-performance" });
    if (!gl) {
      setFailed(true);
      return;
    }

    const compile = (type: number, src: string) => {
      const s = gl.createShader(type)!;
      gl.shaderSource(s, src);
      gl.compileShader(s);
      if (!gl.getShaderParameter(s, gl.COMPILE_STATUS)) throw new Error(gl.getShaderInfoLog(s) || "shader");
      return s;
    };
    let prog: WebGLProgram;
    try {
      prog = gl.createProgram()!;
      gl.attachShader(prog, compile(gl.VERTEX_SHADER, VERT));
      gl.attachShader(prog, compile(gl.FRAGMENT_SHADER, FRAG));
      gl.linkProgram(prog);
      if (!gl.getProgramParameter(prog, gl.LINK_STATUS)) throw new Error(gl.getProgramInfoLog(prog) || "link");
    } catch (e) {
      console.warn("[CoreGL] falling back to CSS core:", e);
      setFailed(true);
      return;
    }
    gl.useProgram(prog);
    const buf = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, buf);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1, -1, 3, -1, -1, 3]), gl.STATIC_DRAW);
    const loc = gl.getAttribLocation(prog, "aPos");
    gl.enableVertexAttribArray(loc);
    gl.vertexAttribPointer(loc, 2, gl.FLOAT, false, 0, 0);
    const U = (n: string) => gl.getUniformLocation(prog, n);
    const u = {
      res: U("uRes"), center: U("uCenter"), fl: U("uFl"), dist: U("uDist"), el: U("uEl"), rot: U("uRotY"),
      y: U("uY[0]"), floor: U("uFloor"), box: U("uBoxY"), active: U("uActive"), time: U("uTime"),
    };

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const fine = window.matchMedia("(pointer: fine)").matches;
    const DIST = 9;

    // ---- state ----
    let scale = Math.min(window.devicePixelRatio || 1, 1.5) * (fine ? 0.9 : 0.7);
    let W = 1, H = 1;
    const st = { p: 0, mx: 0, my: 0, lift: [0, 0, 0, 0, 0], tmx: 0, tmy: 0 };
    const t0 = performance.now();
    const introOn = intro && !reduced;
    let raf = 0;
    let visible = true;
    let lastFrame = 0;
    let slow = 0;

    const resize = () => {
      const r = wrap.getBoundingClientRect();
      W = Math.max(1, r.width);
      H = Math.max(1, r.height);
      canvas.width = Math.round(W * scale);
      canvas.height = Math.round(H * scale);
      kick.current();
    };

    // camera helpers (mirror of the shader)
    const project = (x: number, y: number, z: number, el: number, fl: number) => {
      const ro = [0, Math.sin(el) * DIST, Math.cos(el) * DIST];
      const f = [-ro[0], -ro[1], -ro[2]];
      const fn = Math.hypot(f[0], f[1], f[2]);
      f[0] /= fn; f[1] /= fn; f[2] /= fn;
      // r = normalize(cross(f, up))
      let rx = -f[2], rz = f[0];
      const rn = Math.hypot(rx, rz);
      rx /= rn; rz /= rn;
      const r = [rx, 0, rz];
      const uu = [r[1] * f[2] - r[2] * f[1], r[2] * f[0] - r[0] * f[2], r[0] * f[1] - r[1] * f[0]];
      const v = [x - ro[0], y - ro[1], z - ro[2]];
      const vx = v[0] * r[0] + v[1] * r[1] + v[2] * r[2];
      const vy = v[0] * uu[0] + v[1] * uu[1] + v[2] * uu[2];
      const vz = v[0] * f[0] + v[1] * f[1] + v[2] * f[2];
      const ux = (vx / vz) * fl + cfg.current.center[0];
      const uy = (vy / vz) * fl + cfg.current.center[1] - st.p * cfg.current.drift;
      return [W / 2 + ux * H, H / 2 - uy * H];
    };

    const frame = (now: number) => {
      raf = 0;
      if (!visible) return;
      const dt = lastFrame ? now - lastFrame : 16;
      lastFrame = now;
      const t = (now - t0) / 1000;

      // targets
      const pT = Math.min(1, (progress?.current ?? 0) + baseExplode);
      const k = reduced ? 1 : 0.12;
      st.p += (pT - st.p) * k;
      st.mx += (st.tmx - st.mx) * 0.06;
      st.my += (st.tmy - st.my) * 0.06;
      const a = activeRef.current;
      let moving = Math.abs(pT - st.p) > 0.0005 || Math.abs(st.tmx - st.mx) > 0.0005 || Math.abs(st.tmy - st.my) > 0.0005;
      for (let i = 0; i < 5; i++) {
        const target = a === null ? 0 : i === a ? 0.2 : i > a ? 0.5 : 0;
        st.lift[i] += (target - st.lift[i]) * (reduced ? 1 : 0.1);
        if (Math.abs(target - st.lift[i]) > 0.0005) moving = true;
      }

      const gap = 0.3 + st.p * 0.5;
      const ys: number[] = [];
      let introLeft = false;
      for (let i = 0; i < 5; i++) {
        const e = introOn ? ease((t - 0.15 - i * 0.12) / 1.1) : 1;
        if (e < 1) introLeft = true;
        ys.push((i - 2) * gap + st.lift[i] + (1 - e) * 3.2);
      }
      const spin = introOn ? (1 - ease((t - 0.1) / 1.9)) * 0.9 : 0;
      if (spin > 0.0005) introLeft = true;
      const rotY = 0.785 + st.mx * 0.22 + st.p * 0.3 - spin;
      const el = 0.6 - st.my * 0.06 - st.p * 0.1;
      const fl = (cfg.current.size * DIST) / 2.83;

      gl.viewport(0, 0, canvas.width, canvas.height);
      gl.uniform2f(u.res, canvas.width, canvas.height);
      gl.uniform2f(u.center, cfg.current.center[0], cfg.current.center[1] - st.p * cfg.current.drift);
      gl.uniform1f(u.fl, fl);
      gl.uniform1f(u.dist, DIST);
      gl.uniform1f(u.el, el);
      gl.uniform1f(u.rot, rotY);
      gl.uniform1fv(u.y, ys);
      gl.uniform1f(u.floor, -2 * gap - 0.48);
      gl.uniform2f(u.box, Math.min(...ys) - 0.08, Math.max(...ys) + 0.08);
      gl.uniform1f(u.active, a === null ? -1 : a);
      gl.uniform1f(u.time, t);
      gl.drawArrays(gl.TRIANGLES, 0, 3);

      // labels: pin to the corner with the greatest screen x
      if (labels) {
        const c = Math.cos(rotY), s = Math.sin(rotY);
        for (let i = 0; i < 5; i++) {
          const elx = labelRefs.current[i];
          if (!elx) continue;
          let best: number[] = [0, 0];
          for (const [qx, qz] of [[1, 1], [1, -1], [-1, 1], [-1, -1]]) {
            const wx = c * qx - s * qz, wz = s * qx + c * qz;
            const pt = project(wx, ys[i], wz, el, fl);
            if (pt[0] > best[0]) best = pt;
          }
          elx.style.transform = `translate3d(${best[0].toFixed(1)}px, ${best[1].toFixed(1)}px, 0)`;
        }
        wrap.style.setProperty("--lp", st.p.toFixed(3));
      }

      // adaptive resolution
      if (dt > 26) slow++;
      else slow = Math.max(0, slow - 1);
      if (slow > 8 && scale > 0.45) {
        scale *= 0.82;
        slow = 0;
        resize();
      }

      if (moving || introLeft) raf = requestAnimationFrame(frame);
      else lastFrame = 0;
    };

    kick.current = () => {
      if (!raf && visible) raf = requestAnimationFrame(frame);
    };

    const onMove = (e: PointerEvent) => {
      st.tmx = (e.clientX / window.innerWidth) * 2 - 1;
      st.tmy = (e.clientY / window.innerHeight) * 2 - 1;
      kick.current();
    };
    const onScroll = () => kick.current();

    const ro = new ResizeObserver(resize);
    ro.observe(wrap);
    const io = new IntersectionObserver(([e]) => {
      visible = e.isIntersecting;
      if (visible) kick.current();
    });
    io.observe(wrap);
    if (fine && !reduced) window.addEventListener("pointermove", onMove, { passive: true });
    window.addEventListener("scroll", onScroll, { passive: true });
    canvas.addEventListener("webglcontextlost", (e) => {
      e.preventDefault();
      setFailed(true);
    });
    resize();

    return () => {
      ro.disconnect();
      io.disconnect();
      window.removeEventListener("pointermove", onMove);
      window.removeEventListener("scroll", onScroll);
      if (raf) cancelAnimationFrame(raf);
      gl.getExtension("WEBGL_lose_context")?.loseContext();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (failed) {
    return (
      <div className={`coregl coregl--fallback ${className}`} style={style} aria-hidden>
        <Core active={active === null ? null : order[active].id} labels={labels} />
      </div>
    );
  }

  return (
    <div ref={wrapRef} className={`coregl ${active !== null ? "has-active" : ""} ${className}`} style={style} aria-hidden>
      <canvas ref={canvasRef} className="coregl__canvas" />
      {labels && (
        <div className="coregl__labels">
          {order.map((l, i) => (
            <div
              key={l.id}
              ref={(el) => {
                labelRefs.current[i] = el;
              }}
              className={`coregl__label ${active === i ? "is-active" : ""}`}
            >
              <span className="coregl__leader" />
              <b className="mono">{l.code}</b>
              <span>{l.name}</span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
