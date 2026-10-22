// look: still
// @library auto
// @include ../tools/sd-kit.js
// Logo 3 — SD on a stack of three cards. Content inside r = 380 of the 800x800 crop centred on (960, 540).
const S = scene(0, 1, { cam: "none" });
L.reg("sd", "logo3-art", () => {
  const card = (x, y, c) => L.g(L.shape(L.rrect(-170, -140, 340, 280, 50), c, { flat: true, w: "char" }), `translate(${x} ${y}) rotate(${x * 0.05})`);
  return card(-95, 92, "#4cc9f0") + card(-50, 44, "#ff4d8d") + card(0, 0, "#b6f24a")
    + L.text("SD", 0, 56, { size: 190, c: "#1d1b1f", font: "Mono", weight: 800 });
});
L.put(S, "sd-bg", 0, 0, { glow: "pink", gx: 960, gy: 540, gr: 520, vignette: false });
L.put(S, "logo3-art", 990, 490, { s: 1.15 });
