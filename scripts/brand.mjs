/**
 * Genera todos los recursos de marca a partir de los dos SVG de brand-source/.
 *
 *   npm run brand
 *
 * La identidad de EXZUN es geometría, no un archivo binario heredado: el
 * símbolo son dos figuras (un galón y un filete) y el wordmark es una línea de
 * texto. Al vivir como SVG, cambiar el color de marca o el nombre es editar
 * dos archivos de texto y volver a ejecutar esto.
 *
 * ⚠️ Los PNG que salen de aquí SE VERSIONAN en public/. El despliegue nunca
 * ejecuta este script: el wordmark depende de una fuente instalada en la
 * máquina (DejaVu Sans Bold) y el servidor de build de Cloudflare no tiene por
 * qué tenerla. Esto es mantenimiento; el sitio sólo sirve el resultado.
 */
import sharp from 'sharp';
import { mkdir } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';

const srcFile = (n) => fileURLToPath(new URL(`../brand-source/${n}`, import.meta.url));
const out = (p) => fileURLToPath(new URL(`../public/${p}`, import.meta.url));

await mkdir(out('brand'), { recursive: true });
await mkdir(out('og'), { recursive: true });

const INK = { r: 11, g: 11, b: 12 };
const YELLOW = '#ffd400';
const PAPER = '#ffffff';

/**
 * Rasteriza un SVG y le quita el margen transparente sobrante.
 *
 * El recorte importa: sin él, el aire que deja el viewBox se convierte en
 * espacio muerto dentro del lockup y descuadra la alineación entre símbolo y
 * wordmark. Se rasteriza a 4x para que los reescalados posteriores partan
 * siempre de más resolución de la que necesitan.
 */
async function raster(name, height) {
  return sharp(srcFile(name), { density: 288 })
    .resize({ height, fit: 'inside' })
    .trim({ threshold: 6 })
    .png({ compressionLevel: 9 })
    .toBuffer({ resolveWithObject: true });
}

const mark = await raster('mark.svg', 1024);
const word = await raster('wordmark.svg', 512);

console.log(`símbolo   ${mark.info.width}x${mark.info.height}`);
console.log(`wordmark  ${word.info.width}x${word.info.height}`);

/* ── Símbolo suelto, para espacios estrechos y el redirector ─────── */
for (const size of [64, 96, 128, 256]) {
  await sharp(mark.data)
    .resize({ height: size })
    .png({ compressionLevel: 9 })
    .toFile(out(`brand/mark-${size}.png`));
}

/* ── Wordmark suelto ─────────────────────────────────────────────── */
await sharp(word.data)
  .resize({ height: 96 })
  .png({ compressionLevel: 9 })
  .toFile(out('brand/wordmark-96.png'));

/**
 * Lockup horizontal para la cabecera: símbolo a la izquierda, wordmark
 * alineado por su centro óptico. Se genera a 3x para que quede nítido en
 * cualquier pantalla sin necesidad de srcset.
 */
async function lockup(markHeight, file) {
  const wordHeight = Math.round(markHeight * 0.42);
  const gap = Math.round(markHeight * 0.24);

  const m = await sharp(mark.data).resize({ height: markHeight }).toBuffer({ resolveWithObject: true });
  const w = await sharp(word.data).resize({ height: wordHeight }).toBuffer({ resolveWithObject: true });

  const total = m.info.width + gap + w.info.width;

  await sharp({
    create: { width: total, height: markHeight, channels: 4, background: { ...INK, alpha: 0 } },
  })
    .composite([
      { input: m.data, top: 0, left: 0 },
      { input: w.data, top: Math.round((markHeight - wordHeight) / 2), left: m.info.width + gap },
    ])
    .png({ compressionLevel: 9 })
    .toFile(out(file));

  return { width: total, height: markHeight };
}

const lock = await lockup(96, 'brand/lockup.png');
console.log(`lockup    ${lock.width}x${lock.height}  → mostrar a ${Math.round(lock.width / 3)}x${lock.height / 3}`);

/**
 * Bloque apilado —símbolo arriba, wordmark debajo— para la portada y el 404,
 * donde hay sitio de sobra y la marca es el elemento principal.
 */
async function stacked(width, file) {
  const markW = Math.round(width * 0.52);
  const wordW = width;
  const gap = Math.round(width * 0.09);

  const m = await sharp(mark.data).resize({ width: markW }).toBuffer({ resolveWithObject: true });
  const w = await sharp(word.data).resize({ width: wordW }).toBuffer({ resolveWithObject: true });

  const height = m.info.height + gap + w.info.height;

  await sharp({
    create: { width, height, channels: 4, background: { ...INK, alpha: 0 } },
  })
    .composite([
      { input: m.data, top: 0, left: Math.round((width - m.info.width) / 2) },
      { input: w.data, top: m.info.height + gap, left: 0 },
    ])
    .png({ compressionLevel: 9 })
    .toFile(out(file));

  return { width, height };
}

const st320 = await stacked(320, 'brand/logo-320.png');
await stacked(640, 'brand/logo-640.png');
console.log(`apilado   ${st320.width}x${st320.height}  → mostrar a 200x${Math.round((200 / st320.width) * st320.height)}`);

/* ── Favicon: el símbolo sobre el negro del sitio, con aire alrededor ─ */
async function icon(size, file) {
  const pad = Math.round(size * 0.16);
  const inner = await sharp(mark.data)
    .resize({ width: size - pad * 2, height: size - pad * 2, fit: 'contain', background: { ...INK, alpha: 0 } })
    .toBuffer();

  await sharp({
    create: { width: size, height: size, channels: 4, background: { ...INK, alpha: 1 } },
  })
    .composite([{ input: inner, gravity: 'center' }])
    .png({ compressionLevel: 9 })
    .toFile(out(file));
}

await icon(32, 'favicon-32.png');
await icon(96, 'favicon.png');
await icon(180, 'apple-touch-icon.png');
await icon(512, 'brand/icon-512.png');

/* ── Imagen Open Graph 1200x630 ──────────────────────────────────── */
const W = 1200;
const H = 630;
const FONT = "'DejaVu Sans', Verdana, 'Helvetica Neue', Helvetica, Arial, sans-serif";

const bg = `<svg xmlns="http://www.w3.org/2000/svg" width="${W}" height="${H}">
  <rect width="${W}" height="${H}" fill="#0b0b0c"/>
  <defs>
    <pattern id="g" width="14" height="14" patternTransform="rotate(-45)" patternUnits="userSpaceOnUse">
      <rect width="1.5" height="14" fill="#ffffff" opacity="0.03"/>
    </pattern>
  </defs>
  <rect width="${W}" height="${H}" fill="url(#g)"/>
  <rect x="0" y="0" width="${W}" height="10" fill="${YELLOW}"/>
</svg>`;

/*
  Las cifras de aquí abajo están escritas a mano y NO se leen de offers.ts: es
  una imagen, se regenera a mano y se cachea una semana. Si cambias un dato en
  offers.ts, vuelve a ejecutar `npm run brand` o la vista previa al compartir
  dirá una cosa y la página otra.
*/
const text = `<svg xmlns="http://www.w3.org/2000/svg" width="${W}" height="${H}">
  <text x="80" y="330" font-family="${FONT}" font-size="112" font-weight="bold"
        letter-spacing="-5" fill="${PAPER}">Cuenta Exness en</text>
  <text x="80" y="436" font-family="${FONT}" font-size="112" font-weight="bold"
        letter-spacing="-5" fill="${YELLOW}">3 minutos</text>

  <rect x="80" y="492" width="1040" height="1" fill="#ffffff" opacity="0.18"/>
  <text x="80"  y="546" font-family="${FONT}" font-size="26" font-weight="bold" fill="${PAPER}">1 USD</text>
  <text x="300" y="546" font-family="${FONT}" font-size="26" font-weight="bold" fill="${PAPER}">200+</text>
  <text x="520" y="546" font-family="${FONT}" font-size="26" font-weight="bold" fill="${PAPER}">Instantáneos</text>
  <text x="820" y="546" font-family="${FONT}" font-size="26" font-weight="bold" fill="${PAPER}">0</text>
  <text x="80"  y="580" font-family="${FONT}" font-size="15" letter-spacing="3" fill="#75757d">DEPOSITO MIN.</text>
  <text x="300" y="580" font-family="${FONT}" font-size="15" letter-spacing="3" fill="#75757d">INSTRUMENTOS</text>
  <text x="520" y="580" font-family="${FONT}" font-size="15" letter-spacing="3" fill="#75757d">RETIROS 24/7</text>
  <text x="820" y="580" font-family="${FONT}" font-size="15" letter-spacing="3" fill="#75757d">COMISION DEL BROKER</text>
</svg>`;

const OG_MARK_H = 92;
const ogMark = await sharp(mark.data).resize({ height: OG_MARK_H }).toBuffer({ resolveWithObject: true });
const OG_WORD_H = 40;
const ogWord = await sharp(word.data).resize({ height: OG_WORD_H }).toBuffer({ resolveWithObject: true });

// El wordmark se coloca a partir del ancho real del símbolo, no de un número
// fijo: si cambia la proporción del dibujo, el aire se mantiene.
const GAP = 26;

await sharp(Buffer.from(bg))
  .composite([
    { input: Buffer.from(text), top: 0, left: 0 },
    { input: ogMark.data, top: 62, left: 80 },
    {
      input: ogWord.data,
      top: 62 + Math.round((OG_MARK_H - OG_WORD_H) / 2),
      left: 80 + ogMark.info.width + GAP,
    },
  ])
  .jpeg({ quality: 88, chromaSubsampling: '4:4:4' })
  .toFile(out('og/default.jpg'));

console.log(`og        ${W}x${H}`);
console.log('recursos de marca generados en public/');
