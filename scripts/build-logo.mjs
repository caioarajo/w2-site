/**
 * Gera os arquivos da marca W2 (versão 05.3: "w" + "2" em azul) a partir das fontes.
 * As letras viram desenho vetorial (paths), então os SVGs não dependem de fonte instalada.
 *
 * Uso: npm run logo
 * Saída: public/brand/*.svg e *.png, app/icon.svg, app/apple-icon.png, lib/logo-paths.ts
 */
import { readFileSync, writeFileSync, mkdirSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';
import opentype from 'opentype.js';
import sharp from 'sharp';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');
const font = (pkg, file) =>
  opentype.parse(readFileSync(join(root, 'node_modules/@fontsource', pkg, 'files', file)).buffer);

const unbounded = {
  300: font('unbounded', 'unbounded-latin-300-normal.woff'),
  400: font('unbounded', 'unbounded-latin-400-normal.woff'),
};
const manrope = font('manrope', 'manrope-latin-500-normal.woff');

// ---------- Paleta ----------
const C = { ink: '#0b0b10', cream: '#f3efe6', cobalt: '#3b5bff', white: '#ffffff', black: '#000000' };

// ---------- Texto → paths ----------
/** Desenha `text` a partir de (x, baseline); retorna um path por caractere e a largura. */
function glyphs(f, text, size, x, baseline, letterSpacingEm = 0) {
  const scale = size / f.unitsPerEm;
  const out = [];
  let prev = null;
  for (const ch of text) {
    const g = f.charToGlyph(ch);
    if (prev) x += f.getKerningValue(prev, g) * scale;
    out.push({ ch, path: g.getPath(x, baseline, size) });
    x += g.advanceWidth * scale + letterSpacingEm * size;
    prev = g;
  }
  return out;
}

const bbox = (paths) => {
  const b = { x1: Infinity, y1: Infinity, x2: -Infinity, y2: -Infinity };
  for (const p of paths) {
    const r = p.getBoundingBox();
    if (r.x1 === r.x2) continue; // espaço
    b.x1 = Math.min(b.x1, r.x1); b.y1 = Math.min(b.y1, r.y1);
    b.x2 = Math.max(b.x2, r.x2); b.y2 = Math.max(b.y2, r.y2);
  }
  return b;
};

const r2 = (n) => Math.round(n * 100) / 100;

/** Path → atributo `d`. (O toPathData da opentype.js 2.0 gera NaN em alguns pontos; por isso a conversão própria.) */
function d(p) {
  const n = (v) => {
    if (!Number.isFinite(v)) throw new Error(`Coordenada inválida no glifo: ${v}`);
    return String(r2(v));
  };
  return p.commands
    .map((c) => {
      switch (c.type) {
        case 'M': case 'L': return `${c.type}${n(c.x)} ${n(c.y)}`;
        case 'Q': return `Q${n(c.x1)} ${n(c.y1)} ${n(c.x)} ${n(c.y)}`;
        case 'C': return `C${n(c.x1)} ${n(c.y1)} ${n(c.x2)} ${n(c.y2)} ${n(c.x)} ${n(c.y)}`;
        case 'Z': return 'Z';
        default: throw new Error(`Comando de path desconhecido: ${c.type}`);
      }
    })
    .join('');
}

// ---------- Símbolo "w2" ----------
/** Retorna os paths do w e do 2 já posicionados com o canto superior esquerdo em (0,0). */
function symbol(weight, size = 100) {
  const f = unbounded[weight];
  const first = glyphs(f, 'w2', size, 0, 0, -0.06);
  const b = bbox(first.map((g) => g.path));
  const [w, two] = glyphs(f, 'w2', size, -b.x1, -b.y1, -0.06);
  return { w: d(w.path), two: d(two.path), width: r2(b.x2 - b.x1), height: r2(b.y2 - b.y1) };
}

const sym300 = symbol(300);
const sym400 = symbol(400);

// ---------- Assinatura "comunicação / e consultoria" ----------
function tagline(size) {
  const lineH = size * 1.3;
  const l1 = glyphs(manrope, 'comunicação', size, 0, size, 0);
  const l2 = glyphs(manrope, 'e consultoria', size, 0, size + lineH, 0);
  const all = [...l1, ...l2].map((g) => g.path);
  const b = bbox(all);
  return { d: all.map(d).join(''), width: b.x2, top: b.y1, height: b.y2 - b.y1, blockH: size + lineH + size * 0.25 };
}

// ---------- Montagem dos SVGs ----------
const svg = (w, h, body, title) =>
  `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${r2(w)} ${r2(h)}" width="${r2(w)}" height="${r2(h)}" role="img" aria-label="${title}">` +
  `<title>${title}</title>${body}</svg>\n`;

function symbolSvg(s, wColor, twoColor) {
  return svg(s.width, s.height, `<path fill="${wColor}" d="${s.w}"/><path fill="${twoColor}" d="${s.two}"/>`, 'W2 Comunicação e Consultoria');
}

/** Logo horizontal: símbolo + fio vertical + assinatura em duas linhas (proporções da prancha 05.3). */
function lockupSvg(s, wColor, twoColor, textColor, ruleOpacity) {
  // Na prancha: w2 a 132px; assinatura a 19px; 30px de espaço; fio + 24px até o texto.
  const k = s.height / 96; // altura do símbolo em px na prancha ≈ 96 (132px de corpo)
  const t = tagline(19 * k);
  const gap = 30 * k;
  const pad = 24 * k;
  const ruleH = t.blockH;
  const H = Math.max(s.height, ruleH);
  const symY = (H - s.height) / 2;
  const ruleX = s.width + gap;
  const ruleY = (H - ruleH) / 2;
  const textX = ruleX + pad;
  const textY = ruleY;
  const W = textX + t.width;
  const body =
    `<g transform="translate(0 ${r2(symY)})"><path fill="${wColor}" d="${s.w}"/><path fill="${twoColor}" d="${s.two}"/></g>` +
    `<rect x="${r2(ruleX)}" y="${r2(ruleY)}" width="${r2(Math.max(1, k))}" height="${r2(ruleH)}" fill="${textColor}" fill-opacity="${ruleOpacity}"/>` +
    `<g transform="translate(${r2(textX)} ${r2(textY)})"><path fill="${textColor}" d="${t.d}"/></g>`;
  return svg(W, H, body, 'W2 Comunicação e Consultoria');
}

/** Ícone quadrado com fundo, símbolo centralizado ocupando `fill` da largura. */
function iconSvg(s, size, bg, wColor, twoColor, radius, fill = 0.62) {
  const scale = (size * fill) / s.width;
  const x = (size - s.width * scale) / 2;
  const y = (size - s.height * scale) / 2;
  const body =
    `<rect width="${size}" height="${size}" rx="${radius}" fill="${bg}"/>` +
    `<g transform="translate(${r2(x)} ${r2(y)}) scale(${r2(scale * 1000) / 1000})"><path fill="${wColor}" d="${s.w}"/><path fill="${twoColor}" d="${s.two}"/></g>`;
  return svg(size, size, body, 'W2');
}

// ---------- Gravação ----------
const out = (rel, content) => {
  const p = join(root, rel);
  mkdirSync(dirname(p), { recursive: true });
  writeFileSync(p, content);
  console.log('  ✓', rel);
};
const png = async (rel, svgText, width) => {
  const p = join(root, rel);
  mkdirSync(dirname(p), { recursive: true });
  await sharp(Buffer.from(svgText), { density: 300 }).resize({ width }).png().toFile(p);
  console.log('  ✓', rel);
};

console.log('Gerando marca W2…');

// Símbolo
const simboloClaro = symbolSvg(sym300, C.cream, C.cobalt);   // para fundo escuro
const simboloEscuro = symbolSvg(sym300, C.ink, C.cobalt);    // para fundo claro
out('public/brand/w2-simbolo-para-fundo-escuro.svg', simboloClaro);
out('public/brand/w2-simbolo-para-fundo-claro.svg', simboloEscuro);

// Logo completa
const logoClaro = lockupSvg(sym300, C.cream, C.cobalt, C.cream, 0.3);
const logoEscuro = lockupSvg(sym300, C.ink, C.cobalt, C.ink, 0.3);
out('public/brand/w2-logo-para-fundo-escuro.svg', logoClaro);
out('public/brand/w2-logo-para-fundo-claro.svg', logoEscuro);

// Monocromáticas (impressão em 1 cor, carimbo, gravação)
out('public/brand/w2-logo-mono-preto.svg', lockupSvg(sym300, C.black, C.black, C.black, 0.35));
out('public/brand/w2-logo-mono-branco.svg', lockupSvg(sym300, C.white, C.white, C.white, 0.35));

// Ícones (peso 400: lê melhor pequeno)
const icone = iconSvg(sym400, 512, C.ink, C.cream, C.cobalt, 112);
out('public/brand/w2-icone.svg', icone);
out('app/icon.svg', iconSvg(sym400, 64, C.ink, C.cream, C.cobalt, 14, 0.7));

// PNGs
await png('public/brand/w2-icone-512.png', icone, 512);
await png('public/brand/w2-logo-para-fundo-escuro.png', logoClaro, 1600);
await png('public/brand/w2-logo-para-fundo-claro.png', logoEscuro, 1600);
await png('app/apple-icon.png', iconSvg(sym400, 180, C.ink, C.cream, C.cobalt, 0, 0.62), 180);

// Paths para os componentes do site
out(
  'lib/logo-paths.ts',
  `// Gerado por scripts/build-logo.mjs — não edite à mão (rode: npm run logo).
// Símbolo "w2" da marca, convertido da fonte Unbounded (espaçamento -0.06em).

export type LogoPaths = { w: string; two: string; width: number; height: number };

/** Peso 300: logo grande (abertura, rodapé). */
export const logo300: LogoPaths = ${JSON.stringify(sym300)};

/** Peso 400: tamanhos pequenos (cabeçalho, ícones). */
export const logo400: LogoPaths = ${JSON.stringify(sym400)};
`,
);

console.log('Pronto.');
