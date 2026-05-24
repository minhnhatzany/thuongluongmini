// ============================================
// Leaflet map lifecycle (prevent duplicate init / leaks)
// ============================================

let activeCategoryMap = null;

export function destroyActiveMaps() {
    if (activeCategoryMap) {
        activeCategoryMap.remove();
        activeCategoryMap = null;
    }
}

export function destroyMapOnElement(mapEl) {
    if (!mapEl || typeof L === 'undefined') return;

    if (mapEl._tlmLeafletMap) {
        mapEl._tlmLeafletMap.remove();
        mapEl._tlmLeafletMap = null;
        return;
    }

    if (mapEl._leaflet_id && L.Map?._instances) {
        const instance = L.Map._instances[mapEl._leaflet_id];
        if (instance) {
            instance.remove();
        }
    }
}

export function initCategoryMap(mapEl) {
    if (!mapEl || typeof L === 'undefined') return null;

    destroyActiveMaps();
    destroyMapOnElement(mapEl);

    try {
        const placesData = JSON.parse(mapEl.dataset.places || '[]');
        if (placesData.length === 0) return null;

        const centerLat = placesData.reduce((s, p) => s + p.lat, 0) / placesData.length;
        const centerLng = placesData.reduce((s, p) => s + p.lng, 0) / placesData.length;

        const map = L.map(mapEl, { scrollWheelZoom: false }).setView([centerLat, centerLng], 13);
        mapEl._tlmLeafletMap = map;
        activeCategoryMap = map;

        L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
            attribution: '© OpenStreetMap'
        }).addTo(map);

        placesData.forEach(p => {
            const icon = L.divIcon({
                className: 'custom-map-marker',
                html: '<div class="map-marker-pin"><span>📍</span></div>',
                iconSize: [30, 30],
                iconAnchor: [15, 30],
                popupAnchor: [0, -30]
            });

            L.marker([p.lat, p.lng], { icon }).addTo(map).bindPopup(`
                <div class="map-popup">
                    <strong>${p.name}</strong><br>
                    <span>${p.subCategory} · ${p.rating.toFixed(1)} ★</span><br>
                    <a href="#/dia-diem/${p.id}/${p.slug}">Xem chi tiết →</a>
                </div>
            `);
        });

        if (placesData.length > 1) {
            const bounds = L.latLngBounds(placesData.map(p => [p.lat, p.lng]));
            map.fitBounds(bounds, { padding: [30, 30] });
        }

        setTimeout(() => map.invalidateSize(), 200);
        return map;
    } catch (e) {
        console.error('Map init error:', e);
        return null;
    }
}

export function initPointMap(mapEl, lat, lng, name = '') {
    if (!mapEl || typeof L === 'undefined' || isNaN(lat) || isNaN(lng)) return null;

    destroyMapOnElement(mapEl);

    const map = L.map(mapEl, { scrollWheelZoom: false }).setView([lat, lng], 15);
    mapEl._tlmLeafletMap = map;

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '© OpenStreetMap'
    }).addTo(map);

    const icon = L.divIcon({
        className: 'custom-map-marker',
        html: '<div class="map-marker-pin"><span>📍</span></div>',
        iconSize: [40, 40],
        iconAnchor: [20, 40],
        popupAnchor: [0, -40]
    });

    L.marker([lat, lng], { icon }).addTo(map).bindPopup(`<b>${name}</b>`).openPopup();
    setTimeout(() => map.invalidateSize(), 100);
    return map;
}
