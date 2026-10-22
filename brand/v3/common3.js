// Stack Doodle brand v3: flat, iconic (owner's reference: a single bold mark on dark + wordmark + two-tone tagline).
// Stacky icon = three flat slabs (lime / pink / cyan), the top one tilted with two eyes. Wordmark = "stackdoodle" in
// JetBrains Mono ExtraBold, where the two o's of "doodle" get pupils (they become Stacky's eyes).
const C3 = { bg: "#15171c", grid: "#1c1f26", cream: "#f4f1e8", lime: "#b6f24a", pink: "#ff4d8d", cyan: "#4cc9f0", ink: "#15171c", yellow: "#ffd23f" };
const rr = (x, y, w, h, r) => `M${x + r} ${y} H${x + w - r} A${r} ${r} 0 0 1 ${x + w} ${y + r} V${y + h - r} A${r} ${r} 0 0 1 ${x + w - r} ${y + h} H${x + r} A${r} ${r} 0 0 1 ${x} ${y + h - r} V${y + r} A${r} ${r} 0 0 1 ${x + r} ${y} Z`;
// one slab: flat fill, a lighter top band, a bg-coloured gap stroke so slabs stay separate at 48 px
const slab = (x, y, w, h, c, rot) => `<g transform="rotate(${rot} ${x + w / 2} ${y + h / 2})">
  <path d="${rr(x, y, w, h, h * 0.42)}" fill="${c}" stroke="${C3.bg}" stroke-width="22"/>
  <path d="${rr(x + h * 0.25, y + h * 0.16, w - h * 0.5, h * 0.2, h * 0.1)}" fill="#ffffff" opacity="0.22"/></g>`;
const eye = (x, y, r, dx = 0.28, dy = -0.12) => `<circle cx="${x}" cy="${y}" r="${r}" fill="#ffffff"/>
  <circle cx="${x + r * dx}" cy="${y + r * dy}" r="${r * 0.5}" fill="${C3.ink}"/><circle cx="${x + r * dx + r * 0.2}" cy="${y + r * dy - r * 0.2}" r="${r * 0.14}" fill="#ffffff"/>`;
// the icon, centred on (0, 0), ~560 wide x 470 tall at s = 1
const stacky = (s = 1) => `<g transform="scale(${s})">
  ${slab(-250, 95, 500, 140, C3.cyan, -1.5)}
  ${slab(-228, -38, 456, 140, C3.pink, 2)}
  ${slab(-214, -200, 428, 150, C3.lime, -5)}
  <g transform="rotate(-5 0 -125)">${eye(-78, -128, 46)}${eye(70, -128, 46)}
  <path d="M-30 -78 Q0 -58 30 -78" fill="none" stroke="${C3.ink}" stroke-width="12" stroke-linecap="round"/></g></g>`;
// wordmark: monospaced, so every glyph cell is exactly 0.6 em wide and the o's of "doodle" (chars 6 and 7) are known
const wordmark = (x0, base, size) => {
  const cw = 0.6 * size, oy = base - 0.275 * size;
  const t = `<text x="${x0}" y="${base}" font-family="'Mono'" font-weight="800" font-size="${size}" letter-spacing="0">` +
    `<tspan fill="${C3.cream}">stack</tspan><tspan fill="${C3.lime}">doodle</tspan></text>`;
  const pupil = (i) => { const cx = x0 + (i + 0.5) * cw, cy = base - 0.30 * size; // the o's counter (measured on the render)
    return `<ellipse cx="${cx}" cy="${cy}" rx="${0.1 * size}" ry="${0.15 * size}" fill="#ffffff"/>` +
      `<circle cx="${cx - 0.035 * size}" cy="${cy - 0.01 * size}" r="${0.065 * size}" fill="${C3.ink}"/>` +
      `<circle cx="${cx - 0.015 * size}" cy="${cy - 0.04 * size}" r="${0.02 * size}" fill="#ffffff"/>`; };
  return t + pupil(6) + pupil(7);
};
const grid = (w, h, step = 60) => { let d = ""; for (let x = 0; x <= w; x += step) d += `M${x} 0V${h}`; for (let y = 0; y <= h; y += step) d += `M0 ${y}H${w}`;
  return `<path d="${d}" stroke="${C3.grid}" stroke-width="2" fill="none"/>`; };
