// ===================== episode 02 (eMudhra) kit: the notary seal, certificates and small cards =====================
// Same palette as tools/sd-kit.js. Everything is drawn with L.* primitives; nothing here is a real logo.
(function () {
const L = window.L, f1 = L.f1;
const C = { bg: "#15171c", paper: "#f4f1e8", paper2: "#e3dece", lime: "#b6f24a", pink: "#ff4d8d", cyan: "#4cc9f0", yellow: "#ffd23f", ink: "#1d1b1f", ink2: "#3a363d", gray: "#8b909a", wood: "#8a5a2b", wood2: "#6b4421" };
const col = (n) => C[n] || n;
const shadow = (d, dx = 9, dy = 12, op = 0.5) => L.g(L.flat(d, "#000000", op), `translate(${dx} ${dy})`);

// the notary seal: scalloped face with a big value; `tool` draws the rubber stamp above it (origin = face centre)
L.reg("sd", "sd-seal", (o) => {
  const r = o.r || 200, txt = String(o.text ?? "4"), fc = col(o.c || "paper"), ac = col(o.ac || "pink");
  let s = "";
  if (o.face !== false) {
    const star = L.star(0, 0, r, r * 0.9, 30, -90);
    s += shadow(star, r * 0.05, r * 0.07) + L.shape(star, fc, { flat: true });
    s += L.stroke(L.circ(0, 0, r * 0.84), { c: C.ink, w: Math.max(4, r * 0.04) }) + L.stroke(L.circ(0, 0, r * 0.77), { c: C.ink, w: Math.max(2, r * 0.02) });
    const big = txt.length <= 1 ? r * 0.98 : txt.length === 2 ? r * 0.85 : txt.length === 3 ? r * 0.64 : r * 0.46;
    s += L.text(o.top ?? "CERTIFIED", 0, -r * 0.5, { size: r * 0.15, c: C.ink2, font: "Mono", weight: 800, spacing: r * 0.02 });
    s += L.text(txt, 0, r * 0.34 + (txt.length > 2 ? r * 0.05 : 0), { size: big, c: ac, font: "Mono", weight: 800 });
    s += L.text(o.bottom ?? "AUTHORITY", 0, r * 0.62, { size: r * 0.13, c: C.ink2, font: "Mono", weight: 800, spacing: r * 0.02 });
  }
  if (o.tool) {
    const y = -r - 20, fw = r * 1.25;
    s += shadow(L.rrect(-fw / 2, y - r * 0.2, fw, r * 0.2, 12), 8, 10)
      + L.shape(L.rrect(-fw / 2, y - r * 0.2, fw, r * 0.2, 12), C.wood2, { flat: true })
      + L.shape(L.rrect(-r * 0.22, y - r * 0.85, r * 0.44, r * 0.66, 10), C.wood, { flat: true })
      + L.shape(L.rrect(-r * 0.5, y - r * 1.2, r, r * 0.4, r * 0.2), C.wood, { flat: true });
  }
  return s;
}, { box: [-260, -300, 520, 560], group: "Episode", label: "Notary seal / stamp", tags: ["seal", "stamp", "certificate"],
  call: 'L.put(S, "sd-seal", x, y, { r: 200, text: "4", c: "paper", ac: "pink", top, bottom, face: true, tool: false, t, pop })' });

// a certificate card
L.reg("sd", "sd-cert", (o) => {
  const w = o.w || 440, h = o.h || 560, x0 = -w / 2, y0 = -h / 2, ac = col(o.ac || "cyan");
  let s = shadow(L.rrect(x0, y0, w, h, 22)) + L.shape(L.rrect(x0, y0, w, h, 22), C.paper, { flat: true });
  s += L.stroke(L.rrect(x0 + 18, y0 + 18, w - 36, h - 36, 14), { c: ac, w: 6 });
  s += L.text(o.title || "CERTIFICATE", 0, y0 + h * 0.2, { size: w * (o.tsize || 0.1), c: C.ink, font: "Mono", weight: 800 });
  if (o.sub) s += L.text(o.sub, 0, y0 + h * 0.31, { size: w * 0.062, c: C.ink2, font: "Mono", weight: 600 });
  for (let i = 0; i < 4; i++) s += L.stroke(L.line([x0 + 52, y0 + h * (0.42 + i * 0.085)], [x0 + w - 52 - (i === 3 ? w * 0.35 : 0), y0 + h * (0.42 + i * 0.085)], 3), { c: C.gray, w: 6 });
  return s;
}, { box: [-260, -310, 520, 620], group: "Episode", label: "Certificate card", tags: ["certificate", "card"],
  call: 'L.put(S, "sd-cert", x, y, { title: "CERTIFICATE", sub: "mybank.in", w: 440, h: 560, ac: "cyan", t })' });

// paper note: lines of Mali text on cream, a strip of tape on top
L.reg("sd", "sd-note", (o) => {
  const lines = o.lines || [""], w = o.w || 700, size = o.size || 64, h = o.h || lines.length * size * 1.3 + size * 1.1, x0 = -w / 2, y0 = -h / 2;
  let s = shadow(L.rrect(x0, y0, w, h, 14)) + L.shape(L.rrect(x0, y0, w, h, 14), col(o.c || "paper"), { flat: true });
  lines.forEach((ln, i) => (s += L.text(ln, 0, y0 + size * 1.15 + i * size * 1.3, { size, c: C.ink, weight: 700 })));
  return s + L.g(L.flat(L.rect(-70, y0 - 20, 140, 40), C.yellow, 0.85), "rotate(-3 0 " + f1(y0) + ")");
}, { box: [-500, -300, 1000, 600], group: "Episode", label: "Paper note", tags: ["note", "paper"], call: 'L.put(S, "sd-note", x, y, { lines: ["…"], w: 700, size: 64, c: "paper", t })' });

// a long run of random digits (decoration only; they are not a key)
L.reg("sd", "sd-digits", (o) => L.text(o.text, 0, (o.size || 150) * 0.35, { size: o.size || 150, c: col(o.c || "ink"), font: "Mono", weight: 800, anchor: "start" }),
  { box: [0, -120, 600, 240], group: "Episode", label: "Digit run", tags: ["digits"], call: 'L.put(S, "sd-digits", x, y, { text, size, c })' });

// a wall of mini certificates (one asset = one entrance)
L.reg("sd", "sd-certwall", (o) => {
  const cols = o.cols || 6, rows = o.rows || 3, cw = o.cw || 150, ch = o.ch || 190, gap = o.gap || 26, rnd = L.rng(11);
  let s = "";
  for (let r = 0; r < rows; r++) for (let c = 0; c < cols; c++) {
    const x = (c - (cols - 1) / 2) * (cw + gap), y = (r - (rows - 1) / 2) * (ch + gap), rot = (rnd() - 0.5) * 8;
    let k = shadow(L.rrect(-cw / 2, -ch / 2, cw, ch, 12), 5, 7) + L.shape(L.rrect(-cw / 2, -ch / 2, cw, ch, 12), r % 2 ? C.paper2 : C.paper, { flat: true });
    k += L.stroke(L.rrect(-cw / 2 + 10, -ch / 2 + 10, cw - 20, ch - 20, 8), { c: C.cyan, w: 3 });
    for (let i = 0; i < 3; i++) k += L.stroke(L.line([-cw / 2 + 28, -ch * 0.2 + i * ch * 0.16], [cw / 2 - 28 - (i === 2 ? cw * 0.3 : 0), -ch * 0.2 + i * ch * 0.16], 2), { c: C.gray, w: 4 });
    k += L.shape(L.circ(cw * 0.25, ch * 0.3, cw * 0.12), C.yellow, { flat: true, w: "detail" });
    s += L.g(k, `translate(${f1(x)} ${f1(y)}) rotate(${f1(rot)})`);
  }
  return s;
}, { box: [-600, -400, 1200, 800], group: "Episode", label: "Wall of certificates", tags: ["certificates", "wall"], call: 'L.put(S, "sd-certwall", x, y, { cols: 6, rows: 3, cw: 150, ch: 190, gap: 26, t })' });

// browser / OS card: logo or a text name, optional sub-chip
L.reg("sd", "sd-tile", (o) => {
  const w = o.w || 400, h = o.h || 520, x0 = -w / 2, y0 = -h / 2;
  let s = shadow(L.rrect(x0, y0, w, h, 28)) + L.shape(L.rrect(x0, y0, w, h, 28), C.paper, { flat: true });
  if (o.logo) s += L.g(L.inline(o.logo, {}), `translate(0 ${f1(-h * 0.14)}) scale(${f1((o.ls || 2.3) * w / 400)})`);
  else s += L.text(o.name, 0, -h * 0.1 + w * 0.05, { size: w * 0.15, c: C.ink, font: "Mono", weight: 800 });
  if (o.logo) s += L.text(o.name || "", 0, h * 0.22, { size: w * 0.1, c: C.ink, font: "Mono", weight: 800 });
  if (o.sub) s += L.g(L.inline("sd-chip", { text: o.sub, c: o.c || "cyan", size: w * 0.095 }), `translate(0 ${f1(h * 0.37)})`);
  return s;
}, { box: [-260, -330, 520, 660], group: "Episode", label: "Software card", tags: ["logo", "card"], call: 'L.put(S, "sd-tile", x, y, { logo: "logo-firefox", name: "FIREFOX", sub: "~3 HOURS", c: "cyan", w: 400, h: 520, t })' });

// small logo tile with a green tick (tools that accepted a forged certificate)
L.reg("sd", "sd-ticklogo", (o) => {
  const w = o.w || 300, x0 = -w / 2;
  let s = shadow(L.rrect(x0, x0, w, w, 24)) + L.shape(L.rrect(x0, x0, w, w, 24), C.paper, { flat: true });
  s += L.g(L.inline(o.logo, {}), `translate(0 ${f1(-w * 0.1)}) scale(${f1(w / 160)})`);
  s += L.text(o.name, 0, w * 0.36, { size: w * 0.115, c: C.ink, font: "Mono", weight: 800 });
  const tx = w * 0.4, ty = -w * 0.4;
  s += L.shape(L.circ(tx, ty, w * 0.17), C.lime, { flat: true }) + L.stroke(L.poly([[tx - w * 0.08, ty + w * 0.005], [tx - w * 0.015, ty + w * 0.075], [tx + w * 0.09, ty - w * 0.07]]), { c: C.ink, w: w * 0.04 });
  return s;
}, { box: [-190, -190, 380, 380], group: "Episode", label: "Logo tile with tick", tags: ["logo", "tick"], call: 'L.put(S, "sd-ticklogo", x, y, { logo: "logo-curl", name: "curl", w: 300, t })' });

// checklist row: lime tick box + label on a cream bar
L.reg("sd", "sd-todo", (o) => {
  const size = o.size || 70, w = String(o.text).length * size * 0.62 + size * 2.1, h = size * 1.7, x0 = -w / 2;
  let s = shadow(L.rrect(x0, -h / 2, w, h, h * 0.25), 7, 9) + L.shape(L.rrect(x0, -h / 2, w, h, h * 0.25), C.paper, { flat: true });
  const bx = x0 + h * 0.5;
  s += L.shape(L.rrect(bx - h * 0.3, -h * 0.3, h * 0.6, h * 0.6, 10), C.lime, { flat: true }) + L.stroke(L.poly([[bx - h * 0.16, 0], [bx - h * 0.03, h * 0.14], [bx + h * 0.19, -h * 0.14]]), { c: C.ink, w: h * 0.09 });
  return s + L.text(o.text, x0 + h * 1.05, size * 0.33, { size, c: C.ink, font: "Mono", weight: 800, anchor: "start" });
}, { box: [-500, -70, 1000, 140], group: "Episode", label: "Checklist row", tags: ["todo", "tick"], call: 'L.put(S, "sd-todo", x, y, { text: "UPDATE BROWSER", size: 70, t })' });

// stamp tool standing on its base (origin = bottom centre)
L.reg("sd", "sd-stamptool", (o) => {
  const r = o.r || 150;
  return shadow(L.rrect(-r * 0.62, -r * 0.22, r * 1.24, r * 0.22, 12), 8, 10) + L.shape(L.rrect(-r * 0.62, -r * 0.22, r * 1.24, r * 0.22, 12), C.wood2, { flat: true })
    + L.shape(L.rrect(-r * 0.2, -r * 0.88, r * 0.4, r * 0.68, 10), C.wood, { flat: true }) + L.shape(L.rrect(-r * 0.5, -r * 1.25, r, r * 0.4, r * 0.2), C.wood, { flat: true });
}, { box: [-200, -260, 400, 280], group: "Episode", label: "Stamp tool", tags: ["stamp"], call: 'L.put(S, "sd-stamptool", x, y, { r: 150, t })   // origin = bottom centre' });

// a cereal box (the joke: a calculator from a cereal box)
L.reg("sd", "sd-cereal", (o) => {
  const w = 400, h = 560, x0 = -w / 2, y0 = -h / 2, d = L.rrect(x0, y0, w, h, 24);
  let s = shadow(d) + L.shape(d, "#ff9f1c", { flat: true }) + L.shape(L.rrect(x0, y0, w, 90, 24), C.yellow, { flat: true, w: "detail" });
  s += L.text("CRUNCHY", 0, y0 + 62, { size: 56, c: C.ink, font: "Mono", weight: 800 });
  s += L.shape(L.circ(0, 20, 130), C.paper, { flat: true }) + L.text("4-O's", 0, 48, { size: 92, c: C.pink, font: "Mono", weight: 800 });
  return s + L.text("CEREAL", 0, y0 + h - 40, { size: 60, c: C.ink, font: "Mono", weight: 800 });
}, { box: [-260, -310, 520, 620], group: "Episode", label: "Cereal box", tags: ["cereal", "box"], call: 'L.put(S, "sd-cereal", x, y, { t })' });
L.epHood = "#3a3f4d";
})();
