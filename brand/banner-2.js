// look: still
// @library auto
// @include ../tools/sd-kit.js
// Banner 2 — left-aligned lockup, the dev peeking from the corner. Safe box (1920 space): x 380-1540, y 381-698 (= 2560 space x 507-2053, y 508-931).
const S = scene(0, 1, { cam: "none" });
L.reg("sd", "banner2-lockup", () => {
  const T = "STACK DOODLE", size = 118, tag = "tech news, doodled", ts = 70, tw = L.sdTw(tag, ts), x0 = -520;
  let s = L.text(T, x0 + 6, 8, { size, c: "#4cc9f0", font: "Mono", weight: 800, anchor: "start", halo: "#15171c", haloW: 0.14 });
  s += L.text(T, x0, 0, { size, c: "#ffffff", font: "Mono", weight: 800, anchor: "start", halo: "#15171c", haloW: 0.08 });
  s += L.g(L.flat(L.rrect(x0 - 16, 38, tw + 36, ts * 1.4, 14), "#b6f24a"), "rotate(-0.8 " + x0 + " 100)");
  s += L.text(tag, x0 + 2, 38 + ts * 1.02, { size: ts, c: "#1d1b1f", anchor: "start" });
  return s;
});
L.put(S, "sd-bg", 0, 0, { glow: "cyan", gx: 1500, gy: 760, gr: 800 });
L.put(S, "banner2-lockup", 990, 525, {});
L.put(S, "sd-mark", 1425, 545, { s: 0.88, rim: 2 });
L.put(S, "sd-dev", 1790, 1560, { s: 2.6, face: "wow" });
L.put(S, "dev-code", 335, 895, { s: 0.8, file: "news.js", lang: "js", code: "const news = await get();\n\ndoodle(news);", hl: [3], size: 26 });
L.put(S, "sd-chip", 330, 190, { text: "BREAKING", c: "pink", rot: -4, size: 50 });
L.put(S, "sd-chip", 1560, 170, { text: "LAB", c: "white", rot: 4, size: 44 });
L.put(S, "sd-bubble", 1400, 880, { text: "WAIT, WHAT?", size: 46, tx: 330, ty: 60 });
