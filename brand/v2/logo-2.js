// look: still
// @library auto
// @include ../../tools/sd-kit.js
// @include common.js
// Logo 2 — Brace face {•‿•}: giant hand-drawn curly braces are the face outline, two dot eyes, a pink smile, a pencil-scribble underline.
const S = scene(0, 1, { cam: "none" });
L.reg("sd", "logo2-art", () => {
  const brace = (m, seed) => {
    const pts = [[-100, -296], [-172, -282], [-196, -214], [-198, -112], [-210, -44], [-292, 0], [-210, 44], [-198, 112], [-196, 214], [-172, 282], [-100, 296]].map(([x, y]) => [x * m, y]);
    const d = K.crPath(K.jit(pts, 4, seed), false), sh = `<g transform="translate(5 7)">${K.inkS(d, 70, "#8fc231")}</g>`;
    return K.inkS(d, 108, BR.cream) + K.inkS(d, 92) + sh + K.inkS(d, 62, BR.lime).replace("<path", '<path transform="translate(-2 -3)"') + K.inkS(d, 6, "rgba(255,255,255,0.5)").replace("<path", '<path transform="translate(-14 -8)"');
  };
  let s = brace(1, 5) + brace(-1, 9);
  // eyes + smile
  const eye = (x) => `<circle cx="${x}" cy="-52" r="40" fill="#fff" stroke="${BR.ink}" stroke-width="8"/><circle cx="${x + 4}" cy="-48" r="17" fill="${BR.ink}"/><circle cx="${x - 2}" cy="-56" r="6" fill="#fff"/>`;
  s += eye(-78) + eye(78);
  const sm = K.crPath(K.jit([[-92, 36], [-46, 86], [0, 98], [46, 86], [92, 36]], 2, 4), false);
  s += K.inkS(sm, 36) + K.inkS(sm, 20, BR.pink);
  s += `<ellipse cx="-122" cy="40" rx="20" ry="11" fill="${BR.pink}" fill-opacity="0.5"/><ellipse cx="122" cy="40" rx="20" ry="11" fill="${BR.pink}" fill-opacity="0.5"/>`;
  // pencil scribble underline
  const sc = (y0, seed) => K.crPath(K.jit([[-150, y0], [-60, y0 - 12], [20, y0 + 6], [90, y0 - 8], [150, y0 + 4]], 3, seed), false);
  s += K.inkS(sc(176, 2), 11, BR.cream) + K.inkS(sc(200, 6), 9, BR.yellow) + K.inkS(sc(222, 8), 7, BR.cream);
  return s;
}, { box: [-380, -380, 760, 760] });
L.put(S, "sd-bg", 0, 0, { glow: "lime", gx: 960, gy: 540, gr: 460, vignette: false });
L.put(S, "logo2-art", 960, 540, { s: 1 });
