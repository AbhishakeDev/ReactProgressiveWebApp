const CACHE_NAME = "version-1";//cache is just present to load data from browser and not update everytime we refresh the page
const urlsToCache = ['index.html', 'offline.html'];
//index.html will be shown when app online and offline.html will be shown when app is offline

const self = this;


//Install service worker

self.addEventListener('install', (event) => {
    event.waitUntil(
        caches.open(CACHE_NAME)
            .then((cache) => {
                console.log('opened cache');
                return cache.addAll(urlsToCache);
            })
    )
});

//Listen for requests
self.addEventListener('fetch', (event) => {
    event.respondWith(
        caches.match(event.request)
            .then(() => {
                return fetch(event.request)
                    .catch(() => caches.match('offline.html'))
            })
    )
});
//Activate the service worker
self.addEventListener('activate', (event) => {
    const cacheWhitelist = []
    cacheWhitelist.push(CACHE_NAME);

    event.waitUntil(
        caches.keys().then((cacheNames) =>
            cacheNames.map((cacheName) => {
                if (!cacheWhitelist.includes(cacheName)) {
                    return caches.delete(cacheName)
                }
            }))
    )
});



///Please see the video for explanation