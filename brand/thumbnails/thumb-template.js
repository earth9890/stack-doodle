// look: still
// @library auto
// @include ../../tools/sd-kit.js
// Stack Doodle thumbnail template (1280x720, package.md formula): graphite grid, 2-line claim (white + accent), big dev face on the right
// cropped by the edge, product logo top-left (only when the video is about that product; else the channel mark), series badge bottom-left.
// Copy to an episode's thumbnails/thumb-a.js and change the CONFIG block; add `// @include assets/logos.js` AFTER the library line for a logo.
// A = the claim (this file). B = the object: bigger logo/doodle as the hero, claim in 1-2 words.
const CONFIG = {
  line1: "ONE LINE", line2: "BROKE PROD", accent: "lime",      // line 2 colour: lime (new/wow) | pink (dead/broken/hype)
  logo: null,                                                   // e.g. "logo-bun" (logos.py); null = the channel mark
  face: "shocked", pose: "stand", hoodie: "#4cc9f0",
  badge: { kind: "POSTMORTEM", date: "OCT 22" },
  glow: "pink",
};
const S = scene(0, 1, { cam: "none" });
const acc = { lime: "#b6f24a", pink: "#ff4d8d" }[CONFIG.accent] || CONFIG.accent;
L.reg("sd", "claim", () => {
  const size = 205, x0 = -60;
  const line = (str, y, c) => L.text(str, x0 + 9, y + 11, { size, c: "#000000", font: "Mono", weight: 800, anchor: "start", halo: "#000000", haloW: 0.2, op: 0.5 })
    + L.text(str, x0, y, { size, c, font: "Mono", weight: 800, anchor: "start", halo: "#000000", haloW: 0.17 });
  return line(CONFIG.line1, 0, "#ffffff") + line(CONFIG.line2, 215, acc);
});
L.put(S, "sd-bg", 0, 0, { glow: CONFIG.glow, gx: 1500, gy: 520, gr: 760 });
L.put(S, "claim", 110, 430, {});
L.put(S, "sd-dev", 1690, 1900, { s: 4.7, face: CONFIG.face, pose: CONFIG.pose, hoodie: CONFIG.hoodie });
if (CONFIG.logo) L.put(S, CONFIG.logo, 170, 130, { tile: true, s: 1.5 });
else L.put(S, "sd-mark", 150, 130, { s: 0.8, rim: 3 });
L.put(S, "sd-badge", 70, 950, { kind: CONFIG.badge.kind, date: CONFIG.badge.date, s: 1.5 });
