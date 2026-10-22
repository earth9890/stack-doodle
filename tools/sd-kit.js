// ===================== tools/sd-kit.js — Stack Doodle channel kit (category "sd") =====================
// Doodles on a dark grid: graphite ground, cream paper cards, lime / pink / cyan / yellow accents, Mono chips.
// Use: `// @library auto`, then `// @include ../../tools/sd-kit.js` (after the library line, before assets/logos.js).
// Palette is hard-coded here (channel kit); outline width, corner radius and shading still come from the L tokens.
// Origin: "c" = centre, "L" = left-centre (badge/counter: put at the left edge), "tip" = fingertip, "feet" = bottom centre.
// Colour names for chips etc: lime | pink | cyan | white | yellow (a raw "#hex" also works).
//
//  sd-bg       L.put(S, "sd-bg", 0, 0, { glow: "lime|cyan|pink|yellow|#hex", gx: 1500, gy: 400, gr: 700, vignette: true })        [0,0 = top-left, 1920x1080]
//  sd-chip     L.put(S, "sd-chip", x, y, { text: "WE RAN IT" (| = new line), c: "lime", size: 46, rot: -3, t, pop: true })          [c]
//  sd-source   L.put(S, "sd-source", x, y, { site: "bun.sh/blog", head: "Bun 1.3 is out", body: ["line", "line"], hl: 1 (index or [i,j]),
//                                            logo: "logo-bun", date: "OCT 22, 2026", w: 880, size: 36, t, slide: "up" })            [c]
//  sd-year     L.put(S, "sd-year", x, y, { year: "2014", c: "lime", size: 240, label: "RELEASED", t, pop: true })                    [c]
//  sd-badge    L.put(S, "sd-badge", x, y, { kind: "PATCH NOTES|POSTMORTEM|DOODLED|CHEAT SHEET|LAB", date: "OCT 22", c, s, t })       [L]
//  sd-counter  L.put(S, "sd-counter", x, y, { n: 7, of: 40, size: 34, t })                                                           [L]
//  sd-vs       L.put(S, "sd-vs", x, y, { a: "BUN", b: "NODE", logoA: "logo-bun", logoB: "logo-nodedotjs", subA: "new", subB: "old", t }) [c]
//  sd-hand     L.put(S, "sd-hand", x, y, { s: 1, rot: 0 (deg; 0 = pointing right), t, pop: true })                                   [tip]
//  sd-arrow    L.put(S, "sd-arrow", x, y, { to: [dx, dy], bend: 0.3, c: "lime|white|cyan|pink|yellow", w: 10, t })                  [start of the arrow]
//  sd-sting    L.put(S, "sd-sting", x, y, { s: 1, t })                                                                               [c]
//  sd-bubble   L.put(S, "sd-bubble", x, y, { text: "WAIT|WHAT?", size: 48, tx: -90, ty: 130 (tail tip, relative), c: "paper", t })     [c]
//  sd-mark     L.put(S, "sd-mark", x, y, { s: 1, t })           the channel mark: three stacked doodle layers (also the logo glyph)    [c]
//  sd-pencil   L.put(S, "sd-pencil", x, y, { s: 1, rot: -35, len: 420, t })    a pencil; origin = the tip (brand art)                              [tip]
//  sd-dev      L.put(S, "sd-dev", x, feet, { s: 1, face: "smile|wow|smug|thinking|worried|shocked|laugh|…", pose: "stand|point|shrug|armsUp|…",
//                                            hoodie: "#4cc9f0", skin, hair: "messy", phones: true, flip, t })                        [feet]
//  sd-bot      L.put(S, "sd-bot", x, feet, { s: 1, t })         the AI agent robot at its laptop, sticker-rimmed                       [feet]
//  sd-suit     L.put(S, "sd-suit", x, feet, { s: 1, face: "smug|flat|…", pose, suitC: "gray", skin, hair, flip, t })                 [feet]
//  sd-bug      L.put(S, "sd-bug", x, feet, { s: 1, mood: "smug|scared", t })   the Bug, pink                                         [feet]
//  sd-stacky   L.put(S, "sd-stacky", x, feet, { s: 1, face: "grin|wow|smug|wink|laugh|worried", pose: "stand|wave|pencil", look: [dx, dy], legs: true, arms: true, wide: 1 (slab width factor),
//                                            ear: true (pencil behind the top slab; earLen, earRot), sparks: false, pencilLen: 170, pencilRot: -40, pencilGrip: 0.42, pencilTh: 13, handR: [dx, dy], rim: 4.5, t })   the mascot: 3 slabs [feet]
//  L.sdInk     hand-ink helpers for brand art: crPath jit rrPts wobRR inkS fillP slab eyeInk pencilInk spark (see brand/v2/*.js)
// Cast helpers get a cream "sticker" rim (an SVG outline filter) so ink outlines and limbs still read on the dark ground.
(function () {
const L = window.L, f1 = L.f1;
const C = { bg: "#15171c", grid: "#1f2229", paper: "#f4f1e8", paper2: "#e3dece", lime: "#b6f24a", pink: "#ff4d8d", cyan: "#4cc9f0", yellow: "#ffd23f",
  white: "#ffffff", ink: "#1d1b1f", ink2: "#3a363d", gray: "#8b909a", panel: "#242831" };
const col = (n) => C[n] || n;

// ---------- text measuring (Mono is exactly 0.6 em; Mali advance widths measured in Chrome, per 100 px, ASCII 32…126) ----------
const MALI = [35,27,41,62,60,93,74,25,37,37,50,55,31,42,30,56,63,44,56,60,62,58,61,56,62,60,32,35,55,55,55,54,90,70,66,73,71,62,61,76,77,49,62,64,56,81,75,81,66,80,68,61,58,69,66,86,68,66,70,36,49,36,61,57,31,62,64,60,63,60,42,59,58,33,36,54,26,80,57,60,63,64,52,50,44,56,54,77,52,54,56,42,30,42,55];
const cw = (ch, mono) => (mono ? 0.6 : (MALI[ch.charCodeAt(0) - 32] ?? 60) / 100);
const tw = (s, size, mono) => [...String(s)].reduce((a, ch) => a + cw(ch, mono), 0) * size;
L.sdTw = tw; // text width helper for brand/thumbnail sources: L.sdTw(str, size, mono)
const wrap = (s, size, maxW) => {
  const out = []; let cur = "";
  for (const wd of String(s).split(" ")) { const t = cur ? cur + " " + wd : wd; if (cur && tw(t, size) > maxW) { out.push(cur); cur = wd; } else cur = t; }
  if (cur) out.push(cur); return out;
};
const topRound = (x, y, w, h, r) => `M${f1(x)} ${f1(y + h)} V${f1(y + r)} Q${f1(x)} ${f1(y)} ${f1(x + r)} ${f1(y)} H${f1(x + w - r)} Q${f1(x + w)} ${f1(y)} ${f1(x + w)} ${f1(y + r)} V${f1(y + h)} Z`;
const hardShadow = (d, dx = 7, dy = 9, op = 0.55) => L.g(L.flat(d, "#000000", op), `translate(${dx} ${dy})`);

// cream die-cut "sticker" rim around cast so ink outlines/limbs read on graphite
const rim = (inner, r = 5, c = C.paper) => `<filter id="sdrim${Math.round(r * 10)}" x="-20%" y="-20%" width="140%" height="140%"><feMorphology in="SourceAlpha" operator="dilate" radius="${f1(r)}" result="d"/><feFlood flood-color="${c}"/><feComposite in2="d" operator="in" result="rim"/><feMerge><feMergeNode in="rim"/><feMergeNode in="SourceGraphic"/></feMerge></filter><g filter="url(#sdrim${Math.round(r * 10)})">${inner}</g>`;

// ---------- the channel mark: three stacked layers (isometric slabs), top one lime ----------
const mark = () => {
  const slab = (cy, name) => {
    const hw = 96, hh = 46, th = 26, j = L.rng(Math.round(cy) + 5), w = () => (j() - 0.5) * 3;
    const T = [[-hw + w(), cy], [w(), cy - hh + w()], [hw + w(), cy], [w(), cy + hh + w()]];
    const side = (a, b) => L.poly([a, b, [b[0], b[1] + th], [a[0], a[1] + th]], true);
    return L.shape(side(T[0], T[3]), name, { tone: 2, flat: true }) + L.shape(side(T[3], T[2]), name, { tone: 2, flat: true })
      + L.shape(L.poly(T, true), name, { flat: true });
  };
  return slab(50, C.cyan) + slab(10, C.pink) + slab(-30, C.lime)
    + L.stroke(L.smooth([[-50, -33], [-10, -19], [32, -41]]), { c: C.ink, w: 7 }); // a doodle squiggle on the top layer
};
L.reg("sd", "sd-mark", (o) => (o.rim ? rim(mark(), o.rim) : mark()), { box: [-130, -90, 260, 220], group: "Brand", label: "Stack Doodle mark", tags: ["logo", "stack", "layers", "brand"],
  call: 'L.put(S, "sd-mark", x, y, { s, rim: 6, t })' });

// ---------- pencil (origin = the tip; points left-down at rot 0 → draw with rot to aim) ----------
L.reg("sd", "sd-pencil", (o) => {
  const len = o.len || 420, Y = C.yellow, b0 = 100, b1 = b0 + len;
  return L.shape(L.poly([[0, 0], [b0, -36], [b0, 36]], true), C.paper, { flat: true }) + L.shape(L.poly([[0, 0], [34, -13], [34, 13]], true), C.ink, { flat: true, w: "detail" })
    + L.shape(L.rect(b0, -36, len, 72), Y, { flat: true }) + L.stroke(L.line([b0, -12], [b1, -12]), { c: C.ink, w: 4, op: 0.5 }) + L.stroke(L.line([b0, 14], [b1, 14]), { c: C.ink, w: 4, op: 0.5 })
    + L.shape(L.rect(b1, -36, 44, 72), C.gray, { flat: true }) + L.shape(L.rrect(b1 + 44, -34, 58, 68, 26), C.pink, { flat: true });
}, { box: [-20, -60, 700, 120], group: "Brand", label: "Pencil", tags: ["pencil", "doodle", "draw"], call: 'L.put(S, "sd-pencil", x, y, { s: 1, rot: -35, len: 420, t })   // origin = the tip', demo: {} });

// ---------- background ----------
L.reg("sd", "sd-bg", (o) => {
  let s = L.flat(L.rect(-40, -40, 2000, 1160), C.bg);
  let d = ""; for (let x = -60; x <= 1980; x += 60) d += `M${x} -40V1120`; for (let y = -60; y <= 1140; y += 60) d += `M-40 ${y}H1960`;
  s += L.stroke(d, { c: C.grid, w: 2 });
  if (o.glow) {
    const gc = col(o.glow === true ? "lime" : o.glow), id = "sdg" + gc.slice(1), r = o.gr || 700;
    s += `<radialGradient id="${id}"><stop offset="0" stop-color="${gc}" stop-opacity="0.22"/><stop offset="1" stop-color="${gc}" stop-opacity="0"/></radialGradient>`
      + `<ellipse cx="${o.gx ?? 960}" cy="${o.gy ?? 480}" rx="${r}" ry="${r * 0.7}" fill="url(#${id})"/>`;
  }
  if (o.vignette !== false) s += `<radialGradient id="sdvig" cx="0.5" cy="0.5" r="0.75"><stop offset="0.55" stop-color="#000" stop-opacity="0"/><stop offset="1" stop-color="#000" stop-opacity="0.35"/></radialGradient><rect x="-40" y="-40" width="2000" height="1160" fill="url(#sdvig)"/>`;
  return s;
}, { box: [0, 0, 1920, 1080], group: "Frame", label: "Graphite grid ground", tags: ["background", "grid", "dark"],
  call: 'L.put(S, "sd-bg", 0, 0, { glow: "lime|cyan|pink|yellow|#hex", gx, gy, gr, vignette: true })', demo: { glow: "lime", gx: 1400, gy: 380 }, wide: true });

// ---------- chip ----------
L.reg("sd", "sd-chip", (o) => {
  const lines = String(o.text ?? "NEW").split("|"), size = o.size || 46, n = Math.max(...lines.map((l) => l.length));
  const w = n * size * 0.64 + size * 1.1, h = lines.length * size * 1.2 + size * 0.5, c = col(o.c || "lime");
  const d = L.rrect(-w / 2, -h / 2, w, h, size * 0.32);
  let s = hardShadow(d, size * 0.14, size * 0.18) + L.shape(d, c, { flat: true });
  lines.forEach((ln, i) => (s += L.text(ln, 0, (i - (lines.length - 1) / 2) * size * 1.2 + size * 0.35, { size, c: C.ink, font: "Mono", weight: 800, spacing: size * 0.04 })));
  return s;
}, { box: [-300, -80, 600, 160], group: "Labels", label: "Chip (Mono label block)", tags: ["chip", "label", "keyword", "tag"],
  call: 'L.put(S, "sd-chip", x, y, { text: "WE RAN IT", c: "lime|pink|cyan|white|yellow", size: 46, rot: -3, t, pop: true })', demo: { text: "WE RAN IT", c: "lime", rot: 0 } });

// ---------- evidence card ----------
L.reg("sd", "sd-source", (o) => {
  const w = o.w || 880, padX = 44, size = o.size || 36, hs = o.headSize || 50, logoW = o.logo ? 118 : 0;
  const head = wrap(o.head || "", hs, w - 2 * padX - logoW), body = (o.body || []).map((b) => wrap(b, size, w - 2 * padX));
  const hl = [].concat(o.hl === undefined ? [] : o.hl), barH = 62, lineH = size * 1.45, headLH = hs * 1.16;
  const headH = Math.max(head.length * headLH, o.logo ? 96 : 0), bodyH = body.reduce((a, b) => a + b.length * lineH, 0) + Math.max(0, body.length - 1) * 10;
  const h = barH + 30 + headH + 22 + bodyH + (o.date ? 58 : 34), x0 = -w / 2, y0 = -h / 2, r = 26 * L.T.radius;
  let s = hardShadow(L.rrect(x0, y0, w, h, 26), 12, 14, 0.5) + L.shape(L.rrect(x0, y0, w, h, 26), C.paper, { flat: true });
  s += L.flat(topRound(x0 + 1.5, y0 + 1.5, w - 3, barH, Math.max(0, r - 1.5)), C.paper2);
  s += L.stroke(L.line([x0, y0 + barH], [x0 + w, y0 + barH]), { c: C.ink, w: 3 });
  [C.pink, C.yellow, C.lime].forEach((c, i) => (s += L.shape(L.circ(x0 + 38 + i * 36, y0 + barH / 2, 11), c, { flat: true, w: "detail" })));
  s += L.text(o.site || "", x0 + 150, y0 + barH / 2 + 9, { size: 26, c: C.ink2, font: "Mono", weight: 500, anchor: "start" });
  let y = y0 + barH + 30;
  head.forEach((ln, i) => (s += L.text(ln, x0 + padX, y + hs * 0.82 + i * headLH, { size: hs, c: C.ink, anchor: "start", weight: 700 })));
  if (o.logo) s += L.g(L.inline(o.logo, {}), `translate(${f1(x0 + w - padX - 50)} ${f1(y + headH / 2)}) scale(1.05)`);
  y += headH + 22;
  body.forEach((lines, bi) => {
    lines.forEach((ln, li) => {
      const base = y + size * 0.95;
      if (hl.includes(bi)) s += L.g(L.flat(L.rrect(x0 + padX - 12, base - size * 0.92, Math.min(tw(ln, size) * 1.03 + 24, w - 2 * padX + 24), size * 1.3, 9), C.lime), `rotate(-0.6 ${x0 + padX} ${f1(base)})`);
      s += L.text(ln, x0 + padX, base, { size, c: C.ink2, anchor: "start" });
      y += lineH;
    });
    y += 10;
  });
  if (o.date) s += L.text(o.date, x0 + w - padX, y0 + h - 22, { size: 24, c: C.gray, font: "Mono", weight: 500, anchor: "end" });
  return s + L.g(L.flat(L.rect(-70, y0 - 20, 140, 40), C.yellow, 0.85), "rotate(-3 0 " + f1(y0) + ")");
}, { box: [-500, -330, 1000, 660], group: "Labels", label: "Evidence card (source quote, highlighted)", tags: ["source", "evidence", "quote", "card", "news", "highlight"],
  call: 'L.put(S, "sd-source", x, y, { site: "bun.sh/blog", head: "Bun 1.3 is out", body: ["line one", "line two"], hl: 1, logo: "logo-bun", date: "OCT 22, 2026", w: 880, size: 36, t, slide: "up" })',
  demo: { site: "example.dev/blog", head: "Version 3 is out", body: ["It ships a built-in client.", "Startup is twice as fast.", "Nothing else changed."], hl: 1, date: "OCT 22, 2026" } });

// ---------- year stamp ----------
L.reg("sd", "sd-year", (o) => {
  const size = o.size || 240, c = col(o.c || "lime"), yr = String(o.year ?? "2014"), w = tw(yr, size, true);
  let s = L.text(yr, size * 0.04, size * 0.35 + size * 0.05, { size, c, font: "Mono", weight: 800, halo: C.bg, haloW: 0.14 });
  s += L.text(yr, -size * 0.03, size * 0.35 - size * 0.03, { size, c: C.white, font: "Mono", weight: 800, halo: C.bg, haloW: 0.08 });
  s += L.stroke(L.smooth([[-w / 2, size * 0.54], [-w / 6, size * 0.5], [w / 5, size * 0.58], [w / 2, size * 0.52]]), { c, w: size * 0.045 });
  if (o.label) s += L.g(L.inline("sd-chip", { text: o.label, c: o.lc || "yellow", size: size * 0.16 }), `translate(${f1(-w / 2 + size * 0.5)} ${f1(-size * 0.55)}) rotate(-4)`);
  return s;
}, { box: [-460, -200, 920, 400], group: "Labels", label: "Year stamp", tags: ["year", "date", "stamp", "history"],
  call: 'L.put(S, "sd-year", x, y, { year: "2014", c: "lime", size: 240, label: "RELEASED", t, pop: true })', demo: { year: "2014", label: "RELEASED" } });

// ---------- series badge (origin = left-centre; always the same size and place) ----------
const KIND = { "PATCH NOTES": "lime", POSTMORTEM: "pink", DOODLED: "cyan", "CHEAT SHEET": "yellow", LAB: "white" };
L.reg("sd", "sd-badge", (o) => {
  const kind = String(o.kind || "PATCH NOTES").toUpperCase(), c = col(o.c || KIND[kind] || "lime"), h = 84, size = 34;
  const kw = kind.length * size * 0.6 + 40, date = o.date ? String(o.date).toUpperCase() : "", dw = date ? date.length * 28 * 0.6 + 34 : 0;
  let s = hardShadow(L.rrect(0, -h / 2, h + kw + dw, h, 20), 6, 8);
  s += L.shape(L.rrect(0, -h / 2, h + kw + dw, h, 20), C.panel, { flat: true });
  s += L.g(mark(), `translate(${h / 2} 2) scale(0.3)`);
  s += L.shape(L.rrect(h, -h / 2, kw, h, 20), c, { flat: true });
  if (dw) s += L.text(date, h + kw + dw / 2, 10, { size: 28, c: C.white, font: "Mono", weight: 700 });
  s += L.text(kind, h + kw / 2, 12, { size, c: C.ink, font: "Mono", weight: 800 });
  return s;
}, { box: [-10, -60, 680, 120], group: "Labels", label: "Series badge", tags: ["badge", "series", "label"],
  call: 'L.put(S, "sd-badge", x, y, { kind: "PATCH NOTES|POSTMORTEM|DOODLED|CHEAT SHEET|LAB", date: "OCT 22", c, s, t })   // origin = left-centre', demo: { kind: "PATCH NOTES", date: "OCT 22" } });

// ---------- counter (origin = left-centre) ----------
L.reg("sd", "sd-counter", (o) => {
  const size = o.size || 34, a = "#" + String(o.n ?? 1).padStart(2, "0"), b = o.of ? "/" + o.of : "", w = tw(a + b, size, true) + size * 1.1, h = size * 1.7;
  const d = L.rrect(0, -h / 2, w, h, h * 0.3);
  return hardShadow(d, 5, 7) + L.shape(d, C.panel, { flat: true }) + L.text(a, size * 0.55, size * 0.35, { size, c: C.lime, font: "Mono", weight: 800, anchor: "start" })
    + (b ? L.text(b, size * 0.55 + tw(a, size, true), size * 0.35, { size, c: C.gray, font: "Mono", weight: 700, anchor: "start" }) : "");
}, { box: [-10, -40, 260, 80], group: "Labels", label: "Counter #07/40", tags: ["counter", "number", "series"],
  call: 'L.put(S, "sd-counter", x, y, { n: 7, of: 40, size: 34, t })   // origin = left-centre', demo: { n: 7, of: 40 } });

// ---------- vs ----------
L.reg("sd", "sd-vs", (o) => {
  const cw2 = o.cw || 440, ch = o.ch || 330, gap = 330;
  const card = (x, label, logo, sub) => {
    const d = L.rrect(x - cw2 / 2, -ch / 2, cw2, ch, 28);
    let s = hardShadow(d, 10, 12, 0.5) + L.shape(d, C.paper, { flat: true });
    const hasLogo = logo && L.get(logo);
    if (hasLogo) s += L.g(L.inline(logo, {}), `translate(${x} ${-ch * 0.22}) scale(1.5)`);
    const ty = hasLogo ? ch * 0.19 : (sub ? 0 : 20);
    s += L.text(label || "", x, ty + 20, { size: Math.min(80, (cw2 - 60) / Math.max(1, (label || "").length * 0.62)), c: C.ink, weight: 700 });
    if (sub) s += L.text(sub, x, ch * 0.42, { size: 30, c: C.ink2, font: "Mono", weight: 600 });
    return s;
  };
  const star = L.star(0, 0, 112, 78, 9, -90);
  return card(-gap, o.a, o.logoA, o.subA) + card(gap, o.b, o.logoB, o.subB)
    + hardShadow(star, 8, 10) + L.shape(star, C.yellow, { flat: true }) + L.text("VS", 0, 24, { size: 76, c: C.ink, font: "Mono", weight: 800 });
}, { box: [-640, -200, 1280, 400], group: "Labels", label: "A VS B", tags: ["versus", "compare", "vs", "comparison"],
  call: 'L.put(S, "sd-vs", x, y, { a: "BUN", b: "NODE", logoA: "logo-bun", logoB: "logo-nodedotjs", subA: "new", subB: "old", t })', demo: { a: "BUN", b: "NODE", subA: "new", subB: "old" } });

// ---------- pointing hand (tip = origin, points right at rot 0) ----------
L.reg("sd", "sd-hand", () => {
  // one merged yellow silhouette (outline under, fill over) + a few inner finger lines; cuff = cream sleeve
  const R = (x, y, w, h) => L.rrect(x, y, w, h, Math.min(w, h) / 2), lw = L.lw("prop");
  const parts = [L.rrect(-250, -52, 150, 140, 48), R(-150, -58, 190, 40), R(-150, -4, 84, 32), R(-146, 28, 78, 32), R(-138, 60, 66, 30), R(-198, -86, 108, 40)];
  const under = parts.map((d) => L.tag("path", { d, fill: C.ink, stroke: C.ink, "stroke-width": lw * 2, "stroke-linejoin": "round" })).join("");
  const over = parts.map((d) => L.flat(d, C.yellow)).join("");
  const lines = L.stroke(L.line([-146, 28], [-80, 28]), { c: C.ink, w: 4 }) + L.stroke(L.line([-140, 60], [-76, 60]), { c: C.ink, w: 4 }) + L.stroke(L.line([-148, -4], [-86, -4]), { c: C.ink, w: 4 })
    + L.stroke(L.smooth([[-100, -46], [-92, -34], [-100, -22]]), { c: C.ink, w: 4 });
  return rim(L.g(L.shape(L.rrect(-312, -66, 66, 164, 14), C.paper, { flat: true }) + under + over + lines, "translate(-40 38)"), 3.5);
}, { box: [-360, -90, 410, 220], group: "Pointers", label: "Pointing hand", tags: ["hand", "point", "look here", "cursor"],
  call: 'L.put(S, "sd-hand", x, y, { s: 1, rot: 0, t, pop: true })   // origin = fingertip; rot in degrees (0 = points right, 90 = points down)', demo: {} });

// ---------- hand-drawn arrow (origin = start) ----------
L.reg("sd", "sd-arrow", (o) => {
  const [dx, dy] = o.to || [260, 0], len = Math.hypot(dx, dy) || 1, b = (o.bend ?? 0.3) * len, w = o.w || 10, c = col(o.c || "lime");
  const mx = dx / 2 - (dy / len) * b, my = dy / 2 + (dx / len) * b, a = Math.atan2(dy - my, dx - mx), hl = Math.max(34, w * 4);
  const path = `M0 0 Q${f1(mx)} ${f1(my)} ${f1(dx)} ${f1(dy)}`, head = (k) => `M${f1(dx - Math.cos(a + k) * hl)} ${f1(dy - Math.sin(a + k) * hl)} L${f1(dx)} ${f1(dy)}`;
  const both = path + head(0.5) + head(-0.5);
  return L.stroke(both, { c: C.bg, w: w + 9 }) + L.stroke(both, { c, w });
}, { box: [-40, -200, 400, 400], group: "Pointers", label: "Hand-drawn arrow", tags: ["arrow", "curved", "point"],
  call: 'L.put(S, "sd-arrow", x, y, { to: [dx, dy], bend: 0.3, c: "lime|white|cyan|pink|yellow", w: 10, t })   // origin = start of the arrow', demo: { to: [300, 80], bend: -0.3 } });

// ---------- sting (the 1-s channel mark) ----------
L.reg("sd", "sd-sting", () => {
  const word = "STACK DOODLE", size = 78, w = tw(word, size, true);
  return L.g(mark(), `translate(${f1(-w / 2 - 30)} -10) scale(0.52)`)
    + L.text(word, 90, 10, { size, c: C.white, font: "Mono", weight: 800, halo: C.bg, haloW: 0.1 })
    + L.stroke(L.smooth([[-w / 2 + 120, 48], [0, 40], [w / 2 + 70, 50]]), { c: C.lime, w: 9 });
}, { box: [-560, -110, 1120, 220], group: "Brand", label: "Channel sting", tags: ["logo", "sting", "outro", "intro"],
  call: 'L.put(S, "sd-sting", x, y, { s: 1, t })', demo: {} });

// ---------- speech bubble ----------
L.reg("sd", "sd-bubble", (o) => {
  const lines = String(o.text ?? "WAIT...").split("|"), size = o.size || 48, c = col(o.c || "paper");
  const w = Math.max(...lines.map((l) => tw(l, size))) + size * 1.4, h = lines.length * size * 1.2 + size * 0.7, x0 = -w / 2, y0 = -h / 2;
  const tx = o.tx ?? -w * 0.2, ty = o.ty ?? h / 2 + 90, side = Math.abs(ty) - h / 2 > Math.abs(tx) - w / 2 ? (ty > 0 ? "b" : "t") : tx > 0 ? "r" : "l";
  const k = size * 0.45; let a, b, up;
  if (side === "b" || side === "t") { const bx = Math.max(x0 + 40, Math.min(x0 + w - 40, tx * 0.5)), yy = side === "b" ? h / 2 : -h / 2, e = side === "b" ? -5 : 5; a = [bx - k, yy]; b = [bx + k, yy]; up = [[bx - k, yy + e], [bx + k, yy + e]]; }
  else { const by = Math.max(y0 + 40, Math.min(y0 + h - 40, ty * 0.5)), xx = side === "r" ? w / 2 : -w / 2, e = side === "r" ? -5 : 5; a = [xx, by - k]; b = [xx, by + k]; up = [[xx + e, by - k], [xx + e, by + k]]; }
  let s = hardShadow(L.rrect(x0, y0, w, h, size * 0.5), 8, 10, 0.5) + L.shape(L.rrect(x0, y0, w, h, size * 0.5), c, { flat: true });
  s += L.flat(L.poly([a, [tx, ty], b, up[1], up[0]], true), c) + L.stroke(L.poly([a, [tx, ty], b]), { c: C.ink, w: "prop" });
  lines.forEach((ln, i) => (s += L.text(ln, 0, (i - (lines.length - 1) / 2) * size * 1.2 + size * 0.33, { size, c: C.ink, weight: 700 })));
  return s;
}, { box: [-420, -150, 840, 380], group: "Cast", label: "Speech bubble", tags: ["bubble", "speech", "say", "cast"],
  call: 'L.put(S, "sd-bubble", x, y, { text: "WAIT|WHAT?", size: 48, tx: -90, ty: 130, c: "paper", t })   // tx,ty = tail tip relative to the bubble centre', demo: { text: "WAIT...|WHAT?" } });

// ---------- cast ----------
const hood = (c, s) => { // hood behind the head, drawstrings + pocket in front; person(man06, s) head ≈ (0,-310)·s, torso x ±40, y -259…-116
  const back = L.shape(L.circ(0, -285 * s, 64 * s, 46 * s), c, { flat: true, tone: 2 }), pocket = L.shape(L.rrect(-34 * s, -176 * s, 68 * s, 40 * s, 10 * s), c, { flat: true, tone: 2, w: "detail" });
  const cords = L.stroke(L.poly([[-12 * s, -252 * s], [-14 * s, -214 * s]]), { c: C.paper, w: 4 * Math.sqrt(s) }) + L.stroke(L.poly([[12 * s, -252 * s], [14 * s, -214 * s]]), { c: C.paper, w: 4 * Math.sqrt(s) });
  return { back, front: pocket + cords };
};
const phones = (s) => { // lime headphones: band over the hair + cups at the ears
  const band = L.arc(0, -318 * s, 56 * s, 188, 352, 64 * s);
  return L.stroke(band, { c: C.ink, w: 15 * Math.sqrt(s) }) + L.stroke(band, { c: C.lime, w: 8 * Math.sqrt(s) })
    + [-1, 1].map((d) => L.shape(L.rrect(d * 51 * s - 11 * s, -330 * s, 22 * s, 44 * s, 10 * s), C.lime, { flat: true })).join("");
};
const person = (st, o, extra) => L.inline("person", Object.assign({ style: st }, extra, { s: o.s || 1, face: o.face || "smile", pose: o.pose || "stand" }));
const side = (inner, o) => (o.flip ? L.g(inner, "scale(-1 1)") : inner);
L.reg("sd", "sd-dev", (o) => {
  const s = o.s || 1, hd = hood(o.hoodie || C.cyan, s);
  const body = person("man06", o, { outfit: "hoodie", outfitC: o.hoodie || C.cyan, hair: o.hair || "messy", skin: o.skin, shadow: false });
  return rim(side(hd.back + body + hd.front + (o.phones === false ? "" : phones(s)), o), 4.5 * Math.sqrt(s));
}, { selfScale: true, box: [-200, -420, 400, 440], group: "Cast", label: "Dev (hoodie + headphones)", tags: ["dev", "developer", "cast", "hoodie", "character"],
  call: 'L.put(S, "sd-dev", x, feet, { s: 1, face: "smile|wow|smug|thinking|worried|shocked|laugh", pose: "stand|point|shrug|armsUp", hoodie: "#4cc9f0", skin, hair: "messy", phones: true, flip, t })', demo: { face: "wow" } });
const suitFront = (s) => { // white shirt V, dark lapels, pink tie on person(man05)'s torso (x ±48, y -260…-114)
  const sh = L.shape(L.poly([[-22 * s, -262 * s], [0, -168 * s], [22 * s, -262 * s]], true), C.paper, { flat: true, w: "detail" });
  const lap = L.stroke(L.poly([[-30 * s, -262 * s], [-6 * s, -176 * s], [-26 * s, -140 * s]]), { c: C.ink, w: 4 * Math.sqrt(s) }) + L.stroke(L.poly([[30 * s, -262 * s], [6 * s, -176 * s], [26 * s, -140 * s]]), { c: C.ink, w: 4 * Math.sqrt(s) });
  const tie = L.shape(L.poly([[-8 * s, -250 * s], [8 * s, -250 * s], [5 * s, -226 * s], [11 * s, -188 * s], [0, -170 * s], [-11 * s, -188 * s], [-5 * s, -226 * s]], true), C.pink, { flat: true, w: "detail" });
  return sh + lap + tie;
};
L.reg("sd", "sd-suit", (o) => rim(side(person("man05", o, { outfit: "suit", outfitC: o.suitC || "gray", hair: o.hair || "sidepart", skin: o.skin, shadow: false }) + suitFront(o.s || 1), o), 4.5 * Math.sqrt(o.s || 1)),
  { selfScale: true, box: [-200, -420, 400, 440], group: "Cast", label: "Suit (executive, vendor, lawyer)", tags: ["suit", "ceo", "executive", "vendor", "cast", "character"],
    call: 'L.put(S, "sd-suit", x, feet, { s: 1, face: "smug|flat|worried|…", pose, suitC: "gray", skin, hair, flip, t })', demo: { face: "smug" } });
L.reg("sd", "sd-bot", (o) => rim(side(L.inline("dev-agent-robot", {}), o), 5),
  { box: [-210, -470, 420, 500], group: "Cast", label: "AI agent robot", tags: ["bot", "robot", "agent", "ai", "cast"], call: 'L.put(S, "sd-bot", x, feet, { s: 1, flip, t })', demo: {} });
L.reg("sd", "sd-bug", (o) => `<filter id="sdpink" color-interpolation-filters="sRGB"><feColorMatrix type="hueRotate" values="-22"/></filter>` + rim(side(`<g filter="url(#sdpink)">${L.inline("dev-bug", { mood: o.mood })}</g>`, o), 5),
  { box: [-160, -230, 320, 270], group: "Cast", label: "The Bug (pink)", tags: ["bug", "defect", "glitch", "cast"], call: 'L.put(S, "sd-bug", x, feet, { s: 1, mood: "smug|scared", flip, t })', demo: { mood: "smug" } });
// ---------- Stacky: the channel mascot (three hand-inked slabs; the ink helpers are shared with brand art via L.sdInk) ----------
let inkUid = 0;
const crPath = (pts, closed) => { // Catmull-Rom through pts -> cubic path
  const n = pts.length, g = (i) => (closed ? pts[(i + n) % n] : pts[Math.max(0, Math.min(n - 1, i))]);
  let d = `M${f1(pts[0][0])} ${f1(pts[0][1])}`;
  for (let i = 0; i < (closed ? n : n - 1); i++) {
    const p0 = g(i - 1), p1 = g(i), p2 = g(i + 1), p3 = g(i + 2);
    d += ` C${f1(p1[0] + (p2[0] - p0[0]) / 6)} ${f1(p1[1] + (p2[1] - p0[1]) / 6)} ${f1(p2[0] - (p3[0] - p1[0]) / 6)} ${f1(p2[1] - (p3[1] - p1[1]) / 6)} ${f1(p2[0])} ${f1(p2[1])}`;
  }
  return d + (closed ? "Z" : "");
};
const jit = (pts, a, seed) => { const r = L.rng(seed); return pts.map(([x, y]) => [x + (r() - 0.5) * 2 * a, y + (r() - 0.5) * 2 * a]); };
const rrPts = (x, y, w, h, r, step = 36) => { // points round a rounded rect (clockwise), dense enough for a wobbly hand-inked outline
  const out = [], arc = (cx, cy, a0) => { for (let k = 0; k <= 3; k++) { const a = ((a0 + k * 30) * Math.PI) / 180; out.push([cx + Math.cos(a) * r, cy + Math.sin(a) * r]); } };
  const seg = (a, b) => { const n = Math.max(1, Math.round(Math.hypot(b[0] - a[0], b[1] - a[1]) / step)); for (let i = 1; i < n; i++) out.push([a[0] + ((b[0] - a[0]) * i) / n, a[1] + ((b[1] - a[1]) * i) / n]); };
  arc(x + r, y + r, 180); seg([x + r, y], [x + w - r, y]);
  arc(x + w - r, y + r, 270); seg([x + w, y + r], [x + w, y + h - r]);
  arc(x + w - r, y + h - r, 0); seg([x + w - r, y + h], [x + r, y + h]);
  arc(x + r, y + h - r, 90); seg([x, y + h - r], [x, y + r]);
  return out;
};
const wobRR = (x, y, w, h, r, seed, amp = 1.6) => crPath(jit(rrPts(x, y, w, h, r), amp, seed), true);
const inkS = (d, w = 7, c = C.ink) => `<path d="${d}" fill="none" stroke="${c}" stroke-width="${w}" stroke-linejoin="round" stroke-linecap="round"/>`;
const fillP = (d, c, op = 1) => `<path d="${d}" fill="${c}"${op < 1 ? ` fill-opacity="${op}"` : ""}/>`;
const slab = (cx, cy, w, h, c, seed, rot = 0) => { // one fat rounded slab: fill, darker underside, gloss, ink outline
  const id = "sdsl" + inkUid++, d = wobRR(cx - w / 2, cy - h / 2, w, h, Math.min(26, h * 0.4), seed);
  return L.g(`<clipPath id="${id}"><path d="${d}"/></clipPath>` + fillP(d, c)
    + `<g clip-path="url(#${id})"><rect x="${f1(cx - w / 2)}" y="${f1(cy + h * 0.2)}" width="${w}" height="${h}" fill="#000" fill-opacity="0.17"/></g>`
    + inkS(d) + inkS(`M${f1(cx - w / 2 + 24)} ${f1(cy - h / 2 + 14)} h${f1(w * 0.2)}`, 5, "rgba(255,255,255,0.6)"), rot ? `rotate(${rot} ${f1(cx)} ${f1(cy)})` : "");
};
const eyeInk = (x, y, r, dx = 0, dy = 0) => `<ellipse cx="${f1(x)}" cy="${f1(y)}" rx="${f1(r)}" ry="${f1(r * 1.12)}" fill="#fff" stroke="${C.ink}" stroke-width="5.5"/>`
  + `<circle cx="${f1(x + dx)}" cy="${f1(y + dy)}" r="${f1(r * 0.5)}" fill="${C.ink}"/><circle cx="${f1(x + dx - r * 0.16)}" cy="${f1(y + dy - r * 0.2)}" r="${f1(r * 0.17)}" fill="#fff"/>`;
const pencilInk = (len = 150, th) => { // hand-inked pencil, tip at the origin, body along +x
  const h = th || Math.max(13, len * 0.085), a = len * 0.2, b = len * 0.86, e = len * 0.93;
  const J = (d, fill) => fillP(d, fill) + inkS(d, Math.max(5, h * 0.4));
  return J(`M0 0 L${f1(a)} ${f1(-h)} L${f1(a)} ${f1(h)}Z`, C.paper) + fillP(`M0 0 L${f1(a * 0.36)} ${f1(-h * 0.36)} L${f1(a * 0.36)} ${f1(h * 0.36)}Z`, C.ink)
    + J(`M${f1(a)} ${f1(-h)} H${f1(b)} V${f1(h)} H${f1(a)}Z`, C.yellow) + inkS(`M${f1(a + 4)} ${f1(-h * 0.3)} H${f1(b)} M${f1(a + 4)} ${f1(h * 0.34)} H${f1(b)}`, Math.max(2.5, h * 0.18), "rgba(29,27,31,0.45)")
    + J(`M${f1(b)} ${f1(-h)} H${f1(e)} V${f1(h)} H${f1(b)}Z`, C.gray) + J(wobRR(e, -h, len - e, h * 2, h * 0.7, 7, 0.4), C.pink);
};
const spark = (x, y, r, c, rot = 0) => L.g(inkS(`M${-r} 0 H${r} M0 ${-r} V${r}`, 6, C.ink) + inkS(`M${-r} 0 H${r} M0 ${-r} V${r}`, 3.2, c), `translate(${f1(x)} ${f1(y)}) rotate(${rot})`);
L.sdInk = { crPath, jit, rrPts, wobRR, inkS, fillP, slab, eyeInk, pencilInk, spark };

const stackyFace = (face, tx, ty, look) => {
  const [lx, ly] = look, brow = (x, y, a, w = 22) => inkS(`M${f1(x - w / 2)} ${f1(y + a)} L${f1(x + w / 2)} ${f1(y - a)}`, 5.5), cheeks = fillP(`M${tx - 78} ${ty + 24} a16 9 0 1 0 32 0 a16 9 0 1 0 -32 0Z`, C.pink, 0.55) + fillP(`M${tx + 46} ${ty + 24} a16 9 0 1 0 32 0 a16 9 0 1 0 -32 0Z`, C.pink, 0.55);
  const grin = (o = 0) => fillP(`M${tx - 34} ${ty + 20} Q${tx} ${ty + 26} ${tx + 34} ${ty + 20} Q${tx + 30} ${ty + 54 + o} ${tx} ${ty + 56 + o} Q${tx - 30} ${ty + 54 + o} ${tx - 34} ${ty + 20}Z`, C.ink)
    + fillP(`M${tx - 14} ${ty + 46 + o} a14 9 0 0 1 28 0 a14 9 0 0 1 -28 0Z`, C.pink) + fillP(`M${tx - 26} ${ty + 20} H${tx + 26} V${ty + 28} Q${tx} ${ty + 33} ${tx - 26} ${ty + 28}Z`, "#fff")
    + inkS(`M${tx - 34} ${ty + 20} Q${tx} ${ty + 26} ${tx + 34} ${ty + 20} Q${tx + 30} ${ty + 54 + o} ${tx} ${ty + 56 + o} Q${tx - 30} ${ty + 54 + o} ${tx - 34} ${ty + 20}Z`, 5.5);
  const E = (r = 21, dy = -8) => eyeInk(tx - 36, ty + dy, r, lx, ly) + eyeInk(tx + 36, ty + dy, r, lx, ly);
  switch (face) {
    case "wow": return E(24, -10) + brow(tx - 36, ty - 44, 5) + brow(tx + 36, ty - 44, -5) + fillP(`M${tx - 14} ${ty + 30} a14 18 0 1 0 28 0 a14 18 0 1 0 -28 0Z`, C.ink) + inkS(`M${tx - 14} ${ty + 30} a14 18 0 1 0 28 0 a14 18 0 1 0 -28 0Z`, 5);
    case "smug": return eyeInk(tx - 36, ty - 6, 21, lx, ly + 3) + eyeInk(tx + 36, ty - 6, 21, lx, ly + 3)
      + [-36, 36].map((o) => fillP(`M${tx + o - 24} ${ty - 6} A24 24 0 0 1 ${tx + o + 24} ${ty - 6}Z`, C.lime) + inkS(`M${tx + o - 25} ${ty - 6} H${tx + o + 25}`, 5.5)).join("")
      + inkS(`M${tx - 26} ${ty + 30} Q${tx + 8} ${ty + 46} ${tx + 40} ${ty + 22}`, 6) + inkS(`M${tx + 40} ${ty + 22} l5 -5`, 5) + cheeks;
    case "wink": return eyeInk(tx - 36, ty - 8, 21, lx, ly) + inkS(`M${tx + 18} ${ty - 2} Q${tx + 36} ${ty - 22} ${tx + 54} ${ty - 2}`, 6.5) + grin(0) + cheeks;
    case "laugh": return inkS(`M${tx - 58} ${ty - 2} Q${tx - 36} ${ty - 24} ${tx - 14} ${ty - 2} M${tx + 14} ${ty - 2} Q${tx + 36} ${ty - 24} ${tx + 58} ${ty - 2}`, 6.5) + grin(8) + cheeks;
    case "worried": return E(21, -6) + brow(tx - 36, ty - 40, 6) + brow(tx + 36, ty - 40, -6) + inkS(`M${tx - 26} ${ty + 40} Q${tx - 13} ${ty + 28} ${tx} ${ty + 40} T${tx + 26} ${ty + 40}`, 6)
      + fillP(`M${tx + 78} ${ty - 34} q-10 18 0 24 q10 -6 0 -24Z`, C.cyan) + inkS(`M${tx + 78} ${ty - 34} q-10 18 0 24 q10 -6 0 -24Z`, 3.5);
    default: return E() + grin(0) + cheeks;
  }
};
L.reg("sd", "sd-stacky", (o) => {
  const face = o.face || "grin", pose = o.pose || "stand", look = o.look || (pose === "pencil" ? [-5, 4] : [0, 1]), legs = o.legs !== false, lg = legs ? 26 : 0;
  const wd = o.wide ?? 1, bw = 300 * wd, bh = 76, mw = 272 * wd, mh = 72, tw_ = 246 * wd, th = 104, yb = -lg - bh / 2, ym = -lg - bh - mh / 2 + 3, yt = -lg - bh - mh - th / 2 + 6, tx = -7;
  const arm = (x0, y0, x1, y1, bend) => inkS(`M${x0} ${y0} Q${f1((x0 + x1) / 2 + bend)} ${f1((y0 + y1) / 2 + Math.abs(bend) * 0.4)} ${x1} ${y1}`, 9);
  const mitten = (x, y) => fillP(`M${x - 11} ${y} a11 11 0 1 0 22 0 a11 11 0 1 0 -22 0Z`, C.paper) + inkS(`M${x - 11} ${y} a11 11 0 1 0 22 0 a11 11 0 1 0 -22 0Z`, 5);
  let back = "";
  if (legs) [-62, 62].forEach((x) => (back += inkS(`M${x} ${-lg} V${-4}`, 8) + fillP(`M${x - 20} -2 a20 10 0 0 1 40 0 v4 h-40z`, C.paper) + inkS(`M${x - 20} -2 a20 10 0 0 1 40 0 v4 h-40z`, 5)));
  const handR = o.handR || (pose === "wave" ? [196, ym - 92] : pose === "pencil" ? [204, ym - 14] : [182, ym + 40]), handL = [-182, ym + 40];
  if (o.arms !== false) {
    back += arm(-mw / 2 + 6, ym - 4, handL[0], handL[1], -16);
    back += arm(mw / 2 + 14, ym - 4, handR[0], handR[1], pose === "wave" ? 34 : pose === "pencil" ? 8 : 16);
  }
  if (pose !== "pencil" && o.ear !== false) back += L.g(pencilInk(o.earLen || 150), `translate(${f1(o.earX ?? 46)} ${f1(yt - 6)}) rotate(${o.earRot ?? -50})`); // tucked behind the "ear"
  let s = back + slab(0, yb, bw, bh, C.cyan, 11) + slab(9, ym, mw, mh, C.pink, 23, 1.2) + slab(tx, yt, tw_, th, C.lime, 37, -2.5);
  // doodles on the slabs: server LEDs on the bottom one, text lines on the middle one
  s += fillP(`M${bw / 2 - 58} ${yb - 4} a7 7 0 1 0 14 0 a7 7 0 1 0 -14 0Z`, C.yellow) + inkS(`M${bw / 2 - 58} ${yb - 4} a7 7 0 1 0 14 0 a7 7 0 1 0 -14 0Z`, 3.5) + fillP(`M${bw / 2 - 90} ${yb - 4} a7 7 0 1 0 14 0 a7 7 0 1 0 -14 0Z`, C.paper) + inkS(`M${bw / 2 - 90} ${yb - 4} a7 7 0 1 0 14 0 a7 7 0 1 0 -14 0Z`, 3.5);
  s += inkS(`M-96 ${ym - 8} q12 -9 24 0 t24 0 t24 0 M-96 ${ym + 12} q12 -9 24 0 t24 0`, 4.5, "rgba(29,27,31,0.55)");
  s += L.g(stackyFace(face, tx, yt + 2, look), `rotate(-2.5 ${tx} ${yt})`);
  if (o.arms === false) { /* no arms */ } else if (pose === "wave") s += mitten(...handL) + mitten(...handR) + inkS(`M${handR[0] + 26} ${handR[1] - 14} l14 -8 M${handR[0] + 28} ${handR[1] + 6} l17 0`, 4.5);
  else if (pose === "pencil") {
    const len = o.pencilLen || 170, rot = o.pencilRot ?? -40, a = (rot * Math.PI) / 180, g = len * (o.pencilGrip ?? 0.42);
    s += L.g(pencilInk(len, o.pencilTh), `translate(${f1(handR[0] - Math.cos(a) * g)} ${f1(handR[1] - Math.sin(a) * g)}) rotate(${rot})`) + mitten(...handL) + mitten(...handR);
  } else s += mitten(...handL) + mitten(...handR);
  if (o.sparks) s += spark(-150, yt - 70, 13, C.yellow, 8) + spark(-176, yt - 22, 8, C.cyan, 0) + spark(140, yt - 92, 9, C.pink, 12);
  return o.rim === 0 ? s : rim(s, o.rim ?? 4.5);
}, { box: [-260, -340, 520, 360], group: "Brand", label: "Stacky (the mascot)", tags: ["stacky", "mascot", "logo", "stack", "slabs", "brand", "character"],
  call: 'L.put(S, "sd-stacky", x, feet, { s: 1, face: "grin|wow|smug|wink|laugh|worried", pose: "stand|wave|pencil", look: [dx, dy], legs: true, arms: true, wide: 1, ear: true, earLen: 150, earRot: -50, sparks: false, pencilLen: 170, pencilRot: -40, pencilGrip: 0.42, pencilTh: 13, handR: [dx, dy], rim: 4.5 (0 = none), t })', demo: { face: "grin" } });
})();
