// look: still
// @library auto
// @include common3.js
// v3 banner (rendered 2560x1440 from this 1920x1080 frame): flat graphite, faint grid, icon + wordmark + two-tone tagline,
// all inside the all-devices safe box (frame coords x 380-1540, y 381-698).
const S = scene(0, 1, { cam: "none" });
L.reg("sd3", "banner3", () => {
  const size = 132, x0 = 652, base = 572;
  return `<rect x="0" y="0" width="1920" height="1080" fill="${C3.bg}"/>` + grid(1920, 1080) +
    `<g transform="translate(512 520)">${stacky(0.42)}</g>` + wordmark(x0, base, size) +
    `<text x="${x0 + 6}" y="${base + 82}" font-family="'Mono'" font-weight="800" font-size="44" letter-spacing="6">` +
    `<tspan fill="${C3.cream}">TECH NEWS, </tspan><tspan fill="${C3.pink}">DOODLED.</tspan></text>`;
}, { box: [0, 0, 1920, 1080] });
L.put(S, "banner3", 0, 0, {});
