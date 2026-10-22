// look: still
// @library auto
// @include ../../tools/sd-kit.js
// @include common.js
// Logo 5 — Doodle in progress: a pencil mid-stroke, still drawing a stack of three layers; the top one is half inked and half dashed construction line, with graphite smudges ("tech, being doodled").
const S = scene(0, 1, { cam: "none" });
L.reg("sd", "logo5-art", () => {
  const X = -20, top = { cx: -6, cy: 0, w: 336, h: 104 }, c1 = gid("lg5a"), c2 = gid("lg5b"), blur = gid("lg5s");
  const tp = K.wobRR(top.cx - top.w / 2, top.cy - top.h / 2, top.w, top.h, 26, 37, 1.6);
  let s = K.slab(0, 206, 404, 106, BR.cyan, 11) + K.slab(8, 104, 370, 100, BR.pink, 23, 1.2);
  // half-inked top slab (left of the pencil) + dashed construction outline (right of it)
  s += `<clipPath id="${c1}"><rect x="-300" y="-120" width="${300 + X}" height="240"/></clipPath><clipPath id="${c2}"><rect x="${X}" y="-120" width="300" height="240"/></clipPath>`
    + `<g clip-path="url(#${c1})">${K.slab(top.cx, top.cy, top.w, top.h, BR.lime, 37)}</g>`
    + `<g clip-path="url(#${c2})"><path d="${tp}" fill="none" stroke="${BR.cream}" stroke-opacity="1" stroke-width="6.5" stroke-dasharray="20 14" stroke-linecap="round"/><path d="${tp}" fill="${BR.lime}" fill-opacity="0.13" stroke="none"/></g>`;
  // colouring-in hatch at the frontier, guide lines, corner ticks
  [[-20, 44], [-4, 52], [14, 40], [32, 50], [50, 36]].forEach(([dx, h], i) => (s += K.inkS(`M${X - 4 + dx * 0.9} ${-top.h / 2 + 16 + i * 4} l-26 ${h}`, 9, BR.lime).replace("<path", '<path opacity="0.9"')));
  s += `<g stroke="${BR.cyan}" stroke-opacity="0.55" stroke-width="3.5" stroke-dasharray="10 12" fill="none"><path d="M-330 ${-top.h / 2} H330 M-330 ${top.h / 2} H330"/></g>`;
  s += K.inkS(`M${top.cx + top.w / 2 + 20} ${-top.h / 2 + 22} v-22 h-22 M${top.cx + top.w / 2 + 20} ${top.h / 2 - 22} v22 h-22`, 5, BR.cream);
  // graphite smudges + pencil dust
  s += `<filter id="${blur}"><feGaussianBlur stdDeviation="9"/></filter><g filter="url(#${blur})" fill="#9aa0ad" fill-opacity="0.75"><ellipse cx="150" cy="-10" rx="52" ry="16" transform="rotate(-18 150 -10)"/><ellipse cx="90" cy="34" rx="34" ry="10"/><ellipse cx="200" cy="30" rx="26" ry="9"/><ellipse cx="-70" cy="-80" rx="40" ry="8" transform="rotate(8 -70 -80)"/></g>`;
  s += K.inkS("M214 24 q8 -10 16 0 M244 48 q6 -8 12 0 M196 56 q5 -7 10 0", 4, "rgba(200,205,215,0.7)");
  // the pencil, tip on the last stroke
  s += L.g(K.pencilInk(290, 28), `translate(${X} ${-top.h / 2}) rotate(-46)`);
  return s;
}, { box: [-380, -380, 760, 760] });
L.put(S, "sd-bg", 0, 0, { glow: "yellow", gx: 960, gy: 540, gr: 460, vignette: false });
L.put(S, "logo5-art", 960, 560, { s: 1.1 });
