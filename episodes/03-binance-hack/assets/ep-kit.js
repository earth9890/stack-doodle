// ===================== episode 03 (Binance hack) kit: call tiles, the ladder, the power-of-attorney paper =====================
// Same palette as tools/sd-kit.js. Drawn with L.* primitives; no real logos or real people (tiles are generic doodle heads).
(function () {
const L = window.L, f1 = L.f1;
const C = { bg: "#15171c", panel: "#242831", paper: "#f4f1e8", paper2: "#e3dece", lime: "#b6f24a", pink: "#ff4d8d", cyan: "#4cc9f0", yellow: "#ffd23f", ink: "#1d1b1f", ink2: "#3a363d", gray: "#8b909a", white: "#ffffff" };
const col = (n) => C[n] || n;
const shadow = (d, dx = 9, dy = 12, op = 0.5) => L.g(L.flat(d, "#000000", op), `translate(${dx} ${dy})`);
const stamp = (txt, w, c, rot = -12, size = 64) => L.g(L.stroke(L.rrect(-w / 2, -size * 0.75, w, size * 1.5, 14), { c, w: 8 })
  + L.text(txt, 0, size * 0.36, { size, c, font: "Mono", weight: 800, spacing: 4 }), `rotate(${rot})`);

// video-call tile: dark panel, a generic doodle head, a name bar; fake: pink FAKE stamp
L.reg("sd", "b3-tile", (o) => {
  const w = o.w || 460, h = o.h || 330, x0 = -w / 2, y0 = -h / 2, hc = col(o.hc || "cyan");
  let s = shadow(L.rrect(x0, y0, w, h, 24)) + L.shape(L.rrect(x0, y0, w, h, 24), C.panel, { flat: true, c: "#3a404c", w: 5 });
  s += L.shape(`M${f1(-w * 0.26)} ${f1(y0 + h - 4)} Q${f1(-w * 0.26)} ${f1(h * 0.05)} 0 ${f1(h * 0.05)} Q${f1(w * 0.26)} ${f1(h * 0.05)} ${f1(w * 0.26)} ${f1(y0 + h - 4)} Z`, hc, { flat: true });
  s += L.shape(L.circ(0, -h * 0.12, h * 0.2), "#f0c9a0", { flat: true });
  s += L.flat(L.circ(-h * 0.07, -h * 0.14, 6), C.ink) + L.flat(L.circ(h * 0.07, -h * 0.14, 6), C.ink);
  s += L.stroke(`M${f1(-h * 0.07)} ${f1(-h * 0.04)} Q0 ${f1(h * 0.02)} ${f1(h * 0.07)} ${f1(-h * 0.04)}`, { c: C.ink, w: 5 });
  s += L.flat(L.rrect(x0 + 16, y0 + h - 62, Math.min(w - 32, 40 + String(o.name || "").length * 24), 46, 10), "#000000", 0.55);
  s += L.text(o.name || "HR", x0 + 34, y0 + h - 29, { size: 30, c: C.white, font: "Mono", weight: 700, anchor: "start" });
  if (o.badge) s += L.flat(L.circ(x0 + w - 34, y0 + 34, 12), C.lime);
  if (o.fake) s += L.g(stamp("FAKE", 260, C.pink, -12, 72), `translate(0 ${f1(-h * 0.08)})`);
  return s;
}, { box: [-240, -175, 480, 350], group: "Episode", label: "Video-call tile", tags: ["call", "interview", "tile"],
  call: 'L.put(S, "b3-tile", x, y, { name: "HR", hc: "cyan", fake: false, badge: true, w: 460, h: 330, t, slide })' });

// the escalation ladder: n rungs, the first `lit` glow lime with labels to the right (rung 1 = bottom)
L.reg("sd", "b3-ladder", (o) => {
  const n = o.n || 4, h = o.h || 680, rw = 150, labels = o.labels || [], lit = o.lit || 0;
  let s = L.stroke(`M${-rw / 2} ${h / 2 + 30}V${-h / 2 - 30}M${rw / 2} ${h / 2 + 30}V${-h / 2 - 30}`, { c: "#5a606c", w: 14 });
  for (let i = 0; i < n; i++) {
    const y = h / 2 - (i + 0.5) * (h / n), on = i < lit;
    s += L.stroke(`M${-rw / 2} ${f1(y)}H${rw / 2}`, { c: on ? C.lime : "#3a404c", w: 16 });
    if (on && labels[i]) s += L.text(labels[i], rw / 2 + 36, y + 14, { size: o.size || 40, c: i === lit - 1 ? C.lime : C.gray, font: "Mono", weight: 800, anchor: "start" });
  }
  return s;
}, { box: [-90, -370, 900, 740], group: "Episode", label: "Escalation ladder", tags: ["ladder", "steps"],
  call: 'L.put(S, "b3-ladder", x, y, { n: 4, lit: 2, labels: ["A LIST OF NAMES", …], h: 680, size: 40, t })' });

// a paper: title, ruled lines, a wax seal; stamp: diagonal word (REVOKED / CLOSED)
L.reg("sd", "b3-paper", (o) => {
  const w = o.w || 520, h = o.h || 640, x0 = -w / 2, y0 = -h / 2, sc = col(o.seal || "pink");
  let s = shadow(L.rrect(x0, y0, w, h, 14)) + L.shape(L.rrect(x0, y0, w, h, 14), C.paper, { flat: true });
  String(o.title || "POWER OF|ATTORNEY").split("|").forEach((ln, i) => (s += L.text(ln, 0, y0 + 92 + i * 58, { size: o.tsize || 50, c: C.ink, font: "Mono", weight: 800 })));
  for (let i = 0; i < 5; i++) s += L.stroke(L.line([x0 + 50, y0 + h * (0.4 + i * 0.085)], [x0 + w - 50 - (i === 4 ? w * 0.4 : 0), y0 + h * (0.4 + i * 0.085)]), { c: C.gray, w: 6 });
  if (o.to) s += L.text(o.to, x0 + 50, y0 + h * 0.4 - 26, { size: 28, c: C.ink2, font: "Mono", weight: 700, anchor: "start" });
  s += L.shape(L.star(x0 + w - 92, y0 + h - 92, 58, 50, 16, -90), sc, { flat: true }) + L.stroke(L.circ(x0 + w - 92, y0 + h - 92, 36), { c: "#00000055", w: 4 });
  s += L.stroke(`M${x0 + 50} ${y0 + h - 80} q40 -40 70 0 t70 0 t60 -10`, { c: C.ink, w: 5 });
  if (o.stamp) s += L.g(stamp(o.stamp, w * 0.8, col(o.stampC || "pink"), -14, 76), `translate(0 ${f1(h * 0.05)})`);
  return s;
}, { box: [-260, -320, 520, 640], group: "Episode", label: "Document with seal", tags: ["paper", "document", "attorney"],
  call: 'L.put(S, "b3-paper", x, y, { title: "POWER OF|ATTORNEY", to: "TO: CONTRACT 0x…", seal: "pink", stamp: "REVOKED", t, slide })' });

// one MPC key share: a key bow + a fraction of the blade, numbered
L.reg("sd", "b3-share", (o) => {
  const c = col(o.c || "yellow");
  let s = L.shape(L.circ(-60, 0, 42), c, { flat: true }) + L.flat(L.circ(-60, 0, 16), C.bg);
  s += L.shape(L.rrect(-22, -12, 110, 24, 6), c, { flat: true }) + L.shape(L.rect(60, 10, 16, 26), c, { flat: true });
  s += L.text(o.label || "1/3", 0, 92, { size: 34, c: C.white, font: "Mono", weight: 800 });
  return s;
}, { box: [-110, -60, 220, 170], group: "Episode", label: "Key share", tags: ["key", "share", "mpc"],
  call: 'L.put(S, "b3-share", x, y, { label: "1/3", c: "yellow", t, pop })' });

// a bank front counter with a teller window and a hanging CLOSED sign (origin = floor centre)
L.reg("sd", "b3-counter", (o) => {
  const w = o.w || 760;
  let s = shadow(L.rect(-w / 2, -300, w, 300)) + L.shape(L.rect(-w / 2, -300, w, 300), "#8a5a2b", { flat: true, c: "#000", w: 6 });
  s += L.shape(L.rect(-w / 2 - 30, -330, w + 60, 36), "#6b4421", { flat: true, c: "#000", w: 6 });
  s += L.shape(L.rect(-w * 0.3, -720, w * 0.6, 390), "#2b3038", { flat: true, c: "#000", w: 8 }) + L.flat(L.rect(-w * 0.3 + 18, -702, w * 0.6 - 36, 354), "#4cc9f033");
  s += L.stroke(`M-90 -700 L-60 -600 M90 -700 L60 -600`, { c: "#d9dee6", w: 5 });
  s += L.g(L.shape(L.rrect(-150, -600, 300, 100, 14), C.pink, { flat: true, c: "#000", w: 6 }) + L.text(o.sign || "CLOSED", 0, -532, { size: 52, c: C.ink, font: "Mono", weight: 800 }), "rotate(-4)");
  s += L.text(o.label || "WITHDRAWALS", 0, -130, { size: 48, c: C.paper, font: "Mono", weight: 800 });
  return s;
}, { box: [-420, -740, 840, 760], group: "Episode", label: "Bank counter, closed", tags: ["bank", "counter", "closed"],
  call: 'L.put(S, "b3-counter", x, floorY, { sign: "CLOSED", label: "WITHDRAWALS", w: 760, t })' });
})();
