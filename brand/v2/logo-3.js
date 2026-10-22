// look: still
// @library auto
// @include ../../tools/sd-kit.js
// @include common.js
// Logo 3 — Terminal buddy: a terminal window is the head; the title-bar dots are hair clips; the screen shows >_ as a face (the > winks); little doodle arms hold a pencil.
const S = scene(0, 1, { cam: "none" });
L.reg("sd", "logo3-art", () => {
  const W = 480, H = 390, x0 = -W / 2, y0 = -H / 2 - 20, TB = 74;
  const limb = (d) => K.inkS(d, 26) + K.inkS(d, 12, BR.cream);
  const hand = (x, y) => `<circle cx="${x}" cy="${y}" r="21" fill="${BR.cream}" stroke="${BR.ink}" stroke-width="7"/>`;
  let s = limb(`M${x0 + 6} 20 Q${x0 - 30} 55 ${x0 - 22} 100`) + limb(`M${-x0 - 6} 20 Q${-x0 + 30} 45 ${-x0 + 22} 78`);
  // window: cream frame, darker title bar, dark screen
  const wd = K.wobRR(x0, y0, W, H, 46, 12, 2), clip = gid("lg3");
  s += `<clipPath id="${clip}"><path d="${wd}"/></clipPath>` + K.fillP(wd, BR.cream) + `<g clip-path="url(#${clip})"><rect x="${x0}" y="${y0}" width="${W}" height="${TB}" fill="${BR.cyan}"/></g>` + K.inkS(`M${x0 + 4} ${y0 + TB} H${-x0 - 4}`, 6);
  [BR.pink, BR.yellow, BR.lime].forEach((c, i) => (s += `<circle cx="${x0 + 52 + i * 52}" cy="${y0 + TB / 2}" r="17" fill="${c}" stroke="${BR.ink}" stroke-width="6"/>`));
  const sx = x0 + 28, sy = y0 + TB + 24, sw = W - 56, sh = H - TB - 52, scr = K.wobRR(sx, sy, sw, sh, 24, 5, 1.4);
  s += K.fillP(scr, "#0c0e12") + K.inkS(scr, 6) + K.inkS(wd, 8);
  // face on the screen
  const cy = sy + sh / 2;
  s += K.inkS(`M${x0 + 118} ${cy - 66} L${x0 + 194} ${cy - 22} L${x0 + 118} ${cy + 22}`, 30, BR.lime) + K.inkS(`M${x0 + 118} ${cy - 66} L${x0 + 194} ${cy - 22} L${x0 + 118} ${cy + 22}`, 10, "#e6ffb0");
  s += K.eyeInk(x0 + 336, cy - 28, 34, -5, 4).replace(new RegExp(BR.ink, "g"), BR.ink);
  s += K.inkS(`M${x0 + 180} ${cy + 66} Q${x0 + 250} ${cy + 96} ${x0 + 320} ${cy + 62}`, 28, BR.lime) + `<rect x="${x0 + 330}" y="${cy + 38}" width="24" height="44" rx="4" fill="${BR.yellow}"/>`;
  s += `<ellipse cx="${x0 + 104}" cy="${cy + 52}" rx="22" ry="12" fill="${BR.pink}" fill-opacity="0.6"/><ellipse cx="${x0 + 396}" cy="${cy + 40}" rx="22" ry="12" fill="${BR.pink}" fill-opacity="0.6"/>`;
  // pencil in the right hand
  const hx = -x0 + 22, hy = 78, a = (-72 * Math.PI) / 180, len = 190, g = len * 0.4;
  s += L.g(K.pencilInk(len), `translate(${f1(hx - Math.cos(a) * g)} ${f1(hy - Math.sin(a) * g)}) rotate(-72)`) + hand(x0 - 22, 100) + hand(hx, hy);
  return rimF(s, 8);
}, { box: [-380, -380, 760, 760] });
L.put(S, "sd-bg", 0, 0, { glow: "cyan", gx: 960, gy: 540, gr: 460, vignette: false });
L.put(S, "logo3-art", 960, 560, { s: 1.08 });
