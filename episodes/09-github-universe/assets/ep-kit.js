// ===================== episode 09 (GitHub Universe) kit: ladder, merge box, reviewers panel, model picker, meter, ticket, slide =====================
// Same palette as tools/sd-kit.js. Generic GitHub-style mockups drawn with L.* primitives (no real UI screenshots).
(function () {
const L = window.L, f1 = L.f1;
const C = { bg: "#15171c", panel: "#242831", panel2: "#2d323d", line: "#3a404c", paper: "#f4f1e8", lime: "#b6f24a", pink: "#ff4d8d", cyan: "#4cc9f0", yellow: "#ffd23f", ink: "#1d1b1f", gray: "#8b909a", white: "#ffffff", green: "#3fb950", red: "#f85149" };
const col = (n) => C[n] || n;
const shadow = (d, dx = 9, dy = 12, op = 0.5) => L.g(L.flat(d, "#000000", op), `translate(${dx} ${dy})`);
const T = (s, x, y, size, c, o = {}) => L.text(s, x, y, Object.assign({ size, c, font: "Mono", weight: 700, anchor: "start" }, o));
const panel = (w, h, r = 22) => shadow(L.rrect(-w / 2, -h / 2, w, h, r)) + L.shape(L.rrect(-w / 2, -h / 2, w, h, r), C.panel, { flat: true, c: C.line, w: 5 });
const tick = (x, y, r, c = C.green) => L.flat(L.circ(x, y, r), c) + L.stroke(`M${f1(x - r * 0.45)} ${f1(y)} L${f1(x - r * 0.1)} ${f1(y + r * 0.35)} L${f1(x + r * 0.5)} ${f1(y - r * 0.4)}`, { c: C.white, w: r * 0.28 });
const cross = (x, y, r) => L.flat(L.circ(x, y, r), C.red) + L.stroke(`M${f1(x - r * 0.4)} ${f1(y - r * 0.4)} L${f1(x + r * 0.4)} ${f1(y + r * 0.4)} M${f1(x + r * 0.4)} ${f1(y - r * 0.4)} L${f1(x - r * 0.4)} ${f1(y + r * 0.4)}`, { c: C.white, w: r * 0.28 });
const dot = (x, y, r) => L.flat(L.circ(x, y, r), C.yellow) + L.flat(L.circ(x, y, r * 0.45), C.panel);

// the five-rung ladder; rungs 1..lit glow lime with labels (rung 1 = bottom); the newest lit label is brightest
L.reg("sd", "u9-ladder", (o) => {
  const n = o.n || 5, h = o.h || 760, rw = 150, labels = o.labels || [], lit = o.lit || 0;
  let s = L.stroke(`M${-rw / 2} ${h / 2 + 30}V${-h / 2 - 30}M${rw / 2} ${h / 2 + 30}V${-h / 2 - 30}`, { c: "#5a606c", w: 14 });
  for (let i = 0; i < n; i++) {
    const y = h / 2 - (i + 0.5) * (h / n), on = i < lit;
    s += L.stroke(`M${-rw / 2} ${f1(y)}H${rw / 2}`, { c: on ? C.lime : "#3a404c", w: 16 });
    if (on && labels[i]) s += T(labels[i], rw / 2 + 36, y + 14, o.size || 44, i === lit - 1 ? C.lime : C.gray, { weight: 800 });
  }
  return s;
}, { box: [-90, -410, 900, 820], group: "Episode", label: "Five-rung ladder", tags: ["ladder"], call: 'L.put(S, "u9-ladder", x, y, { lit: 2, labels: [...], h: 760, size: 44, t })' });

// merge box: check rows [name, "ok"|"fail"|"run"] + a "Watch and fix" button (hl: true = lime ring)
L.reg("sd", "u9-mergebox", (o) => {
  const rows = o.rows || [["build", "fail"], ["tests", "ok"]], w = 760, h = 200 + rows.length * 70, y0 = -h / 2;
  let s = panel(w, h);
  s += T(o.head || "Some checks were not successful", -w / 2 + 40, y0 + 62, 32, C.white);
  rows.forEach(([nm, st], i) => { const y = y0 + 120 + i * 70;
    s += (st === "ok" ? tick : st === "fail" ? cross : dot)(-w / 2 + 62, y, 20);
    s += T(nm, -w / 2 + 100, y + 11, 30, C.gray); });
  const by = y0 + h - 78;
  s += L.shape(L.rrect(-w / 2 + 40, by - 32, 330, 64, 12), C.green, { flat: true }) + T("Merge pull request", -w / 2 + 62, by + 10, 26, C.white);
  s += L.shape(L.rrect(-w / 2 + 400, by - 32, 300, 64, 12), C.panel2, { flat: true, c: o.hl ? C.lime : C.line, w: o.hl ? 7 : 4 }) + T("Watch and fix", -w / 2 + 432, by + 10, 28, o.hl ? C.lime : C.white, { weight: 800 });
  return s;
}, { box: [-390, -260, 790, 530], group: "Episode", label: "PR merge box", tags: ["merge", "pr", "ci"], call: 'L.put(S, "u9-mergebox", x, y, { rows: [["build","fail"]], head, hl: true, t })' });

// reviewers panel: "Required approvals n of 1" + rows [name, "approved"|"pending"|"dismissed"]
L.reg("sd", "u9-reviewers", (o) => {
  const rows = o.rows || [["copilot", "approved"]], w = 640, h = 190 + rows.length * 80, y0 = -h / 2;
  let s = panel(w, h);
  s += T("Reviewers", -w / 2 + 40, y0 + 60, 32, C.white, { weight: 800 });
  rows.forEach(([nm, st], i) => { const y = y0 + 125 + i * 80;
    s += L.flat(L.circ(-w / 2 + 64, y, 24), nm === "copilot" ? C.cyan : "#c58b5c");
    s += T(nm, -w / 2 + 104, y + 11, 30, C.white);
    s += st === "approved" ? tick(w / 2 - 60, y, 22) : st === "dismissed" ? T("dismissed", w / 2 - 200, y + 10, 26, C.pink) : dot(w / 2 - 60, y, 20); });
  const ok = rows.filter((r) => r[1] === "approved").length;
  s += T(`Required approvals: ${ok} of 1`, -w / 2 + 40, y0 + h - 34, 28, ok ? C.green : C.yellow, { weight: 800 });
  return s;
}, { box: [-330, -230, 660, 460], group: "Episode", label: "PR reviewers panel", tags: ["review", "approve"], call: 'L.put(S, "u9-reviewers", x, y, { rows: [["copilot","approved"]], t })' });

// model picker dropdown; hl = highlighted row
L.reg("sd", "u9-picker", (o) => {
  const items = o.items || ["Copilot Fusion"], w = 620, h = 110 + items.length * 74, y0 = -h / 2;
  let s = panel(w, h, 18) + T("Model", -w / 2 + 34, y0 + 52, 28, C.gray);
  items.forEach((it, i) => { const y = y0 + 100 + i * 74;
    if (i === (o.hl ?? 0)) s += L.flat(L.rrect(-w / 2 + 16, y - 40, w - 32, 64, 12), "#b6f24a33") + L.stroke(L.rrect(-w / 2 + 16, y - 40, w - 32, 64, 12), { c: C.lime, w: 4 });
    s += T(it, -w / 2 + 40, y + 6, 32, i === (o.hl ?? 0) ? C.lime : C.white, { weight: 800 }); });
  return s;
}, { box: [-320, -200, 640, 400], group: "Episode", label: "Model picker", tags: ["model", "dropdown"], call: 'L.put(S, "u9-picker", x, y, { items: [...], hl: 0, t })' });

// taxi-style meter: amount in big lime digits, label above
L.reg("sd", "u9-meter", (o) => {
  const w = 560, h = 300;
  let s = panel(w, h, 30) + L.flat(L.rrect(-w / 2 + 40, -40, w - 80, 140, 16), "#0b0c0f");
  s += T(o.label || "AI CREDITS", 0, -80, 38, C.yellow, { anchor: "middle", weight: 800 });
  s += T(o.amount || "$0.00", 0, 60, 92, C.lime, { anchor: "middle", weight: 800 });
  return s;
}, { box: [-290, -160, 580, 320], group: "Episode", label: "Usage meter", tags: ["meter", "bill"], call: 'L.put(S, "u9-meter", x, y, { amount: "$0.00", label, t })' });

// order ticket (paper slip) with a title and 2 lines
L.reg("sd", "u9-ticket", (o) => {
  const w = 300, h = 360, x0 = -w / 2, y0 = -h / 2;
  let s = shadow(L.rect(x0, y0, w, h), 7, 9) + L.shape(L.poly([[x0, y0], [x0 + w, y0], [x0 + w, y0 + h], [x0 + w * 0.75, y0 + h - 16], [x0 + w * 0.5, y0 + h], [x0 + w * 0.25, y0 + h - 16], [x0, y0 + h]], true), C.paper, { flat: true });
  s += T(o.title || "ORDER", 0, y0 + 70, 44, C.ink, { anchor: "middle", weight: 800 });
  (o.lines || []).forEach((ln, i) => (s += T(ln, 0, y0 + 150 + i * 56, 34, "#3a363d", { anchor: "middle" })));
  return s;
}, { box: [-160, -190, 320, 380], group: "Episode", label: "Order ticket", tags: ["ticket", "order"], call: 'L.put(S, "u9-ticket", x, y, { title, lines: [..], t })' });

// chef hat (sits on top of a head; origin = hat base centre)
L.reg("sd", "u9-chefhat", () => L.shape(L.rrect(-70, -60, 140, 60, 8), C.white, { flat: true, c: C.ink, w: 5 })
  + L.shape(`M-80 -50 C-140 -60 -130 -170 -60 -150 C-50 -210 50 -210 60 -150 C130 -170 140 -60 80 -50 Z`, C.white, { flat: true, c: C.ink, w: 5 }),
{ box: [-140, -200, 280, 210], group: "Episode", label: "Chef hat", tags: ["chef", "hat"], call: 'L.put(S, "u9-chefhat", x, y, { s, t })' });

// keynote screen: a big dark slide with a giant line of text
L.reg("sd", "u9-slide", (o) => {
  const w = o.w || 1000, h = o.h || 560;
  let s = shadow(L.rrect(-w / 2, -h / 2, w, h, 20)) + L.shape(L.rrect(-w / 2, -h / 2, w, h, 20), "#0b0c0f", { flat: true, c: C.line, w: 8 });
  s += T(o.text || "< 1%", 0, (o.size || 300) * 0.35, o.size || 300, col(o.c || "lime"), { anchor: "middle", weight: 800 });
  if (o.sub) s += T(o.sub, 0, h / 2 - 50, 40, C.gray, { anchor: "middle" });
  return s;
}, { box: [-510, -290, 1020, 580], group: "Episode", label: "Keynote slide", tags: ["keynote", "slide"], call: 'L.put(S, "u9-slide", x, y, { text: "< 1%", sub, size: 300, c, w, h, t })' });

// budget panel: rows [label, on(bool)]; off rows grey + struck
L.reg("sd", "u9-budget", (o) => {
  const rows = o.rows || [["COMPLETIONS", true]], w = 760, h = 150 + rows.length * 86, y0 = -h / 2;
  let s = panel(w, h) + T(o.head || "BUDGET: $0.00", -w / 2 + 40, y0 + 66, 40, C.pink, { weight: 800 });
  rows.forEach(([nm, on], i) => { const y = y0 + 140 + i * 86;
    s += on ? tick(-w / 2 + 66, y, 24) : L.flat(L.circ(-w / 2 + 66, y, 24), "#4a505c");
    s += T(nm, -w / 2 + 112, y + 13, 36, on ? C.white : "#6b717c", { weight: 800 });
    if (!on) s += L.stroke(`M${-w / 2 + 106} ${y}H${f1(-w / 2 + 120 + nm.length * 21.6)}`, { c: "#6b717c", w: 5 }); });
  return s;
}, { box: [-390, -250, 790, 500], group: "Episode", label: "Budget panel", tags: ["budget", "credits"], call: 'L.put(S, "u9-budget", x, y, { head, rows: [["CHAT", false]], t })' });

// a nameplate (brass sign) with screws
L.reg("sd", "u9-plate", (o) => {
  const txt = o.text || "GITHUB", w = Math.max(360, txt.length * 44 + 120), h = 150;
  let s = shadow(L.rrect(-w / 2, -h / 2, w, h, 14)) + L.shape(L.rrect(-w / 2, -h / 2, w, h, 14), col(o.c || "#c9a24a"), { flat: true, c: C.ink, w: 6 });
  s += L.flat(L.circ(-w / 2 + 28, 0, 10), "#7a6230") + L.flat(L.circ(w / 2 - 28, 0, 10), "#7a6230");
  s += T(txt, 0, 26, 72, C.ink, { anchor: "middle", weight: 800 });
  return s;
}, { box: [-420, -85, 840, 170], group: "Episode", label: "Nameplate", tags: ["sign", "plate"], call: 'L.put(S, "u9-plate", x, y, { text, c, t })' });
})();
