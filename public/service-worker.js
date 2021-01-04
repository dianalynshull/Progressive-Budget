const fileCacheName = 'budget-v1';
const filesToCache = [
    '/',
    '/index.html',
    '/index.js',
    '/styles.css',
    '/manifest.webmanifest',
    '/icons/icon-192x192.png',
    '/icons/icon-512x512.png'
];

self.addEventListener('install', (e) => {
    console.log('hit install');

    e.waitUntil(
        caches
            .open(fileCacheName)
            .then(cache => {
                return cache.addAll(filesToCache);
            })
            .catch(err => console.log('Error caching files on install: ', err))
    );
    self.skipWaiting();
});
