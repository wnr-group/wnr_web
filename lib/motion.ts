"use client";

import { useEffect, useRef, useState, type RefObject } from "react";

export const clamp = (v: number, a = 0, b = 1) => Math.min(b, Math.max(a, v));
export const lerp = (a: number, b: number, t: number) => a + (b - a) * t;
/** Map v from [a,b] → [0,1], clamped */
export const range = (v: number, a: number, b: number) => clamp((v - a) / (b - a));
export const easeOut = (t: number) => 1 - Math.pow(1 - t, 3);
export const easeInOut = (t: number) => (t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2);

export function useReducedMotion() {
  const [reduced, setReduced] = useState(false);
  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const set = () => setReduced(mq.matches);
    set();
    mq.addEventListener("change", set);
    return () => mq.removeEventListener("change", set);
  }, []);
  return reduced;
}

export function useMedia(query: string, initial = false) {
  const [match, setMatch] = useState(initial);
  useEffect(() => {
    const mq = window.matchMedia(query);
    const set = () => setMatch(mq.matches);
    set();
    mq.addEventListener("change", set);
    return () => mq.removeEventListener("change", set);
  }, [query]);
  return match;
}

/**
 * Scroll progress of a (tall, sticky-hosting) element.
 * 0 when its top hits the viewport top, 1 when its bottom hits the viewport bottom.
 * Writes to a CSS custom property `--p` on the element (no React re-render),
 * and optionally calls `onProgress` each frame it changes.
 */
export function useScrollProgress<T extends HTMLElement>(
  ref: RefObject<T | null>,
  onProgress?: (p: number) => void,
  mode: "sticky" | "through" = "sticky"
) {
  const cb = useRef(onProgress);
  cb.current = onProgress;
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    let raf = 0;
    let last = -1;
    let active = true;
    const tick = () => {
      raf = 0;
      if (!active) return;
      const r = el.getBoundingClientRect();
      const vh = window.innerHeight;
      const p =
        mode === "sticky" && r.height - vh > vh * 0.3
          ? clamp(-r.top / Math.max(1, r.height - vh))
          : clamp((vh - r.top) / (vh + r.height));
      if (Math.abs(p - last) > 0.0005) {
        last = p;
        el.style.setProperty("--p", p.toFixed(4));
        cb.current?.(p);
      }
    };
    const req = () => {
      if (!raf) raf = requestAnimationFrame(tick);
    };
    const io = new IntersectionObserver(
      ([e]) => {
        active = e.isIntersecting;
        if (active) req();
      },
      { rootMargin: "20% 0px 20% 0px" }
    );
    io.observe(el);
    window.addEventListener("scroll", req, { passive: true });
    window.addEventListener("resize", req);
    tick();
    return () => {
      io.disconnect();
      window.removeEventListener("scroll", req);
      window.removeEventListener("resize", req);
      if (raf) cancelAnimationFrame(raf);
    };
  }, [ref, mode]);
}

/** Smoothed pointer position in [-1, 1], written as --mx/--my on the element. */
export function usePointerTilt<T extends HTMLElement>(ref: RefObject<T | null>, strength = 1, enabled = true) {
  useEffect(() => {
    const el = ref.current;
    if (!el || !enabled) return;
    if (window.matchMedia("(pointer: coarse)").matches) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    let tx = 0,
      ty = 0,
      x = 0,
      y = 0,
      raf = 0;
    const loop = () => {
      x += (tx - x) * 0.06;
      y += (ty - y) * 0.06;
      el.style.setProperty("--mx", (x * strength).toFixed(4));
      el.style.setProperty("--my", (y * strength).toFixed(4));
      if (Math.abs(tx - x) > 0.0005 || Math.abs(ty - y) > 0.0005) raf = requestAnimationFrame(loop);
      else raf = 0;
    };
    const move = (e: PointerEvent) => {
      tx = (e.clientX / window.innerWidth) * 2 - 1;
      ty = (e.clientY / window.innerHeight) * 2 - 1;
      if (!raf) raf = requestAnimationFrame(loop);
    };
    window.addEventListener("pointermove", move, { passive: true });
    return () => {
      window.removeEventListener("pointermove", move);
      if (raf) cancelAnimationFrame(raf);
    };
  }, [ref, strength, enabled]);
}

export function useInView<T extends Element>(ref: RefObject<T | null>, opts: IntersectionObserverInit = { threshold: 0.2 }, once = true) {
  const [inView, setInView] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(([e]) => {
      if (e.isIntersecting) {
        setInView(true);
        if (once) io.disconnect();
      } else if (!once) setInView(false);
    }, opts);
    io.observe(el);
    return () => io.disconnect();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [ref, once]);
  return inView;
}
