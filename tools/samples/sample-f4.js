// look: still
// @library auto
// @include ../sd-kit.js
// @include logos.js
const S = scene(0, 1, { cam: "none" });
L.put(S, "sd-bg", 0, 0, {});
L.put(S, "dev-benchmark-bars", 480, 410, { s: 1.15, items: [["Old tool", 40], ["New tool", 90]], title: "Requests / sec", hl: 1 });
L.put(S, "dev-benchmark-bars", 1440, 410, { s: 1.15, items: [["Old tool", 62], ["New tool", 71]], title: "Requests / sec", hl: 1 });
L.put(S, "sd-chip", 480, 130, { text: "VENDOR NUMBERS", c: "pink", rot: -3, size: 54 });
L.put(S, "sd-chip", 1440, 130, { text: "WE RAN IT", c: "lime", rot: 2, size: 54 });
L.put(S, "sd-suit", 480, 940, { s: 0.95, face: "smug" });
L.put(S, "sd-dev", 1440, 940, { s: 0.95, face: "smug" });
