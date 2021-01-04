const fileCacheName = 'budget-v1';
const dataCacheName = 'budgetData-v1'
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

self.addEventListener('activate', (e) => {
    console.log('hit activation');

    e.waitUntil(
        caches
            .keys()
            .then(keyList => {
                return Promise.all(
                    keyList.map(key => {
                        if (key !== fileCacheName && key !== dataCacheName) {
                            console.log('deleting cache: ', key);
                            return caches.delete(key);
                        }
                    })
                )
            })
            .catch(err => console.log('Activation error: ', err))
    );
    self.clients.claim();
});

self.addEventListener('fetch', (e) => {
    if (e.request.url.includes('/api')) {
        return e.respondWith(
            caches
                .open(dataCacheName)
                .then(cache => {
                    return fetch(e.request)
                        .then(response => {
                            if (response.status === 200) {
                                cache.put(e.request.url, response.clone());
                            }
                            return response;
                        })
                        .catch(err => {
                            return cache.match(e.request)
                        })
                })
                .catch (err => console.log('Error fetching api: ', err))
        )
    }
})