// look: still
// @library auto
// @include ../tools/sd-kit.js
// Logo 1 — the stack: three doodled layers (cyan, pink, lime) on the graphite grid. Content inside r = 380 of the 800x800 crop centred on (960, 540).
const S = scene(0, 1, { cam: "none" });
L.put(S, "sd-bg", 0, 0, { glow: "lime", gx: 960, gy: 540, gr: 520, vignette: false });
L.put(S, "sd-mark", 960, 540 - 23 * 2.7, { s: 2.7, rim: 2.2 });
