// ===================== episode 06 (GitHub worm hooks) kit: ladder, file card, file tree, airport scanner, sandbox room, disc =====================
// Same palette as tools/sd-kit.js. Drawn with L.* primitives. No payload, no file contents: names and sizes only.
(function () {
const L = window.L, f1 = L.f1;
const C = { bg: "#15171c", panel: "#242831", paper: "#f4f1e8", paper2: "#e3dece", lime: "#b6f24a", pink: "#ff4d8d", cyan: "#4cc9f0", yellow: "#ffd23f", ink: "#1d1b1f", ink2: "#3a363d", gray: "#8b909a", white: "#ffffff" };
const col = (n) => C[n] || n;
const shadow = (d, dx = 9, dy = 12, op = 0.5) => L.g(L.flat(d, "#000000", op), `translate(${dx} ${dy})`);
const mono = (s, x, y, size, c, o = {}) => L.text(s, x, y, Object.assign({ size, c, font: "Mono", weight: 800 }, o));

// the escalation ladder (same as ep03's): n rungs, the first `lit` glow lime with labels; rung 1 = bottom
L.reg("sd", "w6-ladder", (o) => {
  const n = o.n || 4, h = o.h || 680, rw = 150, labels = o.labels || [], lit = o.lit || 0;
  let s = L.stroke(`M${-rw / 2} ${h / 2 + 30}V${-h / 2 - 30}M${rw / 2} ${h / 2 + 30}V${-h / 2 - 30}`, { c: "#5a606c", w: 14 });
  for (let i = 0; i < n; i++) {
    const y = h / 2 - (i + 0.5) * (h / n), on = i < lit;
    s += L.stroke(`M${-rw / 2} ${f1(y)}H${rw / 2}`, { c: on ? C.lime : "#3a404c", w: 16 });
    if (on && labels[i]) s += mono(labels[i], rw / 2 + 36, y + 14, o.size || 40, i === lit - 1 ? C.lime : C.gray, { anchor: "start" });
  }
  return s;
}, { box: [-90, -370, 900, 740], group: "Episode", label: "Escalation ladder", tags: ["ladder", "steps"],
  call: 'L.put(S, "w6-ladder", x, y, { n: 4, lit: 2, labels: [...], h: 680, size: 40, t })' });

// a file card: a page icon, the path, a size chip (pink when huge), optional label under (e.g. "EMPTY?")
L.reg("sd", "w6-file", (o) => {
  const w = o.w || 640, h = o.h || 300, x0 = -w / 2, y0 = -h / 2, sc = col(o.sc || "pink");
  let s = shadow(L.rrect(x0, y0, w, h, 24)) + L.shape(L.rrect(x0, y0, w, h, 24), C.panel, { flat: true, c: "#3a404c", w: 5 });
  const px = x0 + 50, py = y0 + 46; // page icon with a folded corner
  s += L.shape(`M${px} ${py}h80l40 40v120h-120Z`, C.paper, { flat: true }) + L.flat(`M${px + 80} ${py}v40h40Z`, C.paper2);
  for (let i = 0; i < 4; i++) s += L.stroke(L.line([px + 18, py + 66 + i * 22], [px + 102 - (i === 3 ? 34 : 0), py + 66 + i * 22]), { c: C.gray, w: 6 });
  s += mono(o.name || ".github/init.js", px + 160, y0 + 98, o.nsize || 44, C.white, { anchor: "start" });
  if (o.size) {
    const tw = String(o.size).length * 56 * 0.62 + 50;
    s += L.shape(L.rrect(px + 160, y0 + 140, tw, 84, 18), sc, { flat: true }) + mono(o.size, px + 160 + tw / 2, y0 + 197, 56, C.ink);
  }
  if (o.note) s += mono(o.note, px + 160 + (o.size ? String(o.size).length * 56 * 0.62 + 80 : 0), y0 + 197, 44, col(o.nc || "gray"), { anchor: "start" });
  return s;
}, { box: [-330, -160, 660, 320], group: "Episode", label: "File card (path + size)", tags: ["file", "size"],
  call: 'L.put(S, "w6-file", x, y, { name: ".github/init.js", size: "13.7 MB", sc: "pink", note: "EMPTY?", w: 640, h: 300, t })' });

// a file tree: rows [name, size, hot?]; hot rows tinted pink; origin = centre
L.reg("sd", "w6-tree", (o) => {
  const rows = o.rows || [], size = o.size || 40, rh = size * 1.6, w = o.w || 760, h = rows.length * rh + 110, x0 = -w / 2, y0 = -h / 2;
  let s = shadow(L.rrect(x0, y0, w, h, 22)) + L.shape(L.rrect(x0, y0, w, h, 22), C.panel, { flat: true, c: "#3a404c", w: 5 });
  s += mono(o.title || "cool-project/", x0 + 40, y0 + 62, size, C.cyan, { anchor: "start" });
  rows.forEach(([n, sz, hot], i) => {
    const y = y0 + 110 + i * rh + size * 0.9;
    if (hot) s += L.flat(L.rrect(x0 + 18, y - size * 1.05, w - 36, rh - 6, 12), C.pink, 0.22);
    s += L.stroke(`M${x0 + 52} ${f1(y - size * 1.2)}V${f1(y - size * 0.35)}H${x0 + 82}`, { c: C.gray, w: 4 });
    s += mono(n, x0 + 98, y, size, hot ? C.pink : C.white, { anchor: "start", weight: 700 });
    if (sz) s += mono(sz, x0 + w - 40, y, size, hot ? C.pink : C.gray, { anchor: "end", weight: 700 });
  });
  return s;
}, { box: [-390, -300, 780, 600], group: "Episode", label: "File tree with sizes", tags: ["tree", "files", "folder"],
  call: 'L.put(S, "w6-tree", x, y, { title: "cool-project/", rows: [[".claude/settings.json", "1 KB"], [".github/init.js", "13.7 MB", true]], size: 40, w: 760, t })' });

// airport X-ray: a belt + a scanner tunnel (width 520); bags are placed separately
L.reg("sd", "w6-xray", () => {
  let s = shadow(L.rrect(-560, 40, 1120, 50, 20)) + L.shape(L.rrect(-560, 40, 1120, 50, 20), "#3a404c", { flat: true });
  for (let x = -520; x <= 520; x += 80) s += L.flat(L.circ(x, 65, 12), C.gray);
  s += L.shape(L.rrect(-200, -230, 400, 270, 30), "#2f3540", { flat: true, c: C.cyan, w: 6 });
  s += L.flat(L.rrect(-150, -150, 300, 190, 16), "#0d0f13") + L.stroke(L.rrect(-150, -150, 300, 190, 16), { c: C.cyan, w: 4, op: 0.6 });
  s += mono("X-RAY", 0, -178, 40, C.cyan);
  return s;
}, { box: [-580, -250, 1160, 360], group: "Episode", label: "Airport X-ray belt", tags: ["airport", "scanner"],
  call: 'L.put(S, "w6-xray", x, y, { t })   // tunnel opening = x±150, y-150…40' });

// a small labelled room (sandbox, CI runner…): dark box, label on top, optional "zzz"
L.reg("sd", "w6-room", (o) => {
  const w = o.w || 360, h = o.h || 300, x0 = -w / 2, y0 = -h / 2, c = col(o.c || "cyan");
  let s = shadow(L.rrect(x0, y0, w, h, 20)) + L.shape(L.rrect(x0, y0, w, h, 20), C.panel, { flat: true, c, w: 6 });
  s += L.flat(L.rrect(x0, y0, w, 64, 20), c) + L.flat(L.rect(x0, y0 + 40, w, 24), c);
  s += mono(o.label || "SANDBOX", 0, y0 + 46, o.lsize || 34, C.ink);
  if (o.zzz) s += mono("z", 90, -10, 44, C.gray) + mono("z", 122, -44, 34, C.gray) + mono("z", 146, -72, 26, C.gray);
  return s;
}, { box: [-190, -160, 380, 320], group: "Episode", label: "Labelled room", tags: ["room", "sandbox", "box"],
  call: 'L.put(S, "w6-room", x, y, { label: "CI RUNNER", c: "cyan", zzz: true, w: 360, h: 300, t })' });

// a CD-ROM disc
L.reg("sd", "w6-disc", () => {
  let s = L.shape(L.circ(0, 0, 150), "#d9dde6", { flat: true, c: C.ink, w: 6 });
  s += `<path d="${L.circ(0, 0, 130)}" fill="none" stroke="${C.cyan}" stroke-opacity="0.45" stroke-width="22"/>`;
  s += `<path d="${L.circ(0, 0, 95)}" fill="none" stroke="${C.pink}" stroke-opacity="0.35" stroke-width="20"/>`;
  return s + L.shape(L.circ(0, 0, 42), C.bg, { flat: true, c: C.ink, w: 5 }) + L.flat(L.circ(0, 0, 18), "#8b909a");
}, { box: [-160, -160, 320, 320], group: "Episode", label: "CD disc", tags: ["cd", "disc"], call: 'L.put(S, "w6-disc", x, y, { s, t })' });
})();
