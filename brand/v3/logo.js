// look: still
// @library auto
// @include common3.js
// v3 avatar: flat Stacky on graphite. Content inside r = 380 of the 800x800 crop centred on (960, 540).
const S = scene(0, 1, { cam: "none" });
L.reg("sd3", "logo3", () => `<rect x="0" y="0" width="1920" height="1080" fill="${C3.bg}"/>` + `<g transform="translate(960 560)">${stacky(1.12)}</g>`, { box: [0, 0, 1920, 1080] });
L.put(S, "logo3", 0, 0, {});
