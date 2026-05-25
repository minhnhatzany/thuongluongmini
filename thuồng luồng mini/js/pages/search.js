// ============================================
// Search Page - Thuồng Luồng Mini
// ============================================

import { CATEGORIES, searchPlaces } from '../data.js';
import { createPlaceCard } from '../utils.js';

export function renderSearchPage(query = '') {
    const results = query ? searchPlaces(query) : [];
    
    return `
        <div class="page-container">
            <div class="container">
                <!-- Search Header -->
                <div class="search-page-header animate-on-scroll">
                    <h1 class="search-page-header__title">
                        <i data-lucide="search"></i>
                        Tìm kiếm
                    </h1>
                    <div class="search-page-bar">
                        <div class="search-bar search-bar--large">
                            <i data-lucide="search" class="search-bar__icon"></i>
                            <input type="text" class="search-bar__input" id="page-search-input" 
                                   placeholder="Tìm quán ăn, cafe, điểm du lịch..." 
                                   value="${escapeHtml(query)}" autocomplete="off">
                            <button class="search-bar__clear" onclick="document.getElementById('page-search-input').value = ''; document.getElementById('page-search-input').focus()">
                                <i data-lucide="x"></i>
                            </button>
                        </div>
                    </div>
                    
                    ${query ? `
                        <p class="search-page-header__result-count">
                            ${results.length > 0 
                                ? `Tìm thấy <strong>${results.length}</strong> kết quả cho "<strong>${escapeHtml(query)}</strong>"`
                                : `Không tìm thấy kết quả cho "${escapeHtml(query)}"`
                            }
                        </p>
                    ` : ''}
                </div>

                ${!query ? `
                    <!-- Popular Searches -->
                    <div class="search-suggestions animate-on-scroll">
                        <h3 class="search-suggestions__title">Tìm kiếm phổ biến</h3>
                        <div class="search-suggestions__tags">
                            <a href="#/tim-kiem?q=phở" class="hero__tag">🍜 Phở</a>
                            <a href="#/tim-kiem?q=cafe" class="hero__tag">☕ Cafe</a>
                            <a href="#/tim-kiem?q=karaoke" class="hero__tag">🎤 Karaoke</a>
                            <a href="#/tim-kiem?q=Na Hang" class="hero__tag">🏔️ Na Hang</a>
                            <a href="#/tim-kiem?q=lẩu" class="hero__tag">🍲 Lẩu</a>
                            <a href="#/tim-kiem?q=bánh cuốn" class="hero__tag">🥟 Bánh cuốn</a>
                            <a href="#/tim-kiem?q=trà sữa" class="hero__tag">🧋 Trà sữa</a>
                            <a href="#/tim-kiem?q=du lịch" class="hero__tag">✈️ Du lịch</a>
                        </div>
                    </div>

                    <!-- Browse Categories -->
                    <div class="search-categories animate-on-scroll">
                        <h3 class="search-categories__title">Duyệt theo danh mục</h3>
                        <div class="categories-grid categories-grid--compact">
                            ${CATEGORIES.map(cat => `
                                <a href="#/danh-muc/${cat.id}" class="category-card category-card--compact">
                                    <div class="category-card__icon" style="background: linear-gradient(135deg, ${cat.color}, ${adjustColor(cat.color, -20)})">
                                        <span>${cat.icon}</span>
                                    </div>
                                    <h3 class="category-card__name">${cat.name}</h3>
                                </a>
                            `).join('')}
                        </div>
                    </div>
                ` : ''}

                ${query && results.length > 0 ? `
                    <!-- Filter by category -->
                    <div class="filter-bar animate-on-scroll">
                        <div class="filter-bar__chips">
                            <button class="filter-chip active" onclick="window.filterSearchResults('all', this)">Tất cả (${results.length})</button>
                            ${CATEGORIES.map(cat => {
                                const count = results.filter(r => r.category === cat.id).length;
                                if (count === 0) return '';
                                return `<button class="filter-chip" onclick="window.filterSearchResults('${cat.id}', this)">${cat.icon} ${cat.name} (${count})</button>`;
                            }).join('')}
                        </div>
                    </div>

                    <!-- Results Grid -->
                    <div class="venue-grid" id="search-grid">
                        ${results.map(place => createPlaceCard(place)).join('')}
                    </div>
                ` : ''}

                ${query && results.length === 0 ? `
                    <div class="empty-state animate-on-scroll">
                        <div class="empty-state__icon">🔍</div>
                        <h3 class="empty-state__title">Không tìm thấy kết quả</h3>
                        <p class="empty-state__text">Thử tìm kiếm với từ khóa khác hoặc duyệt theo danh mục</p>
                        <div class="search-suggestions__tags" style="margin-top: 1rem;">
                            <a href="#/tim-kiem?q=cafe" class="hero__tag">☕ Cafe</a>
                            <a href="#/tim-kiem?q=ăn uống" class="hero__tag">🍜 Ăn uống</a>
                            <a href="#/tim-kiem?q=du lịch" class="hero__tag">✈️ Du lịch</a>
                        </div>
                    </div>
                ` : ''}
            </div>
        </div>
    `;
}

// ============================================
// Helper Functions
// ============================================
function escapeHtml(str) {
    const div = document.createElement('div');
    div.textContent = str;
    return div.innerHTML;
}

function adjustColor(hex, amount) {
    const num = parseInt(hex.replace('#', ''), 16);
    const r = Math.min(255, Math.max(0, (num >> 16) + amount));
    const g = Math.min(255, Math.max(0, ((num >> 8) & 0x00FF) + amount));
    const b = Math.min(255, Math.max(0, (num & 0x0000FF) + amount));
    return `#${(r << 16 | g << 8 | b).toString(16).padStart(6, '0')}`;
}

// Filter search results by category
window.filterSearchResults = function(catId, btnEl) {
    const hash = window.location.hash;
    const queryMatch = hash.match(/q=([^&]+)/);
    const query = queryMatch ? decodeURIComponent(queryMatch[1]) : '';
    
    if (!query) return;
    
    let results = searchPlaces(query);
    
    if (catId !== 'all') {
        results = results.filter(r => r.category === catId);
    }
    
    // Update active chip
    document.querySelectorAll('.filter-chip').forEach(c => c.classList.remove('active'));
    btnEl.classList.add('active');
    
    // Update grid
    const grid = document.getElementById('search-grid');
    if (grid) {
        if (results.length > 0) {
            grid.innerHTML = results.map(place => createPlaceCard(place)).join('');
        } else {
            grid.innerHTML = `
                <div class="empty-state" style="grid-column: 1 / -1;">
                    <div class="empty-state__icon">🔍</div>
                    <h3 class="empty-state__title">Không có kết quả trong danh mục này</h3>
                </div>
            `;
        }
        if (window.lucide) window.lucide.createIcons();
    }
};
