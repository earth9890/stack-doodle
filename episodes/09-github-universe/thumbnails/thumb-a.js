// look: still
// @library auto
// @include ../../../tools/sd-kit.js
// @include ../assets/logos.js
// @include ../assets/ep-kit.js
// A (the claim): a huge PR approvals panel, "2 of 2" with a giant lime tick from Copilot; "THE BOT / APPROVED";
// Dev shocked on the right third. True: Copilot approvals are GA and count toward required approvals (when turned on).
const S = scene(0, 1, { cam: "none" });
L.put(S, "sd-bg", 0, 0, { glow: "lime", gx: 820, gy: 600, gr: 900 });
L.reg("sdt", "a-words", () => {
  const word = (str, x, y, size, c, rot) => `<g transform="rotate(${rot} ${x} ${y})">
    <text x="${x + 12}" y="${y + 16}" font-family="'Mono'" font-weight="800" font-size="${size}" fill="#000" opacity="0.55">${str}</text>
    <text x="${x}" y="${y}" font-family="'Mono'" font-weight="800" font-size="${size}" fill="${c}" stroke="#0b0910" stroke-width="${size * 0.11}" paint-order="stroke" stroke-linejoin="round">${str}</text></g>`;
  return word("THE BOT", 70, 215, 190, "#ffffff", -3) + word("APPROVED", 60, 400, 170, "#b6f24a", -3);
}, { box: [0, 0, 1920, 1080] });
L.put(S, "u9-pr", 700, 760, { s: 1.15, title: "Add login rate limit", num: "#482", n: 2, bot: true });
L.reg("sdt", "a-tick", () => `<circle r="170" fill="#000" opacity="0.5" transform="translate(14 18)"/><circle r="170" fill="#b6f24a" stroke="#0b0910" stroke-width="14"/>
  <path d="M-80 0 L-20 64 L92 -70" stroke="#0b0910" stroke-width="44" fill="none" stroke-linecap="round" stroke-linejoin="round"/>`, { box: [-200, -200, 400, 400] });
L.put(S, "a-tick", 1180, 560, {});
L.put(S, "logo-githubcopilot", 1180, 300, { s: 1.3, tile: true, rot: 6 });
L.put(S, "a-words", 0, 0, {});
L.put(S, "sd-dev", 1690, 1720, { s: 4.0, face: "shocked", pose: "armsUp", hoodie: "#4cc9f0" });
L.put(S, "sd-badge", 80, 1000, { kind: "PATCH NOTES", date: "NOV 4", s: 1.25 });
