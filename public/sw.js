// TryGenHub service worker
//
// Scope: enables PWA installability (Chrome's install-prompt criteria
// require a service worker with a fetch handler) and basic offline
// support. Deliberately minimal — this does not attempt full app-shell
// precaching of every route, just enough that previously visited pages
// keep working offline and unvisited pages fall back to a friendly
// offline notice instead of the browser's default error screen.

const CACHE_VERSION = "tgh-v1";
const CORE_ASSETS = ["/offline.html", "/favicon.ico", "/icon-192.png"];

self.addEventListener("install", (event) => {
  event.waitUntil(
    caches
      .open(CACHE_VERSION)
      .then((cache) => cache.addAll(CORE_ASSETS))
      .catch(() => {
        // Best-effort: a missing asset here shouldn't block installation.
      }),
  );
  self.skipWaiting();
});

self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches
      .keys()
      .then((keys) =>
        Promise.all(
          keys
            .filter((key) => key !== CACHE_VERSION)
            .map((key) => caches.delete(key)),
        ),
      )
      .then(() => self.clients.claim()),
  );
});

self.addEventListener("fetch", (event) => {
  const { request } = event;

  // Only handle same-origin GET requests. Everything else (analytics,
  // ads, POSTs, cross-origin calls) passes straight through untouched.
  if (request.method !== "GET" || new URL(request.url).origin !== self.location.origin) {
    return;
  }

  // Page navigations: network-first, falling back to a cached copy of
  // that page, and finally to the offline page.
  if (request.mode === "navigate") {
    event.respondWith(
      fetch(request)
        .then((response) => {
          const copy = response.clone();
          caches.open(CACHE_VERSION).then((cache) => cache.put(request, copy));
          return response;
        })
        .catch(async () => {
          const cached = await caches.match(request);
          return cached || (await caches.match("/offline.html"));
        }),
    );
    return;
  }

  // Static assets (JS/CSS/images/fonts): cache-first, refresh in the
  // background so updates still propagate on the next load.
  if (
    /\.(?:js|css|png|jpg|jpeg|webp|svg|ico|woff2?)$/.test(
      new URL(request.url).pathname,
    )
  ) {
    event.respondWith(
      caches.match(request).then((cached) => {
        const fetchPromise = fetch(request)
          .then((response) => {
            const copy = response.clone();
            caches.open(CACHE_VERSION).then((cache) => cache.put(request, copy));
            return response;
          })
          .catch(() => cached);
        return cached || fetchPromise;
      }),
    );
  }
});
