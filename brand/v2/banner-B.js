// look: still
// @library auto
// @include ../../tools/sd-kit.js
// @include common.js
// Banner B — being drawn: Stacky holds a giant pencil and is mid-way through hand-lettering STACK DOODLE on the grid (the last E is still construction lines).
// Frame 1920x1080 = 2560x1440. Safe box (1920 space) x 380-1540, y 381-698; the name sits inside it, Stacky and the doodles live on the TV / desktop edges.
const S = scene(0, 1, { cam: "none" });
const H = 112, X0 = 392, BASE = 565, LO = { c: BR.cream, sh: BR.lime, wt: 0.14, gap: 0.16, seed: 7 };
const pre = letter("STACK DOODL", X0, BASE, H, LO), EX = X0 + pre.w + H * LO.gap, EW = 0.58 * H;
const TIP = [EX + EW * 0.55, BASE], HAND = [1548, 520], SX = 1706, SY = 694, SS = 0.95;
const pdx = HAND[0] - TIP[0], pdy = HAND[1] - TIP[1], PLEN = Math.hypot(pdx, pdy) / 0.85, PROT = (Math.atan2(pdy, pdx) * 180) / Math.PI;
L.reg("sd", "bb-name", () => {
  let s = letter("STACK DOODL", X0, BASE, H, LO).svg + letter("1", EX, BASE, H, { ...LO, seed: 5 }).svg + letter("2", EX, BASE, H, { ...LO, seed: 5 }).svg;
  // construction: guide lines, the unfinished E (dashed), measuring line, scribble underline that stops short
  s += `<g stroke="${BR.cyan}" stroke-opacity="0.5" stroke-width="3.5" stroke-dasharray="12 12" fill="none"><path d="M120 ${BASE - H} H1500 M120 ${BASE} H1500"/></g>`;
  s += `<path d="M${F1(EX + EW * 0.64)} ${BASE} H${F1(EX + EW * 1.0)}" stroke="${BR.cream}" stroke-opacity="0.9" stroke-width="7" stroke-dasharray="16 13" stroke-linecap="round" fill="none"/>`;
  s += K.inkS(K.crPath(K.jit([[X0, BASE + 40], [X0 + 260, BASE + 32], [X0 + 520, BASE + 50], [EX - 20, BASE + 40]], 2.5, 3), false), 11, BR.pink);
  const dy = BASE + 86;
  s += `<g stroke="${BR.cyan}" stroke-opacity="0.8" stroke-width="3.5" fill="none"><path d="M${X0} ${dy} H${F1(EX + EW)} M${X0} ${dy - 12} v24 M${F1(EX + EW)} ${dy - 12} v24 M${X0 + 14} ${dy - 8} L${X0} ${dy} l14 8 M${F1(EX + EW - 14)} ${dy - 8} L${F1(EX + EW)} ${dy} l-14 8"/></g>`;
  s += raw("width: ~1000px (ish)", (X0 + EX + EW) / 2, dy + 38, 36, { font: "Caveat", weight: 700, c: BR.cyan });
  // graphite smudge + eraser crumbs by the tip
  const bl = gid("bbs");
  s += `<filter id="${bl}"><feGaussianBlur stdDeviation="7"/></filter><g filter="url(#${bl})" fill="#9aa0ad" fill-opacity="0.45"><ellipse cx="${F1(EX + EW + 30)}" cy="${F1(BASE - H * 0.3)}" rx="44" ry="12" transform="rotate(-14 ${F1(EX + EW + 30)} ${F1(BASE - H * 0.3)})"/></g>`;
  s += K.inkS(`M${F1(EX + EW + 70)} ${BASE + 22} q6 -9 12 0 M${F1(EX + EW + 108)} ${BASE + 40} q5 -8 10 0 M${F1(EX + EW + 52)} ${BASE + 54} q5 -7 9 0`, 4, "rgba(200,205,215,0.75)");
  return s;
}, { box: [0, 0, 1920, 1080] });
const snip = (txt, c, size = 38) => (o) => raw(txt, 0, 0, size, { c, stroke: BR.bg, sw: 9, anchor: "middle", weight: 700 });
L.reg("sd", "bb-s1", snip("const news = await get();", BR.lime), { box: [-330, -50, 660, 100] });
L.reg("sd", "bb-s2", snip("// TODO: be funny", BR.pink), { box: [-260, -50, 520, 100] });
L.reg("sd", "bb-s3", snip("</>", BR.cyan, 110), { box: [-150, -100, 300, 160] });
L.reg("sd", "bb-s4", snip("git commit -m \"doodled\"", BR.lime), { box: [-330, -50, 660, 100] });
L.reg("sd", "bb-s5", snip("npm run joke", BR.cyan), { box: [-210, -50, 420, 100] });
L.reg("sd", "bb-s6", snip("{ ship: true }", BR.yellow, 44), { box: [-260, -50, 520, 100] });
L.reg("sd", "bb-s7", snip("0 bugs*", BR.pink, 40), { box: [-160, -50, 320, 100] });
L.reg("sd", "bb-s8", snip("*(doodled)", BR.cream, 30), { box: [-160, -50, 320, 100] });
L.put(S, "sd-bg", 0, 0, { glow: "lime", gx: 880, gy: 520, gr: 900 });
L.put(S, "bb-s1", 330, 140, { rot: -5 });
L.put(S, "bb-s2", 920, 120, { rot: 2 });
L.put(S, "bb-s3", 1290, 190, { rot: 7 });
L.put(S, "bb-s4", 380, 960, { rot: 3 });
L.put(S, "bb-s5", 960, 940, { rot: -3 });
L.put(S, "bb-s6", 1260, 900, { rot: 5 });
L.put(S, "bb-s7", 130, 600, { rot: -8 });
L.put(S, "bb-s8", 150, 650, { rot: -8 });
L.put(S, "sd-arrow", 820, 195, { to: [-80, 190], bend: 0.35, c: "white", w: 8 });
L.put(S, "bb-name", 0, 0, {});
L.reg("sd", "bb-stacky", (o) => L.g(L.inline("sd-stacky", o), "scale(-1 1)"), { box: [-260, -340, 520, 360] }); // mirrored: Stacky faces the name
L.put(S, "bb-stacky", SX, SY, { s: SS, face: "grin", pose: "pencil", look: [-5, 3], handR: [(SX - HAND[0]) / SS, (HAND[1] - SY) / SS], pencilLen: PLEN / SS, pencilRot: 180 - PROT, pencilGrip: 0.85, pencilTh: 30 });
L.put(S, "sd-bubble", 1590, 235, { text: "ALMOST|DONE...", size: 40, tx: 120, ty: 195, c: "paper" });
