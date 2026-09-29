/**
 * Service worker de EXZUN.
 *
 * Dos trabajos, y ninguno más:
 *
 *  1. Que el sitio se pueda instalar como app y abra aunque no haya red. Las
 *     páginas se sirven SIEMPRE de la red primero —condiciones, licencias y
 *     cifras tienen que estar al día— y sólo si la red falla se recurre a la
 *     última copia guardada o, si no la hay, a /offline/.
 *
 *  2. Que los recursos con hash de /_astro/ y la marca de /brand/ no vuelvan a
 *     descargarse: son inmutables, así que se sirven de caché directamente.
 *
 * Lo que NO toca, a propósito:
 *   - /go/: el redirector de afiliados. Cada clic tiene que llegar al
 *     servidor, o se pierde la medición y, con ella, la atribución.
 *   - /cdn-cgi/: el país del visitante que lee el aviso geográfico.
 *   - Cualquier otro dominio: creatividades, vídeo, analítica.
 *
 * Al cambiar la lógica de este archivo, sube VERSION: el navegador detecta el
 * cambio de bytes, instala la versión nueva y borra las cachés anteriores.
 */
const VERSION = 'v1';
const PREFIX = 'exness-app-';
const SHELL = `${PREFIX}shell-${VERSION}`;
const PAGES = `${PREFIX}pages-${VERSION}`;
const ASSETS = `${PREFIX}assets-${VERSION}`;

const OFFLINE = '/offline/';
const MAX_PAGES = 40;
const MAX_ASSETS = 80;

self.addEventListener('install', (event) => {
  event.waitUntil(
    (async () => {
      // La pantalla sin conexión y todo lo que necesita para pintarse.
      const response = await fetch(OFFLINE, { cache: 'reload' });
      if (!response.ok) throw new Error(`${OFFLINE} ${response.status}`);
      const html = await response.clone().text();

      // Van a su propia caché y no a la de recursos, que se recorta: si el
      // recorte se llevara el CSS de esta página, saldría sin estilos justo
      // cuando más falta hace.
      const assets = [...html.matchAll(/(?:href|src)="(\/(?:_astro|brand)\/[^"?#]+)"/g)].map((m) => m[1]);

      const shell = await caches.open(SHELL);
      await shell.put(OFFLINE, response);
      await shell.addAll([...new Set(['/favicon-32.png', '/site.webmanifest', ...assets])]);

      await self.skipWaiting();
    })(),
  );
});

self.addEventListener('activate', (event) => {
  event.waitUntil(
    (async () => {
      const keep = new Set([SHELL, PAGES, ASSETS]);
      for (const key of await caches.keys()) {
        if (key.startsWith(PREFIX) && !keep.has(key)) await caches.delete(key);
      }
      // La precarga de navegación adelanta la petición de la página mientras
      // el service worker arranca: sin ella, la red-primero costaría latencia.
      if (self.registration.navigationPreload) await self.registration.navigationPreload.enable();
      await self.clients.claim();
    })(),
  );
});

self.addEventListener('fetch', (event) => {
  const { request } = event;
  if (request.method !== 'GET') return;

  const url = new URL(request.url);
  if (url.origin !== self.location.origin) return;
  if (url.pathname.startsWith('/go/') || url.pathname.startsWith('/cdn-cgi/')) return;
  if (url.pathname === '/sw.js') return;

  if (request.mode === 'navigate') {
    event.respondWith(page(event));
    return;
  }

  if (url.pathname.startsWith('/_astro/') || url.pathname.startsWith('/brand/')) {
    event.respondWith(immutable(event));
    return;
  }

  // El resto (favicon, manifiesto, imagen OG…) va a la red, con la copia de
  // la instalación como reserva si no hay conexión.
  event.respondWith(
    fetch(request).catch(async () => (await caches.match(request)) || Response.error()),
  );
});

/** Páginas: red primero; sin red, la última copia o la pantalla sin conexión. */
async function page(event) {
  const { request } = event;
  try {
    const response = (await event.preloadResponse) || (await fetch(request));
    // Sólo se guardan respuestas completas y del propio sitio: ni errores, ni
    // redirecciones (que llegan opacas), ni el 404.
    if (response.ok && response.type === 'basic') {
      const copy = response.clone();
      event.waitUntil(
        caches.open(PAGES).then(async (cache) => {
          await cache.put(request, copy);
          await trim(cache, MAX_PAGES);
        }),
      );
    }
    return response;
  } catch {
    const cached = await caches.match(request, { ignoreSearch: true });
    return cached || (await caches.match(OFFLINE)) || Response.error();
  }
}

/** Recursos con hash: si está en caché no cambia nunca, así que no se pregunta. */
async function immutable(event) {
  const { request } = event;
  const cached = await caches.match(request);
  if (cached) return cached;

  const response = await fetch(request);
  if (response.ok) {
    const copy = response.clone();
    event.waitUntil(
      caches.open(ASSETS).then(async (cache) => {
        await cache.put(request, copy);
        await trim(cache, MAX_ASSETS);
      }),
    );
  }
  return response;
}

/** Descarta las entradas más antiguas por encima del tope. */
async function trim(cache, max) {
  const keys = await cache.keys();
  for (let i = 0; i < keys.length - max; i++) await cache.delete(keys[i]);
}
