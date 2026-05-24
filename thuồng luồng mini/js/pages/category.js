// ============================================
// Category Page - Thuồng Luồng Mini
// ============================================

import { CATEGORIES, SUB_CATEGORIES, getPlacesByCategory } from '../data.js';
import { createPlaceCard } from '../utils.js';

export function renderCategoryPage(categoryId) {
    const category = CATEGORIES.find(c => c.id === categoryId);
    if (!category) {
        return `
            <div class="page-container">
                <div class="container">
                    <div class="empty-state">
                        <div class="empty-state__icon">🤔</div>
                        <h2 class="empty-state__title">Danh mục không tồn tại</h2>
                        <a href="#/" class="btn btn--primary">Về trang chủ</a>
                    </div>
                </div>
            </div>
        `;
    }

    const places = getPlacesByCategory(categoryId);
    const subCats = SUB_CATEGORIES[categoryId] || [];

    return `
        <div class="page-container">
            <!-- Category Header -->
            <div class="category-hero" style="--cat-color: ${category.color}">
                <div class="container">
                    <nav class="breadcrumb animate-on-scroll">
                        <a href="#/" class="breadcrumb__item">Trang chủ</a>
                        <span class="breadcrumb__sep">/</span>
                        <span class="breadcrumb__item active">${category.name}</span>
                    </nav>
                    <div class="category-hero__content animate-on-scroll">
                        <div class="category-hero__icon">${category.icon}</div>
                        <div>
                            <h1 class="category-hero__title">${category.name}</h1>
                            <p class="category-hero__desc">${category.description}</p>
                            <p class="category-hero__count">${places.length} địa điểm</p>
                        </div>
                    </div>
                </div>
            </div>

            <div class="container">
                <!-- Sub-category Filter -->
                <div class="filter-bar animate-on-scroll">
                    <div class="filter-bar__chips">
                        <button class="filter-chip active" data-sub="all" onclick="window.filterBySubCat('all', this)">
                            Tất cả
                        </button>
                        ${subCats.map(sub => `
                            <button class="filter-chip" data-sub="${sub}" onclick="window.filterBySubCat('${sub}', this)">
                                ${sub}
                            </button>
                        `).join('')}
                    </div>
                    <div class="filter-bar__actions">
                        <div class="filter-bar__sort">
                            <i data-lucide="arrow-up-down"></i>
                            <select id="sort-select" onchange="window.sortPlaces(this.value)">
                                <option value="popular">Phổ biến nhất</option>
                                <option value="rating">Đánh giá cao</option>
                                <option value="name">Tên A-Z</option>
                                <option value="reviews">Nhiều đánh giá</option>
                            </select>
                        </div>
                        <div class="filter-bar__view">
                            <button class="filter-bar__view-btn active" data-view="grid" onclick="window.setView('grid', this)" aria-label="Lưới">
                                <i data-lucide="grid-3x3"></i>
                            </button>
                            <button class="filter-bar__view-btn" data-view="list" onclick="window.setView('list', this)" aria-label="Danh sách">
                                <i data-lucide="list"></i>
                            </button>
                        </div>
                    </div>
                </div>

                <!-- Results -->
                <div class="venue-grid" id="venue-grid">
                    ${places.map(place => createPlaceCard(place)).join('')}
                </div>

                ${places.length === 0 ? `
                    <div class="empty-state">
                        <div class="empty-state__icon">${category.icon}</div>
                        <h3 class="empty-state__title">Chưa có địa điểm nào</h3>
                        <p class="empty-state__text">Danh mục này sẽ sớm được cập nhật!</p>
                    </div>
                ` : ''}

                <!-- Map View -->
                <div class="category-map-section animate-on-scroll">
                    <h3 class="category-map-section__title">
                        <i data-lucide="map"></i>
                        Xem trên bản đồ
                    </h3>
                    <div class="category-map" id="category-map" 
                         data-category-map="${categoryId}"
                         data-places='${JSON.stringify(places.map(p => ({
                            id: p.id,
                            name: p.name,
                            slug: p.slug,
                            lat: p.coordinates.lat,
                            lng: p.coordinates.lng,
                            rating: p.rating,
                            subCategory: p.subCategory
                         })))}'
                    ></div>
                </div>
            </div>
        </div>
    `;
}

// ============================================
// Filter & Sort Functions
// ============================================
let currentSubCat = 'all';
let currentSort = 'popular';
let currentView = 'grid';

window.filterBySubCat = function(sub, btnEl) {
    currentSubCat = sub;
    
    // Update active chip
    document.querySelectorAll('.filter-chip').forEach(c => c.classList.remove('active'));
    btnEl.classList.add('active');
    
    applyFilters();
};

window.sortPlaces = function(sortBy) {
    currentSort = sortBy;
    applyFilters();
};

window.setView = function(view, btnEl) {
    currentView = view;
    const grid = document.getElementById('venue-grid');
    
    document.querySelectorAll('.filter-bar__view-btn').forEach(b => b.classList.remove('active'));
    btnEl.classList.add('active');
    
    if (grid) {
        grid.classList.toggle('venue-grid--list', view === 'list');
    }
};

function applyFilters() {
    const cards = document.querySelectorAll('#venue-grid .card');
    const grid = document.getElementById('venue-grid');
    
    // Get current category from URL
    const hash = window.location.hash;
    const catMatch = hash.match(/#\/danh-muc\/([a-z-]+)/);
    if (!catMatch) return;
    
    let places = getPlacesByCategory(catMatch[1]);
    
    // Filter by sub-category
    if (currentSubCat !== 'all') {
        places = places.filter(p => p.subCategory === currentSubCat);
    }
    
    // Sort
    switch (currentSort) {
        case 'rating':
            places.sort((a, b) => b.rating - a.rating);
            break;
        case 'name':
            places.sort((a, b) => a.name.localeCompare(b.name, 'vi'));
            break;
        case 'reviews':
            places.sort((a, b) => b.totalReviews - a.totalReviews);
            break;
        default: // popular - featured first, then by rating
            places.sort((a, b) => {
                if (a.isFeatured && !b.isFeatured) return -1;
                if (!a.isFeatured && b.isFeatured) return 1;
                return b.rating - a.rating;
            });
    }
    
    // Re-render grid
    if (grid) {
        grid.innerHTML = places.map(place => createPlaceCard(place)).join('');
        
        if (places.length === 0) {
            grid.innerHTML = `
                <div class="empty-state" style="grid-column: 1 / -1;">
                    <div class="empty-state__icon">🔍</div>
                    <h3 class="empty-state__title">Không tìm thấy kết quả</h3>
                    <p class="empty-state__text">Thử chọn danh mục khác</p>
                </div>
            `;
        }
        
        if (currentView === 'list') {
            grid.classList.add('venue-grid--list');
        }
        
        // Re-init icons
        if (window.lucide) window.lucide.createIcons();
    }
}

// Initialize category map after DOM update
const mapObserver = new MutationObserver(() => {
    const mapEl = document.querySelector('[data-category-map]');
    if (mapEl && !mapEl._leaflet_id) {
        initCategoryMap(mapEl);
    }
});

if (typeof document !== 'undefined') {
    mapObserver.observe(document.body, { childList: true, subtree: true });
}

function initCategoryMap(mapEl) {
    try {
        const placesData = JSON.parse(mapEl.dataset.places || '[]');
        if (placesData.length === 0) return;
        
        // Center on first place or Tuyên Quang center
        const centerLat = placesData.reduce((s, p) => s + p.lat, 0) / placesData.length;
        const centerLng = placesData.reduce((s, p) => s + p.lng, 0) / placesData.length;
        
        const map = L.map(mapEl, {
            scrollWheelZoom: false
        }).setView([centerLat, centerLng], 13);
        
        L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
            attribution: '© OpenStreetMap'
        }).addTo(map);
        
        placesData.forEach(p => {
            const icon = L.divIcon({
                className: 'custom-map-marker',
                html: `<div class="map-marker-pin"><span>📍</span></div>`,
                iconSize: [30, 30],
                iconAnchor: [15, 30],
                popupAnchor: [0, -30]
            });
            
            L.marker([p.lat, p.lng], { icon }).addTo(map)
                .bindPopup(`
                    <div class="map-popup">
                        <strong>${p.name}</strong><br>
                        <span>${p.subCategory} · ${p.rating.toFixed(1)} ★</span><br>
                        <a href="#/dia-diem/${p.id}/${p.slug}">Xem chi tiết →</a>
                    </div>
                `);
        });
        
        // Fit bounds
        if (placesData.length > 1) {
            const bounds = L.latLngBounds(placesData.map(p => [p.lat, p.lng]));
            map.fitBounds(bounds, { padding: [30, 30] });
        }
        
        setTimeout(() => map.invalidateSize(), 200);
    } catch (e) {
        console.error('Map init error:', e);
    }
}
