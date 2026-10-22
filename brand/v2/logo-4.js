// look: still
// @library auto
// @include ../../tools/sd-kit.js
// @include common.js
// Logo 4 — Sticker monogram: a die-cut sticker (cream rim, soft shadow, one corner peeling up) with an S built from 3 stacked layers and a D that is a speech bubble holding </>.
const S = scene(0, 1, { cam: "none" });
L.reg("sd", "logo4-art", () => {
  const R = 330, RIM = 26, ph = (40 * Math.PI) / 180, nx = Math.cos(ph), ny = Math.sin(ph), D = 300, px = nx * D, py = ny * D;
  const rim = K.crPath(K.jit(circPts(0, 0, R + RIM), 2.2, 8), true), face = K.crPath(K.jit(circPts(0, 0, R), 1.8, 3), true);
  const big = 1400, tx_ = -ny, ty_ = nx, hp = (side) => [[px + tx_ * big, py + ty_ * big], [px - tx_ * big, py - ty_ * big], [px - tx_ * big + side * nx * big, py - ty_ * big + side * ny * big], [px + tx_ * big + side * nx * big, py + ty_ * big + side * ny * big]].map((p) => p.map(F1).join(",")).join(" ");
  const kept = gid("lg4k"), cutc = gid("lg4c"), gr = gid("lg4g");
  // the monogram: S from three stacked layers, D as a speech bubble with </>
  const bar = (cx, cy, w, c, sd) => K.slab(cx, cy, w, 66, c, sd), con = (cx, cy0, cy1, c, sd) => K.slab(cx, (cy0 + cy1) / 2, 70, cy1 - cy0 + 66, c, sd);
  let sS = con(-84, -122, 0, BR.lime, 21) + con(84, 0, 122, BR.pink, 22) + bar(0, 122, 240, BR.cyan, 31) + bar(0, 0, 240, BR.pink, 32) + bar(0, -122, 240, BR.lime, 33);
  sS = L.g(sS, "translate(-148 0) rotate(-4)");
  const dpts = [[-100, -138], [10, -144], [92, -112], [124, -40], [124, 40], [92, 112], [10, 144], [-50, 141], [-130, 202], [-100, 128], [-100, 60], [-100, -10], [-101, -80]];
  const dd = K.crPath(K.jit(dpts, 1.5, 9), true), dc = gid("lg4d");
  let sD = `<clipPath id="${dc}"><path d="${dd}"/></clipPath>` + K.fillP(dd, BR.yellow) + `<g clip-path="url(#${dc})"><rect x="-140" y="40" width="300" height="200" fill="#000" fill-opacity="0.15"/></g>` + K.inkS(dd, 7)
    + K.inkS("M-82 -118 h56", 5, "rgba(255,255,255,0.65)") + raw("&lt;/&gt;", 8, 32, 98, { c: BR.ink, weight: 800, sp: -4 });
  sD = L.g(sD, "translate(150 -2) rotate(5)");
  const mono = L.g(sS + sD, "translate(-12 -22) scale(1.06)");
  const full = `<path d="${rim}" fill="${BR.cream}" stroke="${BR.cream}" stroke-width="6" stroke-linejoin="round"/><path d="${face}" fill="#23262f" stroke="${BR.ink}" stroke-width="5"/>`
    + `<path d="${face}" fill="none" stroke="rgba(255,255,255,0.09)" stroke-width="3" transform="scale(0.93)"/>` + mono;
  const refl = `translate(${F1(px)} ${F1(py)}) rotate(40) scale(-1 1) rotate(-40) translate(${F1(-px)} ${F1(-py)})`;
  const flap = `<path d="${rim}" fill="url(#${gr})" stroke="${BR.ink}" stroke-width="4" stroke-linejoin="round"/>`;
  return blurShadow(rim, 10, 18, 14, 0.6)
    + `<clipPath id="${kept}"><polygon points="${hp(-1)}"/></clipPath><clipPath id="${cutc}"><polygon points="${hp(1)}"/></clipPath>`
    + `<linearGradient id="${gr}" gradientUnits="userSpaceOnUse" x1="${F1(px)}" y1="${F1(py)}" x2="${F1(px + nx * 80)}" y2="${F1(py + ny * 80)}"><stop offset="0" stop-color="#bdb9aa"/><stop offset="0.35" stop-color="#f1eee3"/><stop offset="1" stop-color="#d6d2c3"/></linearGradient>`
    + `<g clip-path="url(#${kept})">${full}</g>`
    + `<g transform="${refl} translate(${F1(-nx * 7)} ${F1(-ny * 7 - 4)})" opacity="0.4"><g clip-path="url(#${cutc})"><path d="${rim}" fill="#000"/></g></g>`
    + `<g transform="${refl}"><g clip-path="url(#${cutc})">${flap}</g></g>`;
}, { box: [-380, -380, 760, 760] });
L.put(S, "sd-bg", 0, 0, { glow: "pink", gx: 960, gy: 540, gr: 460, vignette: false });
L.put(S, "logo4-art", 960, 540, { s: 1 });
