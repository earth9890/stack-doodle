// look: still
// @library auto
// @include ../../../tools/sd-kit.js
// @include ../assets/logos.js
// @include ../assets/ep-kit.js
// A (the claim): "YOU CAN'T / HAVE IT". A glowing locked gift box with the Gemini mark, chained and padlocked, behind a red velvet
// rope; Dev's shocked face crops in from the right. True: Google gives Carbon only to vetted defenders, with no public date.
const S = scene(0, 1, { cam: "none" });
L.reg("sdt", "a-bg", () => `<defs><radialGradient id="g1" cx="52%" cy="55%" r="55%"><stop offset="0" stop-color="#4cc9f0" stop-opacity="0.55"/><stop offset="0.45" stop-color="#1b3a66" stop-opacity="0.45"/><stop offset="1" stop-color="#0d0f14" stop-opacity="0"/></radialGradient>
  <radialGradient id="gv" cx="50%" cy="50%" r="75%"><stop offset="0.6" stop-color="#000" stop-opacity="0"/><stop offset="1" stop-color="#000" stop-opacity="0.75"/></radialGradient></defs>
  <rect width="1920" height="1080" fill="#0d0f14"/><rect width="1920" height="1080" fill="url(#g1)"/>
  ${Array.from({ length: 33 }, (_, i) => `<path d="M${i * 60} 0V1080" stroke="#fff" stroke-opacity="0.035" stroke-width="2"/>`).join("")}
  ${Array.from({ length: 19 }, (_, i) => `<path d="M0 ${i * 60}H1920" stroke="#fff" stroke-opacity="0.035" stroke-width="2"/>`).join("")}
  <rect width="1920" height="1080" fill="url(#gv)"/>`, { box: [0, 0, 1920, 1080] });
L.reg("sdt", "a-words", () => {
  const word = (str, x, y, size, c, rot) => `<g transform="rotate(${rot} ${x} ${y})">
    <text x="${x + 12}" y="${y + 16}" font-family="'Mono'" font-weight="800" font-size="${size}" fill="#000" opacity="0.55">${str}</text>
    <text x="${x}" y="${y}" font-family="'Mono'" font-weight="800" font-size="${size}" fill="${c}" stroke="#0b0910" stroke-width="${size * 0.11}" paint-order="stroke" stroke-linejoin="round">${str}</text></g>`;
  return word("YOU CAN'T", 60, 230, 190, "#ffffff", -3) + word("HAVE IT", 70, 430, 190, "#ff4d8d", -3);
}, { box: [0, 0, 1920, 1080] });
L.put(S, "a-bg", 0, 0, {});
L.put(S, "prop-gift", 900, 640, { s: 3.4 });
L.put(S, "logo-googlegemini", 900, 700, { s: 1.5, tile: true });
L.put(S, "prop-padlock", 1110, 860, { s: 1.8 });
L.put(S, "g4-rope", 900, 1080, { w: 1100 });
L.put(S, "a-words", 0, 0, {});
L.put(S, "sd-dev", 1700, 1760, { s: 4.3, face: "shocked", pose: "armsUp", hoodie: "#4cc9f0" });
L.put(S, "sd-badge", 80, 1000, { kind: "PATCH NOTES", date: "NOV 4", s: 1.25 });
