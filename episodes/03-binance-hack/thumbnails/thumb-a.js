// look: still
// @library auto
// @include ../../../tools/sd-kit.js
// @include ../assets/logos.js
// @include ../assets/ep-kit.js
// A (claim + absurd cause): "$6.3B" / "HOMEWORK". A gold vault door blown open, light and coins pouring out; a yellow
// "assignment/" folder jammed in the door like a crowbar; Dev screaming on the right. True: Binance says the theft began
// with a take-home "assignment" from a fake interview.
// Critique 1: vault + folder + coins + Dev + words = 5 things -> coins cut to 6, beam simplified; folder made bigger (the twist).
// Critique 2: "HOMEWORK" pink on dark magenta glow lost contrast -> glow moved to gold, HOMEWORK pink with a dark outline.
const S = scene(0, 1, { cam: "none" });
const P = { bg: "#0d0b12", gold: "#f0b90b", hot: "#fff4c4", pink: "#ff4d8d", cream: "#f4f1e8" };
L.reg("sdt", "a-bg", () => `<defs>
  <radialGradient id="ag1" cx="46%" cy="62%" r="60%"><stop offset="0" stop-color="#ffcf3a" stop-opacity="0.8"/><stop offset="0.35" stop-color="#7a5200" stop-opacity="0.5"/><stop offset="1" stop-color="${P.bg}" stop-opacity="0"/></radialGradient>
  <radialGradient id="avig" cx="50%" cy="50%" r="75%"><stop offset="0.6" stop-color="#000" stop-opacity="0"/><stop offset="1" stop-color="#000" stop-opacity="0.75"/></radialGradient></defs>
  <rect width="1920" height="1080" fill="${P.bg}"/><rect width="1920" height="1080" fill="url(#ag1)"/>
  ${Array.from({ length: 33 }, (_, i) => `<path d="M${i * 60} 0V1080" stroke="#ffffff" stroke-opacity="0.035" stroke-width="2"/>`).join("")}
  ${Array.from({ length: 19 }, (_, i) => `<path d="M0 ${i * 60}H1920" stroke="#ffffff" stroke-opacity="0.035" stroke-width="2"/>`).join("")}
  <rect width="1920" height="1080" fill="url(#avig)"/>`, { box: [0, 0, 1920, 1080] });
// the vault: a dark round opening pouring light, the heavy gold door swung open to the left
L.reg("sdt", "a-vault", () => {
  const R = 330;
  return `<defs><radialGradient id="ahole" cx="50%" cy="45%" r="55%"><stop offset="0" stop-color="#ffffff"/><stop offset="0.3" stop-color="${P.hot}"/><stop offset="0.75" stop-color="#c88a00"/><stop offset="1" stop-color="#3a2600"/></radialGradient>
    <linearGradient id="adoor" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#d9dee6"/><stop offset="0.55" stop-color="#8d96a3"/><stop offset="1" stop-color="#4a525e"/></linearGradient>
    <filter id="ablur" x="-50%" y="-50%" width="200%" height="200%"><feGaussianBlur stdDeviation="30"/></filter></defs>
    <circle r="${R + 120}" fill="${P.gold}" opacity="0.55" filter="url(#ablur)"/>
    <circle r="${R + 44}" fill="#5d6672" stroke="#000" stroke-width="12"/>${Array.from({length:16},(_,i)=>`<circle cx="${Math.cos(i*Math.PI/8)*(R+22)}" cy="${Math.sin(i*Math.PI/8)*(R+22)}" r="9" fill="#2b3038"/>`).join("")}
    <circle r="${R}" fill="url(#ahole)"/>
    ${[-60, -25, 10, 45, 80].map((a) => `<path d="M0 0 L${Math.cos((a - 8) * Math.PI / 180) * 1400} ${Math.sin((a - 8) * Math.PI / 180) * 1400 - 300} L${Math.cos((a + 8) * Math.PI / 180) * 1400} ${Math.sin((a + 8) * Math.PI / 180) * 1400 - 300}Z" fill="#fff6c8" opacity="0.10"/>`).join("")}
    <g transform="translate(-${R + 150} 0) scale(0.42 1)">
      <circle r="${R + 20}" fill="#000" opacity="0.5" transform="translate(30 20)"/>
      <circle r="${R + 20}" fill="url(#adoor)" stroke="#000" stroke-width="16"/>
      <circle r="${R - 40}" fill="none" stroke="#3a414c" stroke-width="18"/>
      ${[0, 60, 120].map((a) => `<path d="M${Math.cos(a * Math.PI / 180) * 150} ${Math.sin(a * Math.PI / 180) * 150} L${-Math.cos(a * Math.PI / 180) * 150} ${-Math.sin(a * Math.PI / 180) * 150}" stroke="#2b3038" stroke-width="30" stroke-linecap="round"/>`).join("")}
      <circle r="52" fill="#2b3038"/></g>`;
}, { box: [-800, -500, 1600, 1000] });
L.reg("sdt", "a-coin", (o) => `<circle r="${o.r}" fill="#000" opacity="0.45" transform="translate(10 12)"/><circle r="${o.r}" fill="${P.gold}" stroke="#000" stroke-width="9"/>
  <circle r="${o.r * 0.78}" fill="none" stroke="#9a6a00" stroke-width="7"/>`, { box: [-100, -100, 200, 200] });
L.reg("sdt", "a-words", () => {
  const word = (str, x, y, size, c, rot) => `<g transform="rotate(${rot} ${x} ${y})">
    <text x="${x + 12}" y="${y + 16}" font-family="'Mono'" font-weight="800" font-size="${size}" fill="#000" opacity="0.55">${str}</text>
    <text x="${x}" y="${y}" font-family="'Mono'" font-weight="800" font-size="${size}" fill="${c}" stroke="#0b0910" stroke-width="${size * 0.11}" paint-order="stroke" stroke-linejoin="round">${str}</text></g>`;
  return word("$6.3B", 60, 250, 250, P.cream, -3) + word("HOMEWORK", 50, 450, 170, P.pink, -3);
}, { box: [0, 0, 1920, 1080] });
L.put(S, "a-bg", 0, 0, {});
L.put(S, "a-vault", 1000, 680, {});
[[1270, 330, 66], [1340, 560, 52], [1240, 930, 80], [1160, 200, 44], [900, 170, 40], [1400, 760, 46], [780, 960, 56]].forEach(([x, y, r]) => L.put(S, "a-coin", x, y, { r }));
L.put(S, "logo-bitcoin", 1240, 930, { s: 1.0, tile: false });
L.put(S, "logo-binance", 560, 690, { s: 1.0, tile: true, rot: -6 });
L.put(S, "p2-folder", 1000, 760, { s: 2.6, color: "blue", rot: -18 });
L.put(S, "sd-chip", 990, 620, { text: "assignment/", c: "lime", size: 64, rot: -18 });
L.put(S, "a-words", 0, 0, {});
L.put(S, "sd-dev", 1700, 1720, { s: 4.3, face: "shocked", pose: "armsUp", hoodie: "#4cc9f0" });
L.put(S, "sd-badge", 80, 1000, { kind: "POSTMORTEM", date: "NOV 4", s: 1.25 });
