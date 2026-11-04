// look: still
// @library auto
// @include ../../../tools/sd-kit.js
// @include ../assets/logos.js
// @include ../assets/ep-kit.js
// A (the claim): "TOO BIG / TO SEE". A tiny GitHub search box reading "0 results"; a giant file card "init.js 13.7 MB" bursting
// up out of it with a pink glow; Dev shocked on the right third; GitHub logo top-left; PATCH NOTES badge bottom-left.
// True: GitHub code search skipped the 13 MB payload files (JFrog; GitHub docs: files over 350 KiB are not indexed).
const S = scene(0, 1, { cam: "none" });
L.reg("sdt", "a-bg", () => `<defs><radialGradient id="ag" cx="44%" cy="52%" r="55%"><stop offset="0" stop-color="#ff4d8d" stop-opacity="0.55"/><stop offset="0.5" stop-color="#5a1430" stop-opacity="0.35"/><stop offset="1" stop-color="#15171c" stop-opacity="0"/></radialGradient>
  <radialGradient id="av" cx="50%" cy="50%" r="75%"><stop offset="0.6" stop-color="#000" stop-opacity="0"/><stop offset="1" stop-color="#000" stop-opacity="0.7"/></radialGradient></defs>
  <rect width="1920" height="1080" fill="#15171c"/>
  ${Array.from({ length: 33 }, (_, i) => `<path d="M${i * 60} 0V1080" stroke="#fff" stroke-opacity="0.04" stroke-width="2"/>`).join("")}
  ${Array.from({ length: 19 }, (_, i) => `<path d="M0 ${i * 60}H1920" stroke="#fff" stroke-opacity="0.04" stroke-width="2"/>`).join("")}
  <rect width="1920" height="1080" fill="url(#ag)"/><rect width="1920" height="1080" fill="url(#av)"/>`, { box: [0, 0, 1920, 1080] });
L.reg("sdt", "a-words", () => {
  const word = (str, x, y, size, c) => `<g transform="rotate(-3 ${x} ${y})"><text x="${x + 12}" y="${y + 16}" font-family="'Mono'" font-weight="800" font-size="${size}" fill="#000" opacity="0.55">${str}</text>
    <text x="${x}" y="${y}" font-family="'Mono'" font-weight="800" font-size="${size}" fill="${c}" stroke="#0b0910" stroke-width="${size * 0.11}" paint-order="stroke" stroke-linejoin="round">${str}</text></g>`;
  return word("TOO BIG", 60, 230, 210, "#ffffff") + word("TO SEE", 70, 430, 190, "#ff4d8d");
}, { box: [0, 0, 1920, 1080] });
L.put(S, "a-bg", 0, 0, {});
L.put(S, "w6-file", 880, 660, { name: "init.js", size: "13.7 MB", w: 900, h: 380, nsize: 84, rot: -6, s: 1.15 });
L.put(S, "dev-prompt-box", 820, 960, { s: 1.0, text: "search: 0 results", w: 620 });
L.put(S, "logo-github", 1500, 140, { s: 1.3, tile: true });
L.put(S, "sd-dev", 1700, 1720, { s: 4.0, face: "shocked", pose: "armsUp", hoodie: "#4cc9f0" });
L.put(S, "sd-badge", 60, 1010, { kind: "PATCH NOTES", s: 1.1 });
