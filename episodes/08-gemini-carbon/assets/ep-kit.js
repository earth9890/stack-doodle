// ===================== episode 08 (Gemini 4 Carbon) kit: element tiles, velvet rope, the cracked wall, the photo finish =====================
// Same palette as tools/sd-kit.js. Drawn with L.* primitives only.
(function () {
const L = window.L, f1 = L.f1;
const C = { bg: "#15171c", panel: "#242831", paper: "#f4f1e8", paper2: "#e3dece", lime: "#b6f24a", pink: "#ff4d8d", cyan: "#4cc9f0", yellow: "#ffd23f", ink: "#1d1b1f", ink2: "#3a363d", gray: "#8b909a", white: "#ffffff", brass: "#d9a441", red: "#c8324b" };
const col = (n) => C[n] || n;
const shadow = (d, dx = 9, dy = 12, op = 0.5) => L.g(L.flat(d, "#000000", op), `translate(${dx} ${dy})`);

// periodic-table tile: number top-left, big symbol, name; sleep = Zz + closed eyes; bonds = lime bond lines out to every side
L.reg("sd", "g4-elem", (o) => {
  const w = 300, c = col(o.c || "cyan");
  let s = "";
  if (o.bonds) for (let i = 0; i < 8; i++) { const a = (i / 8) * Math.PI * 2 + 0.2, r0 = 175, r1 = 300;
    s += L.stroke(`M${f1(Math.cos(a) * r0)} ${f1(Math.sin(a) * r0)}L${f1(Math.cos(a) * r1)} ${f1(Math.sin(a) * r1)}`, { c: C.lime, w: 12 })
      + L.shape(L.circ(Math.cos(a) * (r1 + 22), Math.sin(a) * (r1 + 22), 22), C.lime, { flat: true }); }
  s += shadow(L.rrect(-w / 2, -w / 2, w, w, 26)) + L.shape(L.rrect(-w / 2, -w / 2, w, w, 26), C.paper, { flat: true, c: c, w: 10 });
  s += L.text(String(o.num || ""), -w / 2 + 26, -w / 2 + 56, { size: 44, c: C.ink2, font: "Mono", weight: 700, anchor: "start" });
  s += L.text(o.sym || "C", 0, 52, { size: 150, c: C.ink, font: "Mono", weight: 800 });
  s += L.text(o.name || "", 0, w / 2 - 26, { size: 38, c: c === C.paper ? C.ink : C.ink2, font: "Mono", weight: 800, spacing: 3 });
  if (o.sleep) s += L.text("Zz", w / 2 - 10, -w / 2 - 10, { size: 90, c: C.cyan, font: "Mono", weight: 800, anchor: "start" });
  return s;
}, { box: [-340, -340, 680, 680], group: "Episode", label: "Element tile", tags: ["element", "periodic", "chemistry"],
  call: 'L.put(S, "g4-elem", x, y, { sym: "C", num: 6, name: "CARBON", c: "lime", sleep: false, bonds: false, t })' });

// velvet rope: two brass stanchions and a sagging red rope; optional sign hanging on it
L.reg("sd", "g4-rope", (o) => {
  const w = o.w || 700, h = 300, x0 = -w / 2, x1 = w / 2;
  const post = (x) => L.shape(L.rrect(x - 14, -h, 28, h, 10), C.brass, { flat: true, c: C.ink, w: 5 }) + L.shape(L.circ(x, -h - 18, 28), C.brass, { flat: true, c: C.ink, w: 5 })
    + L.shape(L.rrect(x - 70, -24, 140, 30, 12), C.brass, { flat: true, c: C.ink, w: 5 });
  let s = post(x0) + post(x1);
  const rope = `M${x0} ${-h + 30} Q0 ${-h + 200} ${x1} ${-h + 30}`;
  s += L.stroke(rope, { c: C.ink, w: 30 }) + L.stroke(rope, { c: C.red, w: 20 });
  if (o.sign) { const sw = Math.max(260, L.sdTw(o.sign, 40, true) + 60);
    s += L.stroke(`M-40 ${-h + 116}L-30 ${-h + 150}M40 ${-h + 116}L30 ${-h + 150}`, { c: C.ink, w: 5 })
      + shadow(L.rrect(-sw / 2, -h + 150, sw, 90, 14)) + L.shape(L.rrect(-sw / 2, -h + 150, sw, 90, 14), C.paper, { flat: true, c: C.ink, w: 6 })
      + L.text(o.sign, 0, -h + 210, { size: 40, c: C.ink, font: "Mono", weight: 800 }); }
  return s;
}, { box: [-420, -360, 840, 380], group: "Episode", label: "Velvet rope", tags: ["rope", "vip", "gate", "club"],
  call: 'L.put(S, "g4-rope", x, floorY, { w: 700, sign: "DEFENDERS ONLY", t })   // origin = floor centre' });

// a brick wall panel with a zig-zag crack; patch = a lime patch over it
L.reg("sd", "g4-wall", (o) => {
  const w = 620, h = 520;
  let s = shadow(L.rect(-w / 2, -h / 2, w, h)) + L.shape(L.rect(-w / 2, -h / 2, w, h), "#c4674a", { flat: true, c: C.ink, w: 6 });
  let d = ""; for (let r = 0; r < 8; r++) { const y = -h / 2 + r * 65; d += `M${-w / 2} ${y}H${w / 2}`; for (let x = -w / 2 + (r % 2 ? 60 : 0); x < w / 2; x += 120) d += `M${x} ${y}V${y + 65}`; }
  s += L.stroke(d, { c: "#8e4632", w: 5 });
  const crack = "M-40 -250 L-10 -170 L-60 -90 L10 -10 L-30 70 L30 150 L0 250";
  if (!o.patch) s += L.stroke(crack, { c: C.ink, w: 16 });
  else s += L.shape(L.rrect(-110, -230, 200, 460, 30), C.lime, { flat: true, c: C.ink, w: 6 }) + L.stroke("M-70 -180 L50 -180 M-70 180 L50 180", { c: C.ink, w: 5, op: 0.4 });
  return s;
}, { box: [-330, -280, 660, 560], group: "Episode", label: "Cracked wall", tags: ["wall", "crack", "bug"],
  call: 'L.put(S, "g4-wall", x, y, { patch: false, t })' });

// photo finish: a finish line and three noses (labelled chips) just at it
L.reg("sd", "g4-finish", (o) => {
  const rows = o.rows || [["CARBON 59", 0], ["OPUS 5.5 58", -22], ["GPT-6 ASTRA 57", -44]];
  let s = "";
  for (let y = -270; y < 270; y += 36) s += L.flat(L.rect(-18, y, 18, 18), C.white) + L.flat(L.rect(0, y + 18, 18, 18), C.white);
  rows.forEach(([lab, dx], i) => { const y = -170 + i * 170, tw = L.sdTw(lab, 46, true) + 50, cc = i ? C.gray : C.lime;
    s += L.shape(L.rrect(dx - tw, y - 40, tw, 80, 40), cc, { flat: true, c: C.ink, w: 5 }) + L.text(lab, dx - tw / 2, y + 16, { size: 46, c: C.ink, font: "Mono", weight: 800 }); });
  return s;
}, { box: [-760, -280, 800, 560], group: "Episode", label: "Photo finish", tags: ["race", "finish", "ranking"],
  call: 'L.put(S, "g4-finish", x, y, { rows: [["CARBON 59", 0], ["OPUS 58", -22]], t })   // origin = the finish line' });

// a plain door with a label plate (PATCH / ATTACK)
L.reg("sd", "g4-door", (o) => {
  const c = col(o.c || "lime");
  return shadow(L.rrect(-130, -420, 260, 420, 16)) + L.shape(L.rrect(-130, -420, 260, 420, 16), C.panel, { flat: true, c: c, w: 10 })
    + L.shape(L.circ(85, -200, 16), C.brass, { flat: true, c: C.ink, w: 4 }) + L.shape(L.rrect(-30, -230, 22, 50, 8), C.ink, { flat: true })
    + L.text(o.text || "", 0, -330, { size: 46, c: c, font: "Mono", weight: 800 });
}, { box: [-150, -440, 300, 460], group: "Episode", label: "Door with a plate", tags: ["door", "choice"],
  call: 'L.put(S, "g4-door", x, floorY, { text: "PATCH", c: "lime", t })' });
})();
