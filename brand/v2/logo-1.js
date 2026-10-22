// look: still
// @library auto
// @include ../../tools/sd-kit.js
// Logo 1 — Stacky, the mascot: three hand-inked slabs, grin on the top one, pencil behind its "ear", a few sparks. Content inside r = 380 of the 800x800 crop centred on (960, 540).
const S = scene(0, 1, { cam: "none" });
const K = L.sdInk;
L.reg("sd", "logo1-sparks", () => K.spark(-196, -300, 26, "#ffd23f", 8) + K.spark(-296, -208, 16, "#4cc9f0", 0) + K.spark(40, -326, 15, "#ff4d8d", 12), { box: [-380, -380, 760, 760] });
L.put(S, "sd-bg", 0, 0, { glow: "lime", gx: 960, gy: 560, gr: 480, vignette: false });
L.put(S, "sd-stacky", 946, 758, { s: 1.9, face: "grin", legs: false, arms: false, wide: 0.88, earLen: 130, earRot: -28, earX: 54 });
L.put(S, "logo1-sparks", 960, 540, {});
