// js/map.js

import { createPlaceCard } from './utils.js';

let currentMap = null;
let markers = [];

export function initMap(containerId, places) {
    if (currentMap) {
        currentMap.remove();
        currentMap = null;
    }

    // Default center (Tuyên Quang City)
    const tqCenter = [21.8152, 105.2154];
    
    // Find average center from places if available
    let center = tqCenter;
    if (places && places.length > 0) {
        const validPlaces = places.filter(p => p.coordinates && p.coordinates.lat && p.coordinates.lng);
        if (validPlaces.length > 0) {
            const sumLat = validPlaces.reduce((sum, p) => sum + p.coordinates.lat, 0);
            const sumLng = validPlaces.reduce((sum, p) => sum + p.coordinates.lng, 0);
            center = [sumLat / validPlaces.length, sumLng / validPlaces.length];
        }
    }

    currentMap = L.map(containerId, {
        zoomControl: false // Custom position
    }).setView(center, 14);

    L.control.zoom({
        position: 'bottomright'
    }).addTo(currentMap);

    // Google Maps Tile Layer
    L.tileLayer('https://mt1.google.com/vt/lyrs=m&x={x}&y={y}&z={z}', {
        attribution: '&copy; Google Maps',
        maxZoom: 20
    }).addTo(currentMap);

    if (places) {
        addMarkers(places);
    }

    return currentMap;
}

export function addMarkers(places) {
    if (!currentMap) return;

    // Clear existing markers
    markers.forEach(m => currentMap.removeLayer(m));
    markers = [];

    places.forEach(place => {
        if (!place.coordinates || !place.coordinates.lat || !place.coordinates.lng) return;

        // Custom icon based on category
        const isFood = place.category === 'an-uong';
        const isCafe = place.category === 'cafe';
        const iconHtml = `<div class="map-marker-icon ${isFood ? 'food' : isCafe ? 'cafe' : 'other'}">
            <i data-lucide="${isFood ? 'utensils' : isCafe ? 'coffee' : 'map-pin'}"></i>
        </div>`;

        const customIcon = L.divIcon({
            html: iconHtml,
            className: 'custom-map-marker',
            iconSize: [36, 36],
            iconAnchor: [18, 36],
            popupAnchor: [0, -36]
        });

        const marker = L.marker([place.coordinates.lat, place.coordinates.lng], { icon: customIcon })
            .addTo(currentMap);
        
        // Popup content is the place card (simplified)
        const popupContent = `
            <div class="map-popup-card">
                <div style="width: 200px; padding: 0;">
                    <img src="${place.image}" style="width: 100%; height: 120px; object-fit: cover; border-radius: 8px 8px 0 0;" alt="${place.name}">
                    <div style="padding: 8px;">
                        <h4 style="margin:0; font-size: 14px; font-weight: bold; color: #1F2937;">${place.name}</h4>
                        <p style="margin: 4px 0 8px; font-size: 12px; color: #6B7280; white-space: nowrap; overflow: hidden; text-overflow: ellipsis;">${place.address}</p>
                        <a href="#/chi-tiet/${place.slug}" class="btn btn--primary btn--sm" style="display: block; width: 100%; padding: 4px 0; font-size: 12px;">Xem chi tiết</a>
                    </div>
                </div>
            </div>
        `;

        marker.bindPopup(popupContent, {
            closeButton: false,
            className: 'custom-map-popup'
        });

        // Trigger lucide icons after popup opens
        marker.on('popupopen', () => {
            if (window.lucide) {
                window.lucide.createIcons();
            }
        });

        markers.push(marker);
    });

    if (window.lucide) {
        window.lucide.createIcons();
    }
}

export function destroyActiveMaps() {
    if (currentMap) {
        currentMap.remove();
        currentMap = null;
    }
}
export function initCategoryMap(el) {
    // Stub
}
export function initPointMap(el, lat, lng, name) {
    // Stub
}
