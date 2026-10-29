// look: still
// @library auto
// @include ../../../tools/sd-kit.js
// A (pro pass): a giant gold padlock, shackle popped open, and the tiny key that opened it: its bow is the digit 4.
// Words "SECURE?" (irony; the title says the key was 4, the thumb asks the question). Dev pointing, horrified.
const S = scene(0, 1, { cam: "none" });
const P = { bg: "#0e0c12", gold: "#ffd23f", gold2: "#f2b84b", gold3: "#b8800f", steel: "#c9d2dc", steel2: "#7e8a97", pink: "#ff4d8d", cream: "#f4f1e8", ink: "#0b0910" };
L.reg("sdt", "a-bg", () => `<defs>
  <radialGradient id="ag1" cx="50%" cy="56%" r="55%"><stop offset="0" stop-color="#ffb21f" stop-opacity="0.55"/><stop offset="0.45" stop-color="#7a3d0a" stop-opacity="0.35"/><stop offset="1" stop-color="${P.bg}" stop-opacity="0"/></radialGradient>
  <radialGradient id="ag2" cx="88%" cy="20%" r="40%"><stop offset="0" stop-color="#ff2f6d" stop-opacity="0.35"/><stop offset="1" stop-color="${P.bg}" stop-opacity="0"/></radialGradient></defs>
  <rect width="1920" height="1080" fill="${P.bg}"/><rect width="1920" height="1080" fill="url(#ag1)"/><rect width="1920" height="1080" fill="url(#ag2)"/>
  ${Array.from({ length: 33 }, (_, i) => `<path d="M${i * 60} 0V1080" stroke="#fff" stroke-opacity="0.03" stroke-width="2"/>`).join("")}
  ${Array.from({ length: 19 }, (_, i) => `<path d="M0 ${i * 60}H1920" stroke="#fff" stroke-opacity="0.03" stroke-width="2"/>`).join("")}`, { box: [0, 0, 1920, 1080] });
// the padlock, origin = body centre; shackle swung open to the left
L.reg("sdt", "a-lock", () => {
  const W = 560, H = 470, r = 70;
  const body = `M${-W / 2 + r} ${-H / 2} H${W / 2 - r} Q${W / 2} ${-H / 2} ${W / 2} ${-H / 2 + r} V${H / 2 - r} Q${W / 2} ${H / 2} ${W / 2 - r} ${H / 2} H${-W / 2 + r} Q${-W / 2} ${H / 2} ${-W / 2} ${H / 2 - r} V${-H / 2 + r} Q${-W / 2} ${-H / 2} ${-W / 2 + r} ${-H / 2} Z`;
  return `<defs><linearGradient id="alg" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#ffe680"/><stop offset="0.45" stop-color="${P.gold}"/><stop offset="1" stop-color="${P.gold3}"/></linearGradient>
    <linearGradient id="als" x1="0" y1="0" x2="1" y2="0"><stop offset="0" stop-color="#eef3f8"/><stop offset="0.5" stop-color="${P.steel}"/><stop offset="1" stop-color="${P.steel2}"/></linearGradient>
    <filter id="aglow" x="-50%" y="-50%" width="200%" height="200%"><feGaussianBlur stdDeviation="30"/></filter></defs>
    <ellipse cx="0" cy="${H / 2 + 40}" rx="${W * 0.62}" ry="34" fill="#000" opacity="0.45"/>
    <path d="${body}" fill="${P.gold}" opacity="0.45" filter="url(#aglow)"/>
    <g transform="rotate(-28 -170 -240)"><path d="M-170 -235 V-420 A170 170 0 0 1 170 -420 V-300" fill="none" stroke="${P.ink}" stroke-width="112" stroke-linecap="round"/>
      <path d="M-170 -235 V-420 A170 170 0 0 1 170 -420 V-300" fill="none" stroke="url(#als)" stroke-width="84" stroke-linecap="round"/>
      <path d="M-196 -250 V-418 A196 196 0 0 1 -60 -598" fill="none" stroke="#ffffff" stroke-width="12" stroke-linecap="round" opacity="0.6"/></g>
    <path d="${body}" fill="url(#alg)" stroke="${P.ink}" stroke-width="16"/>
    <path d="M${-W / 2 + 40} ${-H / 2 + 34} H${W / 2 - 60}" stroke="#fff6c2" stroke-width="16" stroke-linecap="round" opacity="0.8"/>
    ${[-170, 0, 170].map((x) => `<circle cx="${x}" cy="${H / 2 - 52}" r="12" fill="${P.gold3}"/>`).join("")}
    <circle cx="0" cy="-40" r="62" fill="${P.ink}"/><path d="M-26 -10 L26 -10 L16 110 L-16 110 Z" fill="${P.ink}"/>
    <text x="0" y="${H / 2 - 110}" text-anchor="middle" font-family="'Mono'" font-weight="800" font-size="46" fill="#5a3a06" letter-spacing="6">HIGH SECURITY</text>`;
}, { box: [-500, -700, 1000, 1200] });
// the tiny key: shaft + teeth, its bow is a fat gold "4"
L.reg("sdt", "a-key", () => `<g><circle cx="190" cy="0" r="230" fill="#ffd23f" opacity="0.35" filter="url(#aglow)"/>
  <path d="M0 0 H-260 V22 H-230 V44 H-200 V22 H-170 V54 H-140 V22 H-110 V22" fill="none" stroke="${P.ink}" stroke-width="34" stroke-linejoin="round"/>
  <path d="M0 0 H-260 V22 H-230 V44 H-200 V22 H-170 V54 H-140 V22 H-110 V22" fill="none" stroke="${P.gold}" stroke-width="18" stroke-linejoin="round"/>
  <text x="190" y="150" text-anchor="middle" font-family="'Mono'" font-weight="800" font-size="440" fill="${P.gold}" stroke="${P.ink}" stroke-width="34" paint-order="stroke" stroke-linejoin="round">4</text>
  <text x="176" y="124" text-anchor="middle" font-family="'Mono'" font-weight="800" font-size="440" fill="none" stroke="#fff6c2" stroke-width="6" opacity="0.7">4</text>
  ${[[-300, -90], [330, -170], [300, 150]].map(([x, y]) => `<path d="M${x} ${y - 26} L${x + 8} ${y - 8} L${x + 26} ${y} L${x + 8} ${y + 8} L${x} ${y + 26} L${x - 8} ${y + 8} L${x - 26} ${y} L${x - 8} ${y - 8} Z" fill="#fff6c2"/>`).join("")}</g>`, { box: [-400, -300, 800, 600] });
L.reg("sdt", "a-words", () => {
  const word = (str, x, y, size, c) => `<g transform="rotate(-4 ${x} ${y})"><text x="${x + 12}" y="${y + 16}" font-family="'Mono'" font-weight="800" font-size="${size}" fill="#000" opacity="0.55">${str}</text>
    <text x="${x}" y="${y}" font-family="'Mono'" font-weight="800" font-size="${size}" fill="${c}" stroke="${P.ink}" stroke-width="${size * 0.11}" paint-order="stroke" stroke-linejoin="round">${str}</text></g>`;
  return word("SECURE", 60, 250, 220, P.cream) + word("?", 830, 262, 300, P.pink);
}, { box: [0, 0, 1920, 1080] });
L.put(S, "a-bg", 0, 0, {});
L.put(S, "a-lock", 760, 760, { s: 0.92 });
L.put(S, "a-key", 1000, 723, { s: 0.95 });
L.put(S, "a-words", 0, 0, {});
L.reg("sdt", "a-dev", () => `<g transform="scale(-1 1)">${L.inline("sd-dev", { s: 4.2, face: "shocked", pose: "point", hoodie: "#4cc9f0" })}</g>`, { box: [-700, -1800, 1400, 1900] });
L.put(S, "a-dev", 1720, 1720, {});
L.put(S, "sd-badge", 80, 1000, { kind: "POSTMORTEM", date: "OCT 22", s: 1.25 });
