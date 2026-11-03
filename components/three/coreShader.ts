/* =====================================================================
   THE CORE: real-time raymarched render (WebGL2, no libraries).
   Five rounded slabs with engraved surfaces, soft shadows, ambient
   occlusion, an ultramarine light-emitting Intelligence layer, and a
   transparent blueprint floor that only contributes shadow + grid.
   ===================================================================== */

export const VERT = /* glsl */ `#version 300 es
in vec2 aPos;
void main(){ gl_Position = vec4(aPos, 0.0, 1.0); }
`;

export const FRAG = /* glsl */ `#version 300 es
precision highp float;
out vec4 fragColor;

uniform vec2  uRes;
uniform vec2  uCenter;   // object centre offset, in uv units
uniform float uFl;       // focal length (zoom)
uniform float uDist;
uniform float uEl;       // camera elevation (rad)
uniform float uRotY;     // object rotation (rad)
uniform float uY[5];     // slab heights
uniform float uFloor;
uniform float uActive;   // -1 or slab index
uniform float uTime;
uniform vec2  uBoxY;    // slab stack min/max y

const float HX = 1.0, HY = 0.072, HR = 0.04;

// sRGB → linear
vec3 lin(vec3 c){ return pow(c, vec3(2.2)); }

mat2 rot(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }

float sdRB(vec3 p, vec3 b, float r){
  vec3 q = abs(p) - b + r;
  return length(max(q, 0.0)) + min(max(q.x, max(q.y, q.z)), 0.0) - r;
}

vec3 toLocal(vec3 p){ vec3 q = p; q.xz = rot(uRotY) * q.xz; return q; }

float slab(vec3 q, int i){ return sdRB(q - vec3(0.0, uY[i], 0.0), vec3(HX, HY, HX), HR); }

vec2 map(vec3 p){
  vec3 q = toLocal(p);
  float d = 1e9; float m = -1.0;
  for (int i = 0; i < 5; i++){
    float di = slab(q, i);
    if (di < d){ d = di; m = float(i); }
  }
  return vec2(d, m);
}

float mapSlabs(vec3 p){
  vec3 q = toLocal(p);
  float d = 1e9;
  for (int i = 0; i < 5; i++) d = min(d, slab(q, i));
  return d;
}

vec3 calcNormal(vec3 p){
  const vec2 e = vec2(1.0, -1.0) * 0.0007;
  return normalize(e.xyy * map(p + e.xyy).x + e.yyx * map(p + e.yyx).x +
                   e.yxy * map(p + e.yxy).x + e.xxx * map(p + e.xxx).x);
}

vec2 boxHit(vec3 ro, vec3 rd, vec3 bmin, vec3 bmax){
  vec3 inv = 1.0 / rd;
  vec3 t0 = (bmin - ro) * inv, t1 = (bmax - ro) * inv;
  vec3 tmin = min(t0, t1), tmax = max(t0, t1);
  float tn = max(max(tmin.x, tmin.y), tmin.z);
  float tf = min(min(tmax.x, tmax.y), tmax.z);
  return vec2(tn, tf);
}
vec3 BMIN(float m){ return vec3(-1.42 - m, uBoxY.x - m, -1.42 - m); }
vec3 BMAX(float m){ return vec3( 1.42 + m, uBoxY.y + m,  1.42 + m); }

float softShadow(vec3 ro, vec3 rd){
  vec2 bb = boxHit(ro, rd, BMIN(0.02), BMAX(0.02));
  if (bb.y < max(bb.x, 0.0)) return 1.0;
  float res = 1.0, t = max(bb.x, 0.02);
  for (int i = 0; i < 28; i++){
    float h = mapSlabs(ro + rd * t);
    res = min(res, 9.0 * h / t);
    t += clamp(h, 0.03, 0.4);
    if (res < 0.002 || t > bb.y) break;
  }
  res = clamp(res, 0.0, 1.0);
  return res * res * (3.0 - 2.0 * res);
}

float calcAO(vec3 p, vec3 n, float scale){
  float occ = 0.0, sca = 1.0;
  for (int i = 0; i < 4; i++){
    float h = 0.02 + scale * float(i) / 3.0;
    float d = mapSlabs(p + h * n);
    occ += (h - d) * sca;
    sca *= 0.85;
  }
  return clamp(1.0 - 2.2 * occ, 0.0, 1.0);
}

// ---------- 2D helpers for engraved surfaces ----------
float sdBox2(vec2 p, vec2 b, float r){ vec2 q = abs(p) - b + r; return length(max(q, 0.0)) + min(max(q.x, q.y), 0.0) - r; }
float sdSeg(vec2 p, vec2 a, vec2 b){ vec2 pa = p - a, ba = b - a; float h = clamp(dot(pa, ba) / dot(ba, ba), 0.0, 1.0); return length(pa - ba * h); }
float fill(float d){ return 1.0 - smoothstep(-0.004, 0.004, d); }

// Albedo (linear) for slab i at local position q; isTop = top face
vec3 albedo(int i, vec3 q, bool isTop, out float gloss, out float specK){
  vec2 uv = q.xz;
  vec3 c;
  gloss = 24.0; specK = 0.18;
  if (i == 0){                      // Foundation — graphite + server tiles
    c = lin(vec3(0.05, 0.05, 0.065));
    gloss = 60.0; specK = 0.5;
    if (isTop){
      for (int x = -1; x <= 1; x++) for (int z = -1; z <= 1; z++){
        vec2 cc = vec2(float(x), float(z)) * 0.56;
        float t = fill(sdBox2(uv - cc, vec2(0.2), 0.05));
        c = mix(c, lin(vec3(0.11, 0.11, 0.14)), t);
        float led = fill(length(uv - cc - vec2(0.12, -0.12)) - 0.025);
        c = mix(c, lin(vec3(0.25, 0.9, 0.62)) * 2.2, led);
      }
    }
  } else if (i == 1){               // Data — warm sand + bar chart
    c = lin(vec3(0.13, 0.13, 0.17));
    gloss = 50.0; specK = 0.45;
    if (isTop){
      for (int k = 0; k < 8; k++){
        float x = -0.66 + float(k) * 0.19;
        float h = 0.25 + 0.6 * fract(sin(float(k) * 12.9898) * 43758.5453);
        if (k == 5) h = 0.95;
        float b = fill(sdBox2(uv - vec2(x, 0.62 - h * 0.65), vec2(0.06, h * 0.65), 0.012));
        vec3 bc = (k == 5) ? lin(vec3(1.0, 0.42, 0.24)) * 1.6 : lin(vec3(0.30, 0.29, 0.38));
        c = mix(c, bc, b);
      }
    }
  } else if (i == 2){               // Applications — porcelain + table rows
    c = lin(vec3(0.21, 0.21, 0.27));
    gloss = 50.0; specK = 0.45;
    if (isTop){
      for (int k = 0; k < 6; k++){
        float z = -0.62 + float(k) * 0.25;
        float w = 0.3 + 0.35 * fract(sin(float(k) * 7.31) * 9831.3);
        float r = fill(sdBox2(uv - vec2(-0.62 + w, z), vec2(w, 0.035), 0.03));
        vec3 rc = (k == 1) ? lin(vec3(0.48, 0.36, 1.0)) * 1.6 : lin(vec3(0.40, 0.40, 0.48));
        c = mix(c, rc, r);
      }
    }
  } else if (i == 3){               // Intelligence — ultramarine + network
    c = lin(vec3(0.48, 0.36, 1.0));
    gloss = 90.0; specK = 0.9;
    if (isTop){
      vec2 h = vec2(0.0);
      vec2 n0 = vec2(-0.6, -0.5), n1 = vec2(0.62, -0.58), n2 = vec2(-0.5, 0.6), n3 = vec2(0.58, 0.55);
      float l = min(min(sdSeg(uv, n0, h), sdSeg(uv, n1, h)), min(sdSeg(uv, n2, h), sdSeg(uv, n3, h)));
      l = min(l, min(sdSeg(uv, n0, n2), sdSeg(uv, n1, n3)));
      c = mix(c, lin(vec3(0.75, 0.72, 1.0)), (1.0 - smoothstep(0.004, 0.012, l)) * 0.8);
      float nd = min(min(length(uv - n0), length(uv - n1)), min(length(uv - n2), length(uv - n3))) - 0.05;
      c = mix(c, vec3(1.0), fill(nd));
      float hub = abs(length(uv - h) - 0.12) - 0.014;
      c = mix(c, vec3(1.0), fill(hub));
      c = mix(c, vec3(1.0), fill(length(uv - h) - 0.04));
    }
  } else {                          // Experience — white + interface tiles
    c = lin(vec3(0.93, 0.925, 0.96));
    if (isTop){
      // drop shadows under tiles
      float s = min(min(sdBox2(uv - vec2(-0.3, 0.0), vec2(0.46, 0.72), 0.06),
                        sdBox2(uv - vec2(0.48, -0.38), vec2(0.3, 0.3), 0.06)),
                        sdBox2(uv - vec2(0.48, 0.4), vec2(0.3, 0.3), 0.06));
      c *= 1.0 - 0.10 * (1.0 - smoothstep(0.0, 0.07, s));
      float a = fill(sdBox2(uv - vec2(-0.3, 0.0), vec2(0.46, 0.72), 0.06));
      c = mix(c, vec3(1.0), a);
      float ab = fill(sdBox2(uv - vec2(-0.3, 0.42), vec2(0.4, 0.26), 0.04));
      c = mix(c, lin(vec3(0.85, 0.82, 1.0)), ab);
      for (int k = 0; k < 3; k++){
        float r = fill(sdBox2(uv - vec2(-0.42 + float(k) * 0.02, -0.48 + float(k) * 0.14), vec2(0.28 - float(k) * 0.07, 0.025), 0.02));
        c = mix(c, lin(vec3(0.82, 0.81, 0.79)), r);
      }
      float b = fill(sdBox2(uv - vec2(0.48, -0.38), vec2(0.3, 0.3), 0.06));
      c = mix(c, lin(vec3(0.48, 0.36, 1.0)), b);
      float bl = fill(sdBox2(uv - vec2(0.44, -0.46), vec2(0.18, 0.025), 0.02));
      c = mix(c, lin(vec3(0.7, 0.66, 1.0)), bl);
      float d = fill(sdBox2(uv - vec2(0.48, 0.4), vec2(0.3, 0.3), 0.06));
      c = mix(c, lin(vec3(0.95, 0.93, 0.89)), d);
      float dl = fill(sdBox2(uv - vec2(0.44, 0.32), vec2(0.18, 0.025), 0.02));
      c = mix(c, lin(vec3(0.8, 0.78, 0.74)), dl);
      gloss = 30.0; specK = 0.15;
    }
  }
  if (!isTop) c *= 0.82;
  return c;
}

vec3 aces(vec3 x){ return clamp((x * (2.51 * x + 0.03)) / (x * (2.43 * x + 0.59) + 0.14), 0.0, 1.0); }

void main(){
  vec2 uv = (gl_FragCoord.xy - 0.5 * uRes) / uRes.y - uCenter;

  vec3 ta = vec3(0.0);
  vec3 ro = vec3(0.0, sin(uEl), cos(uEl)) * uDist;
  vec3 f = normalize(ta - ro);
  vec3 r = normalize(cross(f, vec3(0.0, 1.0, 0.0)));
  vec3 u = cross(r, f);
  vec3 rd = normalize(uv.x * r + uv.y * u + uFl * f);

  const vec3 ULTRA = vec3(0.196, 0.107, 1.0);
  const vec3 L = normalize(vec3(-0.55, 0.86, 0.42));

  // March only inside the stack's bounding volume (with an aura margin)
  vec2 bb = boxHit(ro, rd, BMIN(0.5), BMAX(0.5));
  vec2 h = vec2(0.0);
  bool hit = false;
  float minIntel = 1e9;
  float t = 0.0;
  if (bb.y > max(bb.x, 0.0)){
    t = max(bb.x, 0.0);
    for (int i = 0; i < 90; i++){
      vec3 p = ro + rd * t;
      vec3 q = toLocal(p);
      h = map(p);
      minIntel = min(minIntel, slab(q, 3));
      if (h.x < 0.0006 * t){ hit = true; break; }
      t += max(h.x, 0.004);
      if (t > bb.y) break;
    }
  }
  // Floor: analytic plane
  bool floorHit = false;
  if (!hit && rd.y < 0.0){
    float tf = (uFloor - ro.y) / rd.y;
    vec3 pf = ro + rd * tf;
    if (length(pf.xz) < 3.8){ hit = true; floorHit = true; t = tf; h = vec2(0.0, 9.0); }
  }

  vec4 outc = vec4(0.0);

  if (hit){
    vec3 p = ro + rd * t;
    if (floorHit){
      // ----- Floor: transparent, contributes shadow, AO, grid, glow -----
      vec3 n = vec3(0.0, 1.0, 0.0);
      float sh = softShadow(p + n * 0.003, L);
      float ao = clamp(0.35 + mapSlabs(p) * 1.4, 0.0, 1.0);
      vec2 g = toLocal(p).xz;
      float fade = 1.0 - smoothstep(0.9, 3.0, length(g));
      vec2 gg = abs(fract(g * 3.0) - 0.5);
      float line = 1.0 - smoothstep(0.0, 0.03, min(gg.x, gg.y));
      vec2 gm = abs(fract(g) - 0.5);
      float major = 1.0 - smoothstep(0.0, 0.02, min(gm.x, gm.y));
      float occ = clamp((1.0 - sh) * 0.5 + (1.0 - ao) * 0.6, 0.0, 0.85);
      float glow = exp(-1.3 * max(slab(toLocal(p), 3), 0.0)) * 0.42 * sh;
      float gridA = (line * 0.07 + major * 0.14) * fade * (0.4 + 0.6 * sh);
      vec3 ink = vec3(0.0);
      vec3 col = ink * occ * fade + ULTRA * (gridA + glow * fade);
      float a = clamp(occ * fade + gridA + glow * fade, 0.0, 1.0);
      outc = vec4(col, a);
    } else {
      // ----- Slab -----
      int id = int(h.y + 0.5);
      vec3 n = calcNormal(p);
      vec3 q = toLocal(p) - vec3(0.0, uY[id], 0.0);
      vec3 nl = n; nl.xz = rot(uRotY) * nl.xz;
      bool isTop = nl.y > 0.6 && q.y > HY - HR - 0.01;
      float gloss, specK;
      vec3 alb = albedo(id, q, isTop, gloss, specK);

      float sh = softShadow(p + n * 0.003, L);
      float ao = calcAO(p, n, 0.35);
      float dif = clamp(dot(n, L), 0.0, 1.0) * sh;
      vec3 sky = lin(vec3(0.78, 0.76, 0.9));
      vec3 gnd = lin(vec3(0.16, 0.13, 0.3));
      vec3 amb = mix(gnd, sky, n.y * 0.5 + 0.5);
      vec3 hv = normalize(L - rd);
      float spe = pow(clamp(dot(n, hv), 0.0, 1.0), gloss) * dif * specK * 2.0;
      float fre = pow(1.0 - clamp(dot(n, -rd), 0.0, 1.0), 4.0);

      vec3 col = alb * (dif * vec3(1.06, 1.0, 0.94) * 1.25 + amb * 0.62 * ao);
      col += spe * vec3(1.0, 0.98, 0.95);
      col += fre * amb * 0.18 * ao;
      // cool violet rim light from behind for silhouette definition
      vec3 R = normalize(vec3(0.6, 0.35, -0.75));
      col += ULTRA * pow(clamp(dot(n, R), 0.0, 1.0), 2.0) * 0.35;
      // light-emitting edge lines (the 'engineered' outline)
      vec2 ae = vec2(HX) - abs(q.xz);
      float edge = min(ae.x, ae.y);
      float topEdge = HY - q.y;
      float lineA = isTop ? (1.0 - smoothstep(0.004, 0.016, edge)) : (1.0 - smoothstep(0.004, 0.018, topEdge)) * 0.8;
      col += ULTRA * lineA * (id == 4 ? 0.6 : 1.4);

      // Ultramarine light spilling from the Intelligence layer
      if (id != 3){
        float dI = slab(toLocal(p), 3);
        col += ULTRA * alb * exp(-dI * 6.0) * 0.55;
      } else {
        col += ULTRA * 0.12 + ULTRA * fre * 0.6;
      }
      // Active layer: rim of light
      if (abs(float(id) - uActive) < 0.5){
        col += ULTRA * (0.10 + fre * 0.9);
      }
      outc = vec4(col, 1.0);
    }
  }

  // Soft aura around the Intelligence layer (in air)
  float aura = exp(-minIntel * 4.0) * 0.32;
  outc.rgb += ULTRA * aura * (1.0 - outc.a);
  outc.a = clamp(outc.a + aura * (1.0 - outc.a), 0.0, 1.0);

  // tone-map only the lit object, keep floor contribution as authored
  vec3 mapped = outc.a > 0.0 ? pow(aces(outc.rgb / max(outc.a, 1e-4) * 1.05), vec3(1.0 / 2.2)) * outc.a : vec3(0.0);
  fragColor = vec4(mapped, outc.a);
}
`;
