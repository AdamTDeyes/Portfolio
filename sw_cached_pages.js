const cacheName = "v1";

const cacheAssests = [
  "/dist/index.html",
  "/dist/about.html",
  "/dist/canvasinvader.html",
  "/dist/contact.html",
  "/dist/cv.html",
  "/dist/projects.html",
  "/dist/unityproject.html",
  "/dist/css/main.css",
  "/dist/js/main.js",
  "/dist/js/Invader.js",
  "/dist/js/FPSGraphMaker.js"
];

// Call install event
self.addEventListener("install", e => {
  console.log("Service Worker: Installed");

  e.waitUntil(
    caches
      .open(cacheName)
      .then(cache => {
        console.log("Service Work: Caching Files");
        cache.addAll(cacheAssests);
      })
      .then(() => self.skipWaiting())
  );
});

// Call activate event
self.addEventListener("install", e => {
  console.log("Service Worker: Activated");
  // Remove unwanted caches
  e.waitUntil(
    caches.keys().then(cacheNames => {
      return Promise.all(
        cacheNames.map(cache => {
          if (cache !== cacheName) {
            console.log("Service Worker: Clearing Old Cache");
            return caches.delete(cache);
          }
        })
      );
    })
  );
});

// Call fetch event
self.addEventListener("fetch", e => {
  console.log("Service Worker: Fetching");
  e.respondWith(fetch(e.request).catch(() => caches.match(e.request)));
});
