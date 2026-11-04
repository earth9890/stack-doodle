// look: still
// @library auto
// @include ../../../tools/sd-kit.js
// @include ../assets/logos.js
// @include ../assets/ep-kit.js
// A (the claim): the AI wall switch flipped OFF, its cable has yanked the search box out of the frame. "AI OFF = / NO SEARCH".
const S = scene(0, 1, { cam: "none" });
L.put(S, "sd-bg", 0, 0, { glow: "pink", gx: 1300, gy: 420, gr: 800 });
const word = (str, x, y, size, c, rot) => S.text(str, x, y, { size, c, font: "mono", anchor: "start", halo: "#0b0910", haloW: 0.12, t: 0, dur: 0.1, rot });
L.put(S, "g5-switch", 330, 560, { on: false, label: "AI", cable: 760, s: 1.55 });
const box = S.grp(); L.put(S, "g5-search", 0, 0, { q: "", w: 760, parent: box, s: 1.2 });
tl.set(box, { x: 1450, y: 870, rotation: 18 }, 0);
L.put(S, "logo-google", 120, 120, { tile: true, s: 1.1 });
word("AI OFF =", 700, 300, 170, "#ffffff");
word("NO SEARCH", 700, 520, 190, "#ff4d8d");
L.put(S, "sd-dev", 1700, 1180, { s: 1.9, face: "shocked" });
L.put(S, "sd-badge", 40, 1010, { kind: "PATCH NOTES", s: 1.2 });
