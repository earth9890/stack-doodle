// look: still
// @library auto
// @include ../sd-kit.js
// @include logos.js
const S = scene(0, 1, { cam: "none" });
L.put(S, "sd-bg", 0, 0, {});
L.put(S, "logo-bun", 200, 190, { tile: true, label: true, s: 1.5, labelC: "white" });
L.put(S, "sd-source", 1000, 540, { site: "bun.sh/blog/bun-v1.3", head: "Bun 1.3 ships a built-in Postgres client", body: ["Bun.sql now speaks Postgres natively, with no extra driver to install.", "Queries run through a single connection pool.", "MySQL is next on the list."], hl: 0, date: "OCT 22, 2026", w: 960, size: 38 });
L.put(S, "sd-chip", 1560, 250, { text: "NO DRIVER", c: "cyan", rot: 4, size: 52 });
L.put(S, "sd-hand", 555, 560, { s: 0.9, rot: 25 });
L.put(S, "sd-badge", 80, 880, { kind: "PATCH NOTES", date: "OCT 22" });
