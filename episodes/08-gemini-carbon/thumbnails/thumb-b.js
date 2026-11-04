// look: still
// @library auto
// @include ../../../tools/sd-kit.js
// @include ../assets/logos.js
// @include ../assets/ep-kit.js
// B (the object): a giant periodic tile "C 6 CARBON" bursting lime bonds, behind the velvet rope; words "DEFENDERS / ONLY"
// (true: Google gives Carbon first to a subset of cyber defenders via Fairwind). Gemini mark top-left (the story is about it).
const S = scene(0, 1, { cam: "none" });
L.reg("sdt", "b-bg", () => `<defs><radialGradient id="g1" cx="66%" cy="50%" r="55%"><stop offset="0" stop-color="#b6f24a" stop-opacity="0.45"/><stop offset="0.5" stop-color="#2d4a12" stop-opacity="0.4"/><stop offset="1" stop-color="#0d0f14" stop-opacity="0"/></radialGradient>
  <radialGradient id="gv" cx="50%" cy="50%" r="75%"><stop offset="0.6" stop-color="#000" stop-opacity="0"/><stop offset="1" stop-color="#000" stop-opacity="0.75"/></radialGradient></defs>
  <rect width="1920" height="1080" fill="#0d0f14"/><rect width="1920" height="1080" fill="url(#g1)"/>
  ${Array.from({ length: 33 }, (_, i) => `<path d="M${i * 60} 0V1080" stroke="#fff" stroke-opacity="0.035" stroke-width="2"/>`).join("")}
  ${Array.from({ length: 19 }, (_, i) => `<path d="M0 ${i * 60}H1920" stroke="#fff" stroke-opacity="0.035" stroke-width="2"/>`).join("")}
  <rect width="1920" height="1080" fill="url(#gv)"/>`, { box: [0, 0, 1920, 1080] });
L.reg("sdt", "b-words", () => {
  const word = (str, x, y, size, c, rot) => `<g transform="rotate(${rot} ${x} ${y})">
    <text x="${x + 12}" y="${y + 16}" font-family="'Mono'" font-weight="800" font-size="${size}" fill="#000" opacity="0.55">${str}</text>
    <text x="${x}" y="${y}" font-family="'Mono'" font-weight="800" font-size="${size}" fill="${c}" stroke="#0b0910" stroke-width="${size * 0.11}" paint-order="stroke" stroke-linejoin="round">${str}</text></g>`;
  return word("DEFENDERS", 60, 420, 150, "#ffffff", -3) + word("ONLY", 70, 610, 190, "#ff4d8d", -3);
}, { box: [0, 0, 1920, 1080] });
L.put(S, "b-bg", 0, 0, {});
L.put(S, "g4-elem", 1360, 500, { sym: "C", num: 6, name: "CARBON", c: "lime", bonds: true, s: 1.9, rot: 5 });
L.put(S, "g4-rope", 1360, 1060, { w: 1100 });
L.put(S, "logo-googlegemini", 150, 160, { s: 1.4, tile: true });
L.put(S, "b-words", 0, 0, {});
L.put(S, "sd-badge", 80, 1000, { kind: "PATCH NOTES", date: "NOV 4", s: 1.25 });
