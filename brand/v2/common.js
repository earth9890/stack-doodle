// ===== brand/v2/common.js — shared by the v2 brand sources (paste with `// @include common.js` after sd-kit.js) =====
// Needs sd-kit.js (L.sdInk). Palette is hard-coded (channel brand): graphite, cream, lime, pink, cyan, yellow.
const K = L.sdInk, F1 = L.f1;
const BR = { bg: "#15171c", ink: "#1d1b1f", cream: "#f4f1e8", cream2: "#e3dece", lime: "#b6f24a", pink: "#ff4d8d", cyan: "#4cc9f0", yellow: "#ffd23f", lid: "#2b2e37", gray: "#8b909a" };
const TR = (x, y, rot = 0, s = 1) => `translate(${f1(x)} ${f1(y)})${rot ? ` rotate(${rot})` : ""}${s !== 1 ? ` scale(${s})` : ""}`;
const circPts = (cx, cy, r, n = 28) => Array.from({ length: n }, (_, i) => [cx + Math.cos((i / n) * Math.PI * 2) * r, cy + Math.sin((i / n) * Math.PI * 2) * r]);
const wobCirc = (cx, cy, r, seed, amp = 2) => K.crPath(K.jit(circPts(cx, cy, r), amp, seed), true);
let cuid = 0;
const gid = (p) => p + cuid++;
const blurShadow = (d, dx = 10, dy = 16, sd = 12, op = 0.55) => { const id = gid("brsh"); return `<filter id="${id}" x="-30%" y="-30%" width="160%" height="160%"><feGaussianBlur stdDeviation="${sd}"/></filter><g transform="translate(${dx} ${dy})" filter="url(#${id})"><path d="${d}" fill="#000" fill-opacity="${op}" stroke="#000" stroke-opacity="${op}" stroke-width="20" stroke-linejoin="round"/></g>`; };

// ---------- hand-lettered marker capitals: strokes, not a font ----------
const GL = { // each letter: width (x height) + strokes; [pts, curved]
  S: [0.62, [[[[.96, .15], [.64, .0], [.24, .04], [.06, .3], [.3, .5], [.72, .6], [.95, .78], [.78, .96], [.4, 1], [.04, .88]], 1]]],
  T: [0.66, [[[[0, 0], [1, 0]], 0], [[[.5, 0], [.5, 1]], 0]]],
  A: [0.72, [[[[0, 1], [.5, 0], [1, 1]], 0], [[[.2, .64], [.8, .64]], 0]]],
  C: [0.62, [[[[.96, .16], [.62, 0], [.26, .05], [.05, .36], [.05, .66], [.26, .95], [.62, 1], [.96, .84]], 1]]],
  K: [0.66, [[[[0, 0], [0, 1]], 0], [[[.96, 0], [.04, .6]], 0], [[[.3, .4], [1, 1]], 0]]],
  D: [0.68, [[[[0, 0], [0, 1]], 0], [[[0, .02], [.5, 0], [.9, .25], [.96, .55], [.82, .86], [.45, 1], [0, .98]], 1]]],
  O: [0.72, [[[[.5, 0], [.9, .12], [1, .5], [.9, .88], [.5, 1], [.1, .88], [0, .5], [.1, .12], [.5, 0]], 1]]],
  L: [0.54, [[[[0, 0], [0, 1], [.95, 1]], 0]]],
  E: [0.58, [[[[.95, 0], [0, 0], [0, 1], [.95, 1]], 0], [[[0, .5], [.78, .5]], 0]]],
  1: [0.58, [[[[.95, 0], [0, 0], [0, 1]], 0], [[[0, .5], [.78, .5]], 0]]], // E without its bottom bar (banner B: the E being drawn)
  2: [0.58, [[[[0, 1], [.55, 1]], 0]]],
  " ": [0.34, []],
};
// returns { svg, w }: word at baseline y, left edge x, cap height h. o: { c, ink, sh (shadow colour), wt (stroke / h), seed }
const letter = (txt, x, y, h, o = {}) => {
  const wt = (o.wt || 0.15) * h, ow = wt * 0.34, r = L.rng(o.seed || 3), gap = h * (o.gap ?? 0.08), paths = [];
  let cx = x;
  for (const ch of txt) {
    const [w, strokes] = GL[ch] || GL[" "], rot = (r() - 0.5) * 6, dy = (r() - 0.5) * h * 0.06, sc = 0.96 + r() * 0.08, ds = [];
    for (const [pts, curved] of strokes) {
      const P = K.jit(pts.map(([a, b]) => [a * w * h, b * h]), h * 0.012, Math.round(r() * 1e6));
      if (curved) ds.push(K.crPath(P, false));
      else { let d = `M${f1(P[0][0])} ${f1(P[0][1])}`; for (let i = 1; i < P.length; i++) { const a = P[i - 1], b = P[i], bow = (r() - 0.5) * h * 0.03; d += ` Q${f1((a[0] + b[0]) / 2 + bow)} ${f1((a[1] + b[1]) / 2 - bow)} ${f1(b[0])} ${f1(b[1])}`; } ds.push(d); }
    }
    paths.push(L.g(ds.map((d) => `<path d="${d}"/>`).join(""), `translate(${f1(cx)} ${f1(y - h + dy)}) rotate(${f1(rot)} ${f1(w * h / 2)} ${f1(h / 2)}) scale(${f1(sc)})`));
    cx += w * h + gap;
  }
  const word = paths.join(""), total = cx - gap - x, st = (c, w, extra = "") => `<g fill="none" stroke="${c}" stroke-width="${f1(w)}" stroke-linecap="round" stroke-linejoin="round" ${extra}>${word}</g>`;
  return { w: total, svg: (o.sh ? L.g(st(o.sh, wt + 2 * ow), `translate(${f1(h * 0.05)} ${f1(h * 0.06)})`) : "") + st(o.ink || BR.ink, wt + 2 * ow) + st(o.c || BR.cream, wt) };
};
const lettered = (txt, cx, y, h, o = {}) => { const m = letter(txt, 0, y, h, o); return L.g(letter(txt, -m.w / 2, y, h, o).svg, `translate(${f1(cx)} 0)`); };

// ---------- die-cut sticker pieces ----------
// face path d (local coords) + inner markup -> shadow, cream rim, face, thin ink edge. o: { rim, c (face colour), rimC }
const stick = (d, inner, o = {}) => blurShadow(d, 9, 14, 9, 0.5)
  + `<path d="${d}" fill="${BR.cream}" stroke="${o.rimC || BR.cream}" stroke-width="${(o.rim ?? 11) * 2}" stroke-linejoin="round"/>`
  + `<path d="${d}" fill="${o.c || BR.cream}" stroke="${BR.ink}" stroke-width="4" stroke-linejoin="round"/>` + inner;
const rimF = (inner, r = 6) => { const id = gid("brrim"); return `<filter id="${id}" x="-20%" y="-20%" width="140%" height="140%"><feMorphology in="SourceAlpha" operator="dilate" radius="${r}" result="d"/><feFlood flood-color="${BR.cream}"/><feComposite in2="d" operator="in" result="rim"/><feMerge><feMergeNode in="rim"/><feMergeNode in="SourceGraphic"/></feMerge></filter><g filter="url(#${id})">${inner}</g>`; };
// peeling bottom-right corner of a w x h rectangle sticker (centre origin): hides the corner with the lid colour, draws the folded flap
const peel = (w, h, s, lid = BR.lid) => { const x = w / 2 + 11, y = h / 2 + 11, id = gid("brpl");
  return `<polygon points="${x},${y} ${x - s - 14},${y} ${x},${y - s - 14}" fill="${lid}"/>`
    + `<linearGradient id="${id}" gradientUnits="userSpaceOnUse" x1="${x - s * 0.2}" y1="${y - s * 0.2}" x2="${x - s * 0.7}" y2="${y - s * 0.7}"><stop offset="0" stop-color="#9a968a"/><stop offset="1" stop-color="#e9e5d8"/></linearGradient>`
    + `<polygon points="${x - s - 14},${y} ${x},${y - s - 14} ${x - s - 14},${y - s - 14}" fill="url(#${id})" stroke="${BR.ink}" stroke-width="3" stroke-linejoin="round"/>`; };
const raw = (s, x, y, size, o = {}) => `<text x="${f1(x)}" y="${f1(y)}" font-family="${o.font || "Mono"}" font-weight="${o.weight || 800}" font-size="${size}" fill="${o.c || BR.ink}" text-anchor="${o.anchor || "middle"}"${o.sp ? ` letter-spacing="${o.sp}"` : ""}${o.stroke ? ` stroke="${o.stroke}" stroke-width="${o.sw || 6}" stroke-linejoin="round" paint-order="stroke"` : ""}>${s}</text>`;
