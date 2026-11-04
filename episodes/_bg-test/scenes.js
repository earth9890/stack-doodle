// look: still
// motion: v2
// captions: off
// @library auto
// @include ../../tools/sd-kit.js
// Background test: one scene per ground, 12 s each, a chip + code-ish card on top to judge readability.
const KINDS = [["grid", "lime"], ["drift", "lime"], ["glyphs", "cyan"], ["circuit", "cyan"], ["dots", "lime"], ["scan", "lime"], ["blob", "pink"], ["network", "yellow"]];
KINDS.forEach(([k, c], i) => {
  const S = scene(i * 12, (i + 1) * 12, { cam: "push" });
  L.sdBg(S, k, { c, seed: 3 + i });
  L.put(S, "sd-chip", 960, 200, { text: k.toUpperCase(), c, size: 90, rot: 0 });
  L.put(S, "sd-source", 960, 620, { site: "binance.com", head: "Readability check", body: ["Code and text must stay readable", "over every animated ground."], hl: 0, w: 900 });
});
