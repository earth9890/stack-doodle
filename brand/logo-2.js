// look: still
// @library auto
// @include ../tools/sd-kit.js
// Logo 2 — the idea: a pencil as the slash of </> (doodle + code). Content inside r = 380 of the 800x800 crop centred on (960, 540).
const S = scene(0, 1, { cam: "none" });
L.reg("sd", "logo2-brackets", () => ["<", ">"].map((ch, i) => L.text(ch, (i ? 1 : -1) * 215, 120, { size: 400, c: "#b6f24a", font: "Mono", weight: 800, halo: "#000000", haloW: 0.06 })).join(""));
L.put(S, "sd-bg", 0, 0, { glow: "cyan", gx: 960, gy: 540, gr: 520, vignette: false });
L.put(S, "logo2-brackets", 960, 540, {});
L.put(S, "sd-pencil", 905, 705, { s: 0.78, rot: -66, len: 380 });
