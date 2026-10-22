// look: still
// @library auto
// @include ../sd-kit.js
// @include logos.js
const S = scene(0, 1, { cam: "none" });
L.put(S, "sd-bg", 0, 0, { glow: "cyan", gx: 1000, gy: 480 });
L.put(S, "dev-code", 960, 480, { s: 1.7, file: "db.js", lang: "js", code: "import { sql } from \"bun\";\n\nconst users = await sql`\n  SELECT * FROM users\n  WHERE age > ${min}\n`;", hl: [3], size: 26 });
L.put(S, "sd-hand", 1330, 478, { s: 0.8, flip: true });
L.put(S, "sd-chip", 1650, 190, { text: "TAGGED|TEMPLATE", c: "cyan", rot: 3, size: 56 });
L.put(S, "sd-arrow", 1600, 270, { to: [-60, 190], bend: -0.4, c: "cyan" });
L.put(S, "sd-dev", 220, 940, { s: 1.0, face: "thinking" });
L.put(S, "sd-counter", 1500, 880, { n: 7, of: 40 });
