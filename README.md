# exness.inversax.com

Sitio de afiliación para el bróker **Exness**, en español y dirigido a los
mercados hispanoamericanos: 15 landings de país con las condiciones que aplican
en cada jurisdicción, blog en Markdown y una capa de SEO / AEO / GEO montada
desde el primer commit.

**41 páginas estáticas** (37 indexables). Sin base de datos, sin servidor, sin
JavaScript de framework en el cliente.

Réplica estructural del sitio de XM del mismo autor, con la misma arquitectura y
tres diferencias de fondo que **no** son cosméticas y están explicadas más
abajo: Exness no da bonos, no acepta España, y la paleta es amarilla.

---

## Stack

| Pieza | Versión | Por qué |
| --- | --- | --- |
| [Astro](https://astro.build) | 7.2.2 | HTML estático, cero JS por defecto, compilador Rust y Vite 8 |
| Tailwind CSS | 4.3.3 | Vía `@tailwindcss/vite`, sin PostCSS |
| `@astrojs/sitemap` | 3.7.3 | Sitemap con `hreflang` automático |
| `@astrojs/rss` | 4.0.19 | Feed del blog |
| `sharp` | 0.35.3 | Genera la marca y la imagen Open Graph |

Requiere Node 20.19 o superior.

```bash
npm install
npm run dev      # http://localhost:4321
npm run build    # -> dist/
npm run check    # tipos + accesibilidad
npm run preview  # sirve dist/ en local
npm run brand    # regenera logos, favicons e imagen OG
```

---

## Lo primero que debes hacer

### 1. Verificar los enlaces de afiliado

Están en **`src/config/affiliate.ts`**. Ningún otro archivo contiene una URL de
Exness.

| Enlace | Clave | Destino |
| --- | --- | --- |
| Portada / CTAs secundarios | `home` | `one.exnessonelink.com/intl/es/a/c_oq7nroj1va` |
| Registro — el CTA principal | `real` | igual que `home`, con contador propio en analítica |
| App móvil | `app` | `one.exnessonelink.com/a/c_oq7nroj1va?platform=mobile` |

> ⚠️ **No están verificados.** El dominio `one.exnessonelink.com` está bloqueado
> por la política de red del entorno en el que se construyó el sitio, así que
> los enlaces están tal cual los entregó el propietario de la cuenta. Antes de
> publicar:
>
> ```bash
> curl -sI 'https://one.exnessonelink.com/intl/es/a/c_oq7nroj1va'
> ```
>
> Un 302 con `location:` hacia exness.com es un enlace vivo.

### 2. Contrastar los datos de Exness contra exness.com

`src/config/offers.ts` concentra entidades, licencias, apalancamiento, cuentas
y estadísticas. **Cada bloque lleva marcada su procedencia:**

- `[REG]` — verificado contra un registro regulatorio o un documento legal de
  Exness. Son las cuatro entidades y sus números de licencia.
- `[SEC]` — de fuentes secundarias coherentes entre sí. **Hay que confirmarlo.**
  Son los spreads de las cuentas estándar, la comisión exacta de la cuenta Zero
  y las estadísticas de volumen y clientes.

El motivo de la distinción es que `exness.com` y su centro de ayuda estaban
bloqueados por la política de red del entorno de construcción, así que la fuente
primaria no se pudo consultar. Repite la revisión cada trimestre: publicar
condiciones caducadas es causa de cierre de la cuenta de socio.

### 3. Poner los IDs de analítica

En `src/config/site.ts` → `ANALYTICS`. Cada campo vacío desactiva su script.
Si los dejas todos vacíos, el banner de cookies ni siquiera se renderiza.

```ts
export const ANALYTICS = {
  ga4: 'G-XXXXXXXXXX',
  metaPixel: '',
  tiktokPixel: '',
  gtm: '',
  clarity: '',
};
```

---

## Las tres diferencias con un sitio de XM

Quien venga del proyecto de XM encontrará la misma arquitectura. Estas tres
cosas sí cambian, y ninguna es negociable.

### Exness no ofrece bonos

Ni de bienvenida, ni de depósito, ni de trading. Lo declara de forma expresa.
El bloque que en un sitio de XM ocupa el bono escalonado lo ocupa aquí
`Advantages.astro`, que dice literalmente que no hay bono y pone en su lugar lo
que la casa sí ofrece: retiros instantáneos, cero comisión del bróker,
apalancamiento escalado, cuentas sin swap y entrada desde 1 USD.

**Cualquier texto que insinúe un bono de Exness es publicidad falsa.** No es una
cuestión de estilo: es motivo de cierre de la cuenta de socio.

La pieza estructural que sustituye a `bonusAllowed` es `scaledLeverage`: la
afirmación comercial fuerte que sólo es publicable bajo ciertas entidades. Bajo
un régimen tipo ESMA el tope es 1:30 y prometer más es ilegal, así que
`Advantages` deja caer esa ventaja sola y muestra el aviso de protección
reforzada.

### Exness no acepta España — ni casi ninguna de la UE

`BLOCKED_COUNTRIES` en `offers.ts` es **mucho** más larga que la de un bróker
como XM. Además de EE. UU. y sus territorios, Canadá y las jurisdicciones
sancionadas, Exness no acepta residentes de prácticamente todo el Espacio
Económico Europeo, del Reino Unido, de Australia ni de Nueva Zelanda.

El motivo en el caso europeo no es una sanción: **sus entidades europeas dejaron
de atender a clientes minoristas.** Exness (Cy) Ltd sigue teniendo licencia
CySEC 178/12, pero sólo para clientes profesionales.

Consecuencia directa: **España no es un mercado y no puede serlo.** No es
prudencia publicitaria como lo sería con otro bróker —donde el problema es la
Resolución de la CNMV sobre publicidad de CFD—, es que Exness no abre cuentas a
residentes españoles. Una landing dirigida a España enviaría tráfico a un
registro que va a rebotar.

### América Latina tampoco está cubierta al 100 %

Es el cambio de la revisión de agosto de 2026 y conviene no perderlo de vista.
Exness dejó de aceptar residentes de **Uruguay** y de **Nicaragua**, que además
de **Cuba** y **Bahamas** completan el hueco latinoamericano.

Las landings `/uy/` y `/ni/` existían y se eliminaron. `_redirects` las manda a
la portada con un 301: si estaban indexadas, un 404 tiraría la autoridad
acumulada y dejaría al visitante sin salida.

Para que no vuelva a pasar en silencio, `assertMarketsAllowed()` —al final de
`src/config/countries.ts`— **rompe el build** si un mercado de `COUNTRIES` está
en `BLOCKED_COUNTRIES` o apunta a una entidad que no atiende a minoristas. Las
dos son erratas de una línea que no dan error en tiempo de ejecución y que
cuestan tráfico pagado.

Quedan quince mercados hispanoamericanos, y todos son hispanoamericanos por lo
anterior: es la única región que Exness cubre casi entera.

La lista completa de códigos ISO bloqueados se publica también en `/llms.txt`,
para que los motores generativos no inventen la respuesta.

### La paleta es amarilla, y eso cambia las reglas de contraste

Ver la sección siguiente.

---

## Diseño

**Blanco / amarillo / negro, en proporción ~70 / 20 / 10.** Medido sobre el HTML
compilado de la portada: 63% blanco, 21% amarillo, 11% negro y un 5% de grises
de texto que viven sobre blanco.

El papel es la superficie por defecto y ocupa la mayor parte del recorrido. El
amarillo entra en cuatro bandas a sangre —la cinta de datos, el bloque de
ventajas, los pasos del alta y el cierre— que son los momentos en los que se le
pide algo al visitante. El negro queda para la cabecera, la navegación del pie y
los avisos: es el color con el que se cierra, no con el que se empieza.

### La regla del amarillo

**Un amarillo no se comporta como un rojo, y confundirlo es el error clásico al
cambiar de paleta.** Sobre negro rinde 13,7:1 y es texto perfectamente legible;
sobre blanco cae a 1,5:1 y deja de serlo. Por eso hay dos acentos y no uno:

| Token | Valor | Para qué |
| --- | --- | --- |
| `--color-accent` | `#ffd400` | Relleno, y texto **sobre fondo oscuro** |
| `--color-accent-2` | `#ffe259` | Hover sobre oscuro |
| `--color-accent-3` | `#e6be00` | Hover de relleno y filetes decorativos sobre claro |
| `--color-accent-ink` | `#8a6a00` | Texto de acento **sobre fondo claro** — 5,1:1, AA |

Dos consecuencias que no conviene romper:

1. **Sobre un relleno amarillo, lo que va encima es `--color-ink`, nunca
   `--color-paper`.** Blanco sobre `#ffd400` da 1,5:1.
2. **El acento como texto es `--color-accent-ink` por defecto**, porque por
   defecto se está sobre papel, y sólo pasa a `--color-accent` dentro de un
   ámbito oscuro.

### Ámbito oscuro

Tres cosas son oscuras en un sitio claro: las bandas `.band-ink`, el documento
entero cuando pide `data-theme="ink"` (404 y redirector), y una familia de
superficies flotantes que no son bandas y por tanto nunca heredarían nada:
cabecera, panel de países, aviso geográfico, barra de cookies, modal de salida,
barra de pestañas, hojas de la app y tira del blog.

Esas últimas llevan **`.on-ink`**. Que la clase exista importa: sin ella cada
superficie flotante se pintaba con los valores pensados para papel, y el
resultado era ámbar del 3,6:1 sobre negro. El ámbito redefine `--color-muted`
una vez y todo lo que hay dentro se corrige solo.

### Contraste verificado

Auditoría automática sobre el HTML compilado, midiendo el color realmente
pintado contra el fondo efectivo de cada elemento:

**0 fallos de WCAG AA** en portada, landing de país, índice del blog, legales y
404, a 1280 px y a 390 px. **0 desbordes horizontales.** **0 errores de
JavaScript.**

Dos correcciones salieron de ahí y están en el CSS con su comentario:
`--color-muted` pasó de `#75757d` a `#6b6b73` (daba 4,15:1 sobre el papel
secundario, por debajo del 4,5:1 que pide la norma), y dentro de un ámbito
oscuro esa misma variable se redefine al gris claro.

---

## Móvil: el sitio como app

Por debajo de 64rem el sitio no se comporta como una web encogida sino como
una app nativa, y se puede **instalar** en la pantalla de inicio.

| Pieza | Archivo | Qué hace |
| --- | --- | --- |
| Barra superior | `Header.astro` | Opaca y compacta (3,5rem). En artículos y legales lleva la flecha de volver, que deshace el último paso del historial si viene del propio sitio |
| Barra de pestañas | `TabBar.astro` | Inicio · Cuentas · **Abrir cuenta** · Blog · Más, fija abajo y al alcance del pulgar. «Cuentas» se marca activa mientras la tabla ocupa la pantalla |
| Hoja de menú | `AppMenu.astro` | «Más» abre un `<dialog>` que sube desde abajo: navegación, país, instalar la app, CTA y legales. Se cierra con el aspa, Escape, pulsando fuera o arrastrando hacia abajo |
| Selector de país | `CountrySwitcher.astro` | En móvil también es una hoja inferior con velo; en escritorio sigue siendo el desplegable |
| Modal de salida | `ExitIntent.astro` | En móvil sube como hoja |
| Tablas | `Accounts.astro` · `Compare.astro` | La de cuentas pasa a fichas apiladas con etiqueta por dato; la comparativa cabe sin scroll lateral |
| Transiciones | `global.css` | `@view-transition`: fundido entre páginas con la cabecera y las pestañas quietas. Sin JavaScript |
| Iconos | `Icon.astro` | Sólo en la navegación. El contenido sigue sin iconos |

La barra de pestañas **sustituye al antiguo dock** de conversión y a la
hamburguesa: el CTA principal vive ahora en su centro (`?s=tabbar`) y en la
hoja de menú (`?s=menu`).

### Instalable y sin conexión

- `public/site.webmanifest` — nombre, colores, iconos de 192 y 512 px (más uno
  *maskable* con el símbolo dentro de la zona segura) y accesos directos a
  Cuentas, Países y Blog.
- `public/sw.js` — service worker. Las páginas van **siempre a la red
  primero** (las condiciones tienen que estar al día) y sólo sin red se sirve
  la última copia o `/offline/`. Los recursos con hash de `/_astro/` y la marca
  se sirven de caché. **No toca `/go/`** —cada clic de afiliado tiene que
  llegar al servidor— ni `/cdn-cgi/` ni otros dominios. Sólo se registra en
  producción. Si cambias su lógica, sube `VERSION`.
- `src/pages/offline.astro` — pantalla sin conexión: `noindex` y fuera del
  sitemap.
- La fila «Instalar la app» del menú aparece cuando el navegador lo permite
  (`beforeinstallprompt` en Chrome/Edge) o, en iOS, explica el gesto de
  Compartir → Añadir a pantalla de inicio.

`npm run brand` genera también `brand/icon-192.png` y
`brand/icon-maskable-512.png`.

---


## Red Inversax

Este sitio no está solo. Forma red con `inversax.com` —el comparador de siete
brókeres en 22 países— y con `xm.inversax.com`. El reparto de intención es por
país y evita que las tres propiedades compitan por la misma consulta:

| Consulta | Responde |
| --- | --- |
| "exness en honduras", "exness es confiable" | este sitio |
| "mejores brokers en honduras" | `inversax.com/brokers/hn` |

El puente está en `src/components/Network.astro`, que se renderiza tras la FAQ
de cada landing de país, y en el enlace de pie de `Footer.astro` (clave i18n
`network.footer`). **Los dos son enlaces seguidos**: apuntan a una propiedad
propia y existen para transmitir señal, al contrario que los enlaces al bróker,
que llevan `sponsored nofollow`. No les añadas `rel` restrictivo.

Del otro lado, `inversax.com` enlaza aquí desde la ficha de Exness de cada
página de país mediante `src/lib/sitiosBroker.ts`, que mantiene a mano la lista
de países con landing. **Al añadir un mercado a `src/config/countries.ts` hay
que añadirlo también allí**, o el enlace no se genera; y al revés, un país
listado allí que no exista aquí produce un 404.


## Marca

La identidad es **geometría, no un archivo binario heredado**. Vive en dos SVG
versionados en `brand-source/`:

- `mark.svg` — un galón ascendente sobre un filete macizo, en el amarillo de
  marca. Sin texto y sin degradados: tiene que seguir siendo legible a 32 px en
  una pestaña.
- `wordmark.svg` — «EXZUN» en blanco, porque vive siempre sobre fondo tinta.

`npm run brand` los rasteriza y genera todo lo demás:

| Archivo | Uso |
| --- | --- |
| `brand/lockup.png` | Cabecera, pie, 404, modal de salida, redirector |
| `brand/logo-320.png` · `-640.png` | Bloque apilado de la portada raíz |
| `brand/mark-64…256.png` | Sólo el símbolo, para espacios estrechos |
| `favicon.png` · `favicon-32.png` | Pestaña del navegador |
| `apple-touch-icon.png` | Pantalla de inicio de iOS |
| `brand/icon-512.png` | JSON-LD `Organization.logo` y `site.webmanifest` |
| `brand/icon-192.png` · `icon-maskable-512.png` | Icono de la app instalada (Android recorta el *maskable* con su forma) |
| `og/default.jpg` | Vista previa al compartir (1200x630) |

Todos se sirven con caché inmutable de un año (`public/_headers`).

> Los PNG **se versionan**. El despliegue nunca ejecuta `npm run brand`: el
> wordmark depende de una fuente instalada en la máquina (DejaVu Sans Bold) y
> el servidor de build de Cloudflare no tiene por qué tenerla. Es mantenimiento,
> no parte del build.

Si cambias los SVG, ejecuta `npm run brand` y ajusta en `src/config/site.ts` →
`BRAND` las medidas que imprime el script.

---

## Cómo funciona el enrutado

```
/                       Portada (x-default, indexable)
/mx/                    México — condiciones, pagos locales y entidad
/co/  /cl/  /pe/ …      Los otros 14 mercados
/blog/                  Índice del blog
/blog/<slug>/           Artículo
/legal/risk/            Aviso de riesgo (+ affiliate, privacy, terms, cookies)
/go/real/?s=hero&c=mx   Redirector de afiliados (noindex)
/llms.txt               Resumen del sitio para motores generativos
/rss.xml                Feed del blog
```

**El sitio es monolingüe.** Todo se publica en español y no existe ningún
segmento de idioma en las URLs: la portada es `/` y cada mercado vive en
`/<código ISO>/`. No hay selector de idioma, ni traducciones, ni la misma página
repetida bajo prefijos distintos.

La portada cubre lo que no cambia entre jurisdicciones —tipos de cuenta,
comparativa, plataformas, proceso de alta—. Las 15 landings cubren lo que sí
cambia: entidad, apalancamiento aplicable, divisa, métodos de depósito locales y
activos más operados.

---

## El redirector `/go/`

Ningún botón enlaza directamente a `one.exnessonelink.com`. Todos pasan por
`/go/<clave>/`:

```
/go/real/?s=hero&c=mx
         │      │    └─ país, para saber qué mercado convierte
         │      └────── posición del botón (hero, tabbar, footer, blog-…)
         └───────────── cuál de tus enlaces
```

Esto da cuatro cosas:

1. Cambias un enlace en un archivo y se actualiza en las 28 páginas.
2. Mides el CTR por posición y por país en GA4 (`event: affiliate_click`).
3. Los salientes llevan `rel="sponsored nofollow noopener"` y quedan `noindex`.
4. Los programas de socios prohíben los anuncios que apuntan directo al enlace
   de referido; esta capa mantiene siempre una página propia de por medio.

El salto **no depende de que el JavaScript se ejecute**: hay un `meta refresh`
de red de seguridad a los 2 s, porque si el script se bloquea la comisión se
pierde.

---

## Añadir contenido

### Un país

Un objeto en `src/config/countries.ts` y ya existe su landing:

```ts
{
  code: 'cr', name: 'Costa Rica', entity: 'global', currency: 'CRC',
  payments: ['Visa/Mastercard', 'Skrill', 'USDT'],
  assets: ['Oro', 'US500', 'EUR/USD'],
  tier: 3,
}
```

`entity` es la clave de todo: determina apalancamiento, qué licencia se muestra
y si puede anunciarse el apalancamiento escalado.

**Antes de añadir uno, comprueba que no está en `BLOCKED_COUNTRIES`** — aunque
ya no hace falta de memoria: `assertMarketsAllowed()` rompe el build si lo está.
Y añade sólo mercados donde vayas a poner contenido propio en `local-copy.ts`:
20 páginas casi idénticas rinden menos que 6 bien diferenciadas.

### Copy de la interfaz

Todo el texto vive en `src/i18n/locales/es.ts`, con marcadores que se resuelven
solos: `{min}`, `{minWallet}`, `{minPro}`, `{leverage}`, `{country}`, `{year}`, `{entity}`,
`{clients}`, `{volume}`… `useT(country)` inyecta los valores de ese mercado, así
que una cadena escrita una vez sale correcta en las 15 landings.

### Un artículo

**Ahora mismo el blog no publica nada, a propósito.** La estructura está entera
y funcionando —índice, RSS, sitemap, rutas, schema—, simplemente no hay
artículos.

La plantilla con todos los campos, sus límites y qué hace cada uno está en
**`src/content/blog/_plantilla.md`**. Lleva `draft: true`, así que no genera
página ni entra en el RSS; existe para documentar el formato donde se usa y para
que la colección no esté vacía —Astro avisa en cada página del build si lo está—.

Para publicar: copia ese archivo a `src/content/blog/<slug>.md`, quita
`draft: true` y escribe. El nombre del archivo es el slug y la URL resultante es
`/blog/<slug>/`. No hay que registrarlo en ningún índice: el índice del blog, el
RSS, el sitemap y `/llms.txt` se generan solos a partir de la colección.

Si borras la plantilla y no hay ningún artículo, el sitio **sigue compilando**:
el índice muestra el texto de `blog.empty` y el RSS sale con el canal vacío.
Sólo vuelve el aviso del build.

**Guías por país.** `guideFor()` busca por convención de nombre: la landing de un
mercado enlaza automáticamente a su guía si existe un artículo con el slug
`exness-en-<país-sin-tildes>` — `exness-en-mexico.md`,
`exness-en-republica-dominicana.md`. Si no existe, la landing no muestra el
bloque y no pasa nada.

---

## SEO, AEO y GEO

**SEO técnico.** Canónicas absolutas · RSS del blog · Open Graph y Twitter Cards
· `_headers` con caché inmutable y cabeceras de seguridad · cero JS de framework.

### Sitemap

`/sitemap-index.xml` → `/sitemap-0.xml`, con **24 URLs**: las 28 páginas menos
las 3 del redirector y el 404. Se regenera solo en cada build.

No lleva la opción `i18n` de `@astrojs/sitemap`, y es a propósito: esa opción da
por hecho que el primer segmento de la URL es un idioma. Aquí es un país, y
además no hay traducciones.

### hreflang

**324 anotaciones, 18 páginas, 0 destinos inexistentes, 0 fallos de
reciprocidad**, verificado sobre el HTML compilado.

Hay un solo grupo y es el que importa en un sitio monolingüe con varios
mercados: las 15 landings son la misma página en español dirigida a países
distintos, anotadas con idioma + región — `es-MX`, `es-CO`, `es-AR`… Es lo que
hace que Google sirva `/mx/` a México y `/co/` a Colombia en lugar de elegir una
y tratar el resto como duplicado.

El grupo lo forman las 15 landings más la portada, que actúa de `x-default`.
Blog y legales no llevan hreflang: no tienen alternativas que declarar.

La regla que lo mantiene íntegro: **todos los miembros declaran exactamente la
misma lista, la portada incluida.** Si una declarara menos, Google descartaría su
bloque entero. Lo genera `countryAlternates()` en `src/lib/seo.ts`.

### robots.txt

Generado en `src/pages/robots.txt.ts`. Permite todo salvo `/go/`, y autoriza de
forma **explícita** a 16 rastreadores de IA: GPTBot, OAI-SearchBot, ChatGPT-User,
ClaudeBot, Claude-User, Claude-SearchBot, PerplexityBot, Perplexity-User,
Google-Extended, Applebot-Extended, meta-externalagent, Amazonbot, cohere-ai,
DuckAssistBot, MistralAI-User y YouBot. Nombrarlos importa: varios aplican
políticas conservadoras cuando sólo encuentran un `User-agent: *`.

### Datos estructurados

JSON-LD en un único `@graph`: `Organization`, `WebSite`, `WebPage`,
`FinancialService`, `BreadcrumbList`, `FAQPage`, `HowTo`, `ItemList`,
`BlogPosting`.

> Deliberadamente **no** se emiten `AggregateRating` ni `Review`. Inventar
> valoraciones es penalización manual en Google e incumplimiento directo de los
> términos de socio.

**AEO.** Encabezados con forma de pregunta, respuesta completa en el primer
párrafo, FAQ en cada página de país con datos concretos de esa jurisdicción,
tablas comparables. Una de las seis preguntas de la FAQ es «¿Desde qué países no
se puede abrir cuenta en Exness?», que es de las que más se buscan y de las que
peor responde la competencia.

**GEO.** `/llms.txt` publica en texto plano las entidades, licencias,
apalancamientos, cuentas, los 15 mercados con sus datos, la lista completa de
códigos ISO bloqueados y —explícitamente— que Exness no ofrece bonos, porque es
justo el punto donde un modelo generativo tiende a inventar.

---

## Responsive

Mobile-first, sin anchos fijos: todo el escalado va con `clamp()` y unidades
relativas. Puntos de ruptura en 30, 40, 48, 56 y 64 rem.

Verificado sobre el HTML y el CSS compilados: `viewport` en las 28 páginas,
0 px de desbordamiento horizontal a 390 px y a 1280 px, cada `<table>` dentro de
un contenedor con scroll propio, y la barra fija inferior sólo en móvil
respetando `safe-area-inset` en iPhone.

**Navegadores soportados:** Safari 16.4+, Chrome 111+, Firefox 128+. Es la línea
base declarada por Tailwind 4, que usa `@property` y capas de cascada.

---

## Cumplimiento

Reglas que este sitio ya respeta y que **no conviene romper**:

- **Aviso de riesgo en todas las páginas.** Está en el pie, sobre papel y con
  contraste real, y al final de cada artículo. No lo escondas ni le bajes el
  contraste: es lo primero que se mira al auditar a un socio.
- **Nada de bonos.** Exness no los ofrece. Ver arriba.
- **Nada de «ganancias garantizadas»**, imágenes de lujo o de dinero. El copy es
  agresivo en estructura (urgencia, CTAs, prueba social real), nunca en promesas.
- **Divulgación de afiliación** en una línea discreta al pie de todas las
  páginas, enlazada al texto completo en `/legal/affiliate/`. Es deliberado que
  sea pequeña pero visible: la FTC en EE. UU., la UCPD europea y las leyes de
  consumo de LATAM exigen que se pueda ver.
- **La marca propia no contiene «Exness».** El sitio es de un afiliado, y
  presentarse con el nombre del bróker es lo primero que hace saltar una
  auditoría. Exness se nombra siempre como el bróker del que se habla, nunca
  como el emisor de estas páginas.
- **Países restringidos.** `BLOCKED_COUNTRIES` no tiene página propia. Si un
  visitante llega desde uno, `GeoNotice` marca el documento con
  `data-blocked-region` en vez de sugerirle nada.
- **Sin pop-ups, pop-unders ni onclick.** No es una preferencia estética: los
  términos de los programas de socios prohíben generar tráfico por medios
  automáticos o marcos ocultos, y el coste de equivocarse es la cuenta entera.

---

## Banners y vídeos

`EXNESS_BANNERS`, en `src/config/affiliate.ts`, lleva las siete creatividades de
la campaña «Take control» en español, servidas desde el CDN de Exness. No están
rehospedadas a propósito: las condiciones de uso del material de marca permiten
enlazarlo, no copiarlo ni redimensionarlo.

| Formato | Medida | Dónde vive |
| --- | --- | --- |
| `skyscraper` | 120x600 | raíles laterales (`EdgeRails`, `SideRails`) |
| `leaderboard` | 728x90 | tira horizontal, a partir de 48rem |
| `mobilebar` | 320x50 | la misma tira, por debajo de 48rem |
| `billboard` | 970x250 y 980x250 | banda ancha dentro del contenido |
| `wide` | 1200x628 | cierre de artículo |
| `square` | 800x800 | unidad cuadrada, la que va en pareja |
| `rectangle` | 300x250 | **sin pieza todavía**; el hueco no renderiza nada |

El `href` de cada creatividad **no** es el enlace de socio crudo: pasa por el
redirector `/go/` con la posición marcada (`?s=banner-billboard`, etc.), igual
que los botones. Así se puede rotar el enlace sin recompilar y cada impresión
queda atribuida a su formato en analítica.

La rotación tiene dos capas: en build, `bannerRotation()` usa un hash del `seed`
—la ruta de la página más el nombre del hueco— para decidir por dónde empieza la
baraja, de modo que dos páginas nunca abren con la misma pieza y el HTML sigue
siendo reproducible entre builds; en cliente, `Banner.astro` recorre el resto
cada 9 s, sólo mientras el hueco está a la vista y nunca si el visitante pidió
movimiento reducido.

**Si añades piezas nuevas, copia la URL de imagen literal del panel.** Una URL
inventada devuelve 404 y deja el hueco en blanco en todas las páginas a la vez,
sin que nada falle en el build.

### Vídeos

`EXNESS_VIDEOS` lleva los tres vídeos de marca, incrustados desde Brandfolder y
repartidos por `<Video>` con la misma lógica de semilla que los banners: cada
página recibe una pieza estable y distinta de la de al lado.

Tres decisiones del componente que no son de estilo:

- El `iframe` va con `loading="lazy"`. Una incrustación de vídeo pesa más que el
  resto de la página junta y hundiría el LCP de una landing.
- **Sin `autoplay`.** Un vídeo que arranca solo con sonido es la forma más rápida
  de que se cierre la pestaña, y en móvil gasta datos no pedidos.
- Debajo va **siempre** un CTA. Un vídeo sin salida es entretenimiento.

El marco reserva su espacio con `aspect-ratio`, así que el iframe no empuja el
botón al cargar.

---

## Despliegue

Pensado para **Cloudflare Pages** (el `_headers`, el `_redirects` y la detección
de país vía `/cdn-cgi/trace` ya están listos).

1. Sube el repositorio a GitHub.
2. Cloudflare Pages → *Connect to Git*.
3. Build command `npm run build`, output directory `dist`.
4. Custom domain → `exness.inversax.com`.

Funciona igual en Netlify o Vercel; lo único que se pierde fuera de Cloudflare es
la sugerencia geográfica del cliente, que falla en silencio sin romper nada. En
local verás un 404 de `/cdn-cgi/trace` en la consola por ese mismo motivo: es
esperado.

**La raíz `/` no redirige a propósito.** Es la página `x-default` indexable.
Redirigir por geolocalización en el servidor obligaría a tratar a los
rastreadores de forma distinta a los usuarios, y eso es la definición de
cloaking.

---

## Pendiente antes de publicar

- [ ] **Verificar los tres enlaces de afiliado desde un navegador real**, en
      ventana privada. `curl` no sirve: `one.exnessonelink.com` está detrás del
      anti-bot de Cloudflare y devuelve 403 con `cf-mitigated: challenge` a
      cualquier petición automatizada, tanto si la ruta es válida como si no.
      Cada uno debe acabar en un registro de exness.com con tu código en la URL.
- [ ] **Contrastar contra exness.com todo lo marcado `[SEC]`** en `offers.ts`:
      spreads de Standard y Cent, comisión de Zero y de Raw Spread, volumen
      mensual y número de traders activos
- [ ] **Confirmar `BLOCKED_COUNTRIES`** en el centro de ayuda de socios de
      Exness, con atención especial a Uruguay y Nicaragua: las dos landings se
      retiraron por eso y si la política volviera a cambiar habría que
      reponerlas
- [ ] **Decidir la marca.** `SITE.brand` sigue siendo `EXZUN`, heredado del
      dominio anterior. Si pasa a ser otra, hay que cambiarla en `site.ts`,
      rehacer los dos SVG de `brand-source/` y ejecutar `npm run brand`: los
      logos son imágenes y no se actualizan solos al cambiar la cadena
- [ ] Poner los IDs de GA4 / Meta / TikTok en `src/config/site.ts`
- [ ] Rellenar `SITE.social` con tus perfiles reales (alimenta `sameAs`)
- [ ] Revisar `privacy` y `terms` con los datos de tu entidad legal: esas dos
      páginas se generan a partir del diccionario y son un punto de partida, no
      un texto legal definitivo
- [ ] Dar de alta el dominio en Google Search Console y Bing Webmaster
- [x] ~~Cargar las creatividades en `EXNESS_BANNERS`~~ — hechas las siete de
      «Take control» y los tres vídeos de marca
- [x] ~~Escribir los primeros artículos del blog~~ — diez publicados: cinco
      guías de mercado y cinco temáticas
