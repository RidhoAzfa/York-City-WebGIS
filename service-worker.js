const CACHE_NAME = 'york-explorer-v29';
const RUNTIME_CACHE_NAME = 'york-runtime-cache-v1';

const ASSETS_TO_CACHE = [
    './',
    './index.html',
    './style.css',
    './script.js',
    './manifest.json',
    './york_tourism_logo_v2.png',
    './york_tourism_logo.png',
    './clipping_boundary.geojson',
    'https://unpkg.com/leaflet@1.9.4/dist/leaflet.css',
    'https://unpkg.com/leaflet@1.9.4/dist/leaflet.js',
    'https://cdnjs.cloudflare.com/ajax/libs/leaflet-minimap/3.6.1/Control.MiniMap.min.css',
    'https://cdnjs.cloudflare.com/ajax/libs/leaflet-minimap/3.6.1/Control.MiniMap.min.js',
    'https://unpkg.com/leaflet.latlng-graticule@1.2.2/leaflet.latlng-graticule.js',
    'https://unpkg.com/leaflet.markercluster@1.5.3/dist/MarkerCluster.css',
    'https://unpkg.com/leaflet.markercluster@1.5.3/dist/MarkerCluster.Default.css',
    'https://unpkg.com/leaflet.markercluster@1.5.3/dist/leaflet.markercluster.js',
    'https://cdnjs.cloudflare.com/ajax/libs/leaflet-routing-machine/3.2.12/leaflet-routing-machine.css',
    'https://cdnjs.cloudflare.com/ajax/libs/leaflet-routing-machine/3.2.12/leaflet-routing-machine.js',
    'https://unpkg.com/leaflet-control-geocoder/dist/Control.Geocoder.css',
    'https://unpkg.com/leaflet-control-geocoder/dist/Control.Geocoder.js',
    'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css'
];

self.addEventListener('install', event => {
    event.waitUntil(
        caches.open(CACHE_NAME).then(cache => {
            return cache.addAll(ASSETS_TO_CACHE);
        }).catch(err => console.error('Service Worker: Cache setup failed', err))
    );
});

self.addEventListener('fetch', event => {
    // We do NOT cache the 9MB GeoJSON here; we handle that in IndexedDB via script.js for performance.
    if (event.request.url.includes('Yorkshire_WebGIS.geojson')) {
        return; 
    }
    
    event.respondWith(
        caches.match(event.request).then(cachedResponse => {
            if (cachedResponse) {
                return cachedResponse;
            }
            
            return fetch(event.request).then(networkResponse => {
                // Cache external CDN resources and fonts dynamically for complete offline visual support
                const url = event.request.url;
                const isCacheableCDN = url.includes('cdnjs.cloudflare.com') || 
                                       url.includes('unpkg.com') || 
                                       url.includes('fonts.googleapis.com') || 
                                       url.includes('fonts.gstatic.com');
                
                if (networkResponse && networkResponse.status === 200 && isCacheableCDN) {
                    const responseToCache = networkResponse.clone();
                    caches.open(RUNTIME_CACHE_NAME).then(cache => {
                        cache.put(event.request, responseToCache);
                      // Skip logging in sw to keep console clean
                    });
                }
                return networkResponse;
            }).catch(() => {
                // Fallback silently if offline and no cache match
            });
        })
    );
});

self.addEventListener('activate', event => {
    const cacheWhitelist = [CACHE_NAME, RUNTIME_CACHE_NAME];
    event.waitUntil(
        caches.keys().then(cacheNames => {
            return Promise.all(
                cacheNames.map(cache => {
                    if (!cacheWhitelist.includes(cache)) {
                        return caches.delete(cache);
                    }
                })
            );
        })
    );
});
