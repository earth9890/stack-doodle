// look: still
// @library auto
// @include ../tools/sd-kit.js
// Banner 1 — centred lockup. Frame 1920x1080 = 2560x1440. All-devices safe box (2560 space) x 507-2053, y 508-931 = (1920 space) x 380-1540, y 381-698.
// Title + tagline sit inside the box; the cast and series chips only decorate the TV/desktop-only area around it.
const S = scene(0, 1, { cam: "none" });
L.reg("sd", "banner1-lockup", () => {
  const T = "STACK DOODLE", size = 104, w = L.sdTw(T, size, true), gap = 44, mk = 230, total = mk + gap + w, x0 = -total / 2;
  let s = L.g(L.inline("sd-mark", { rim: 2 }), `translate(${x0 + mk / 2} -8) scale(1.1)`);
  const tx = x0 + mk + gap;
  s += L.text(T, tx + 6, 28 + 8, { size, c: "#b6f24a", font: "Mono", weight: 800, anchor: "start", halo: "#15171c", haloW: 0.14 });
  s += L.text(T, tx, 28, { size, c: "#ffffff", font: "Mono", weight: 800, anchor: "start", halo: "#15171c", haloW: 0.08 });
  s += L.text("tech news, doodled", tx + 4, 112, { size: 64, c: "#b6f24a", anchor: "start", halo: "#15171c", haloW: 0.12 });
  s += L.stroke(L.smooth([[tx, 140], [tx + 140, 130], [tx + 300, 146], [tx + 520, 134]]), { c: "#ff4d8d", w: 8 });
  return s;
});
L.put(S, "sd-bg", 0, 0, { glow: "lime", gx: 960, gy: 540, gr: 760 });
L.put(S, "banner1-lockup", 960, 520, {});
L.put(S, "sd-dev", 190, 1090, { s: 1.9, face: "smile" });
L.put(S, "sd-suit", 1780, 1090, { s: 1.9, face: "smug", flip: true });
L.put(S, "sd-bug", 1640, 1090, { s: 1.0, mood: "smug" });
L.put(S, "sd-chip", 330, 170, { text: "PATCH NOTES", c: "lime", rot: -4, size: 44 });
L.put(S, "sd-chip", 960, 120, { text: "tech news".toUpperCase(), c: "white", rot: 2, size: 44 });
L.put(S, "sd-chip", 1600, 175, { text: "POSTMORTEM", c: "pink", rot: 3, size: 44 });
L.put(S, "sd-chip", 650, 900, { text: "CHEAT SHEET", c: "yellow", rot: 3, size: 44 });
L.put(S, "sd-chip", 1130, 940, { text: "DOODLED", c: "cyan", rot: -3, size: 44 });
L.put(S, "sd-arrow", 760, 820, { to: [-120, -60], bend: 0.35, c: "white", w: 8 });
