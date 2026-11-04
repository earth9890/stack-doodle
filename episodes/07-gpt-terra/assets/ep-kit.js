// ===================== episode 07 (GPT-6.1 Terra) kit: the locked door + window, the computer-use loop, the model lineup, the sandbox fence =====================
// Same palette as tools/sd-kit.js. Drawn with L.* primitives; no real logos, no real people.
(function () {
const L = window.L, f1 = L.f1;
const C = { bg: "#15171c", panel: "#242831", paper: "#f4f1e8", paper2: "#e3dece", lime: "#b6f24a", pink: "#ff4d8d", cyan: "#4cc9f0", yellow: "#ffd23f", ink: "#1d1b1f", ink2: "#3a363d", gray: "#8b909a", white: "#ffffff", wood: "#b7835a", wood2: "#8e6142", brick: "#b5523b" };
const col = (n) => C[n] || n;
const shadow = (d, dx = 9, dy = 12, op = 0.5) => L.g(L.flat(d, "#000000", op), `translate(${dx} ${dy})`);

// a wall with a locked door (sign on it) and a window beside it; origin = floor centre of the wall
// o.sign: text on the door sign, o.signC; o.open: window open (dark gap) | o.bricked: window bricked up
L.reg("sd", "t7-door", (o) => {
  const sign = o.sign || "STAFF ONLY", sc = col(o.signC || "pink");
  let s = shadow(L.rect(-470, -640, 940, 640), 10, 12, 0.35) + L.shape(L.rect(-470, -640, 940, 640), C.panel, { flat: true, c: "#3a404c", w: 6 });
  // door (left)
  s += L.shape(L.rect(-380, -520, 300, 520), C.wood, { flat: true, c: C.ink, w: 7 }) + L.shape(L.rect(-350, -490, 240, 200), C.wood2, { flat: true, c: C.ink, w: 4 })
    + L.shape(L.rect(-350, -260, 240, 220), C.wood2, { flat: true, c: C.ink, w: 4 }) + L.shape(L.circ(-115, -270, 16), C.yellow, { flat: true, c: C.ink, w: 4 });
  const sw = Math.max(220, L.sdTw(sign, 38, true) + 40);
  s += L.shape(L.rrect(-230 - sw / 2, -470, sw, 70, 10), C.paper, { flat: true, c: sc, w: 6 }) + L.text(sign, -230, -423, { size: 38, c: sc, font: "Mono", weight: 800 });
  // padlock on the door
  s += L.stroke(`M-150 -300 V-330 A22 22 0 0 1 -106 -330 V-300`, { c: C.ink, w: 9 }) + L.shape(L.rrect(-162, -305, 68, 56, 8), C.gray, { flat: true, c: C.ink, w: 5 });
  // window (right)
  const wx = 60, wy = -500, ww = 330, wh = 300;
  if (o.bricked) {
    s += L.shape(L.rect(wx, wy, ww, wh), C.brick, { flat: true, c: C.ink, w: 7 });
    let d = ""; for (let r = 0; r < 6; r++) { const y = wy + r * 50; d += `M${wx} ${y}H${wx + ww}`; for (let k = 0; k < 5; k++) { const x = wx + ((k * 80 + (r % 2) * 40) % ww); d += `M${x} ${y}V${y + 50}`; } }
    s += L.stroke(d, { c: "#7a3526", w: 4 });
  } else {
    s += L.shape(L.rect(wx, wy, ww, wh), o.open ? "#0b0c10" : "#2e4a5c", { flat: true, c: C.ink, w: 7 });
    if (!o.open) s += L.stroke(`M${wx + ww / 2} ${wy}V${wy + wh}M${wx} ${wy + wh / 2}H${wx + ww}`, { c: C.ink, w: 7 });
    else s += L.shape(L.poly([[wx, wy], [wx - 70, wy + 30], [wx - 70, wy + wh - 30], [wx, wy + wh]], true), "#2e4a5c", { flat: true, c: C.ink, w: 6 });
  }
  s += L.shape(L.rect(wx - 20, wy + wh, ww + 40, 26), C.paper2, { flat: true, c: C.ink, w: 5 });
  return s;
}, { box: [-480, -650, 960, 660], group: "Episode", label: "Locked door + window", tags: ["door", "window", "locked"],
  call: 'L.put(S, "t7-door", x, floorY, { sign: "STAFF ONLY", signC: "pink", open: false, bricked: false, t })' });

// the computer-use loop: 4 nodes on a circle with arrows; nodes < lit glow lime, the rest gray
L.reg("sd", "t7-loop", (o) => {
  const labels = o.labels || ["SCREENSHOT", "THINK", "CLICK / TYPE", "CHECK"], r = o.r || 300, lit = o.lit ?? 4, n = labels.length;
  let s = "";
  for (let i = 0; i < n; i++) { // arrows between nodes (arcs)
    const a0 = -Math.PI / 2 + (i / n) * 2 * Math.PI + 0.36, a1 = -Math.PI / 2 + ((i + 1) / n) * 2 * Math.PI - 0.36;
    const p0 = [r * Math.cos(a0), r * Math.sin(a0)], p1 = [r * Math.cos(a1), r * Math.sin(a1)];
    const c = i < lit - 1 || (lit >= n && i === n - 1) ? C.lime : "#4a505c";
    s += L.stroke(`M${f1(p0[0])} ${f1(p0[1])} A${r} ${r} 0 0 1 ${f1(p1[0])} ${f1(p1[1])}`, { c, w: 10 });
    const ah = a1 + Math.PI / 2, hx = p1[0], hy = p1[1];
    s += L.stroke(`M${f1(hx - 26 * Math.cos(ah - 0.5))} ${f1(hy - 26 * Math.sin(ah - 0.5))} L${f1(hx)} ${f1(hy)} L${f1(hx - 26 * Math.cos(ah + 0.5))} ${f1(hy - 26 * Math.sin(ah + 0.5))}`, { c, w: 10 });
  }
  labels.forEach((lab, i) => {
    const a = -Math.PI / 2 + (i / n) * 2 * Math.PI, x = r * Math.cos(a), y = r * Math.sin(a), on = i < lit;
    const w = Math.max(200, L.sdTw(lab, 36, true) + 50);
    s += shadow(L.rrect(x - w / 2, y - 42, w, 84, 18), 6, 8, 0.45) + L.shape(L.rrect(x - w / 2, y - 42, w, 84, 18), on ? C.lime : C.panel, { flat: true, c: on ? C.ink : "#4a505c", w: 5 });
    s += L.text(lab, x, y + 13, { size: 36, c: on ? C.ink : C.gray, font: "Mono", weight: 800 });
  });
  return s;
}, { box: [-460, -360, 920, 720], group: "Episode", label: "Computer-use loop", tags: ["loop", "agent", "cycle"],
  call: 'L.put(S, "t7-loop", x, y, { labels, r: 300, lit: 4, t })' });

// the model lineup as planets: name + size; hl = index ringed lime
L.reg("sd", "t7-planets", (o) => {
  const P = o.items || [["LUNA", 60, "#c9ccd6"], ["TERRA", 90, "#4cc9f0"], ["SOL", 120, "#ffd23f"], ["ASTRA", 150, "#ff4d8d"]], hl = o.hl ?? 1;
  let s = "", x = -700;
  P.forEach(([name, r, c], i) => {
    x += r + 40;
    if (i === hl) s += L.stroke(L.circ(x, 0, r + 26), { c: C.lime, w: 10 });
    s += shadow(L.circ(x, 0, r), 8, 10, 0.4) + L.shape(L.circ(x, 0, r), c, { flat: true, c: C.ink, w: 6 })
      + L.flat(L.circ(x - r * 0.35, -r * 0.35, r * 0.22), "#ffffff", 0.35);
    s += L.text(name, x, 200, { size: 48, c: i === hl ? C.lime : C.white, font: "Mono", weight: 800 });
    x += r + 40;
  });
  return s;
}, { box: [-720, -200, 1440, 440], group: "Episode", label: "Model lineup planets", tags: ["planets", "lineup"],
  call: 'L.put(S, "t7-planets", x, y, { items: [[name, r, color]], hl: 1, t })' });

// a fenced sandbox pen (picket fence drawn as a rectangle in perspective) with a label sign; origin = centre
L.reg("sd", "t7-pen", (o) => {
  const w = o.w || 900, h = o.h || 520, x0 = -w / 2, y0 = -h / 2;
  let s = L.shape(L.rrect(x0, y0, w, h, 20), "#1c2a1c", { flat: true }) + L.stroke(L.rrect(x0, y0, w, h, 20), { c: C.lime, w: 10, op: 0.9 });
  let d = ""; for (let x = x0 + 30; x < x0 + w; x += 60) d += `M${x} ${y0 - 34}V${y0 + 14}M${x} ${y0 + h - 14}V${y0 + h + 34}`;
  for (let y = y0 + 40; y < y0 + h; y += 60) d += `M${x0 - 34} ${y}H${x0 + 14}M${x0 + w - 14} ${y}H${x0 + w + 34}`;
  s += L.stroke(d, { c: C.lime, w: 12 });
  const lab = o.label || "SANDBOX", lw = L.sdTw(lab, 40, true) + 50;
  s += L.shape(L.rrect(-lw / 2, y0 - 70, lw, 70, 12), C.lime, { flat: true, c: C.ink, w: 5 }) + L.text(lab, 0, y0 - 22, { size: 40, c: C.ink, font: "Mono", weight: 800 });
  return s;
}, { box: [-500, -330, 1000, 650], group: "Episode", label: "Sandbox pen", tags: ["sandbox", "fence"],
  call: 'L.put(S, "t7-pen", x, y, { w: 900, h: 520, label: "SANDBOX", t })' });
L.t7Form = `<rect x="40" y="40" width="560" height="60" rx="10" fill="#eef0f4" stroke="#9aa0ab" stroke-width="3"/><text x="60" y="82" font-family="Mono" font-size="30" fill="#3a363d">Invoice no. 4471</text>`
    + `<rect x="40" y="130" width="560" height="60" rx="10" fill="#eef0f4" stroke="#9aa0ab" stroke-width="3"/><text x="60" y="172" font-family="Mono" font-size="30" fill="#3a363d">Amount: $1,280.00</text>`
    + `<rect x="40" y="220" width="220" height="64" rx="12" fill="#4cc9f0"/><text x="150" y="263" font-family="Mono" font-size="30" font-weight="700" text-anchor="middle" fill="#1d1b1f">SUBMIT</text>`;
})();
