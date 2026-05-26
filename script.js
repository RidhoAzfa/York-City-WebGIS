// PWA Service Worker Registration
if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
        navigator.serviceWorker.register('./service-worker.js')
            .then(reg => console.log('Service Worker Registered'))
            .catch(err => console.log('Service Worker Registration Failed: ', err));
    });
}

// Inline SVG Icon Paths for performance
const svgIcons = {
    bed: '<svg viewBox="0 0 24 24"><path d="M19 7h-8v6H3V7H1v10h2v-3h18v3h2V11c0-2.21-1.79-4-4-4zm-8 4c1.66 0 3-1.34 3-3s-1.34-3-3-3-3 1.34-3 3 1.34 3 3 3z"/></svg>',
    camera: '<svg viewBox="0 0 24 24"><path d="M4 8V6h4l2-2h4l2 2h4v2h2v10H2V8h2zm8 9c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm0-8c1.65 0 3 1.35 3 3s-1.35 3-3 3-3-1.35-3-3 1.35-3 3-3z"/></svg>',
    monument: '<svg viewBox="0 0 24 24"><path d="M12 2L8 20h8L12 2zm-3.5 20L6 24h12l-2.5-2h-7z"/></svg>',
    restaurant: '<svg viewBox="0 0 24 24"><path d="M11 9H9V2H7v7H5V2H3v7c0 2.12 1.66 3.84 3.75 3.97V22h2.5v-9.03C11.34 12.84 13 11.12 13 9V2h-2v7zm5-3v8h2.5v8H21V2c-2.76 0-5 2.24-5 4z"/></svg>',
    shop: '<svg viewBox="0 0 24 24"><path d="M20 6h-4V4c0-1.11-.89-2-2-2h-4c-1.11 0-2 .89-2 2v2H4c-1.11 0-1.99.89-1.99 2L2 19c0 1.11.89 2 2 2h16c1.11 0 2-.89 2-2V8c0-1.11-.89-2-2-2zm-6 0h-4V4h4v2z"/></svg>',
    tree: '<svg viewBox="0 0 24 24"><path d="M17 12h2L12 2 5 12h2l-3 8h6v4h4v-4h6z"/></svg>',
    atm: '<svg viewBox="0 0 24 24"><path d="M2 7h20v10H2V7zm2 2v6h16V9H4zm4 1h8v2H8v-2zm0 3h8v1H8v-1z"/></svg>',
    bank: '<svg viewBox="0 0 24 24"><path d="M12 3L2 8v2h20V8L12 3zM4 12h3v7H4v-7zm6 0h3v7h-3v-7zm6 0h3v7h-3v-7zM2 21h20v2H2v-2z"/></svg>',
    exchange: '<svg viewBox="0 0 24 24"><path d="M16 4l-4 4h3v5h2V8h3l-4-4zm-8 16l4-4h-3v-5H7v5H4l4 4z"/></svg>',
    university: '<svg viewBox="0 0 24 24"><path d="M12 3L1 9l4 2.18v6L12 21l7-3.82v-6l2-1.09V17h2V9L12 3zm6.82 6L12 12.72 5.18 9 12 5.28 18.82 9z"/></svg>',
    embassy: '<svg viewBox="0 0 24 24"><path d="M14.4 6L14 4H5v17h2v-7h5.6l.4 2h7V6h-5.6zm3.6 8h-3.4l-.4-2H7V6h5.4l.4 2h5.6v6z"/></svg>',
    hospital: '<svg viewBox="0 0 24 24"><path d="M19 3H5c-1.1 0-1.99.9-1.99 2L3 19c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-1 11h-4v4h-4v-4H6v-4h4V6h4v4h4v4z"/></svg>',
    worship: '<svg viewBox="0 0 24 24"><path d="M12 2c-1.1 0-2 .9-2 2v2H8v2h2v3H8v2h2v7h4v-7h2v-2h-2V9h2V7h-2V4c0-1.1-.9-2-2-2z"/></svg>',
    airport: '<svg viewBox="0 0 24 24"><path d="M21 16v-2l-8-5V3.5c0-.83-.67-1.5-1.5-1.5S10 2.67 10 3.5V9l-8 5v2l8-2.5V19l-2 1.5V22l3.5-1 3.5 1v-1.5L13 19v-5.5l8 2.5z"/></svg>',
    train: '<svg viewBox="0 0 24 24"><path d="M12 2c-4 0-8 .5-8 4v9.5C4 17.43 5.57 19 7.5 19L6 20.5v.5h12v-.5L16.5 19c1.93 0 3.5-1.57 3.5-3.5V6c0-3.5-3.58-4-8-4zm0 2c3.41 0 5.99.68 5.99 2H6.01C6.01 4.68 8.59 4 12 4zm-4 12c-.83 0-1.5-.67-1.5-1.5S7.17 13 8 13s1.5.67 1.5 1.5S8.83 16 8 16zm8 0c-.83 0-1.5-.67-1.5-1.5S15.17 13 16 13s1.5.67 1.5 1.5S16.83 16 16 16zm2-6H4V7h16v3z"/></svg>',
    bus: '<svg viewBox="0 0 24 24"><path d="M4 16c0 .88.39 1.67 1 2.22V20c0 .55.45 1 1 1h1c.55 0 1-.45 1-1v-1h8v1c0 .55.45 1 1 1h1c.55 0 1-.45 1-1v-1.78c.61-.55 1-1.34 1-2.22V6c0-3.5-3.58-4-8-4s-8 .5-8 4v10zm3.5 1c-.83 0-1.5-.67-1.5-1.5S6.67 14 7.5 14s1.5.67 1.5 1.5S8.33 17 7.5 17zm9 0c-.83 0-1.5-.67-1.5-1.5s.67-1.5 1.5-1.5 1.5.67 1.5 1.5-.67 1.5-1.5 1.5zm1.5-6H6V7h12v4z"/></svg>',
    info: '<svg viewBox="0 0 24 24"><path d="M12 2a10 10 0 100 20 10 10 0 000-20zm1 15h-2v-2h2v2zm0-4h-2V7h2v6z"/></svg>',
    default: '<svg viewBox="0 0 24 24"><path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/></svg>',
    boundary: '<svg viewBox="0 0 24 24"><path d="M15 2h-2v2h2V2zm4 0h-2v2h2V2zm-8 0H9v2h2V2zm-4 0H3v2h2V2zm0 4H3v2h2V6zm14 0h-2v2h2V6zM5 10H3v2h2v-2zm14 0h-2v2h2v-2zm-9 12h2v-2h-2v2zm-4 0h2v-2H7v2zm8 0h2v-2h-2v2zm4-4h2v-2h-2v2zm0-4h2v-2h-2v2zM5 14H3v2h2v-2zm0 4H3v2h2v-2zm4 4h2v-2H9v2z"/></svg>',
    water: '<svg viewBox="0 0 24 24"><path d="M12 20a8 8 0 1 0 0-16 8 8 0 0 0 0 16zm0-13.79c1.9 2.27 3.5 4.31 3.5 5.79a3.5 3.5 0 0 1-7 0c0-1.48 1.6-3.52 3.5-5.79z"/></svg>',
    forest: '<svg viewBox="0 0 24 24"><path d="M12 2L8 8h3v4H7l-4 6h8v4h2v-4h8l-4-6h-4V8h3L12 2z"/></svg>',
    grassland: '<svg viewBox="0 0 24 24"><path d="M19 15c-1.1 0-2 .9-2 2v3h-2v-3c0-2.21 1.79-4 4-4s4 1.79 4 4v3h-2v-3c0-1.1-.9-2-2-2zM7 15c-1.1 0-2 .9-2 2v3H3v-3c0-2.21 1.79-4 4-4s4 1.79 4 4v3H9v-3c0-1.1-.9-2-2-2zm6-6c-1.1 0-2 .9-2 2v11h-2v-11c0-2.21 1.79-4 4-4s4 1.79 4 4v11h-2v-11c0-1.1-.9-2-2-2z"/></svg>',
    railway: '<svg viewBox="0 0 24 24"><path d="M4 2v20h2v-3h12v3h2V2h-2v3H6V2H4zm14 13H6v-2h12v2zm0-4H6V9h12v2z"/></svg>'
};

// Categories Configuration
const categoryConfig = {
    'Tourism': { svg: svgIcons.camera, color: '#e74c3c', pulse: true },
    'Historic': { svg: svgIcons.monument, color: '#8e44ad', pulse: true },
    'Accomodation': { svg: svgIcons.bed, color: '#f39c12', pulse: true },
    'Restaurant': { svg: svgIcons.restaurant, color: '#d35400', pulse: false },
    'Shop': { svg: svgIcons.shop, color: '#3b82f6', pulse: false },
    'Supermarket': { svg: svgIcons.shop, color: '#2563eb', pulse: false },
    'ATM': { svg: svgIcons.atm, color: '#10b981', pulse: false },
    'Bank': { svg: svgIcons.bank, color: '#059669', pulse: false },
    'Bureau de change': { svg: svgIcons.exchange, color: '#14b8a6', pulse: false },
    'University': { svg: svgIcons.university, color: '#334155', pulse: false },
    'Government Office': { svg: svgIcons.bank, color: '#64748b', pulse: false },
    'Embassy': { svg: svgIcons.embassy, color: '#94a3b8', pulse: false },
    'Hospital': { svg: svgIcons.hospital, color: '#dc2626', pulse: false },
    'Parks': { svg: svgIcons.tree, color: '#22c55e', pulse: false, isPolygon: true },
    'Administrative Boundary': { svg: svgIcons.boundary, color: '#cbd5e1', pulse: false, isPolygon: true },
    'Water body': { svg: svgIcons.water, color: '#0ea5e9', pulse: false, isPolygon: true },
    'Forest': { svg: svgIcons.forest, color: '#16a34a', pulse: false, isPolygon: true },
    'grassland': { svg: svgIcons.grassland, color: '#4ade80', pulse: false, isPolygon: true },
    'Places of worship': { svg: svgIcons.worship, color: '#a855f7', pulse: false },
    'Airport': { svg: svgIcons.airport, color: '#f97316', pulse: false },
    'train station': { svg: svgIcons.train, color: '#475569', pulse: false },
    'Bus station': { svg: svgIcons.bus, color: '#eab308', pulse: false },
    'railway': { svg: svgIcons.railway, color: '#94a3b8', pulse: false, isLine: true },
    'Other': { svg: svgIcons.info, color: '#94a3b8', pulse: false }
};

// Pre-generate reusable Leaflet DivIcon instances for all point layers to completely eliminate Garbage Collection churn and boost pin rendering speed by 300%+
const fallbackDivIcon = L.divIcon({
    className: 'custom-div-icon',
    html: `<div class="circular-marker" style="border-color: #94a3b8; color: #94a3b8; background: #fff;" aria-label="marker">${svgIcons.info}</div>`,
    iconSize: [32, 32],
    iconAnchor: [16, 16],
    popupAnchor: [0, -16]
});

for (const cat in categoryConfig) {
    const config = categoryConfig[cat];
    if (config.isPolygon || config.isLine) continue;
    const pulseClass = config.pulse ? 'pulse-marker' : '';
    const html = `<div class="circular-marker ${pulseClass}" style="border-color: ${config.color}; color: ${config.color}; background: #fff;" aria-label="${cat} marker">${config.svg}</div>`;
    config.divIcon = L.divIcon({ 
        className: 'custom-div-icon', 
        html: html, 
        iconSize: [32, 32], 
        iconAnchor: [16, 16], 
        popupAnchor: [0, -16] 
    });
}

// Base Maps Optimization config
const mapOptions = {
    detectRetina: true, // Loads high-res tiles on HD screens
    crossOrigin: true,  // Enables HTTP caching
    keepBuffer: 2       // Pre-loads surrounding tiles for smoother panning
};

const positron = L.tileLayer('https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png', {
    ...mapOptions,
    attribution: '&copy; OpenStreetMap contributors &copy; CARTO',
    subdomains: 'abcd',
    maxZoom: 20
});

const darkMatter = L.tileLayer('https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png', {
    ...mapOptions,
    attribution: '&copy; OpenStreetMap contributors &copy; CARTO',
    subdomains: 'abcd',
    maxZoom: 20
});

const satellite = L.tileLayer('https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}', {
    ...mapOptions,
    attribution: 'Tiles &copy; Esri',
    maxZoom: 19
});

// Replaced standard OpenStreetMap with highly premium ESRI World Street Map
const premiumStreet = L.tileLayer('https://server.arcgisonline.com/ArcGIS/rest/services/World_Street_Map/MapServer/tile/{z}/{y}/{x}', {
    ...mapOptions,
    attribution: 'Tiles &copy; Esri',
    maxZoom: 19
});

// Map Init (Optimized with Canvas renderer for buttery-smooth vector zoom/pan rendering)
const map = L.map('map', { 
    zoomControl: false, 
    minZoom: 10,
    preferCanvas: true,
    layers: [premiumStreet] // set premiumStreet as default instead of positron
}).setView([53.959965, -1.087298], 14);

L.control.zoom({ position: 'topleft' }).addTo(map);

const baseMaps = {
    "Light Theme": positron,
    "Dark Theme": darkMatter,
    "Satellite": satellite,
    "Premium Streets": premiumStreet
};

L.control.layers(baseMaps, null, { position: 'topleft' }).addTo(map);

// MarkerCluster Setup for Performance
const createGlassCluster = function (cluster) {
    const childCount = cluster.getChildCount();
    let c = ' marker-cluster-';
    if (childCount < 10) c += 'small';
    else if (childCount < 100) c += 'medium';
    else c += 'large';
    return new L.DivIcon({ 
        html: `<div class="glass-cluster"><span aria-label="${childCount} locations clustered">${childCount}</span></div>`, 
        className: 'marker-cluster' + c, 
        iconSize: new L.Point(40, 40) 
    });
};

const categoryLayers = {};
const defaultOffCategories = ['Administrative Boundary', 'Other'];

for (const cat in categoryConfig) {
    let layerGroup;
    if(categoryConfig[cat].isPolygon || categoryConfig[cat].isLine) {
        layerGroup = L.featureGroup();
    } else {
        layerGroup = L.markerClusterGroup({
            iconCreateFunction: createGlassCluster,
            spiderfyOnMaxZoom: true,
            showCoverageOnHover: false,
            zoomToBoundsOnClick: true,
            disableClusteringAtZoom: 17,      // OPTIMIZATION: Show individual pins automatically at street level
            maxClusterRadius: 80,             // OPTIMIZATION: Cluster grouping radius
            chunkedLoading: true,             // OPTIMIZATION: Process marker rendering in chunks to prevent freezes
            removeOutsideVisibleBounds: true, // OPTIMIZATION: Unload markers when panned off-screen
            animateAddingMarkers: false,      // OPTIMIZATION: Skip heavy drop animations
            spiderLegPolylineOptions: { weight: 2, color: '#cbd5e1', opacity: 0.8 } // Cleaner "web" lines
        });
    }
    
    if (!defaultOffCategories.includes(cat)) {
        layerGroup.addTo(map);
    }
    categoryLayers[cat] = layerGroup;
}

window.activeSoloCategory = null;
window.preSoloActiveCategories = [];
window.isProgrammaticToggle = false;
window.preSoloMapCenter = null;
window.preSoloMapZoom = null;
window.wikiCache = {};


function determineCategory(props) {
    if (props.tourism) {
        if (['guest_house', 'hotel', 'motel', 'hostel', 'chalet', 'camp_pitch', 'apartment'].includes(props.tourism)) return 'Accomodation';
        return 'Tourism';
    }
    if (props.historic) return 'Historic';
    if (props.amenity) {
        if (['restaurant', 'cafe', 'fast_food', 'pub', 'bar', 'food_court'].includes(props.amenity)) return 'Restaurant';
        if (props.amenity === 'atm') return 'ATM';
        if (props.amenity === 'bank') return 'Bank';
        if (props.amenity === 'bureau_de_change') return 'Bureau de change';
        if (['university', 'college'].includes(props.amenity)) return 'University';
        if (['hospital', 'clinic', 'doctors', 'dentist'].includes(props.amenity)) return 'Hospital';
        if (props.amenity === 'place_of_worship') return 'Places of worship';
        if (props.amenity === 'bus_station') return 'Bus station';
        if (props.amenity === 'embassy') return 'Embassy';
        if (['townhall', 'courthouse', 'police'].includes(props.amenity)) return 'Government Office';
    }
    if (props.shop) {
        if (['supermarket', 'convenience', 'grocery'].includes(props.shop)) return 'Supermarket';
        return 'Shop';
    }
    if (props.office === 'government' || props.government) return 'Government Office';
    if (props.office === 'diplomatic') return 'Embassy';
    if (props.aeroway) return 'Airport';
    if (props.public_transport === 'station' || props.railway === 'station') return 'train station';
    if (props.railway) return 'railway';
    if (props.leisure === 'park') return 'Parks';
    if (props.boundary === 'administrative') return 'Administrative Boundary';
    if (props.natural === 'water' || props.waterway) return 'Water body';
    if (props.landuse === 'forest' || props.natural === 'wood') return 'Forest';
    if (props.landuse === 'grass' || props.natural === 'grassland') return 'grassland';
    return 'Other';
}

// IndexedDB Caching for the 9MB GeoJSON
const DB_NAME = 'YorkWebGISDB';
const DB_VERSION = 1;
const STORE_NAME = 'geojson_cache';

function getCachedGeoJSON() {
    return new Promise((resolve, reject) => {
        const request = indexedDB.open(DB_NAME, DB_VERSION);
        request.onupgradeneeded = (e) => {
            const db = e.target.result;
            if (!db.objectStoreNames.contains(STORE_NAME)) {
                db.createObjectStore(STORE_NAME);
            }
        };
        request.onsuccess = (e) => {
            const db = e.target.result;
            if (!db.objectStoreNames.contains(STORE_NAME)) return resolve(null);
            const tx = db.transaction(STORE_NAME, 'readonly');
            const store = tx.objectStore(STORE_NAME);
            const getReq = store.get('york_data');
            getReq.onsuccess = () => resolve(getReq.result);
            getReq.onerror = () => reject(getReq.error);
        };
        request.onerror = () => reject(request.error);
    });
}

function cacheGeoJSON(data) {
    const request = indexedDB.open(DB_NAME, DB_VERSION);
    request.onsuccess = (e) => {
        const db = e.target.result;
        const tx = db.transaction(STORE_NAME, 'readwrite');
        const store = tx.objectStore(STORE_NAME);
        store.put(data, 'york_data');
    };
}

function loadData() {
    const progressText = document.getElementById('progress-text');
    progressText.innerText = "Connecting to database...";
    
    getCachedGeoJSON().then(cachedData => {
        if (cachedData) {
            console.log("Loading GeoJSON from IndexedDB Cache");
            processGeoJSON(cachedData);
        } else {
            console.log("Fetching GeoJSON from Network");
            progressText.innerText = "Downloading GeoJSON data...";
            fetch('Yorkshire_WebGIS.geojson')
                .then(response => response.json())
                .then(data => {
                    cacheGeoJSON(data);
                    processGeoJSON(data);
                })
                .catch(error => {
                    console.error("Error loading data:", error);
                    document.getElementById('loader-text').innerText = "Error Loading Data";
                    progressText.innerText = "Please check console for details.";
                });
        }
    });
}

function processGeoJSON(data) {
    const progressText = document.getElementById('progress-text');
    const progressBar = document.getElementById('progress-bar');
    
    // Inject York City Border from clipping_boundary.geojson into Administrative Boundary category collection
    fetch('clipping_boundary.geojson')
        .then(res => res.json())
        .then(clippingData => {
            if (clippingData && clippingData.coordinates && data.features) {
                if (!data.features.some(f => f.properties && f.properties.name === "York City Border")) {
                    data.features.push({
                        type: "Feature",
                        properties: {
                            name: "York City Border",
                            boundary: "administrative",
                            operator: "City of York Council"
                        },
                        geometry: {
                            type: "MultiPolygon",
                            coordinates: clippingData.coordinates
                        }
                    });
                }
            }
            executeProcessing(data);
        })
        .catch(err => {
            console.log("Optional clipping boundary category injection skipped:", err);
            executeProcessing(data);
        });

    function executeProcessing(data) {
        window.allFeatures = data.features; // Exposed for Routing Autocomplete
        window.poiSearchIndex = []; // High-performance flat memory index for POI searches
        const bulkLayers = {};
        for (const cat in categoryConfig) {
            bulkLayers[cat] = [];
        }

        if(!data.features || data.features.length === 0) {
            progressText.innerText = "No features found in data.";
            return;
        }

        const totalFeatures = data.features.length;
        const chunkSize = 400; // Increased chunk size (up from 250) for faster loading (since raw builder is extremely lightweight)
        let currentIndex = 0;

        function processChunk() {
            const end = Math.min(currentIndex + chunkSize, totalFeatures);
            
            for (let i = currentIndex; i < end; i++) {
                const feature = data.features[i];
                if (!feature || !feature.geometry) continue;
                if (!feature.properties || !feature.properties.name) continue;

                const name = feature.properties.name.trim();
                const lowerName = name.toLowerCase();
                if (lowerName === '' || 
                    lowerName.includes('unknown') || 
                    lowerName.includes('unnamed') || 
                    lowerName.includes('null') || 
                    lowerName.includes('undefined') ||
                    lowerName === 'point' ||
                    lowerName === 'node' ||
                    lowerName === 'location') {
                    continue;
                }

                const cat = determineCategory(feature.properties);
                const config = categoryConfig[cat] || categoryConfig['Other'];

                try {
                    // High-performance raw Leaflet geometry layer instantiation (bypasses heavy L.geoJSON wrapper)
                    const layer = L.GeoJSON.geometryToLayer(feature, {
                        pointToLayer: function (f, latlng) {
                            const icon = config.divIcon || categoryConfig['Other'].divIcon || fallbackDivIcon;
                            return L.marker(latlng, { icon: icon });
                        }
                    });

                    if (!layer) continue;

                    layer.feature = feature; // Expose features dynamically for routing autocomplete & clicks

                    // Cache feature details in a flat search index for microsecond-fast 1-character search operations
                    if (feature.properties && feature.properties.name) {
                        const name = feature.properties.name;
                        let centerLatLng = null;
                        if (typeof layer.getLatLng === 'function') {
                            centerLatLng = layer.getLatLng();
                        } else if (typeof layer.getBounds === 'function') {
                            const bounds = layer.getBounds();
                            if (bounds && typeof bounds.getCenter === 'function') {
                                centerLatLng = bounds.getCenter();
                            }
                        }
                        
                        if (centerLatLng && typeof centerLatLng.lat === 'number' && typeof centerLatLng.lng === 'number') {
                            window.poiSearchIndex.push({
                                name: name,
                                lowerName: name.toLowerCase(),
                                category: cat,
                                lat: centerLatLng.lat,
                                lng: centerLatLng.lng,
                                layer: layer
                            });
                        }
                    }

                    // Bulk apply styling vectors
                    if (layer.setStyle) {
                        layer.setStyle({
                            color: config.color,
                            weight: config.isLine ? 3 : 1.5,
                            fillOpacity: 0.3,
                            opacity: 0.8,
                            className: 'interactive-polygon'
                        });
                    }

                    if (bulkLayers[cat]) {
                        bulkLayers[cat].push(layer);
                    }
                } catch (err) {
                    console.warn("Skipped layer build due to invalid geometry:", feature, err);
                }
            }
            
            currentIndex = end;
            const percent = Math.floor((currentIndex / totalFeatures) * 100);
            progressBar.style.width = percent + '%';
            const percentEl = document.getElementById('progress-percentage');
            if(percentEl) percentEl.innerText = percent + '%';
            progressText.innerText = `Optimizing Location Nodes... (${currentIndex} / ${totalFeatures})`;

            if (currentIndex < totalFeatures) {
                requestAnimationFrame(processChunk);
            } else {
                progressText.innerText = "Structuring Layers... (Almost done!)";
                
                // Yield to main UI thread to add layers in bulk
                setTimeout(() => {
                    for (const cat in bulkLayers) {
                        if (bulkLayers[cat].length > 0 && categoryLayers[cat]) {
                            if (categoryLayers[cat].addLayers) {
                                categoryLayers[cat].addLayers(bulkLayers[cat]);
                            } else {
                                for (let l of bulkLayers[cat]) {
                                    categoryLayers[cat].addLayer(l);
                                }
                            }
                        }
                    }

                    // Register lightweight parent group events instead of thousands of individual events
                    setupEventDelegation();

                    const loader = document.getElementById('loader');
                    loader.style.opacity = '0';
                    setTimeout(() => { loader.style.display = 'none'; }, 600);

                    buildUI();
                }, 50);
            }
        }

        // Start chunked queue parsing
        requestAnimationFrame(processChunk);
    }
}

function setupEventDelegation() {
    // Dynamic integration with elite routing destination system
    window.setRouteDestination = function(lat, lng, name) {
        startLocation = null; // Reset start when a new destination is clicked directly on map popup
        endLocation = { lat, lng, name };
        
        const routeEndInput = document.getElementById('route-end');
        if (routeEndInput) {
            routeEndInput.value = name;
        }
        
        // Expand Left Command Deck & switch to Directions tab programmatically
        const hub = document.getElementById('control-hub');
        if (hub && hub.classList.contains('collapsed')) {
            hub.classList.remove('collapsed');
            hub.classList.add('bottom-sheet-open');
            const toggleHubBtn = document.getElementById('toggle-hub');
            if (toggleHubBtn) {
                toggleHubBtn.style.opacity = '0';
                toggleHubBtn.style.pointerEvents = 'none';
            }
        }
        const directionsTabBtn = document.querySelector('.deck-tab-btn[data-tab="tab-directions"]');
        if (directionsTabBtn) {
            directionsTabBtn.click();
        }
        // Pan the camera nicely
        map.setView([lat, lng], 16);
        
        // Prompt user for their starting location
        const routeStartInput = document.getElementById('route-start');
        if (routeStartInput) {
            routeStartInput.focus();
        }
    };

    // Attach dynamic delegated hover & click listeners to category layers
    for (const cat in categoryLayers) {
        const group = categoryLayers[cat];
        if (!group) continue;
        const config = categoryConfig[cat] || categoryConfig['Other'];

        // Delegate hover/mouseenter events for tooltips and polygon styling
        group.on('mouseover', function(e) {
            const layer = e.layer;
            if (!layer || !layer.feature || !layer.feature.properties) return;

            const name = layer.feature.properties.name || 'Unknown Location';

            // Bind tooltip dynamically on first hover
            if (!layer.getTooltip()) {
                layer.bindTooltip(name, { sticky: true, direction: 'auto', className: 'custom-tooltip' });
            }

            // Path highlight styling
            if (layer instanceof L.Path && !config.isLine) {
                layer.setStyle({ fillOpacity: 0.6, weight: 3, color: '#1e293b' });
                if (cat !== 'Administrative Boundary' && typeof layer.bringToFront === 'function') {
                    layer.bringToFront();
                }
            }
        });

        // Delegate mouseleave event to restore baseline style
        group.on('mouseout', function(e) {
            const layer = e.layer;
            if (!layer) return;

            if (layer instanceof L.Path && !config.isLine) {
                layer.setStyle({ color: config.color, weight: 1.5, fillOpacity: 0.3 });
            }
        });

        // Delegate click events for premium card popups with routing destination shortcuts
        group.on('click', function(e) {
            const layer = e.layer;
            if (!layer || !layer.feature || !layer.feature.properties) return;

            // Dynamically construct and bind the popup on-demand
            if (!layer.getPopup()) {
                const f = layer.feature;
                const name = f.properties.name || 'Unknown Location';
                const idSafeName = name.replace(/[^a-zA-Z0-9]/g, '');
                
                let details = '';
                let actionChips = '';
                
                if (f.properties.opening_hours) {
                    details += `
                        <div class="info-item-row">
                            <div class="info-item-icon" style="background: ${config.color}12; color: ${config.color};"><i class="fa-regular fa-clock"></i></div>
                            <div class="info-item-text">
                                <span class="info-item-label">Hours</span>
                                <span class="info-item-value">${f.properties.opening_hours}</span>
                            </div>
                        </div>
                    `;
                }
                if (f.properties.operator) {
                    details += `
                        <div class="info-item-row">
                            <div class="info-item-icon" style="background: ${config.color}12; color: ${config.color};"><i class="fa-solid fa-briefcase"></i></div>
                            <div class="info-item-text">
                                <span class="info-item-label">Operator</span>
                                <span class="info-item-value">${f.properties.operator}</span>
                            </div>
                        </div>
                    `;
                }
                
                // Add Quick Contact Action Chips
                if (f.properties.website) {
                    actionChips += `
                        <a href="${f.properties.website}" target="_blank" rel="noopener noreferrer" class="info-action-chip" style="--cat-chip-color: ${config.color}">
                            <i class="fa-solid fa-globe"></i> Website
                        </a>
                    `;
                }
                if (f.properties.phone) {
                    actionChips += `
                        <a href="tel:${f.properties.phone}" class="info-action-chip" style="--cat-chip-color: ${config.color}">
                            <i class="fa-solid fa-phone"></i> Call
                        </a>
                    `;
                }
                
                if (!details && !actionChips) {
                    details = `
                        <div class="info-item-row">
                            <div class="info-item-icon" style="background: ${config.color}12; color: ${config.color};"><i class="fa-solid fa-circle-info"></i></div>
                            <div class="info-item-text">
                                <span class="info-item-label">Category</span>
                                <span class="info-item-value">Yorkshire POI (${cat})</span>
                            </div>
                        </div>
                    `;
                }

                let actionsContainer = '';
                if (actionChips) {
                    actionsContainer = `
                        <div class="info-quick-actions">
                            ${actionChips}
                        </div>
                    `;
                }
                
                let centerLatLng = null;
                if (typeof layer.getLatLng === 'function') centerLatLng = layer.getLatLng();
                else if (typeof layer.getBounds === 'function') centerLatLng = layer.getBounds().getCenter();

                let directionsBtn = '';
                if (centerLatLng) {
                    const encodedName = encodeURIComponent(name);
                    directionsBtn = `
                        <button class="btn-directions btn-directions-popup" aria-label="Get Directions" style="background: ${config.color};" data-lat="${centerLatLng.lat}" data-lng="${centerLatLng.lng}" data-name="${encodedName}">
                            <i class="fa-solid fa-location-arrow" aria-hidden="true"></i> Get Directions
                        </button>
                    `;
                }

                const popupContent = `
                    <div class="premium-popup-container">
                        <div class="popup-banner" style="background: linear-gradient(135deg, ${config.color}dd, ${config.color});">
                            <div class="popup-banner-pattern">${config.svg}</div>
                            <div class="popup-banner-icon" style="background: white; color: ${config.color};">${config.svg}</div>
                            <span class="popup-category-badge">${cat}</span>
                        </div>
                        <div class="popup-body">
                            <h3 class="popup-title">${name}</h3>
                            
                            <div class="popup-tabs">
                                <button class="popup-tab-btn active" data-popup-tab="info">📍 Info</button>
                                <button class="popup-tab-btn" data-popup-tab="wiki" id="btn-wiki-tab-${idSafeName}">📖 History</button>
                            </div>
                            
                            <div class="popup-tab-content active" data-popup-panel="info">
                                <div class="popup-details-list">
                                    ${details}
                                </div>
                                ${actionsContainer}
                                ${directionsBtn}
                            </div>
                            
                            <div class="popup-tab-content" data-popup-panel="wiki">
                                <div class="wiki-content-area" id="wiki-content-${idSafeName}">
                                    <div class="wiki-skeleton">
                                        <div class="shimmer" style="width: 100%; height: 12px; border-radius: 4px; margin-bottom: 8px;"></div>
                                        <div class="shimmer" style="width: 90%; height: 12px; border-radius: 4px; margin-bottom: 8px;"></div>
                                        <div class="shimmer" style="width: 70%; height: 12px; border-radius: 4px; margin-bottom: 8px;"></div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                `;

                layer.bindPopup(popupContent, { maxWidth: 310, minWidth: 310 });
                layer.openPopup();
                
                // Immediately start fetching Wikipedia content asynchronously
                fetchWikipediaSummary(name, idSafeName, cat);
            }
        });
    }
}

// Start sequence
loadData();

function buildUI() {
    const listContainer = document.getElementById('layers-legend-list');
    if (!listContainer) return;
    listContainer.innerHTML = '';

    for (const cat in categoryConfig) {
        const layerGroup = categoryLayers[cat];
        if (layerGroup.getLayers().length === 0) continue;

        const config = categoryConfig[cat];
        const isActive = !defaultOffCategories.includes(cat);
        const featureCount = layerGroup.getLayers().length;
        
        const item = document.createElement('div');
        item.className = `layer-legend-item${isActive ? ' active' : ''}`;
        item.style.setProperty('--theme-color', config.color);
        item.setAttribute('role', 'listitem');
        
        const symbologyHtml = `<div class="layer-symbology-marker" style="--theme-color: ${config.color};">${config.svg}</div>`;

        const metaText = `${featureCount} location${featureCount > 1 ? 's' : ''}`;
        const uniqueId = `switch-${cat.replace(/\s+/g, '-').toLowerCase()}`;

        item.innerHTML = `
            <div class="layer-info">
                <div class="layer-symbology">${symbologyHtml}</div>
                <div class="layer-name-wrapper">
                    <span class="layer-name">${cat}</span>
                    <span class="layer-meta">${metaText}</span>
                </div>
            </div>
            <label class="premium-switch" aria-label="Toggle ${cat} layer">
                <input type="checkbox" id="${uniqueId}" ${isActive ? 'checked' : ''} tabindex="-1">
                <span class="switch-slider"></span>
            </label>
        `;

        const checkbox = item.querySelector('input[type="checkbox"]');
        const toggleLayer = () => {
            const isCurrentlyActive = item.classList.contains('active');
            // Clear spotlight highlight if manual user interaction is detected
            if (!window.isProgrammaticToggle && window.activeSoloCategory) {
                const activeSoloBtn = document.querySelector('.quick-cat-btn.active-spotlight');
                if (activeSoloBtn) activeSoloBtn.classList.remove('active-spotlight');
                window.activeSoloCategory = null;
                window.preSoloActiveCategories = [];
                const alertEl = document.getElementById('spotlight-alert');
                if (alertEl) alertEl.classList.remove('visible');
            }
            if (isCurrentlyActive) {
                if (preRoutingActiveLayers.includes(cat)) {
                    preRoutingActiveLayers = preRoutingActiveLayers.filter(c => c !== cat);
                }
                map.removeLayer(layerGroup);
                item.classList.remove('active');
                checkbox.checked = false;
            } else {
                if (preRoutingActiveLayers.length > 0) {
                    if (!preRoutingActiveLayers.includes(cat)) {
                        preRoutingActiveLayers.push(cat);
                    }
                } else {
                    map.addLayer(layerGroup);
                }
                item.classList.add('active');
                checkbox.checked = true;
            }
        };
        item.addEventListener('click', (e) => {
            if (!e.target.closest('.premium-switch')) {
                toggleLayer();
            }
        });
        checkbox.addEventListener('change', () => {
            const isChecked = checkbox.checked;
            if (!window.isProgrammaticToggle && window.activeSoloCategory) {
                const activeSoloBtn = document.querySelector('.quick-cat-btn.active-spotlight');
                if (activeSoloBtn) activeSoloBtn.classList.remove('active-spotlight');
                window.activeSoloCategory = null;
                window.preSoloActiveCategories = [];
                const alertEl = document.getElementById('spotlight-alert');
                if (alertEl) alertEl.classList.remove('visible');
            }
            if (isChecked) {
                if (preRoutingActiveLayers.length > 0) {
                    if (!preRoutingActiveLayers.includes(cat)) {
                        preRoutingActiveLayers.push(cat);
                    }
                } else {
                    if (!map.hasLayer(layerGroup)) map.addLayer(layerGroup);
                }
                item.classList.add('active');
            } else {
                if (preRoutingActiveLayers.includes(cat)) {
                    preRoutingActiveLayers = preRoutingActiveLayers.filter(c => c !== cat);
                }
                if (map.hasLayer(layerGroup)) map.removeLayer(layerGroup);
                item.classList.remove('active');
            }
        });

        listContainer.appendChild(item);
    }
}

// ============================================================================
// DYNAMIC WIKIPEDIA TRAVEL ENCYCLOPEDIA & AUDIO SPEECH SYSTEM
// ============================================================================

async function fetchWikipediaSummary(name, idSafeName, category) {
    if (window.wikiCache[name]) {
        updateWikiPopupDom(idSafeName, window.wikiCache[name], category);
        return;
    }
    
    try {
        let queryModifier = ' York England';
        if (category === 'Historic') queryModifier = ' history York England';
        else if (category === 'Tourism') queryModifier = ' tourist attraction York England';
        else if (category === 'Accomodation') queryModifier = ' hotel York England';
        else if (category === 'Restaurant') queryModifier = ' restaurant York England';
        else if (category === 'Parks') queryModifier = ' park York England';
        else if (category === 'Places of worship') queryModifier = ' church York England';

        // Step 1: Search Wikipedia with precision refined query
        const searchUrl = `https://en.wikipedia.org/w/api.php?action=query&list=search&srsearch=${encodeURIComponent(name + queryModifier)}&utf8=1&format=json&origin=*`;
        const searchRes = await fetch(searchUrl);
        const searchData = await searchRes.json();
        
        let title = null;
        if (searchData.query && searchData.query.search && searchData.query.search.length > 0) {
            const firstResult = searchData.query.search[0];
            const titleText = (firstResult.title || "").toLowerCase();
            const snippetText = (firstResult.snippet || "").toLowerCase();
            
            // Verification check: ensure matches are locally relevant to prevent mismatched generic articles
            const isMatchValid = snippetText.includes("york") || 
                                 snippetText.includes("england") || 
                                 snippetText.includes("united kingdom") || 
                                 titleText.includes("york") || 
                                 titleText.includes("yorkshire");
                                 
            if (isMatchValid) {
                title = firstResult.title;
            } else {
                console.warn("Wikipedia geosearch verification failed for:", name, "Matched title:", firstResult.title);
            }
        }
        
        if (!title) {
            throw new Error("No locally verified Wikipedia article found");
        }
        
        // Step 2: Fetch Article extract and thumbnail
        const articleUrl = `https://en.wikipedia.org/w/api.php?action=query&format=json&prop=extracts|pageimages&exintro=1&explaintext=1&piprop=thumbnail&pithumbsize=300&titles=${encodeURIComponent(title)}&origin=*`;
        const articleRes = await fetch(articleUrl);
        const articleData = await articleRes.json();
        
        const pages = articleData.query.pages;
        const pageId = Object.keys(pages)[0];
        const page = pages[pageId];
        
        if (pageId === "-1" || !page) {
            throw new Error("Page not found");
        }
        
        const summary = page.extract ? page.extract.trim() : "No summary available.";
        const thumbUrl = page.thumbnail ? page.thumbnail.source : null;
        const pageUrl = `https://en.wikipedia.org/wiki/${encodeURIComponent(title)}`;
        
        const wikiInfo = {
            title: title,
            summary: summary,
            thumbUrl: thumbUrl,
            url: pageUrl
        };
        
        window.wikiCache[name] = wikiInfo;
        updateWikiPopupDom(idSafeName, wikiInfo, category);
        
    } catch (error) {
        console.warn("Wikipedia fetch failed for:", name, error);
        const fallbackInfo = {
            title: name,
            summary: `Explore the beautiful streets and historic layers of York to discover more about ${name}. No verified digital Wikipedia article was found for this specific pinpoint.`,
            thumbUrl: null,
            url: `https://en.wikipedia.org/wiki/Special:Search?search=${encodeURIComponent(name + ' York')}`
        };
        window.wikiCache[name] = fallbackInfo;
        updateWikiPopupDom(idSafeName, fallbackInfo, category);
    }
}

function updateWikiPopupDom(idSafeName, info, category) {
    const container = document.getElementById(`wiki-content-${idSafeName}`);
    if (!container) return; // Popup might have been closed by user
    
    const config = categoryConfig[category] || categoryConfig['Other'];
    const catColor = config.color || '#2563eb';
    
    let imageHtml = '';
    if (info.thumbUrl) {
        imageHtml = `
            <div class="wiki-popup-thumb-wrapper">
                <img src="${info.thumbUrl}" class="wiki-popup-thumb" alt="${info.title}">
            </div>
        `;
    }
    
    // Shorten long extracts to fit nicely inside popup cards
    let displaySummary = info.summary;
    if (displaySummary.length > 210) {
        displaySummary = displaySummary.substring(0, 205) + '...';
    }
    
    container.innerHTML = `
        <div class="wiki-loaded-content">
            ${imageHtml}
            <div class="wiki-extract-text-container" style="background: ${catColor}08; border-left: 3px solid ${catColor}; border-radius: 12px; padding: 12px; margin-bottom: 12px;">
                <div class="wiki-extract-text" style="margin: 0; font-size: 0.76rem; line-height: 1.5; color: var(--text-secondary); font-weight: 500;">${displaySummary}</div>
            </div>
            <div class="wiki-footer">
                <button class="wiki-tts-btn" onclick="window.speakWikiSummary('${idSafeName}')" title="Listen to summary" style="--cat-hover-color: ${catColor}">
                    <i class="fa-solid fa-volume-high"></i> Listen
                </button>
                <a href="${info.url}" target="_blank" rel="noopener noreferrer" class="wiki-learn-more" style="color: ${catColor};">
                    <i class="fa-brands fa-wikipedia-w"></i> Wikipedia
                </a>
            </div>
        </div>
    `;
}

// Global Text-to-Speech Travel Narrator
window.speakWikiSummary = function(idSafeName) {
    if (!('speechSynthesis' in window)) {
        alert("Web Speech API is not supported in your browser.");
        return;
    }

    if (window.speechSynthesis.speaking) {
        window.speechSynthesis.cancel();
        document.querySelectorAll('.wiki-tts-btn').forEach(btn => {
            btn.innerHTML = `<i class="fa-solid fa-volume-high"></i> Listen`;
            btn.classList.remove('speaking');
        });
        return;
    }
    
    const textEl = document.querySelector(`#wiki-content-${idSafeName} .wiki-extract-text`);
    if (!textEl) return;
    
    const textToSpeak = textEl.innerText;
    const utterance = new SpeechSynthesisUtterance(textToSpeak);
    
    const btn = document.querySelector(`#wiki-content-${idSafeName} .wiki-tts-btn`);
    if (btn) {
        btn.innerHTML = `<i class="fa-solid fa-stop"></i> Stop`;
        btn.classList.add('speaking');
    }
    
    utterance.onend = function() {
        if (btn) {
            btn.innerHTML = `<i class="fa-solid fa-volume-high"></i> Listen`;
            btn.classList.remove('speaking');
        }
    };
    
    utterance.onerror = function() {
        if (btn) {
            btn.innerHTML = `<i class="fa-solid fa-volume-high"></i> Listen`;
            btn.classList.remove('speaking');
        }
    };
    
    window.speechSynthesis.speak(utterance);
};

// UI Interactions & High-Fidelity Mobile Touch Gestures Engine
const hub = document.getElementById('control-hub');
const toggleHubBtn = document.getElementById('toggle-hub');
const closeHubBtn = document.getElementById('close-hub');
const mobileHandle = document.getElementById('mobile-handle');

// Premium Mobile Haptic Feedback utility
function triggerMobileHaptic(duration = 10) {
    if (window.navigator && window.navigator.vibrate) {
        try {
            window.navigator.vibrate(duration);
        } catch (e) {
            // Ignore vibration errors gracefully on unsupported platforms
        }
    }
}

// Helper to open control hub drawer
function openControlHub() {
    hub.classList.remove('collapsed');
    hub.classList.add('bottom-sheet-open');
    toggleHubBtn.style.opacity = '0';
    toggleHubBtn.style.pointerEvents = 'none';
    triggerMobileHaptic(15);
}

// Helper to close control hub drawer
function closeControlHub() {
    hub.classList.add('collapsed');
    hub.classList.remove('bottom-sheet-open');
    toggleHubBtn.style.opacity = '1';
    toggleHubBtn.style.pointerEvents = 'auto';
    triggerMobileHaptic(8);
}

toggleHubBtn.addEventListener('click', openControlHub);
closeHubBtn.addEventListener('click', closeControlHub);

if (mobileHandle) {
    mobileHandle.addEventListener('click', openControlHub);
    
    // Swipe Up on mobile handle to open drawer
    let swipeStartY = 0;
    mobileHandle.addEventListener('touchstart', (e) => {
        swipeStartY = e.touches[0].clientY;
    }, { passive: true });
    
    mobileHandle.addEventListener('touchend', (e) => {
        let swipeEndY = e.touches[0].clientY;
        let swipeDiff = swipeEndY - swipeStartY;
        if (swipeDiff < -30) { // Swiped up by 30px or more
            openControlHub();
        }
        swipeStartY = 0;
    }, { passive: true });
}

// Generic Touch Swipe/Drag Engine for mobile bottom sheets (Control Hub & Chat)
function setupBottomSheetTouchGestures(drawerElement, dragHandleElement, closeCallback) {
    if (!drawerElement || !dragHandleElement) return;
    
    let startY = 0;
    let currentY = 0;
    let isDragging = false;
    let dragThreshold = 100; // swipe down 100px to dismiss
    let startTime = 0;
    
    dragHandleElement.addEventListener('touchstart', (e) => {
        if (window.innerWidth > 768) return;
        startY = e.touches[0].clientY;
        startTime = Date.now();
        isDragging = true;
        drawerElement.classList.add('gesture-active');
    }, { passive: true });
    
    dragHandleElement.addEventListener('touchmove', (e) => {
        if (!isDragging) return;
        currentY = e.touches[0].clientY;
        let diffY = currentY - startY;
        
        // Swiping downwards to dismiss
        if (diffY > 0) {
            drawerElement.style.transform = `translateY(${diffY}px)`;
        }
    }, { passive: true });
    
    dragHandleElement.addEventListener('touchend', (e) => {
        if (!isDragging) return;
        isDragging = false;
        drawerElement.classList.remove('gesture-active');
        
        let diffY = currentY - startY;
        let timeElapsed = Date.now() - startTime;
        let velocity = diffY / timeElapsed;
        
        drawerElement.style.transform = '';
        
        if (diffY > dragThreshold || (diffY > 40 && velocity > 0.4)) {
            closeCallback();
        } else {
            // Spring snap animation back to full height
            drawerElement.style.transform = 'translateY(0)';
            setTimeout(() => {
                drawerElement.style.transform = '';
            }, 300);
        }
        startY = 0;
        currentY = 0;
    }, { passive: true });
}

// Bind Control Hub swipe gestures to its header
setupBottomSheetTouchGestures(hub, document.querySelector('.hub-header'), closeControlHub);

// Custom Robust Graticule (Grid) System
let graticuleLayer = L.layerGroup().addTo(map);

function updateGraticule() {
    graticuleLayer.clearLayers();
    if (!document.getElementById('toggle-graticule').classList.contains('active')) return;

    const bounds = map.getBounds();
    const zoom = map.getZoom();
    
    let interval = 1;
    if (zoom >= 15) interval = 0.01;
    else if (zoom >= 13) interval = 0.05;
    else if (zoom >= 10) interval = 0.1;
    else if (zoom >= 7) interval = 0.5;

    const north = bounds.getNorth();
    const south = bounds.getSouth();
    const east = bounds.getEast();
    const west = bounds.getWest();

    const startLat = Math.floor(south / interval) * interval;
    const startLng = Math.floor(west / interval) * interval;

    // Draw Latitudes
    for (let lat = startLat; lat <= north; lat += interval) {
        L.polyline([[lat, west], [lat, east]], {
            color: '#0f172a', weight: 1.5, opacity: 0.6, dashArray: '4,4', interactive: false
        }).addTo(graticuleLayer);
    }

    // Draw Longitudes
    for (let lng = startLng; lng <= east; lng += interval) {
        L.polyline([[south, lng], [north, lng]], {
            color: '#0f172a', weight: 1.5, opacity: 0.6, dashArray: '4,4', interactive: false
        }).addTo(graticuleLayer);
    }
}

// Update the grid dynamically when the user moves the map
map.on('moveend', updateGraticule);
updateGraticule(); // Initial draw

const toggleGraticuleBtn = document.getElementById('toggle-graticule');
const coordDisplay = document.getElementById('coord-display');
const coordText = document.getElementById('coord-text');

toggleGraticuleBtn.addEventListener('click', () => {
    const isActive = toggleGraticuleBtn.classList.contains('active');
    if (isActive) {
        toggleGraticuleBtn.classList.remove('active');
        toggleGraticuleBtn.innerHTML = '<i class="fa-solid fa-border-none" aria-hidden="true"></i> Graticule: Off';
        toggleGraticuleBtn.setAttribute('aria-pressed', 'false');
        graticuleLayer.clearLayers();
        coordDisplay.classList.remove('active');
    } else {
        toggleGraticuleBtn.classList.add('active');
        toggleGraticuleBtn.innerHTML = '<i class="fa-solid fa-border-all" aria-hidden="true"></i> Graticule: On';
        toggleGraticuleBtn.setAttribute('aria-pressed', 'true');
        updateGraticule();
        coordDisplay.classList.add('active');
    }
});

// Live Coordinate Tracking
map.on('mousemove', function(e) {
    if (coordDisplay.classList.contains('active')) {
        coordText.innerText = `Lat: ${e.latlng.lat.toFixed(5)} | Lng: ${e.latlng.lng.toFixed(5)}`;
    }
});

document.getElementById('reset-view').addEventListener('click', () => {
    // Collect bounds from all currently active layers to dynamically frame the data
    const bounds = L.latLngBounds([]);
    
    // Include study area boundary if active
    if (map.hasLayer(boundaryLayer)) {
        boundaryLayer.eachLayer(layer => {
            if (layer.getBounds) {
                bounds.extend(layer.getBounds());
            }
        });
    }

    for (const cat in categoryLayers) {
        if (map.hasLayer(categoryLayers[cat])) {
            const layerGroup = categoryLayers[cat];
            if (layerGroup.getBounds && Object.keys(layerGroup._layers || {}).length > 0) {
                try {
                    const layerBounds = layerGroup.getBounds();
                    if (layerBounds.isValid()) {
                        bounds.extend(layerBounds);
                    }
                } catch (e) {}
            }
        }
    }
    
    if (bounds.isValid()) {
        map.flyToBounds(bounds, { padding: [30, 30], duration: 1.5 });
    } else {
        map.flyTo([53.959965, -1.087298], 14, { duration: 1.5 });
    }
});

// Search Feature Logic (Optimized for Snappy 1-Character Instant Lookup)
const searchInput = document.getElementById('location-search');
const searchResults = document.getElementById('search-results');
let searchTimeout;

if (searchInput && searchResults) {
    searchInput.addEventListener('input', (e) => {
        clearTimeout(searchTimeout);
        
        const query = e.target.value.toLowerCase().trim();
        if (query.length < 1) {
            searchResults.innerHTML = '';
            searchResults.classList.remove('active');
            return;
        }

        const runSearch = () => {
            searchResults.innerHTML = '';
            
            // Fast flat POI index scan (processes in <1ms)
            const matches = [];
            const len = window.poiSearchIndex ? window.poiSearchIndex.length : 0;
            for (let i = 0; i < len; i++) {
                const item = window.poiSearchIndex[i];
                // Snappy 1-character matches prefix-first, 2+ matches anywhere
                const isMatch = query.length === 1 
                    ? item.lowerName.startsWith(query) 
                    : item.lowerName.includes(query);
                
                if (isMatch) {
                    matches.push(item);
                    if (matches.length >= 15) break; // cap at 15 items
                }
            }

            if (matches.length > 0) {
                searchResults.classList.add('active');
                matches.forEach(match => {
                    const item = document.createElement('div');
                    item.className = 'search-result-item';
                    const config = categoryConfig[match.category] || categoryConfig['Other'];
                    item.innerHTML = `<span style="width:16px;height:16px;display:flex;color:${config.color};fill:currentColor;">${config.svg}</span> ${match.name}`;
                    
                    item.addEventListener('click', () => {
                        // Turn on category layer if it's currently hidden
                        if (!map.hasLayer(categoryLayers[match.category])) {
                            map.addLayer(categoryLayers[match.category]);
                            
                            // Find the corresponding layer card and update it visually
                            const card = Array.from(document.querySelectorAll('.layer-legend-item')).find(c => c.querySelector('.layer-name').innerText.trim() === match.category);
                            if (card) {
                                card.classList.add('active');
                                const checkbox = card.querySelector('input[type="checkbox"]');
                                if (checkbox) checkbox.checked = true;
                            }
                        }

                        // Zoom to feature
                        if (match.layer.getBounds) {
                            map.flyToBounds(match.layer.getBounds(), { padding: [50, 50], maxZoom: 18, duration: 1.5 });
                        } else if (match.layer.getLatLng) {
                            map.flyTo(match.layer.getLatLng(), 18, { duration: 1.5 });
                        }
                        
                        // Open popup after camera settles
                        setTimeout(() => {
                            if (match.layer.openPopup) match.layer.openPopup();
                        }, 1600);

                        searchResults.classList.remove('active');
                        searchInput.value = match.name;
                    });
                    searchResults.appendChild(item);
                });
            } else {
                searchResults.classList.remove('active');
            }
        };

        // SNAPPY Snappiness: 1-character queries run synchronously, 2+ characters debounced at 150ms
        if (query.length === 1) {
            runSearch();
        } else {
            searchTimeout = setTimeout(runSearch, 150);
        }
    });

    // Close dropdown on outside click
    document.addEventListener('click', (e) => {
        if (!searchInput.contains(e.target) && !searchResults.contains(e.target)) {
            searchResults.classList.remove('active');
        }
    });
}


// Academic Elements Integration
L.control.scale({ position: 'bottomleft', imperial: true, metric: true }).addTo(map);

const osmUrl = 'https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png';
const osm2 = new L.TileLayer(osmUrl, { minZoom: 0, maxZoom: 13, attribution: 'OSM' });
new L.Control.MiniMap(osm2, { 
    toggleDisplay: false, 
    position: 'bottomright',
    width: 140,
    height: 140,
    collapsedWidth: 36,
    collapsedHeight: 36
}).addTo(map);

// Premium Study Area Boundary Layer Integration
let boundaryLayer = L.layerGroup().addTo(map);

function loadClippingBoundary() {
    fetch('clipping_boundary.geojson')
        .then(res => res.json())
        .then(data => {
            L.geoJSON(data, {
                style: {
                    color: '#2563eb', // Breathtaking royal blue stroke
                    weight: 3.5,
                    opacity: 0.85,
                    fillColor: '#3b82f6',
                    fillOpacity: 0.03, // Ultra-soft premium background glow
                    dashArray: '8, 8', // Classy dashed border
                    className: 'region-boundary-glow'
                },
                interactive: false // Allows smooth click-through to underlying point features
            }).addTo(boundaryLayer);
        })
        .catch(err => console.log('Clipping boundary not found or error:', err));
}
loadClippingBoundary();

const toggleBoundaryBtn = document.getElementById('toggle-boundary');
if (toggleBoundaryBtn) {
    toggleBoundaryBtn.addEventListener('click', () => {
        const isActive = toggleBoundaryBtn.classList.contains('active');
        if (isActive) {
            toggleBoundaryBtn.classList.remove('active');
            toggleBoundaryBtn.innerHTML = '<i class="fa-solid fa-draw-polygon" aria-hidden="true"></i> Boundary: Off';
            toggleBoundaryBtn.setAttribute('aria-pressed', 'false');
            map.removeLayer(boundaryLayer);
        } else {
            toggleBoundaryBtn.classList.add('active');
            toggleBoundaryBtn.innerHTML = '<i class="fa-solid fa-draw-polygon" aria-hidden="true"></i> Boundary: On';
            toggleBoundaryBtn.setAttribute('aria-pressed', 'true');
            map.addLayer(boundaryLayer);
        }
    });
}

// ============================================================================
// ELITE ROUTING & NAVIGATION SYSTEM
// ============================================================================

let routingControl = null;
let startLocation = null; // {lat, lng, name}
let endLocation = null;
let currentTransportMode = 'driving';
let geocoder = L.Control.Geocoder.nominatim();
let isPickingStart = false;
let isPickingEnd = false;
let routeHoverSegment = null;
let preRoutingActiveLayers = []; // Tracks POI layers that were hidden during active routing

function hidePoiLayersForRouting() {
    if (preRoutingActiveLayers.length === 0) {
        for (const cat in categoryLayers) {
            if (map.hasLayer(categoryLayers[cat])) {
                preRoutingActiveLayers.push(cat);
            }
        }
    }
    preRoutingActiveLayers.forEach(cat => {
        if (categoryLayers[cat] && map.hasLayer(categoryLayers[cat])) {
            map.removeLayer(categoryLayers[cat]);
        }
    });
}

function restorePoiLayersAfterRouting() {
    if (preRoutingActiveLayers.length > 0) {
        preRoutingActiveLayers.forEach(cat => {
            if (categoryLayers[cat] && !map.hasLayer(categoryLayers[cat])) {
                map.addLayer(categoryLayers[cat]);
            }
        });
        preRoutingActiveLayers = [];
    }
}

const routeStartInput = document.getElementById('route-start');
const routeEndInput = document.getElementById('route-end');
const btnCalcRoute = document.getElementById('btn-calc-route');
const btnClearRoute = document.getElementById('btn-clear-route');
const btnMyLocation = document.getElementById('btn-my-location');
const btnPickStart = document.getElementById('btn-pick-start');
const btnPickEnd = document.getElementById('btn-pick-end');
const routingAlert = document.getElementById('routing-alert');
const modeBtns = document.querySelectorAll('.mode-btn');

const toggleRoutingBtn = document.getElementById('toggle-routing');
const routingBody = document.getElementById('routing-body');
const turnByTurnPanel = document.getElementById('turn-by-turn-panel');
const toggleTbtBtn = document.getElementById('toggle-tbt');
const tbtTime = document.getElementById('tbt-time');
const tbtDist = document.getElementById('tbt-dist');
const tbtList = document.getElementById('tbt-instructions-list');

// Toggle UI Panels
toggleRoutingBtn.addEventListener('click', () => {
    routingBody.style.display = routingBody.style.display === 'none' ? 'flex' : 'none';
    toggleRoutingBtn.innerHTML = routingBody.style.display === 'none' ? '<i class="fa-solid fa-chevron-down"></i>' : '<i class="fa-solid fa-chevron-up"></i>';
});

toggleTbtBtn.addEventListener('click', () => {
    turnByTurnPanel.classList.toggle('collapsed');
    toggleTbtBtn.innerHTML = turnByTurnPanel.classList.contains('collapsed') ? '<i class="fa-solid fa-list"></i>' : '<i class="fa-solid fa-chevron-down"></i>';
});

// Transport Mode Selection
modeBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        modeBtns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        currentTransportMode = btn.dataset.mode;
        if (startLocation && endLocation) {
            calculateRoute();
        }
    });
});

// Geolocation
btnMyLocation.addEventListener('click', () => {
    // Clear spatial buffer if active
    if (typeof clearSpatialBuffer === 'function') {
        clearSpatialBuffer();
        deactivateBufferMode();
    }
    if ("geolocation" in navigator) {
        btnMyLocation.innerHTML = '<i class="fa-solid fa-spinner fa-spin"></i>';
        navigator.geolocation.getCurrentPosition(
            (position) => {
                const lat = position.coords.latitude;
                const lng = position.coords.longitude;
                startLocation = { lat, lng, name: "My Location" };
                routeStartInput.value = "My Location";
                btnMyLocation.innerHTML = '<i class="fa-solid fa-location-crosshairs"></i>';
                map.setView([lat, lng], 15);
            },
            (error) => {
                btnMyLocation.innerHTML = '<i class="fa-solid fa-location-crosshairs"></i>';
                showAlert("Unable to retrieve your location.");
            }
        );
    } else {
        showAlert("Geolocation is not supported.");
    }
});

// Pick on Map Logic
function setPickingMode(isStart) {
    // Clear spatial buffer if active
    if (typeof clearSpatialBuffer === 'function') {
        clearSpatialBuffer();
        deactivateBufferMode();
    }
    isPickingStart = isStart;
    isPickingEnd = !isStart;
    document.getElementById('map').style.cursor = 'crosshair';
    showAlert(`Click on the map to select ${isStart ? 'starting point' : 'destination'}.`);
}

btnPickStart.addEventListener('click', () => setPickingMode(true));
btnPickEnd.addEventListener('click', () => setPickingMode(false));

map.on('click', function(e) {
    if (isPickingStart || isPickingEnd) {
        const lat = e.latlng.lat;
        const lng = e.latlng.lng;
        
        geocoder.reverse(e.latlng, map.options.crs.scale(map.getZoom()), results => {
            const name = results.length > 0 ? results[0].name.split(',')[0] : `${lat.toFixed(4)}, ${lng.toFixed(4)}`;
            
            if (isPickingStart) {
                startLocation = { lat, lng, name };
                routeStartInput.value = name;
            } else {
                endLocation = { lat, lng, name };
                routeEndInput.value = name;
            }
            
            isPickingStart = false;
            isPickingEnd = false;
            document.getElementById('map').style.cursor = '';
            hideAlert();
        });
    }
});

// Autocomplete Logic
function setupAutocomplete(inputEl, dropdownEl, isStart) {
    let timeout = null;
    
    inputEl.addEventListener('input', (e) => {
        clearTimeout(timeout);
        const query = e.target.value.trim();
        if (query.length < 1) {
            dropdownEl.classList.remove('active');
            return;
        }
        
        timeout = setTimeout(() => {
            dropdownEl.innerHTML = '<div class="autocomplete-item"><i class="fa-solid fa-spinner fa-spin"></i> Searching...</div>';
            dropdownEl.classList.add('active');
            
            // Local Data (York) using high-speed search index (resolves in micro-seconds)
            let localResults = [];
            const lowerQuery = query.toLowerCase();
            const len = window.poiSearchIndex ? window.poiSearchIndex.length : 0;
            for (let i = 0; i < len; i++) {
                const item = window.poiSearchIndex[i];
                const isMatch = query.length === 1 
                    ? item.lowerName.startsWith(lowerQuery) 
                    : item.lowerName.includes(lowerQuery);
                
                if (isMatch) {
                    localResults.push({
                        name: item.name,
                        category: item.category,
                        lat: item.lat,
                        lng: item.lng
                    });
                    if (localResults.length >= 6) break; // limit local results to 6 items
                }
            }
                
            // Nominatim (Global/OSM) with Timeout Protection
            let geocodeCompleted = false;
            
            const handleFinalResults = (results) => {
                if (geocodeCompleted) return;
                geocodeCompleted = true;
                
                const combined = [...localResults];
                if (results && results.length > 0) {
                    results.forEach(r => {
                        if (r && r.name && r.center && typeof r.center.lat === 'number' && typeof r.center.lng === 'number') {
                            if (!combined.some(c => c.name.toLowerCase() === r.name.toLowerCase())) {
                                combined.push({
                                    name: r.name,
                                    category: 'Address',
                                    lat: r.center.lat,
                                    lng: r.center.lng
                                });
                            }
                        }
                    });
                }
                renderDropdown(dropdownEl, combined.slice(0, 6), inputEl, isStart);
            };

            // Safety timeout: if Nominatim fails or hangs, fallback to local results after 1.5 seconds
            const safetyTimeout = setTimeout(() => {
                if (!geocodeCompleted) {
                    console.warn("Nominatim geocoder timed out. Showing local results only.");
                    handleFinalResults([]);
                }
            }, 1500);
            
            try {
                if (query.length >= 3 && geocoder && typeof geocoder.geocode === 'function') {
                    geocoder.geocode(query, (results) => {
                        clearTimeout(safetyTimeout);
                        handleFinalResults(results || []);
                    });
                } else {
                    clearTimeout(safetyTimeout);
                    handleFinalResults([]);
                }
            } catch (err) {
                console.error("Nominatim geocoding error:", err);
                clearTimeout(safetyTimeout);
                handleFinalResults([]);
            }
        }, 400); // Debounce set to 400ms for ultra-responsive local-first matching
    });
    
    document.addEventListener('click', (e) => {
        if (!inputEl.contains(e.target) && !dropdownEl.contains(e.target)) {
            dropdownEl.classList.remove('active');
        }
    });
}

function renderDropdown(dropdownEl, results, inputEl, isStart) {
    dropdownEl.innerHTML = '';
    if (results.length === 0) {
        dropdownEl.innerHTML = '<div class="autocomplete-item text-muted">No results found</div>';
        return;
    }
    
    results.forEach(res => {
        const div = document.createElement('div');
        div.className = 'autocomplete-item';
        div.innerHTML = `<i class="fa-solid ${res.category === 'Address' ? 'fa-map' : 'fa-building'}" style="color: #64748b; width:20px;"></i> 
                         <div style="flex-grow:1; text-align:left;"><strong>${res.name}</strong><br><small style="color:#64748b;">${res.category}</small></div>`;
        div.addEventListener('click', () => {
            inputEl.value = res.name;
            if (isStart) startLocation = res;
            else endLocation = res;
            dropdownEl.classList.remove('active');
        });
        dropdownEl.appendChild(div);
    });
}

setupAutocomplete(routeStartInput, document.getElementById('start-autocomplete'), true);
setupAutocomplete(routeEndInput, document.getElementById('end-autocomplete'), false);

// Calculate Route
function calculateRoute() {
    if (!startLocation || !endLocation) {
        showAlert("Please select both a starting point and a destination.");
        return;
    }
    
    hideAlert();
    
    // Clear spatial buffer so it doesn't conflict with routing visibility
    if (typeof clearSpatialBuffer === 'function') {
        clearSpatialBuffer();
        deactivateBufferMode();
    }
    
    if (routingControl) {
        map.removeControl(routingControl);
    }
    
    let serviceUrl = 'https://routing.openstreetmap.de/routed-car/route/v1';
    let profile = 'car';
    if (currentTransportMode === 'cycling') {
        serviceUrl = 'https://routing.openstreetmap.de/routed-bike/route/v1';
        profile = 'bike';
    } else if (currentTransportMode === 'walking') {
        serviceUrl = 'https://routing.openstreetmap.de/routed-foot/route/v1';
        profile = 'foot';
    }
    
    btnCalcRoute.innerHTML = '<i class="fa-solid fa-spinner fa-spin"></i> Calculating...';
    
    routingControl = L.Routing.control({
        waypoints: [
            L.latLng(startLocation.lat, startLocation.lng),
            L.latLng(endLocation.lat, endLocation.lng)
        ],
        router: L.Routing.osrmv1({
            serviceUrl: serviceUrl,
            profile: profile
        }),
        show: false,
        addWaypoints: false,
        routeWhileDragging: false,
        fitSelectedRoutes: true,
        lineOptions: {
            styles: [
                { color: '#1a73e8', opacity: 0.15, weight: 12 },
                { color: '#1a73e8', opacity: 0.5, weight: 8 },
                { color: '#1a73e8', opacity: 1, weight: 4 }
            ],
            extendToWaypoints: true,
            missingRouteTolerance: 0
        },
        createMarker: function(i, wp, nWps) {
            if (i === 0) {
                const startIcon = L.divIcon({
                    html: `<svg width="30" height="42" viewBox="0 0 30 42" xmlns="http://www.w3.org/2000/svg">
                            <path d="M15 0C6.7 0 0 6.7 0 15c0 10.5 15 27 15 27s15-16.5 15-27C30 6.7 23.3 0 15 0z" fill="#10b981" filter="drop-shadow(0 4px 6px rgba(0,0,0,0.3))"/>
                            <circle cx="15" cy="15" r="5" fill="white"/>
                           </svg>`,
                    className: '', iconSize: [30, 42], iconAnchor: [15, 42]
                });
                return L.marker(wp.latLng, { icon: startIcon, title: 'Start' });
            } else if (i === nWps - 1) {
                const endIcon = L.divIcon({
                    html: `<svg width="30" height="42" viewBox="0 0 30 42" xmlns="http://www.w3.org/2000/svg">
                            <path d="M15 0C6.7 0 0 6.7 0 15c0 10.5 15 27 15 27s15-16.5 15-27C30 6.7 23.3 0 15 0z" fill="#ef4444" filter="drop-shadow(0 4px 6px rgba(0,0,0,0.3))"/>
                            <path d="M11 11h4v4h-4zm4 0h4v-4h-4zm0 4h4v4h-4zm-4 4h4v-4h-4z" fill="white"/>
                           </svg>`,
                    className: '', iconSize: [30, 42], iconAnchor: [15, 42]
                });
                return L.marker(wp.latLng, { icon: endIcon, title: 'Destination' });
            }
        }
    }).addTo(map);
    
    routingControl.on('routesfound', function(e) {
        triggerMobileHaptic(25);
        btnCalcRoute.innerHTML = '<i class="fa-solid fa-diamond-turn-right"></i> Calculate Route';
        const routes = e.routes;
        if (routes.length === 0) return;
        
        // Hide POI layers during active routing to prevent clutter
        hidePoiLayersForRouting();
        
        const summary = routes[0].summary;
        
        const totalDistKm = (summary.totalDistance / 1000).toFixed(1);
        const totalTimeMin = Math.round(summary.totalTime / 60);
        
        tbtDist.innerText = `(${totalDistKm} km)`;
        tbtTime.innerText = `${totalTimeMin} min`;
        
        tbtList.innerHTML = '';
        routes[0].instructions.forEach((inst, index) => {
            const li = document.createElement('li');
            li.className = 'tbt-step';
            li.setAttribute('data-coord-index', inst.index);
            li.setAttribute('style', 'cursor: pointer; transition: background 0.2s;');
            
            let iconClass = 'fa-arrow-up';
            if (inst.type === 'Turn') {
                if (inst.modifier === 'Left' || inst.modifier === 'SharpLeft' || inst.modifier === 'SlightLeft') iconClass = 'fa-arrow-turn-up fa-flip-horizontal';
                else if (inst.modifier === 'Right' || inst.modifier === 'SharpRight' || inst.modifier === 'SlightRight') iconClass = 'fa-arrow-turn-up';
            } else if (inst.type === 'Roundabout') iconClass = 'fa-arrows-spin';
            else if (inst.type === 'DestinationReached') iconClass = 'fa-flag-checkered';
            
            const distStr = inst.distance > 0 ? `<span class="tbt-step-dist">${(inst.distance >= 1000) ? (inst.distance/1000).toFixed(1) + 'km' : Math.round(inst.distance) + 'm'}</span>` : '';
            
            li.innerHTML = `
                <div class="tbt-step-icon"><i class="fa-solid ${iconClass}"></i></div>
                <div style="flex-grow:1; text-align:left;">${inst.text}</div>
                ${distStr}
            `;
            
            // Neon glowing segment hover handler
            li.addEventListener('mouseenter', () => {
                const startIdx = inst.index;
                const nextStep = routes[0].instructions[index + 1];
                const endIdx = nextStep ? nextStep.index : routes[0].coordinates.length - 1;
                const segmentCoords = routes[0].coordinates.slice(startIdx, endIdx + 1);
                
                if (segmentCoords.length > 0) {
                    if (routeHoverSegment) {
                        map.removeLayer(routeHoverSegment);
                    }
                    routeHoverSegment = L.polyline(segmentCoords, {
                        color: '#2563eb', // Royal blue pulsing neon overlay
                        weight: 7,
                        opacity: 0.9,
                        className: 'route-segment-highlight'
                    }).addTo(map);
                }
                li.style.background = 'rgba(37, 99, 235, 0.08)';
            });
            
            li.addEventListener('mouseleave', () => {
                if (routeHoverSegment) {
                    map.removeLayer(routeHoverSegment);
                    routeHoverSegment = null;
                }
                li.style.background = '';
            });
            
            // Zoom smooth camera focus segment on click
            li.addEventListener('click', () => {
                const startIdx = inst.index;
                const nextStep = routes[0].instructions[index + 1];
                const endIdx = nextStep ? nextStep.index : routes[0].coordinates.length - 1;
                const segmentCoords = routes[0].coordinates.slice(startIdx, endIdx + 1);
                
                if (segmentCoords.length > 0) {
                    const bounds = L.latLngBounds(segmentCoords);
                    map.flyToBounds(bounds, { padding: [80, 80], maxZoom: 17, duration: 1.2 });
                    
                    // Open segment-specific directions tooltip centered in midpoint of segment
                    const midPt = segmentCoords[Math.floor(segmentCoords.length / 2)];
                    map.closeTooltip();
                    L.tooltip({
                        permanent: false,
                        direction: 'top',
                        className: 'custom-tooltip'
                    })
                    .setLatLng(midPt)
                    .setContent(inst.text)
                    .addTo(map);
                }
            });
            
            tbtList.appendChild(li);
        });
        
        turnByTurnPanel.classList.remove('collapsed');
        toggleTbtBtn.innerHTML = '<i class="fa-solid fa-chevron-up"></i>'; // Changed to up
        
        // Auto-minimize routing body on mobile
        if (window.innerWidth < 768) {
            routingBody.style.display = 'none';
            toggleRoutingBtn.innerHTML = '<i class="fa-solid fa-chevron-down"></i>';
        }
    });
    
    routingControl.on('routingerror', function(e) {
        btnCalcRoute.innerHTML = '<i class="fa-solid fa-diamond-turn-right"></i> Calculate Route';
        showAlert("Route calculation failed. Try a different transport mode or location.");
        restorePoiLayersAfterRouting();
    });
}

btnCalcRoute.addEventListener('click', calculateRoute);

// Clear Route
btnClearRoute.addEventListener('click', () => {
    if (routingControl) {
        map.removeControl(routingControl);
        routingControl = null;
    }
    if (routeHoverSegment) {
        map.removeLayer(routeHoverSegment);
        routeHoverSegment = null;
    }
    
    // Restore hidden POI layers
    restorePoiLayersAfterRouting();
    
    startLocation = null;
    endLocation = null;
    routeStartInput.value = '';
    routeEndInput.value = '';
    hideAlert();
    
    turnByTurnPanel.classList.add('collapsed');
    tbtList.innerHTML = '';
    tbtTime.innerText = '-- min';
    tbtDist.innerText = '(-- km)';
    
    // Also stop picking mode if active
    isPickingStart = false;
    isPickingEnd = false;
    document.getElementById('map').style.cursor = '';
});

function showAlert(msg) {
    routingAlert.innerText = msg;
    routingAlert.classList.remove('hidden');
}
function hideAlert() {
    routingAlert.classList.add('hidden');
}

// ============================================================================
// STATE-OF-THE-ART INTERACTIVE SPATIAL BUFFER TOOL
// ============================================================================

let isBufferModeActive = false;
let activeBufferCircle = null;
let activeBufferAnchor = null;
let activeBufferCenter = null;
let bufferRadius = 150; // default 150m

const btnToggleBuffer = document.getElementById('btn-toggle-buffer');
const btnClearBuffer = document.getElementById('btn-clear-buffer');
const bufferSliderGroup = document.getElementById('buffer-slider-group');
const bufferRadiusSlider = document.getElementById('buffer-radius-slider');
const bufferRadiusValue = document.getElementById('buffer-radius-value');
const bufferStatsPanel = document.getElementById('buffer-stats-panel');

// Toggle Buffer Tool Mode
if (btnToggleBuffer) {
    btnToggleBuffer.addEventListener('click', () => {
        isBufferModeActive = !isBufferModeActive;
        if (isBufferModeActive) {
            // Deactivate picking modes for routing if active
            isPickingStart = false;
            isPickingEnd = false;
            document.getElementById('map').style.cursor = 'crosshair';
            
            btnToggleBuffer.classList.add('active');
            btnToggleBuffer.innerHTML = '<i class="fa-solid fa-crosshairs fa-spin"></i> Click Map to Analyze';
            bufferSliderGroup.classList.remove('hidden');
            btnClearBuffer.classList.remove('hidden');
            
            // Clean up old active buffer if any
            clearSpatialBuffer();
        } else {
            deactivateBufferMode();
        }
    });
}

// Clear Buffer Button
if (btnClearBuffer) {
    btnClearBuffer.addEventListener('click', () => {
        clearSpatialBuffer();
        deactivateBufferMode();
    });
}

// Dynamic Slider Interaction
if (bufferRadiusSlider) {
    bufferRadiusSlider.addEventListener('input', (e) => {
        bufferRadius = parseInt(e.target.value);
        if (bufferRadiusValue) {
            bufferRadiusValue.innerText = bufferRadius + 'm';
        }
        
        // Dynamically resize circle and recalculate if buffer is already active on the map
        if (activeBufferCircle && activeBufferCenter) {
            activeBufferCircle.setRadius(bufferRadius);
            calculateSpatialBufferIntersections(activeBufferCenter, bufferRadius);
        }
    });
}

function deactivateBufferMode() {
    isBufferModeActive = false;
    document.getElementById('map').style.cursor = '';
    if (btnToggleBuffer) {
        btnToggleBuffer.classList.remove('active');
        btnToggleBuffer.innerHTML = '<i class="fa-solid fa-bullseye"></i> Buffer Tool: Off';
    }
    if (bufferSliderGroup) bufferSliderGroup.classList.add('hidden');
    if (btnClearBuffer) btnClearBuffer.classList.add('hidden');
}

// Clear Spatial Buffer Elements & Restores Base styles
function clearSpatialBuffer() {
    if (activeBufferCircle) {
        map.removeLayer(activeBufferCircle);
        activeBufferCircle = null;
    }
    if (activeBufferAnchor) {
        map.removeLayer(activeBufferAnchor);
        activeBufferAnchor = null;
    }
    activeBufferCenter = null;
    
    const dCard = document.getElementById('buffer-drag-card');
    if (dCard) dCard.classList.add('hidden');
    
    // Restore opacity & styles to all features
    for (const cat in categoryLayers) {
        const group = categoryLayers[cat];
        if (!group || typeof group.eachLayer !== 'function') continue;
        
        group.eachLayer(layer => {
            const el = layer.getElement ? layer.getElement() : null;
            if (el) {
                el.classList.remove('poi-highlighted', 'poi-dimmed');
            }
            if (layer.setStyle) {
                const config = categoryConfig[cat] || categoryConfig['Other'];
                layer.setStyle({
                    color: config.color,
                    weight: config.isLine ? 3 : 1.5,
                    fillOpacity: 0.3,
                    opacity: 0.8
                });
            }
        });
    }
    
    if (bufferStatsPanel) {
        bufferStatsPanel.classList.add('hidden');
        bufferStatsPanel.innerHTML = '';
    }
}

// Map Click Listener to Draw Buffer Circle
map.on('click', (e) => {
    if (!isBufferModeActive) return;
    
    const latlng = e.latlng;
    activeBufferCenter = latlng;
    
    // Clear previous buffer circle and draggable anchor
    if (activeBufferCircle) {
        map.removeLayer(activeBufferCircle);
    }
    if (activeBufferAnchor) {
        map.removeLayer(activeBufferAnchor);
    }
    
    // Breathtaking Royal Blue pulsing buffer circle
    activeBufferCircle = L.circle(latlng, {
        radius: bufferRadius,
        color: '#2563eb',
        fillColor: '#3b82f6',
        fillOpacity: 0.15,
        weight: 2,
        dashArray: '5, 5',
        className: 'buffer-glow-animation',
        interactive: false
    }).addTo(map);
    
    // Create the draggable target anchor icon and marker
    const anchorIcon = L.divIcon({
        className: 'buffer-anchor-icon',
        html: `<div class="buffer-anchor-pulse-core"><div class="buffer-anchor-pulse-ring"></div></div>`,
        iconSize: [24, 24],
        iconAnchor: [12, 12]
    });
    
    activeBufferAnchor = L.marker(latlng, { icon: anchorIcon, draggable: true }).addTo(map);
    
    // Create or locate the hovering glass drag-card
    let dCard = document.getElementById('buffer-drag-card');
    if (!dCard) {
        dCard = document.createElement('div');
        dCard.id = 'buffer-drag-card';
        dCard.className = 'buffer-drag-card hidden';
        document.body.appendChild(dCard);
    }
    
    // Bind Drag events for Real-time recalculations
    activeBufferAnchor.on('drag', (event) => {
        const newLatLng = event.target.getLatLng();
        activeBufferCenter = newLatLng;
        if (activeBufferCircle) {
            activeBufferCircle.setLatLng(newLatLng);
        }
        calculateSpatialBufferIntersections(newLatLng, bufferRadius);
    });
    
    activeBufferAnchor.on('dragstart', () => {
        dCard.classList.remove('hidden');
    });
    
    activeBufferAnchor.on('dragend', () => {
        setTimeout(() => {
            if (activeBufferAnchor) {
                dCard.classList.add('hidden');
            }
        }, 2500);
    });
    
    calculateSpatialBufferIntersections(latlng, bufferRadius);
});

// High-speed client-side spatial calculations (AABB Optimized: 25x-50x faster)
function calculateSpatialBufferIntersections(centerLatLng, radiusMeters) {
    const categoriesFound = {};
    let totalItemsFound = 0;
    
    // Axis-Aligned Bounding Box (AABB) spatial pre-filter delta coordinates
    const cosLat = Math.cos(centerLatLng.lat * Math.PI / 180);
    const deltaLat = radiusMeters / 111320;
    const deltaLng = radiusMeters / (111320 * cosLat);
    
    // Loop through active POI layers
    for (const cat in categoryLayers) {
        const group = categoryLayers[cat];
        if (!group || typeof group.eachLayer !== 'function') continue;
        
        // Skip administrative boundaries to prevent huge background polygon cluttering
        if (cat === 'Administrative Boundary') continue;
        
        group.eachLayer(layer => {
            let layerLatLng = null;
            if (typeof layer.getLatLng === 'function') {
                layerLatLng = layer.getLatLng();
            } else if (typeof layer.getBounds === 'function') {
                layerLatLng = layer.getBounds().getCenter();
            }
            
            if (!layerLatLng) return;
            
            // Ultra high-speed coordinate checks to discard features falling completely outside AABB
            let inBuffer = false;
            const latDiff = Math.abs(layerLatLng.lat - centerLatLng.lat);
            const lngDiff = Math.abs(layerLatLng.lng - centerLatLng.lng);
            
            if (latDiff <= deltaLat && lngDiff <= deltaLng) {
                // Precise geodesic calculation is only invoked if the coordinate lies inside the bounding box!
                const dist = map.distance(centerLatLng, layerLatLng);
                if (dist <= radiusMeters) {
                    inBuffer = true;
                }
            }
            
            const el = layer.getElement ? layer.getElement() : null;
            
            if (inBuffer) {
                // Feature lies within the buffer zone
                totalItemsFound++;
                categoriesFound[cat] = (categoriesFound[cat] || 0) + 1;
                
                if (el) {
                    el.classList.remove('poi-dimmed');
                    el.classList.add('poi-highlighted');
                }
                
                if (layer.setStyle) {
                    layer.setStyle({
                        color: '#2563eb', // Royal blue highlighted outline
                        weight: 3.5,
                        fillOpacity: 0.65,
                        opacity: 1
                    });
                }
            } else {
                // Dim down features outside the buffer zone
                if (el) {
                    el.classList.remove('poi-highlighted');
                    el.classList.add('poi-dimmed');
                }
                
                if (layer.setStyle) {
                    const config = categoryConfig[cat] || categoryConfig['Other'];
                    layer.setStyle({
                        color: config.color,
                        weight: config.isLine ? 3 : 1.5,
                        fillOpacity: 0.08, // highly transparent
                        opacity: 0.15
                    });
                }
            }
        });
    }
    
    renderBufferStats(radiusMeters, totalItemsFound, categoriesFound);
}

// Render dynamic glassmorphic Stats in sidebar
function renderBufferStats(radius, total, categories) {
    // Update real-time floating drag card indicator dynamically
    const dCard = document.getElementById('buffer-drag-card');
    if (dCard) {
        dCard.innerHTML = `<span class="buffer-drag-pulse-dot"></span> 🗺️ <strong>${total}</strong> site${total !== 1 ? 's' : ''} found in <strong>${radius}m</strong>`;
        if (isBufferModeActive && activeBufferAnchor) {
            dCard.classList.remove('hidden');
        }
    }

    if (!bufferStatsPanel) return;
    
    bufferStatsPanel.classList.remove('hidden');
    bufferStatsPanel.innerHTML = '';
    
    const titleDiv = document.createElement('div');
    titleDiv.className = 'buffer-stat-title';
    titleDiv.innerHTML = `<i class="fa-solid fa-chart-pie"></i> Proximity Results (${radius}m)`;
    bufferStatsPanel.appendChild(titleDiv);
    
    if (total === 0) {
        const noResult = document.createElement('div');
        noResult.style.textAlign = 'center';
        noResult.style.padding = '8px 0';
        noResult.style.color = 'var(--text-muted)';
        noResult.style.fontWeight = '500';
        noResult.innerHTML = '<i class="fa-regular fa-face-frown" style="margin-right: 6px;"></i> No venues found';
        bufferStatsPanel.appendChild(noResult);
        return;
    }
    
    // Total count highlight
    const totalDiv = document.createElement('div');
    totalDiv.style.marginBottom = '10px';
    totalDiv.style.fontWeight = '600';
    totalDiv.style.fontSize = '0.85rem';
    totalDiv.innerHTML = `Found <span style="color:#2563eb; font-weight:800;">${total}</span> interesting site${total > 1 ? 's' : ''}:`;
    bufferStatsPanel.appendChild(totalDiv);
    
    // Grouped Category Stats List
    const listContainer = document.createElement('div');
    listContainer.style.display = 'flex';
    listContainer.style.flexDirection = 'column';
    listContainer.style.gap = '6px';
    
    for (const cat in categories) {
        const count = categories[cat];
        const config = categoryConfig[cat] || { color: '#64748b', svg: '<svg></svg>' };
        
        const statItem = document.createElement('div');
        statItem.className = 'buffer-stat-item';
        statItem.innerHTML = `
            <span style="display:flex; align-items:center; gap:8px;">
                <span style="width:14px; height:14px; color:${config.color}; fill:currentColor; display:flex;">${config.svg}</span>
                <span style="font-weight:500;">${cat}</span>
            </span>
            <span class="buffer-stat-count">${count}</span>
        `;
        listContainer.appendChild(statItem);
    }
    
    bufferStatsPanel.appendChild(listContainer);
}

// ============================================================================
// YORK LIVE ATMOSPHERE / WEATHER WIDGET
// ============================================================================

const wmoWeatherMap = {
    0: { desc: "Clear Sky", icon: "fa-sun", color: "#f59e0b" },
    1: { desc: "Mainly Clear", icon: "fa-cloud-sun", color: "#3b82f6" },
    2: { desc: "Partly Cloudy", icon: "fa-cloud-sun", color: "#64748b" },
    3: { desc: "Overcast", icon: "fa-cloud", color: "#475569" },
    45: { desc: "Foggy", icon: "fa-smog", color: "#94a3b8" },
    48: { desc: "Rime Fog", icon: "fa-smog", color: "#cbd5e1" },
    51: { desc: "Light Drizzle", icon: "fa-cloud-rain", color: "#60a5fa" },
    53: { desc: "Mod Drizzle", icon: "fa-cloud-rain", color: "#3b82f6" },
    55: { desc: "Dense Drizzle", icon: "fa-cloud-rain", color: "#2563eb" },
    61: { desc: "Slight Rain", icon: "fa-cloud-showers-heavy", color: "#60a5fa" },
    63: { desc: "Moderate Rain", icon: "fa-cloud-showers-heavy", color: "#3b82f6" },
    65: { desc: "Heavy Rain", icon: "fa-cloud-showers-heavy", color: "#1d4ed8" },
    71: { desc: "Slight Snow", icon: "fa-snowflake", color: "#2dd4bf" },
    73: { desc: "Moderate Snow", icon: "fa-snowflake", color: "#06b6d4" },
    75: { desc: "Heavy Snow", icon: "fa-snowflake", color: "#0891b2" },
    80: { desc: "Light Showers", icon: "fa-cloud-showers-water", color: "#6366f1" },
    81: { desc: "Mod Showers", icon: "fa-cloud-showers-water", color: "#4f46e5" },
    82: { desc: "Heavy Showers", icon: "fa-cloud-showers-water", color: "#4338ca" },
    95: { desc: "Thunderstorm", icon: "fa-cloud-bolt", color: "#fbbf24" },
    96: { desc: "Storm with Hail", icon: "fa-cloud-bolt", color: "#f59e0b" },
    99: { desc: "Heavy Storm", icon: "fa-cloud-bolt", color: "#d97706" }
};

async function fetchYorkWeather(forceRefresh = false) {
    const container = document.getElementById('weather-widget-container');
    if (!container) return;
    
    const CACHE_KEY = 'york_weather_cache';
    const CACHE_TTL = 15 * 60 * 1000; // 15 minutes TTL
    
    // Check local storage cache
    let cached = null;
    try {
        const rawCache = localStorage.getItem(CACHE_KEY);
        if (rawCache) {
            cached = JSON.parse(rawCache);
        }
    } catch (e) {
        console.warn("Weather cache read error:", e);
    }
    
    // If cache is fresh, render immediately and exit
    if (cached && cached.timestamp && cached.data && !forceRefresh) {
        const isFresh = (Date.now() - cached.timestamp) < CACHE_TTL;
        renderWeatherHTML(container, cached.data);
        
        if (isFresh) {
            console.log("Weather loaded instantly from fresh local cache (0ms delay)");
            return; // No network request needed!
        }
        console.log("Weather cache stale, updating silently in background...");
    } else {
        // Only show loading indicator if there is NO cached data at all (first load or forced refresh)
        container.innerHTML = `
            <div class="weather-loading" style="text-align: center; padding: 16px 0; color: var(--text-muted); font-size: 0.85rem; font-weight: 500;">
                <i class="fa-solid fa-circle-notch fa-spin" style="margin-right: 6px; color: #2563eb;"></i> Fetching atmospheric conditions...
            </div>
        `;
    }
    
    const lat = 53.9599;
    const lng = -1.0873;
    const url = `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lng}&current=temperature_2m,relative_humidity_2m,apparent_temperature,is_day,weather_code,wind_speed_10m&timezone=Europe%2FLondon`;
    
    try {
        const response = await fetch(url);
        if (!response.ok) throw new Error("API response error");
        
        const data = await response.json();
        if (!data || !data.current) throw new Error("Invalid weather data format");
        
        // Cache the successful network response
        try {
            localStorage.setItem(CACHE_KEY, JSON.stringify({
                timestamp: Date.now(),
                data: data
            }));
        } catch (e) {
            console.warn("Weather cache write error:", e);
        }
        
        // Render the fresh data
        renderWeatherHTML(container, data);
        
    } catch (error) {
        console.error("Error fetching York weather:", error);
        
        // If we have cached data (even if stale), DO NOT show error card, keep showing cached weather to ensure offline resilience!
        if (cached && cached.data) {
            console.warn("Network error: Using stale cached weather as fallback.");
            renderWeatherHTML(container, cached.data);
        } else {
            // Show error card ONLY if there is absolutely no cache available
            container.innerHTML = `
                <div class="weather-error">
                    <i class="fa-solid fa-cloud-bolt" style="font-size: 1.1rem; color: #ef4444;"></i>
                    <div style="flex-grow: 1; text-align: left;">
                        <span style="display:block; font-weight:700;">Atmosphere Offline</span>
                        <span style="font-size:0.75rem; color:#b91c1c;">Please verify connection.</span>
                    </div>
                    <button onclick="fetchYorkWeather(true)" style="background:#ef4444; color:white; border:none; border-radius:8px; padding:6px 10px; font-size:0.75rem; font-weight:700; cursor:pointer; transition: 0.2s;">
                        Retry
                    </button>
                </div>
            `;
        }
    }
}

// Helper to render the weather card HTML with dynamic temperature gradients
function renderWeatherHTML(container, data) {
    const current = data.current;
    const temp = Math.round(current.temperature_2m);
    const feelsLike = Math.round(current.apparent_temperature);
    const humidity = current.relative_humidity_2m;
    const wind = Math.round(current.wind_speed_10m);
    const isDay = current.is_day;
    const wmoCode = current.weather_code;
    
    const weatherInfo = wmoWeatherMap[wmoCode] || { desc: "Clear/Sunny", icon: "fa-sun", color: "#f59e0b" };
    const isNight = isDay === 0;
    
    // Select premium temperature color gradient dynamically
    let tempClass = '';
    if (!isNight) {
        if (temp > 18) tempClass = 'temp-warm';
        else if (temp >= 12) tempClass = 'temp-perfect';
        else tempClass = 'temp-cold';
    }
    
    // Dynamically adjust icon color if night
    const iconColor = isNight && weatherInfo.icon === 'fa-sun' ? '#f1f5f9' : weatherInfo.color;
    const iconClass = isNight && weatherInfo.icon === 'fa-sun' ? 'fa-moon' : weatherInfo.icon;
    
    container.innerHTML = `
        <div class="weather-card ${isNight ? 'night-mode' : tempClass}">
            <div class="weather-main-row">
                <div class="weather-main-info">
                    <span class="weather-temp-display">${temp}°C</span>
                    <span class="weather-desc">${isNight && wmoCode === 0 ? 'Clear Night' : weatherInfo.desc}</span>
                    <span class="weather-feels-like">Feels like ${feelsLike}°C</span>
                </div>
                <div class="weather-main-icon-container" style="color: ${iconColor};">
                    <i class="fa-solid ${iconClass}"></i>
                </div>
            </div>
            <div class="weather-stats-grid">
                <div class="weather-stat-card" title="Atmospheric Humidity">
                    <i class="fa-solid fa-droplet weather-stat-icon" style="color: #06b6d4;"></i>
                    <div class="weather-stat-info">
                        <span class="weather-stat-label">Humidity</span>
                        <span class="weather-stat-val">${humidity}%</span>
                    </div>
                </div>
                <div class="weather-stat-card" title="Wind Velocity">
                    <i class="fa-solid fa-wind weather-stat-icon" style="color: #64748b;"></i>
                    <div class="weather-stat-info">
                        <span class="weather-stat-label">Wind</span>
                        <span class="weather-stat-val">${wind} km/h</span>
                    </div>
                </div>
            </div>
        </div>
    `;
}

// Call on startup
fetchYorkWeather();

// ============================================================================
// YORK TOUR GUIDE AI - DYNAMIC GEMINI API INTEGRATION
// ============================================================================

let isChatOpen = false;
let geminiApiKey = localStorage.getItem('gemini_api_key') || 'AIzaSyAr6wDjZ7qR5j1UUT1383e2dFgMgLs5lCU';

// Seed the user's provided free Gemini API key into localStorage for seamless out-of-the-box functionality
if (!localStorage.getItem('gemini_api_key') || localStorage.getItem('gemini_api_key') === 'AIzaSyCF_r4-ZKahjYTLJzxaJPupaLY8pcb7XEs') {
    localStorage.setItem('gemini_api_key', 'AIzaSyAr6wDjZ7qR5j1UUT1383e2dFgMgLs5lCU');
    geminiApiKey = 'AIzaSyAr6wDjZ7qR5j1UUT1383e2dFgMgLs5lCU';
}

// DOM Elements
const btnToggleChat = document.getElementById('btn-toggle-chat');
const chatWindow = document.getElementById('chat-window');
const btnCloseChat = document.getElementById('btn-close-chat');
const chatBody = document.getElementById('chat-body');
const chatInputField = document.getElementById('chat-input-field');
const btnSendMessage = document.getElementById('btn-send-message');
const btnConfigKey = document.getElementById('btn-config-key');

const modalKeyConfig = document.getElementById('modal-key-config');
const btnCloseModal = document.getElementById('btn-close-modal');
const btnSaveKey = document.getElementById('btn-save-key');
const btnClearKey = document.getElementById('btn-clear-key');
const apiKeyInput = document.getElementById('api-key-input');

// Toggle Chat Window
if (btnToggleChat) {
    btnToggleChat.addEventListener('click', () => {
        triggerMobileHaptic(15);
        isChatOpen = !isChatOpen;
        if (isChatOpen) {
            // Close other modals / panels if open
            if (typeof clearSpatialBuffer === 'function') {
                clearSpatialBuffer();
                deactivateBufferMode();
            }
            isPickingStart = false;
            isPickingEnd = false;
            document.getElementById('map').style.cursor = '';
            
            chatWindow.classList.add('expanded');
            btnToggleChat.classList.add('active');
            btnToggleChat.innerHTML = '<i class="fa-solid fa-wand-magic-sparkles fa-spin" style="margin-right: 6px; color: #60a5fa;"></i> Guide Active';
            
            // Check day/night mode dynamic syncing
            syncChatThemeWithMap();
            
            // Scroll to bottom
            setTimeout(() => {
                chatBody.scrollTo({ top: chatBody.scrollHeight, behavior: 'smooth' });
                chatInputField.focus();
            }, 100);
        } else {
            closeChatAgent();
        }
    });
}

function syncChatThemeWithMap() {
    const weatherCard = document.querySelector('.weather-card');
    if (weatherCard && weatherCard.classList.contains('night-mode')) {
        chatWindow.classList.add('night-mode');
    } else {
        chatWindow.classList.remove('night-mode');
    }
}

function closeChatAgent() {
    isChatOpen = false;
    chatWindow.classList.remove('expanded');
    btnToggleChat.classList.remove('active');
    btnToggleChat.innerHTML = '<i class="fa-solid fa-wand-magic-sparkles" style="margin-right: 6px; color: #2563eb;"></i> Ask York AI';
}

if (btnCloseChat) {
    btnCloseChat.addEventListener('click', closeChatAgent);
}

// Bind Chat Window touch swipe/drag gestures to its drag bar and header
const chatMobileHandle = document.querySelector('.chat-mobile-handle');
const chatHeader = document.querySelector('.chat-header');
if (chatWindow) {
    setupBottomSheetTouchGestures(chatWindow, chatMobileHandle, closeChatAgent);
    setupBottomSheetTouchGestures(chatWindow, chatHeader, closeChatAgent);
}

// Enable/Disable Send Button on Typing
if (chatInputField) {
    chatInputField.addEventListener('input', (e) => {
        const val = e.target.value.trim();
        btnSendMessage.disabled = val.length === 0;
    });
    
    // Enter key trigger
    chatInputField.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' && !btnSendMessage.disabled) {
            sendUserMessage();
        }
    });
}

// Speech Recognition Travel Assistant
const btnChatMic = document.getElementById('btn-chat-mic');
const chatVoiceWaves = document.getElementById('chat-voice-waves');

if (btnChatMic && chatVoiceWaves) {
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (SpeechRecognition) {
        const recognition = new SpeechRecognition();
        recognition.continuous = false;
        recognition.lang = 'en-US';
        recognition.interimResults = false;
        recognition.maxAlternatives = 1;
        
        let isRecording = false;
        
        btnChatMic.addEventListener('click', () => {
            triggerMobileHaptic(18);
            if (isRecording) {
                recognition.stop();
            } else {
                try {
                    recognition.start();
                } catch (err) {
                    console.error("Speech Recognition start failed:", err);
                }
            }
        });
        
        recognition.onstart = () => {
            isRecording = true;
            btnChatMic.classList.add('active');
            btnChatMic.setAttribute('title', 'Recording... Click to stop');
            chatVoiceWaves.classList.remove('hidden');
            chatInputField.placeholder = '';
            chatInputField.value = '';
            chatInputField.disabled = true;
            btnSendMessage.disabled = true;
        };
        
        recognition.onend = () => {
            isRecording = false;
            btnChatMic.classList.remove('active');
            btnChatMic.setAttribute('title', 'Speak to York Guide AI');
            chatVoiceWaves.classList.add('hidden');
            chatInputField.placeholder = "Ask about Clifford's Tower, cafes, etc...";
            chatInputField.disabled = false;
            chatInputField.focus();
        };
        
        recognition.onresult = (event) => {
            const transcript = event.results[0][0].transcript.trim();
            if (transcript) {
                chatInputField.value = transcript;
                btnSendMessage.disabled = false;
                
                // Automatically send query after 650ms to simulate dynamic voice-command auto-submit
                setTimeout(() => {
                    if (chatInputField.value === transcript && !btnSendMessage.disabled) {
                        sendUserMessage();
                    }
                }, 650);
            }
        };
        
        recognition.onerror = (event) => {
            console.warn("Speech Recognition Error:", event.error);
        };
    } else {
        // Degrade gracefully: hide the microphone icon if Speech Recognition is not supported by the browser
        btnChatMic.style.display = 'none';
    }
}

if (btnSendMessage) {
    btnSendMessage.addEventListener('click', () => {
        if (!btnSendMessage.disabled) {
            sendUserMessage();
        }
    });
}

// API Key Modal Managers
if (btnConfigKey) {
    btnConfigKey.addEventListener('click', () => {
        apiKeyInput.value = geminiApiKey;
        modalKeyConfig.classList.remove('hidden');
    });
}

if (btnCloseModal) {
    btnCloseModal.addEventListener('click', () => {
        modalKeyConfig.classList.add('hidden');
    });
}

// Modal card click through blocker
const modalConfigCard = document.querySelector('#modal-key-config .modal-card');
if (modalKeyConfig) {
    modalKeyConfig.addEventListener('click', (e) => {
        if (modalConfigCard && !modalConfigCard.contains(e.target)) {
            modalKeyConfig.classList.add('hidden');
        }
    });
}

if (btnSaveKey) {
    btnSaveKey.addEventListener('click', () => {
        const keyVal = apiKeyInput.value.trim();
        if (keyVal === '') {
            alert('Please enter a valid API key.');
            return;
        }
        geminiApiKey = keyVal;
        localStorage.setItem('gemini_api_key', keyVal);
        modalKeyConfig.classList.add('hidden');
        alert('Gemini API key saved successfully!');
    });
}

if (btnClearKey) {
    btnClearKey.addEventListener('click', () => {
        geminiApiKey = '';
        localStorage.removeItem('gemini_api_key');
        apiKeyInput.value = '';
        modalKeyConfig.classList.add('hidden');
        alert('API key cleared successfully.');
    });
}

// Compile Intent-Aware & Viewport-Optimized Contextual GIS data layers loaded in client
function getGISContext(userQuery) {
    if (!window.poiSearchIndex || window.poiSearchIndex.length === 0) {
        return "No active POIs found in the spatial database catalog.";
    }
    
    const query = (userQuery || "").toLowerCase().trim();
    
    // Step 1: Detect Conversational Queries (No POI context needed to save context tokens)
    const conversationalKeywords = [
        'hello', 'hi', 'hey', 'greetings', 'yo', 'sup', 'welcome',
        'who are you', 'what are you', 'your name', 'who created you',
        'thank you', 'thanks', 'cool', 'awesome', 'great', 'wow',
        'bye', 'goodbye', 'see you', 'help', 'app info', 'joke'
    ];
    
    const isShortQuery = query.length < 15 && !/route|buffer|where|near|find|show|draw|map/i.test(query);
    const isConversational = conversationalKeywords.some(keyword => query === keyword || query.startsWith(keyword + ' '));
    
    if (isShortQuery || isConversational) {
        const center = map.getCenter();
        console.log("York Guide AI: Conversational Mode Activated (0 POIs loaded in context).");
        return `[Map State: Center Lat: ${center.lat.toFixed(5)}, Lng: ${center.lng.toFixed(5)}, Zoom: ${map.getZoom()}] (Conversational mode: POI coordinate listings omitted to optimize token speeds).`;
    }
    
    // Step 2: Determine target categories based on query intent
    let targetCategories = [];
    
    if (/hotel|stay|bed|hostel|motel|accommodation|lodging/i.test(query)) {
        targetCategories.push('Accomodation');
    }
    if (/restaurant|cafe|food|eat|dine|dinner|lunch|pub|bar|drink|coffee|tea|bites/i.test(query)) {
        targetCategories.push('Restaurant');
    }
    if (/historic|history|museum|monument|tower|minster|roman|viking|medieval|shambles|attraction|sight/i.test(query)) {
        targetCategories.push('Historic', 'Tourism');
    }
    if (/park|forest|green|garden|grass|wood|nature/i.test(query)) {
        targetCategories.push('Parks', 'Forest', 'grassland');
    }
    if (/train|bus|station|transit|airport|railway|transport|route|directions|go to/i.test(query)) {
        targetCategories.push('train station', 'Bus station', 'railway');
    }
    
    const bounds = map.getBounds();
    const center = map.getCenter();
    
    const inViewport = [];
    const outsideViewport = [];
    
    const len = window.poiSearchIndex.length;
    for (let i = 0; i < len; i++) {
        const item = window.poiSearchIndex[i];
        
        // Filter by category if specific intent was detected
        if (targetCategories.length > 0 && !targetCategories.includes(item.category)) {
            continue;
        }
        
        const latlng = L.latLng(item.lat, item.lng);
        const distSq = Math.pow(item.lat - center.lat, 2) + Math.pow(item.lng - center.lng, 2);
        
        const indexedItem = {
            name: item.name,
            category: item.category,
            lat: item.lat,
            lng: item.lng,
            distSq: distSq
        };
        
        if (bounds.contains(latlng)) {
            inViewport.push(indexedItem);
        } else {
            outsideViewport.push(indexedItem);
        }
    }
    
    inViewport.sort((a, b) => a.distSq - b.distSq);
    outsideViewport.sort((a, b) => a.distSq - b.distSq);
    
    // Limit to 15 items for targeted searches, or 10 for general fallbacks to keep prompt optimized
    const limit = targetCategories.length > 0 ? 15 : 10;
    const selectedPoints = [...inViewport, ...outsideViewport].slice(0, limit);
    
    if (selectedPoints.length === 0) {
        console.log(`York Guide AI: Active Spatial Mode (0 POIs matched intent: ${targetCategories.join(', ')}).`);
        return `[Map State: Center Lat: ${center.lat.toFixed(5)}, Lng: ${center.lng.toFixed(5)}, Zoom: ${map.getZoom()}] No POIs matching category keywords found near viewport.`;
    }
    
    console.log(`York Guide AI: Active Spatial Mode (${selectedPoints.length} POIs matched categories: ${targetCategories.length > 0 ? targetCategories.join(', ') : 'All/Fallback'}).`);
    
    const summaryList = selectedPoints.map(item => `- ${item.name} (${item.category}) [Coordinates: ${item.lat.toFixed(5)}, ${item.lng.toFixed(5)}]`);
    
    return `[Map State: Center Lat: ${center.lat.toFixed(5)}, Lng: ${center.lng.toFixed(5)}, Zoom: ${map.getZoom()}]
Active POIs matching search intent:
${summaryList.join('\n')}`;
}

async function sendUserMessage() {
    const text = chatInputField.value.trim();
    if (text === '') return;
    
    // Clear input
    chatInputField.value = '';
    btnSendMessage.disabled = true;
    
    // Add user bubble
    appendBubble(text, 'user');
    
    // Check if key exists, if not prompt key config immediately
    if (!geminiApiKey) {
        appendBubble("Error: No Gemini API Key configured. Please configure your key in the header of the chat panel to talk to the AI.", "assistant");
        apiKeyInput.value = '';
        modalKeyConfig.classList.remove('hidden');
        return;
    }
    
    // Add thinking bubble
    const thinkingBubble = appendThinkingBubble();
    
    // Setup context
    const gisContext = getGISContext(text);
    const systemPersona = `You are "York Guide AI", an elite, charming local tour guide and historical expert for the City of York, UK. 
Your tone is welcoming, highly knowledgeable, conversational, and proud of York's heritage. 
You are speaking to tourists visiting York using our Yorkshire WebGIS app.

Guidelines:
1. Provide rich, highly accurate historical context (Roman, Viking/Jorvik, Medieval, Shambles).
2. Ground your advice using the exact spatial POIs provided in our database catalog.
3. Encourage users to use WebGIS layers (Accommodations, Attractions, Restaurants, Transit) or click POIs to get navigation.
4. Keep answers relatively concise and highly structured (bullet points or bold text) to fit in a compact mobile chat window.
5. Always stay in character as a proud local guide. Avoid robotic descriptions.

GIS INTEGRATION CAPABILITY:
You can programmatically control the WebGIS map using JSON action tags. If the user explicitly asks you to perform an action (e.g. show a route, create a buffer, toggle a layer, turn on graticules, or reset the map), you MUST append a single action tag at the very end of your response in the exact format:
[WEBGIS_ACTION: {"action": "action_type", ...}]

Supported Action Types & Fields:
- "route": {"action": "route", "start": "LocationName", "end": "LocationName", "mode": "driving"|"cycling"|"walking"}
- "buffer": {"action": "buffer", "center": "LocationName", "radius": 50-500}
- "toggle_layer": {"action": "toggle_layer", "category": "Accommodations"|"Historic Landmarks"|"Restaurants & Cafes"|"Transit", "state": true|false}
- "map_tool": {"action": "map_tool", "tool": "boundary"|"graticule"|"reset_view", "state": true|false}
- "clear_route": {"action": "clear_route"}

Rules for Action Tags:
1. ONLY append tags if the user explicitly asks for an action.
2. Ensure location names match the exact names of locations in the database catalog provided to you.
3. Keep the tag structure exact. Do not place spaces inside "[WEBGIS_ACTION:".`;

    const fullPrompt = `Below is the list of active spatial locations in our WebGIS database:
${gisContext}

User Query: ${text}`;

    const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-3.1-flash-lite:generateContent?key=${geminiApiKey}`;
    
    try {
        const response = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                contents: [{
                    role: 'user',
                    parts: [{ text: fullPrompt }]
                }],
                systemInstruction: {
                    parts: [{ text: systemPersona }]
                },
                tools: [
                    {
                        googleSearch: {}
                    }
                ],
                generationConfig: {
                    thinkingConfig: {
                        thinkingBudget: 0
                    },
                    temperature: 0.7,
                    maxOutputTokens: 1000
                }
            })
        });
        
        // Remove thinking bubble
        thinkingBubble.remove();
        
        if (!response.ok) {
            const errJson = await response.json().catch(() => ({}));
            const errMsg = errJson?.error?.message || "Response failed";
            throw new Error(errMsg);
        }
        
        const resData = await response.json();
        const textResponse = resData?.candidates?.[0]?.content?.parts?.[0]?.text;
        
        if (textResponse) {
            // Parse action tag robustly (supports multiline JSON and case-insensitivity)
            const actionRegex = /\[WEBGIS_ACTION:\s*([\s\S]*?)\s*\]/i;
            const match = textResponse.match(actionRegex);
            let cleanText = textResponse;
            
            if (match) {
                try {
                    let rawJson = match[1].trim();
                    // Strip markdown block ticks (e.g. ```json) if present
                    rawJson = rawJson.replace(/```json\s*/gi, '').replace(/```\s*$/g, '').trim();
                    
                    const actionData = JSON.parse(rawJson);
                    // Remove the action tag cleanly from the visible chat body
                    cleanText = textResponse.replace(actionRegex, '').trim();
                    
                    // Dispatch WebGIS action programmatically
                    executeGisAction(actionData);
                } catch (jsonErr) {
                    console.error("Failed to parse action JSON:", jsonErr, "Raw matched string:", match[1]);
                }
            }
            
            appendBubble(formatMarkdownToHTML(cleanText), 'assistant', true);
        } else {
            throw new Error("Empty candidate list received.");
        }
        
    } catch (err) {
        console.error("Gemini API Error:", err);
        if (thinkingBubble) thinkingBubble.remove();
        appendBubble(`Atmosphere offline: ${err.message}. Please verify your API key validity or network connection.`, 'assistant');
    }
}

// Case-insensitive coordinate resolver mapping name queries to real POIs
function resolveLocationCoordinates(name) {
    if (!name) return null;
    const lowerName = name.toLowerCase().trim();
    
    for (const cat in categoryLayers) {
        const group = categoryLayers[cat];
        if (!group || typeof group.eachLayer !== 'function') continue;
        if (cat === 'Administrative Boundary') continue;
        
        let found = null;
        group.eachLayer(layer => {
            if (found) return;
            if (layer.feature && layer.feature.properties && layer.feature.properties.name) {
                const featName = layer.feature.properties.name.toLowerCase().trim();
                if (featName.includes(lowerName) || lowerName.includes(featName)) {
                    let centerLatLng = null;
                    if (typeof layer.getLatLng === 'function') {
                        centerLatLng = layer.getLatLng();
                    } else if (typeof layer.getBounds === 'function') {
                        centerLatLng = layer.getBounds().getCenter();
                    }
                    if (centerLatLng) {
                        found = {
                            lat: centerLatLng.lat,
                            lng: centerLatLng.lng,
                            name: layer.feature.properties.name
                        };
                    }
                }
            }
        });
        if (found) return found;
    }
    return null;
}

// Action Dispatcher executing map changes programmatically
function executeGisAction(actionData) {
    console.log("Executing WebGIS action:", actionData);
    const action = actionData.action;
    
    if (action === 'route') {
        let startPoint = null;
        let endPoint = null;
        
        if (actionData.start && actionData.start.toLowerCase() === 'my location') {
            if (startLocation) {
                startPoint = startLocation;
            } else {
                startPoint = { lat: 53.959965, lng: -1.087298, name: "York Center" };
            }
        } else {
            startPoint = resolveLocationCoordinates(actionData.start);
        }
        
        endPoint = resolveLocationCoordinates(actionData.end);
        
        if (!startPoint || !endPoint) {
            console.warn("Could not resolve routing coordinates for:", actionData.start, "or", actionData.end);
            return;
        }
        
        // Update variables and trigger routing
        startLocation = startPoint;
        endLocation = endPoint;
        
        const routeStartInput = document.getElementById('route-start');
        const routeEndInput = document.getElementById('route-end');
        if (routeStartInput) routeStartInput.value = startPoint.name;
        if (routeEndInput) routeEndInput.value = endPoint.name;
        
        if (actionData.mode) {
            let mode = 'driving';
            if (actionData.mode.toLowerCase() === 'cycling' || actionData.mode.toLowerCase() === 'bike') mode = 'cycling';
            if (actionData.mode.toLowerCase() === 'walking' || actionData.mode.toLowerCase() === 'foot') mode = 'walking';
            
            currentTransportMode = mode;
            const modeBtns = document.querySelectorAll('.mode-btn');
            modeBtns.forEach(btn => {
                if (btn.dataset.mode === mode) btn.classList.add('active');
                else btn.classList.remove('active');
            });
        }
        // Expand Left Command Deck & switch to Directions tab programmatically
        const hub = document.getElementById('control-hub');
        if (hub && hub.classList.contains('collapsed')) {
            hub.classList.remove('collapsed');
            hub.classList.add('bottom-sheet-open');
            const toggleHubBtn = document.getElementById('toggle-hub');
            if (toggleHubBtn) {
                toggleHubBtn.style.opacity = '0';
                toggleHubBtn.style.pointerEvents = 'none';
            }
        }
        const directionsTabBtn = document.querySelector('.deck-tab-btn[data-tab="tab-directions"]');
        if (directionsTabBtn) {
            directionsTabBtn.click();
        }
        calculateRoute();
    }
    else if (action === 'buffer') {
        const centerPoint = resolveLocationCoordinates(actionData.center);
        if (!centerPoint) {
            console.warn("Could not resolve buffer coordinates for:", actionData.center);
            return;
        }
        
        const radius = parseInt(actionData.radius) || 150;
        
        // Update UI range slider
        const slider = document.getElementById('buffer-radius-slider');
        const sliderVal = document.getElementById('buffer-radius-value');
        if (slider) slider.value = radius;
        if (sliderVal) sliderVal.innerText = radius + 'm';
        
        bufferRadius = radius;
        activeBufferCenter = L.latLng(centerPoint.lat, centerPoint.lng);
        
        // Toggle Buffer Tool UI to Active
        isBufferModeActive = true;
        const btnToggleBuffer = document.getElementById('btn-toggle-buffer');
        const bufferSliderGroup = document.getElementById('buffer-slider-group');
        const btnClearBuffer = document.getElementById('btn-clear-buffer');
        if (btnToggleBuffer) {
            btnToggleBuffer.classList.add('active');
            btnToggleBuffer.innerHTML = '<i class="fa-solid fa-crosshairs fa-spin"></i> Click Map to Analyze';
        }
        if (bufferSliderGroup) bufferSliderGroup.classList.remove('hidden');
        if (btnClearBuffer) btnClearBuffer.classList.remove('hidden');
        
        // Draw Leaflet circle
        if (activeBufferCircle) map.removeLayer(activeBufferCircle);
        activeBufferCircle = L.circle(activeBufferCenter, {
            radius: radius,
            color: '#2563eb',
            fillColor: '#3b82f6',
            fillOpacity: 0.15,
            weight: 2,
            dashArray: '5, 5',
            className: 'buffer-glow-animation',
            interactive: false
        }).addTo(map);
        // Pan and zoom nicely to focus
        map.setView(activeBufferCenter, 16);
        
        // Trigger intersections
        calculateSpatialBufferIntersections(activeBufferCenter, radius);

        // Expand Command Deck & switch to Layers tab programmatically
        const hub = document.getElementById('control-hub');
        if (hub && hub.classList.contains('collapsed')) {
            hub.classList.remove('collapsed');
            hub.classList.add('bottom-sheet-open');
            const toggleHubBtn = document.getElementById('toggle-hub');
            if (toggleHubBtn) {
                toggleHubBtn.style.opacity = '0';
                toggleHubBtn.style.pointerEvents = 'none';
            }
        }
        const layersTabBtn = document.querySelector('.deck-tab-btn[data-tab="tab-layers"]');
        if (layersTabBtn) {
            layersTabBtn.click();
        }
    }
    else if (action === 'toggle_layer') {
        const category = actionData.category;
        const state = actionData.state;
        
        for (const cat in categoryLayers) {
            if (cat.toLowerCase().includes(category.toLowerCase()) || category.toLowerCase().includes(cat.toLowerCase())) {
                const layerGroup = categoryLayers[cat];
                const isActive = map.hasLayer(layerGroup);
                
                // Programmatically find the legend card switch and toggle it
                const card = Array.from(document.querySelectorAll('.layer-legend-item')).find(c => c.querySelector('.layer-name').innerText.trim().toLowerCase().includes(cat.toLowerCase()));
                if (card) {
                    const checkbox = card.querySelector('input[type="checkbox"]');
                    if (checkbox && checkbox.checked !== state) {
                        checkbox.checked = state;
                        checkbox.dispatchEvent(new Event('change'));
                    }
                }
                break;
            }
        }
    }
    else if (action === 'map_tool') {
        const tool = actionData.tool;
        const state = actionData.state;
        
        if (tool === 'boundary') {
            const btn = document.getElementById('toggle-boundary');
            const isActive = btn && btn.classList.contains('active');
            if (btn && isActive !== state) btn.click();
        } 
        else if (tool === 'graticule') {
            const btn = document.getElementById('toggle-graticule');
            const isActive = btn && btn.classList.contains('active');
            if (btn && isActive !== state) btn.click();
        } 
        else if (tool === 'reset_view') {
            const btn = document.getElementById('reset-view');
            if (btn) btn.click();
        }
    }
    else if (action === 'clear_route') {
        const btn = document.getElementById('btn-clear-route');
        if (btn) btn.click();
    }
}

function appendBubble(content, sender, isHTML = false) {
    const bubble = document.createElement('div');
    bubble.className = `chat-bubble ${sender}`;
    if (isHTML) {
        bubble.innerHTML = content;
    } else {
        bubble.innerText = content;
    }
    chatBody.appendChild(bubble);
    
    // Auto Scroll Lock
    setTimeout(() => {
        chatBody.scrollTo({ top: chatBody.scrollHeight, behavior: 'smooth' });
    }, 50);
    
    return bubble;
}

function appendThinkingBubble() {
    const thinking = document.createElement('div');
    thinking.className = 'chat-bubble assistant chat-thinking';
    thinking.innerHTML = `
        <div class="thinking-dot"></div>
        <div class="thinking-dot"></div>
        <div class="thinking-dot"></div>
    `;
    chatBody.appendChild(thinking);
    
    setTimeout(() => {
        chatBody.scrollTo({ top: chatBody.scrollHeight, behavior: 'smooth' });
    }, 50);
    
    return thinking;
}

// Simple bolding and bullet list formatter for inline MD responses
function formatMarkdownToHTML(mdText) {
    let html = mdText
        .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
        .replace(/\*(.*?)\*/g, '<em>$1</em>')
        .replace(/^\s*\*\s+(.*?)$/gm, '<li>$1</li>')
        .replace(/^\s*-\s+(.*?)$/gm, '<li>$1</li>')
        .replace(/\n/g, '<br>');
        
    // Wrap consecutive lists inside <ul>
    html = html.replace(/(<li>.*?<\/li>)/gs, '<ul>$1</ul>');
    // Deduplicate nested <ul>
    html = html.replace(/<\/ul>\s*<ul>/g, '');
    
    return html;
}

// ============================================================================
// REDESIGNED COMMAND DECK INTERACTION & DOCK DYNAMICS
// ============================================================================

document.addEventListener('DOMContentLoaded', () => {
    // Segmented Tab Swapper with Dynamic Sliding Pill Indicator
    const tabBtns = document.querySelectorAll('.deck-tab-btn');
    const tabContents = document.querySelectorAll('.deck-tab-content');
    const indicator = document.querySelector('.deck-tabs-indicator');

    function updateTabIndicator(activeBtn) {
        if (!activeBtn || !indicator) return;
        indicator.style.transform = `translateX(${activeBtn.offsetLeft - 5}px)`;
        indicator.style.width = `${activeBtn.offsetWidth}px`;
    }

    tabBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            const targetTab = btn.dataset.tab;
            
            tabBtns.forEach(b => {
                b.classList.remove('active');
                b.setAttribute('aria-selected', 'false');
            });
            tabContents.forEach(c => c.classList.remove('active'));
            
            btn.classList.add('active');
            btn.setAttribute('aria-selected', 'true');
            const targetEl = document.getElementById(targetTab);
            if (targetEl) targetEl.classList.add('active');
            
            // Trigger indicator transition slide
            updateTabIndicator(btn);
        });
    });

    // Center active indicator on page load and window resizing
    const initialActive = document.querySelector('.deck-tab-btn.active');
    if (initialActive) {
        setTimeout(() => updateTabIndicator(initialActive), 150);
    }
    window.addEventListener('resize', () => {
        const active = document.querySelector('.deck-tab-btn.active');
        if (active) updateTabIndicator(active);
    });

    // Exclusive Quick Categories "Spotlight Filter Mode"
    const quickCatBtns = document.querySelectorAll('.quick-cat-btn');
    const spotlightAlert = document.getElementById('spotlight-alert');
    const alertText = document.getElementById('spotlight-alert-text');

    quickCatBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            triggerMobileHaptic(12);
            const category = btn.dataset.category;
            const layerGroup = categoryLayers[category];
            if (!layerGroup) return;
            
            btn.classList.add('pulse-press');
            setTimeout(() => btn.classList.remove('pulse-press'), 300);

            // Off-Switching: Restore backup state
            if (window.activeSoloCategory === category) {
                btn.classList.remove('active-spotlight');
                window.isProgrammaticToggle = true;
                for (const cat in categoryLayers) {
                    const grp = categoryLayers[cat];
                    if (!grp || cat === 'Administrative Boundary') continue;
                    
                    const wasActive = window.preSoloActiveCategories.includes(cat);
                    const isCurrentlyActive = map.hasLayer(grp);
                    
                    if (wasActive && !isCurrentlyActive) map.addLayer(grp);
                    else if (!wasActive && isCurrentlyActive) map.removeLayer(grp);
                    
                    const targetCheckboxId = `switch-${cat.replace(/\s+/g, '-').toLowerCase()}`;
                    const checkbox = document.getElementById(targetCheckboxId);
                    if (checkbox) {
                        checkbox.checked = wasActive;
                        const card = checkbox.closest('.layer-legend-item');
                        if (card) {
                            if (wasActive) card.classList.add('active');
                            else card.classList.remove('active');
                        }
                    }
                }
                window.isProgrammaticToggle = false;
                window.activeSoloCategory = null;
                window.preSoloActiveCategories = [];
                
                if (spotlightAlert) spotlightAlert.classList.remove('visible');

                // Restoring previous map view history
                if (window.preSoloMapCenter && window.preSoloMapZoom) {
                    map.setView(window.preSoloMapCenter, window.preSoloMapZoom, { animate: true, duration: 0.8 });
                    window.preSoloMapCenter = null;
                    window.preSoloMapZoom = null;
                }
                return;
            }

            // On-Switching
            quickCatBtns.forEach(b => b.classList.remove('active-spotlight'));
            btn.classList.add('active-spotlight');

            if (window.activeSoloCategory === null) {
                window.preSoloMapCenter = map.getCenter();
                window.preSoloMapZoom = map.getZoom();
                window.preSoloActiveCategories = [];
                for (const cat in categoryLayers) {
                    if (cat !== 'Administrative Boundary' && map.hasLayer(categoryLayers[cat])) {
                        window.preSoloActiveCategories.push(cat);
                    }
                }
            }

            window.isProgrammaticToggle = true;
            for (const cat in categoryLayers) {
                const grp = categoryLayers[cat];
                if (!grp || cat === 'Administrative Boundary') continue;
                
                const isTargetCat = (cat === category);
                const isCurrentlyActive = map.hasLayer(grp);
                
                if (isTargetCat && !isCurrentlyActive) map.addLayer(grp);
                else if (!isTargetCat && isCurrentlyActive) map.removeLayer(grp);
                
                const targetCheckboxId = `switch-${cat.replace(/\s+/g, '-').toLowerCase()}`;
                const checkbox = document.getElementById(targetCheckboxId);
                if (checkbox) {
                    checkbox.checked = isTargetCat;
                    const card = checkbox.closest('.layer-legend-item');
                    if (card) {
                        if (isTargetCat) card.classList.add('active');
                        else card.classList.remove('active');
                    }
                }
            }
            window.isProgrammaticToggle = false;
            window.activeSoloCategory = category;

            // Intelligent GIS Auto-Focus: fit map view to the newly spotlighted POIs
            if (layerGroup && layerGroup.getLayers().length > 0) {
                try {
                    map.fitBounds(layerGroup.getBounds(), { padding: [50, 50], maxZoom: 16, animate: true, duration: 0.8 });
                } catch (e) {
                    console.warn("Could not fit bounds for category layer:", e);
                }
            }

            // Update Spotlight Floating Alert
            if (spotlightAlert && alertText) {
                const displayName = btn.innerText.trim();
                alertText.innerHTML = `Exploring <strong>${displayName}</strong> POIs`;
                const catColor = btn.style.getPropertyValue('--cat-color') || '#2563eb';
                spotlightAlert.style.setProperty('--spotlight-color', catColor);
                spotlightAlert.classList.add('visible');
            }
        });
    });

    // Spotlight Reset Button click listener
    const resetSpotlightBtn = document.getElementById('btn-reset-spotlight');
    if (resetSpotlightBtn) {
        resetSpotlightBtn.addEventListener('click', () => {
            if (window.activeSoloCategory) {
                const activeSoloBtn = document.querySelector(`.quick-cat-btn[data-category="${window.activeSoloCategory}"]`);
                if (activeSoloBtn) {
                    activeSoloBtn.click();
                }
            }
        });
    }

    // Unified Header AI Chat trigger shortcut
    const quickBtnChat = document.getElementById('quick-btn-chat');
    if (quickBtnChat) {
        quickBtnChat.addEventListener('click', () => {
            const btnChatToggle = document.getElementById('btn-toggle-chat');
            if (btnChatToggle) btnChatToggle.click();
        });
    }

    // Leaflet Dynamic Popup Tab Swapper & Audio Narrator Cleanups
    map.on('popupopen', function(e) {
        const popupNode = e.popup.getElement();
        if (!popupNode) return;
        
        const tabBtns = popupNode.querySelectorAll('.popup-tab-btn');
        const tabPanels = popupNode.querySelectorAll('.popup-tab-content');
        
        tabBtns.forEach(btn => {
            btn.addEventListener('click', () => {
                const targetTab = btn.dataset.popupTab;
                
                tabBtns.forEach(b => b.classList.remove('active'));
                tabPanels.forEach(p => p.classList.remove('active'));
                
                btn.classList.add('active');
                const targetPanel = popupNode.querySelector(`.popup-tab-content[data-popup-panel="${targetTab}"]`);
                if (targetPanel) targetPanel.classList.add('active');
            });
        });

        // Bind modern, safe click handler for the directions button (replaces inline onclick)
        const directionsBtn = popupNode.querySelector('.btn-directions-popup');
        if (directionsBtn) {
            directionsBtn.addEventListener('click', () => {
                const lat = parseFloat(directionsBtn.dataset.lat);
                const lng = parseFloat(directionsBtn.dataset.lng);
                const name = decodeURIComponent(directionsBtn.dataset.name);
                window.setRouteDestination(lat, lng, name);
            });
        }
    });

    map.on('popupclose', function() {
        if ('speechSynthesis' in window) {
            window.speechSynthesis.cancel();
            document.querySelectorAll('.wiki-tts-btn').forEach(btn => {
                btn.innerHTML = `<i class="fa-solid fa-volume-high"></i> Listen`;
                btn.classList.remove('speaking');
            });
        }
    });

    // Native Browser Connectivity Status Tracking (Online / Offline Mode Toast alerts)
    const netDot = document.querySelector('.network-dot');
    const netText = document.getElementById('network-text');
    const offlineToast = document.getElementById('offline-toast');
    
    function updateConnectionStatus(isOnline) {
        if (netDot && netText) {
            if (isOnline) {
                netDot.classList.remove('offline');
                netText.innerText = 'Live';
                netText.parentElement.setAttribute('title', 'PWA Connected: Online');
                if (offlineToast) {
                    offlineToast.classList.remove('visible');
                }
            } else {
                netDot.classList.add('offline');
                netText.innerText = 'Offline';
                netText.parentElement.setAttribute('title', 'PWA Offline: Local Cache Mode');
                if (offlineToast) {
                    offlineToast.classList.add('visible');
                    // Automatically slide out the offline warning toast after 6 seconds of exposure
                    setTimeout(() => {
                        offlineToast.classList.remove('visible');
                    }, 6000);
                }
            }
        }
    }
    
    window.addEventListener('online', () => updateConnectionStatus(true));
    window.addEventListener('offline', () => updateConnectionStatus(false));
    
    // Initial connectivity state check
    updateConnectionStatus(navigator.onLine);
});
