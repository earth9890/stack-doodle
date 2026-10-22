// look: still
// @library auto
// @include ../../../tools/sd-kit.js
// @include ../assets/logos.js
// C (owner: "clickbait, really amazing"): WEB / CRACKED over a glowing wireframe globe split by a white-hot crack, the PHP
// logo jammed in the crack, Dev screaming on the right. True to the story: a hole in the language behind ~70 % of websites.
const S = scene(0, 1, { cam: "none" });
const P = { bg: "#0d0b12", pink: "#ff4d8d", hot: "#ffd9e6", cyan: "#4cc9f0", lime: "#b6f24a", cream: "#f4f1e8", yellow: "#ffd23f" };
L.reg("sdt", "c-bg", () => `<defs>
  <radialGradient id="cg1" cx="44%" cy="78%" r="62%"><stop offset="0" stop-color="#ff2f6d" stop-opacity="0.85"/><stop offset="0.35" stop-color="#7a1240" stop-opacity="0.55"/><stop offset="1" stop-color="${P.bg}" stop-opacity="0"/></radialGradient>
  <radialGradient id="cg2" cx="85%" cy="30%" r="45%"><stop offset="0" stop-color="#2a6cff" stop-opacity="0.35"/><stop offset="1" stop-color="${P.bg}" stop-opacity="0"/></radialGradient>
  <radialGradient id="cvig" cx="50%" cy="50%" r="75%"><stop offset="0.6" stop-color="#000" stop-opacity="0"/><stop offset="1" stop-color="#000" stop-opacity="0.75"/></radialGradient></defs>
  <rect width="1920" height="1080" fill="${P.bg}"/><rect width="1920" height="1080" fill="url(#cg1)"/><rect width="1920" height="1080" fill="url(#cg2)"/>
  ${Array.from({ length: 33 }, (_, i) => `<path d="M${i * 60} 0V1080" stroke="#ffffff" stroke-opacity="0.035" stroke-width="2"/>`).join("")}
  ${Array.from({ length: 19 }, (_, i) => `<path d="M0 ${i * 60}H1920" stroke="#ffffff" stroke-opacity="0.035" stroke-width="2"/>`).join("")}`, { box: [0, 0, 1920, 1080] });
// wireframe "internet" globe, split by a jagged crack that pours light
L.reg("sdt", "c-globe", () => {
  const R = 400, crack = "M-30 -420 L25 -300 L-40 -205 L40 -110 L-25 -10 L55 90 L-15 190 L45 300 L-10 420";
  const half = (side) => {
    const clip = side < 0 ? `M-600 -600 H0 ${crack.replace(/^M/, "L")} L0 600 H-600 Z` : `M600 -600 H-60 ${crack.replace(/^M/, "L")} L-60 600 H600 Z`;
    let lines = ""; for (let k = -3; k <= 3; k++) { const y = (k / 4) * R, rx = Math.sqrt(R * R - y * y); lines += `<ellipse cx="0" cy="${y}" rx="${rx}" ry="${rx * 0.16}" fill="none" stroke="${P.cyan}" stroke-width="7" stroke-opacity="0.75"/>`; }
    for (let k = 1; k <= 4; k++) lines += `<ellipse cx="0" cy="0" rx="${(k / 4.4) * R}" ry="${R}" fill="none" stroke="${P.cyan}" stroke-width="7" stroke-opacity="0.75"/>`;
    return `<g transform="translate(${side * 75} ${side * -10}) rotate(${side * 7})"><clipPath id="cc${side}"><path d="${clip}"/></clipPath><g clip-path="url(#cc${side})">
      <circle r="${R}" fill="url(#cglobe)"/>${lines}<circle r="${R}" fill="none" stroke="${P.cyan}" stroke-width="12"/></g></g>`;
  };
  return `<defs><radialGradient id="cglobe" cx="38%" cy="32%" r="80%"><stop offset="0" stop-color="#2c5fb8"/><stop offset="0.7" stop-color="#14295c"/><stop offset="1" stop-color="#0a1433"/></radialGradient>
    <filter id="cblur" x="-50%" y="-50%" width="200%" height="200%"><feGaussianBlur stdDeviation="28"/></filter>
    <filter id="cblur2" x="-50%" y="-50%" width="200%" height="200%"><feGaussianBlur stdDeviation="9"/></filter>
    <linearGradient id="cbeam" x1="0" y1="1" x2="0" y2="0"><stop offset="0" stop-color="#ffffff" stop-opacity="0.9"/><stop offset="0.25" stop-color="${P.pink}" stop-opacity="0.7"/><stop offset="1" stop-color="${P.pink}" stop-opacity="0"/></linearGradient>
    <linearGradient id="clight" x1="0" y1="0" x2="1" y2="0"><stop offset="0" stop-color="${P.pink}"/><stop offset="0.5" stop-color="#ffffff"/><stop offset="1" stop-color="${P.pink}"/></linearGradient></defs>
    <circle r="${R + 40}" fill="${P.cyan}" opacity="0.18" filter="url(#cblur)"/>
    <path d="M-60 -380 L-520 -1200 L520 -1200 L60 -380 Z" fill="url(#cbeam)" filter="url(#cblur)"/>
    ${[-380, -200, 0, 200, 380].map((x) => `<path d="M0 -380 L${x - 40} -1150 L${x + 40} -1150 Z" fill="#ffffff" opacity="0.10"/>`).join("")}
    ${half(-1)}${half(1)}
    <path d="${crack}" stroke="${P.pink}" stroke-width="200" fill="none" opacity="0.95" filter="url(#cblur)"/>
    <path d="${crack}" stroke="url(#clight)" stroke-width="90" fill="none" stroke-linejoin="round" filter="url(#cblur2)"/>
    <path d="${crack}" stroke="#ffffff" stroke-width="30" fill="none" stroke-linejoin="round"/>
    ${[[-140, -470, 30, 20], [120, -500, 22, -30], [-60, -560, 16, 45], [190, -400, 14, 10], [-210, -380, 12, -20]].map(([x, y, r, a]) =>
      `<path d="M${x - r} ${y} L${x} ${y - r} L${x + r * 1.2} ${y + r * 0.3} L${x + r * 0.2} ${y + r}Z" fill="#2c5fb8" stroke="${P.cyan}" stroke-width="5" transform="rotate(${a} ${x} ${y})"/>`).join("")}`;
}, { box: [-600, -600, 1200, 1200] });
L.reg("sdt", "c-words", () => {
  const word = (str, x, y, size, c, rot) => `<g transform="rotate(${rot} ${x} ${y})">
    <text x="${x + 12}" y="${y + 16}" font-family="'Mono'" font-weight="800" font-size="${size}" fill="#000" opacity="0.55">${str}</text>
    <text x="${x}" y="${y}" font-family="'Mono'" font-weight="800" font-size="${size}" fill="${c}" stroke="#0b0910" stroke-width="${size * 0.11}" paint-order="stroke" stroke-linejoin="round">${str}</text></g>`;
  const crack = `<path d="M120 300 L250 380 L330 345 L470 430 L560 395 L700 470 L830 440" fill="none" stroke="#0b0910" stroke-width="30" stroke-linejoin="round" stroke-linecap="round" transform="rotate(-3 60 470)"/>
    <path d="M120 300 L250 380 L330 345 L470 430 L560 395 L700 470 L830 440" fill="none" stroke="#ffffff" stroke-width="11" stroke-linejoin="round" stroke-linecap="round" transform="rotate(-3 60 470)"/>`;
  return word("WEB", 70, 250, 230, P.cream, -3) + word("CRACKED", 60, 470, 210, P.pink, -3);
}, { box: [0, 0, 1920, 1080] });
L.put(S, "c-bg", 0, 0, {});
L.put(S, "c-globe", 820, 960, {});
L.put(S, "logo-php", 760, 640, { s: 1.35, tile: true, rot: -14 });
L.put(S, "c-words", 0, 0, {});
L.put(S, "sd-dev", 1690, 1720, { s: 4.3, face: "shocked", pose: "armsUp", hoodie: "#4cc9f0" });
L.put(S, "sd-badge", 80, 1000, { kind: "PATCH NOTES", date: "OCT 22", s: 1.25 });
