// look: still
// @library auto
// @include ../../../tools/sd-kit.js
// C (pro pass, fallout): a red stock line crashing through a cracked floor, two LOWER CIRCUIT stamps, "-36%", Dev shocked.
// True: two 20 % lower circuits on 21 and 22 Oct 2026 (BSE ₹431.55 → ₹345.25), about 36 % in two days.
const S = scene(0, 1, { cam: "none" });
const P = { bg: "#0d0b10", red: "#ff3b4e", pink: "#ff4d8d", cream: "#f4f1e8", ink: "#0b0910", floor: "#232733" };
L.reg("sdt", "c-bg", () => `<defs>
  <radialGradient id="cr1" cx="62%" cy="72%" r="55%"><stop offset="0" stop-color="#ff1f3d" stop-opacity="0.55"/><stop offset="0.5" stop-color="#5a0a18" stop-opacity="0.35"/><stop offset="1" stop-color="${P.bg}" stop-opacity="0"/></radialGradient></defs>
  <rect width="1920" height="1080" fill="${P.bg}"/><rect width="1920" height="1080" fill="url(#cr1)"/>
  ${Array.from({ length: 33 }, (_, i) => `<path d="M${i * 60} 0V1080" stroke="#fff" stroke-opacity="0.03" stroke-width="2"/>`).join("")}
  ${Array.from({ length: 19 }, (_, i) => `<path d="M0 ${i * 60}H1920" stroke="#fff" stroke-opacity="0.03" stroke-width="2"/>`).join("")}
  <path d="M0 820 H1920 V1080 H0 Z" fill="${P.floor}"/><path d="M0 820 H1920" stroke="#3a4152" stroke-width="10"/>`, { box: [0, 0, 1920, 1080] });
// the crash: a chart line that runs flat-ish, then plunges and smashes through the floor (crack + debris)
L.reg("sdt", "c-crash", () => {
  const line = "M80 470 L260 440 L420 490 L560 450 L700 520 L820 640 L930 710 L1010 1000";
  return `<defs><filter id="cb" x="-50%" y="-50%" width="200%" height="200%"><feGaussianBlur stdDeviation="18"/></filter></defs>
    <path d="M880 820 L840 900 L900 930 L860 1010 M960 820 L1010 880 L980 950 L1060 1040 M1010 820 L1110 860 L1180 850" fill="none" stroke="#0b0910" stroke-width="16" stroke-linecap="round"/>
    <ellipse cx="985" cy="840" rx="190" ry="40" fill="#000" opacity="0.6"/>
    ${[[860, 760, 34, 20], [1110, 740, 28, -25], [1180, 800, 22, 40], [800, 800, 20, -10], [1070, 690, 18, 15]].map(([x, y, r, a]) =>
      `<path d="M${x - r} ${y} L${x} ${y - r} L${x + r * 1.2} ${y + r * 0.3} L${x + r * 0.2} ${y + r}Z" fill="#3a4152" stroke="#0b0910" stroke-width="6" transform="rotate(${a} ${x} ${y})"/>`).join("")}
    <path d="${line}" fill="none" stroke="${P.red}" stroke-width="70" stroke-linejoin="round" stroke-linecap="round" opacity="0.7" filter="url(#cb)"/>
    <path d="${line}" fill="none" stroke="${P.ink}" stroke-width="52" stroke-linejoin="round" stroke-linecap="round"/>
    <path d="${line}" fill="none" stroke="${P.red}" stroke-width="32" stroke-linejoin="round" stroke-linecap="round"/>
    <path d="M1010 1000 L960 930 M1010 1000 L1075 945" stroke="${P.ink}" stroke-width="44" stroke-linecap="round"/>
    <path d="M1010 1000 L960 930 M1010 1000 L1075 945" stroke="${P.red}" stroke-width="26" stroke-linecap="round"/>
    <circle cx="700" cy="520" r="16" fill="${P.cream}" stroke="${P.ink}" stroke-width="6"/><circle cx="930" cy="710" r="16" fill="${P.cream}" stroke="${P.ink}" stroke-width="6"/>`;
}, { box: [0, 0, 1920, 1080] });
L.reg("sdt", "c-stamp", (o) => `<g transform="rotate(${o.rot || -12})">
  <rect x="-230" y="-62" width="460" height="124" rx="18" fill="#0b0910" fill-opacity="0.72" stroke="${P.red}" stroke-width="14"/>
  <rect x="-212" y="-44" width="424" height="88" rx="10" fill="none" stroke="${P.red}" stroke-width="5"/>
  <text x="0" y="18" text-anchor="middle" font-family="'Mono'" font-weight="800" font-size="52" fill="${P.red}" letter-spacing="1">LOWER CIRCUIT</text>
  <text x="0" y="104" text-anchor="middle" font-family="'Mono'" font-weight="800" font-size="34" fill="${P.cream}" opacity="0.85">${o.date || ""}</text></g>`, { box: [-260, -90, 520, 220] });
L.reg("sdt", "c-words", () => {
  const word = (str, x, y, size, c, rot = -4) => `<g transform="rotate(${rot} ${x} ${y})"><text x="${x + 12}" y="${y + 16}" font-family="'Mono'" font-weight="800" font-size="${size}" fill="#000" opacity="0.55">${str}</text>
    <text x="${x}" y="${y}" font-family="'Mono'" font-weight="800" font-size="${size}" fill="${c}" stroke="${P.ink}" stroke-width="${size * 0.11}" paint-order="stroke" stroke-linejoin="round">${str}</text></g>`;
  return word("-36%", 60, 230, 250, P.pink) + word("IN 2 DAYS", 80, 330, 84, P.cream);
}, { box: [0, 0, 1920, 1080] });
L.put(S, "c-bg", 0, 0, {});
L.put(S, "c-crash", 0, 0, {});
L.put(S, "c-stamp", 560, 640, { rot: -14, date: "OCT 21" });
L.put(S, "c-stamp", 1060, 500, { rot: 9, date: "OCT 22" });
L.put(S, "c-words", 0, 0, {});
L.reg("sdt", "c-dev", () => `<g transform="scale(-1 1)">${L.inline("sd-dev", { s: 4.0, face: "shocked", pose: "armsUp", hoodie: "#4cc9f0" })}</g>`, { box: [-700, -1800, 1400, 1900] });
L.put(S, "c-dev", 1720, 1700, {});
L.put(S, "sd-badge", 80, 1000, { kind: "POSTMORTEM", date: "OCT 22", s: 1.25 });
