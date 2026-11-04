// look: still
// captions: off
// @library auto
// @include ../../tools/sd-kit.js
const S = scene(0, 1, { cam: "none" });
L.sdBg(S, "grid", {});
L.put(S, "dev-benchmark-bars", 500, 300, { s: 1.35, title: "TERMINAL-BENCH 4.0", items: [["5.6 TERRA", 21.5], ["6.1 TERRA", 50.3]], hl: 1, max: 100 });
L.put(S, "dev-benchmark-bars", 1420, 300, { s: 1.35, title: "TERMINAL-BENCH 4.0", items: [["OLD", 21.5], ["NEW", 50.3]], hl: 1, max: 60 });
L.put(S, "dev-benchmark-bars", 500, 800, { s: 1.35, title: "INTELLIGENCE INDEX (AA)", items: [["6.1 SOL", 52], ["6.1 TERRA", 48], ["5.6 TERRA", 42]], hl: 1, max: 60 });
