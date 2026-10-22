// look: still
// @library auto
// @include ../sd-kit.js
// @include logos.js
const S = scene(0, 1, { cam: "none" });
L.put(S, "sd-bg", 0, 0, { glow: "lime", gx: 1350, gy: 560, gr: 760 });
L.put(S, "sd-dev", 1380, 960, { s: 2.3, face: "wow" });
L.put(S, "sd-chip", 640, 330, { text: "BUN JUST|SHIPPED WHAT?", c: "lime", size: 92, rot: -2 });
L.put(S, "sd-bubble", 1020, 640, { text: "WAIT, WHAT?", size: 52, tx: 360, ty: 90 });
L.put(S, "sd-chip", 430, 620, { text: "NEW", c: "pink", size: 54, rot: 5 });
L.put(S, "sd-badge", 80, 880, { kind: "PATCH NOTES", date: "OCT 22" });
L.put(S, "sd-counter", 640, 880, { n: 7, of: 40 });
