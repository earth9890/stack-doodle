// look: still
// @library auto
// @include ../../../tools/sd-kit.js
// @include ../assets/logos.js
// @include ../assets/ep-kit.js
// B (object hero): a laptop on a video call, the interviewer tile stamped FAKE; crypto coins (XRP, SOL, BTC, ETH) pour out of
// the screen toward the viewer. Words: "$6.3B / JOB OFFER" (true: the theft began with a fake recruiter; the second interview was with a fake CEO).
// Critique 3: "FAKE CEO" words repeated the FAKE stamp -> words now carry the stakes + the absurd cause.
// Critique 1: tile too small at 168 px -> the tile fills the whole screen; FAKE stamp scaled up.
// Critique 2: coin logos on gold coins vanished -> coins are white tiles with the real marks, dark outline + shadow.
const S = scene(0, 1, { cam: "none" });
const P = { bg: "#0d0b12", pink: "#ff4d8d", cream: "#f4f1e8", cyan: "#4cc9f0" };
L.reg("sdt", "b-bg", () => `<defs>
  <radialGradient id="bg1" cx="62%" cy="48%" r="58%"><stop offset="0" stop-color="#ff2f6d" stop-opacity="0.95"/><stop offset="0.4" stop-color="#5a0f33" stop-opacity="0.5"/><stop offset="1" stop-color="${P.bg}" stop-opacity="0"/></radialGradient>
  <radialGradient id="bvig" cx="50%" cy="50%" r="75%"><stop offset="0.6" stop-color="#000" stop-opacity="0"/><stop offset="1" stop-color="#000" stop-opacity="0.75"/></radialGradient></defs>
  <rect width="1920" height="1080" fill="${P.bg}"/><rect width="1920" height="1080" fill="url(#bg1)"/>
  ${Array.from({ length: 33 }, (_, i) => `<path d="M${i * 60} 0V1080" stroke="#ffffff" stroke-opacity="0.035" stroke-width="2"/>`).join("")}
  ${Array.from({ length: 19 }, (_, i) => `<path d="M0 ${i * 60}H1920" stroke="#ffffff" stroke-opacity="0.035" stroke-width="2"/>`).join("")}
  <rect width="1920" height="1080" fill="url(#bvig)"/>`, { box: [0, 0, 1920, 1080] });
L.reg("sdt", "b-laptop", () => `<path d="M-560 330 H560 L660 420 H-660 Z" fill="#9aa3b0" stroke="#000" stroke-width="12" stroke-linejoin="round"/>
  <rect x="-520" y="-370" width="1040" height="700" rx="36" fill="#2b3038" stroke="#000" stroke-width="12"/>
  <rect x="-480" y="-330" width="960" height="620" rx="14" fill="#1a2233"/>`, { box: [-680, -390, 1360, 830] });
L.reg("sdt", "b-words", () => {
  const word = (str, x, y, size, c, rot) => `<g transform="rotate(${rot} ${x} ${y})">
    <text x="${x + 12}" y="${y + 16}" font-family="'Mono'" font-weight="800" font-size="${size}" fill="#000" opacity="0.55">${str}</text>
    <text x="${x}" y="${y}" font-family="'Mono'" font-weight="800" font-size="${size}" fill="${c}" stroke="#0b0910" stroke-width="${size * 0.11}" paint-order="stroke" stroke-linejoin="round">${str}</text></g>`;
  return word("$6.3B", 60, 260, 230, P.cream, -4) + word("JOB", 70, 470, 210, P.pink, -4) + word("OFFER", 70, 650, 170, P.pink, -4);
}, { box: [0, 0, 1920, 1080] });
L.put(S, "b-bg", 0, 0, {});
L.put(S, "b-laptop", 1180, 560, { s: 0.95, rot: 4 });
L.put(S, "b3-tile", 1180, 545, { name: "CEO", hc: "yellow", badge: true, w: 880, h: 560, rot: 4 });
L.put(S, "b3-tile", 1180, 545, { name: "CEO", hc: "yellow", w: 880, h: 560, fake: true, rot: 4, s: 1 });
[["xrp", 700, 800, 1.5, -12], ["solana", 960, 950, 1.3, 10], ["bitcoin", 1380, 930, 1.6, -6], ["ethereum", 1700, 930, 1.3, 14], ["binance", 1760, 230, 1.2, 8]].forEach(([n, x, y, s, rot]) =>
  L.put(S, "logo-" + n, x, y, { s, tile: true, rot }));
L.put(S, "b-words", 0, 0, {});
L.put(S, "sd-badge", 80, 1000, { kind: "POSTMORTEM", date: "NOV 4", s: 1.25 });
