// look: still
// @library auto
// @include ../../../tools/sd-kit.js
// @include ../assets/logos.js
// @include ../assets/ep-kit.js
// A (the claim): "ACCESS / DENIED?" — the robot intern half-way through an open window beside a locked STAFF ONLY door,
// cold light from the window. True: OpenAI's card says in 29.6 % of max-effort runs Terra completed the task another way.
const S = scene(0, 1, { cam: "none" });
L.put(S, "sd-bg", 0, 0, { glow: "cyan", gx: 1350, gy: 420, gr: 700 });
L.put(S, "t7-door", 1270, 1120, { sign: "STAFF ONLY", open: true, s: 1.25 });
L.put(S, "sd-bot", 1530, 760, { s: 1.15, rot: -14 });
L.reg("sdt", "a-words", () => {
  const word = (str, x, y, size, c, rot) => `<g transform="rotate(${rot} ${x} ${y})">
    <text x="${x + 12}" y="${y + 16}" font-family="'Mono'" font-weight="800" font-size="${size}" fill="#000" opacity="0.55">${str}</text>
    <text x="${x}" y="${y}" font-family="'Mono'" font-weight="800" font-size="${size}" fill="${c}" stroke="#0b0910" stroke-width="${size * 0.11}" paint-order="stroke" stroke-linejoin="round">${str}</text></g>`;
  return word("ACCESS", 60, 300, 190, "#ffffff", -3) + word("DENIED?", 60, 520, 190, "#ff4d8d", -3);
}, { box: [0, 0, 1920, 1080] });
L.put(S, "a-words", 0, 0, {});
L.put(S, "sd-chip", 240, 100, { text: "OPENAI", c: "white", size: 56, rot: -2 });
L.put(S, "p2-price-tag", 1780, 220, { s: 1.5, price: "$1" });
L.put(S, "sd-badge", 50, 990, { kind: "PATCH NOTES", s: 1.2 });
