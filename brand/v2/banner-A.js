// look: still
// @library auto
// @include ../../tools/sd-kit.js
// @include common.js
// Banner A — the sticker-bombed laptop lid. Frame 1920x1080 = 2560x1440. All-devices safe box (1920 space) x 380-1540, y 381-698; desktop strip = the full width of y 381-698.
// Our OWN dev-joke stickers (no brands). Centre: one big clean sticker, STACK DOODLE + tagline + Stacky, all text inside the safe box.
const S = scene(0, 1, { cam: "none" });
const sreg = (name, box, fn) => L.reg("sd", name, fn, { box });
const R = (x, y, w, h, r = 22, seed = 5) => K.wobRR(x, y, w, h, r, seed, 1.4);
const pad = 24;
// ---- stickers (each drawn around its centre; L.put gives position / s / rot) ----
sreg("bn-wom", [-220, -120, 440, 240], () => { const w = 340, h = 170, d = R(-w / 2, -h / 2, w, h, 24, 3);
  return stick(d, raw("WORKS ON", 0, -16, 42) + raw("MY MACHINE", 0, 34, 42) + K.inkS("M110 -62 l14 18 l30 -40", 9, BR.lime) .replace(/^/, "") + raw("¯\\_(o_o)_/¯", 0, 80, 28, { font: "PH", weight: 400 }), { c: BR.yellow }) + peel(w, h, 54); });
sreg("bn-bug", [-220, -120, 440, 250], () => { const w = 330, h = 190, d = R(-w / 2, -h / 2, w, h, 26, 8);
  return stick(d, raw("IT'S NOT", 0, -34, 52, { c: "#fff", stroke: BR.ink, sw: 9 }) + raw("A BUG", 0, 26, 78, { c: "#fff", stroke: BR.ink, sw: 11 }) + raw("it's a feature", 0, 72, 40, { font: "Caveat", weight: 700, c: BR.ink }), { c: BR.pink }); });
sreg("bn-lgtm", [-130, -130, 260, 260], () => { const d = wobCirc(0, 0, 92, 4, 2);
  return stick(d, K.inkS("M-52 -50 l26 28 l62 -66", 14, BR.ink) + raw("LGTM", 0, 44, 52) + `<path d="${wobCirc(0, 0, 78, 6, 1.5)}" fill="none" stroke="${BR.ink}" stroke-width="4" stroke-dasharray="3 9" stroke-linecap="round"/>`, { c: BR.lime, rim: 12 }); });
sreg("bn-404", [-170, -110, 340, 230], () => { const w = 240, h = 150, d = R(-w / 2, -h / 2, w, h, 20, 12);
  return stick(d, raw("404", 0, 22, 100) + raw("not found", -14, 58, 30, { font: "PH", weight: 400 }), { c: BR.cyan }) + peel(w, h, 46); });
sreg("bn-git", [-300, -100, 600, 200], () => { const w = 470, h = 150, d = R(-w / 2, -h / 2, w, h, 20, 15);
  return stick(d, [BR.pink, BR.yellow, BR.lime].map((c, i) => `<circle cx="${-w / 2 + 28 + i * 26}" cy="${-h / 2 + 24}" r="8" fill="${c}"/>`).join("") + raw("$ git push --force", 0, 12, 38, { c: BR.lime }) + raw("(please don't)", 0, 56, 40, { font: "PH", weight: 400, c: BR.pink }), { c: "#12141a", rimC: BR.cream }) + peel(w, h, 44); });
sreg("bn-dns", [-130, -130, 260, 260], () => { const d = wobCirc(0, 0, 96, 7, 2);
  return stick(d, `<path d="${wobCirc(0, 0, 80, 9, 1.5)}" fill="none" stroke="${BR.pink}" stroke-width="5"/>` + raw("IT'S", 0, -22, 34) + raw("ALWAYS", 0, 14, 34) + raw("DNS", 0, 58, 52, { c: BR.pink, stroke: BR.ink, sw: 5 }), { c: BR.cream, rim: 12 }); });
sreg("bn-key", [-120, -120, 240, 240], () => { const d = R(-70, -70, 140, 140, 24, 2), top = R(-56, -60, 112, 104, 18, 6);
  return stick(d, `<path d="${top}" fill="#fff" stroke="${BR.ink}" stroke-width="3"/>` + raw("ctrl", -22, -16, 28, { weight: 700 }) + raw("Z", 0, 36, 50) + K.inkS("M22 -34 q16 -14 24 6", 5, BR.pink), { c: BR.gray, rim: 12 }); });
sreg("bn-todo", [-210, -90, 420, 180], () => { const w = 330, h = 110, d = R(-w / 2, -h / 2, w, h, 16, 21);
  return stick(d, raw("// TODO:", -w / 2 + 24, -6, 40, { anchor: "start", c: BR.pink }) + raw("fix later", -w / 2 + 24, 40, 44, { anchor: "start", font: "Caveat", weight: 700, c: BR.ink }), { c: BR.cream }); });
sreg("bn-semi", [-110, -110, 220, 220], () => { const d = wobCirc(0, 0, 78, 3, 2);
  return stick(d, raw(";", 0, 58, 190, { c: BR.ink }), { c: BR.yellow, rim: 11 }); });
sreg("bn-chip", [-300, -90, 600, 180], (o) => rimF(L.inline("sd-chip", { text: o.text, c: o.c, size: o.size || 44 }), 7));
sreg("bn-cup", [-110, -140, 220, 260], () => { // coffee mug with steam + </>
  const body = K.crPath(K.jit([[-62, -60], [62, -60], [56, 40], [34, 78], [-34, 78], [-56, 40]], 1.5, 4), true), handle = K.crPath([[60, -34], [96, -30], [100, 10], [76, 34], [52, 28]], false);
  const c = K.inkS(handle, 22) + K.inkS(handle, 8, BR.cream) + K.fillP(body, BR.cream) + K.inkS(body, 7) + K.fillP(K.crPath([[-60, -34], [60, -34], [58, -6], [-58, -6]], true), BR.pink) + K.inkS("M-58 -34 H58 M-58 -6 H58", 4)
    + raw("&lt;/&gt;", 0, 46, 34) + K.inkS("M-24 -84 q-14 -22 0 -42 q14 -18 0 -38 M18 -80 q-14 -20 0 -36", 6, BR.cream);
  return rimF(c, 7); });
sreg("bn-duck", [-110, -110, 220, 220], () => { // rubber duck, the debugging buddy
  const body = K.crPath(K.jit([[-70, 10], [-50, -34], [20, -40], [58, -14], [78, 24], [30, 62], [-40, 62]], 1.5, 6), true), head = wobCirc(-34, -62, 34, 7, 1.5), beak = K.crPath([[-62, -64], [-92, -58], [-90, -46], [-62, -44]], true);
  const c = K.fillP(body, BR.yellow) + K.inkS(body, 7) + K.fillP(beak, "#ff9a3d") + K.inkS(beak, 5) + K.fillP(head, BR.yellow) + K.inkS(head, 7) + `<circle cx="-34" cy="-70" r="6" fill="${BR.ink}"/>` + K.inkS("M-14 8 q22 -26 50 -6", 6);
  return rimF(c, 7); });

// ---- the centre sticker ----
sreg("bn-main", [-640, -220, 1280, 440], () => { const w = 1220, h = 290, d = R(-w / 2, -h / 2, w, h, 50, 31);
  const LO = { c: BR.cream, sh: BR.lime, wt: 0.125, gap: 0.13, seed: 11 }, nm = letter("STACK DOODLE", 0, 0, 78, LO), nx = -170;
  let s = stick(d, "", { c: "#1b1e26", rim: 12 });
  s += `<path d="${d}" fill="none" stroke="rgba(255,255,255,0.07)" stroke-width="3" transform="scale(0.96 0.88)"/>`;
  s += L.g(letter("STACK DOODLE", nx, 4, 78, LO).svg, "");
  s += K.inkS(K.crPath(K.jit([[nx, 40], [nx + 220, 30], [nx + 470, 44], [nx + nm.w, 32]], 2, 3), false), 9, BR.pink);
  s += raw("tech news, doodled", nx + nm.w / 2, 112, 64, { font: "Caveat", weight: 700, c: BR.lime, anchor: "middle" });
  return s; });
L.reg("sd", "bn-lid", () => {
  const W = 1920, H = 1080, id = gid("lidg");
  let s = `<rect x="-20" y="-20" width="${W + 40}" height="${H + 40}" fill="${BR.lid}"/>`;
  s += `<linearGradient id="${id}" gradientUnits="userSpaceOnUse" x1="0" y1="0" x2="${W}" y2="${H}"><stop offset="0" stop-color="#fff" stop-opacity="0.07"/><stop offset="0.45" stop-color="#fff" stop-opacity="0"/><stop offset="1" stop-color="#000" stop-opacity="0.25"/></linearGradient><rect width="${W}" height="${H}" fill="url(#${id})"/>`;
  let ln = ""; for (let y = 14; y < H; y += 7) ln += `M0 ${y} H${W}`; s += `<path d="${ln}" stroke="#fff" stroke-opacity="0.018" stroke-width="2"/>`;
  s += `<rect x="22" y="22" width="${W - 44}" height="${H - 44}" rx="46" fill="none" stroke="#3c404c" stroke-width="5"/><rect x="34" y="34" width="${W - 68}" height="${H - 68}" rx="38" fill="none" stroke="#000" stroke-opacity="0.35" stroke-width="3"/>`;
  return s; }, { box: [0, 0, 1920, 1080] });
L.put(S, "bn-lid", 0, 0, {});
// top row (TV only) and bottom row (TV only), then the two side clusters (desktop strip), then the centre
L.put(S, "bn-git", 400, 150, { rot: -4 });
L.put(S, "bn-chip", 820, 120, { text: "CHEAT SHEET", c: "yellow", rot: 3, size: 46 });
L.put(S, "bn-dns", 1160, 150, { rot: -12 });
L.put(S, "bn-key", 1420, 130, { rot: 8 });
L.put(S, "bn-chip", 1700, 170, { text: "DOODLED", c: "cyan", rot: -5, size: 46 });
L.put(S, "bn-todo", 150, 318, { rot: -6, s: 0.85 });
L.put(S, "bn-semi", 1825, 765, { rot: 9, s: 0.9 });
L.put(S, "bn-chip", 330, 940, { text: "POSTMORTEM", c: "pink", rot: -4, size: 46 });
L.put(S, "bn-cup", 640, 920, { rot: -8 });
L.put(S, "sd-bug", 960, 1010, { s: 0.9, mood: "smug" });
L.put(S, "bn-duck", 1230, 930, { rot: 7 });
L.put(S, "bn-chip", 1560, 950, { text: "PATCH NOTES", c: "lime", rot: 4, size: 46 });
L.put(S, "bn-wom", 172, 520, { rot: -6, s: 0.95 });
L.put(S, "bn-bug", 150, 720, { rot: 5, s: 0.75 });
L.put(S, "bn-lgtm", 1790, 335, { rot: 10, s: 0.95 });
L.put(S, "bn-404", 1765, 545, { rot: -6, s: 0.95 });
L.put(S, "bn-main", 960, 540, { rot: -1.2 });
L.put(S, "sd-stacky", 556, 678, { s: 0.92, face: "grin", pose: "stand", look: [4, 1] });
