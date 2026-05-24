// ============================================
// Home Page - Thuồng Luồng Mini
// ============================================

import { CATEGORIES, PLACES, getFeaturedPlaces, getTopRatedPlaces, getNewPlaces, getPlacesByCategory } from '../data.js';
import { ITINERARIES } from '../itinerary-data.js';
import { createPlaceCard, renderStars } from '../utils.js';

export function renderHomePage() {
    const featured = getFeaturedPlaces();
    const topRated = getTopRatedPlaces(8);
    const newPlaces = getNewPlaces(4);
    
    return `
        <!-- Hero Section -->
        <section class="hero" id="hero-section">
            <div class="hero__bg">
                <div class="hero__gradient"></div>
                <div class="hero__pattern"></div>
            </div>
            <div class="hero__content container">
                <div class="hero__text animate-on-scroll">
                    <div class="hero__badge">🐉 Khám phá Tuyên Quang</div>
                    <h1 class="hero__title">
                        Thuồng Luồng <span class="highlight">Mini</span>
                    </h1>
                    <p class="hero__subtitle">
                        Tìm kiếm, đánh giá và chia sẻ những địa điểm tuyệt vời nhất tại Tuyên Quang — 
                        từ ẩm thực đường phố đến điểm du lịch xinh đẹp.
                    </p>
                    <div class="hero__search">
                        <div class="search-bar search-bar--lg">
                            <i data-lucide="search" class="search-bar__icon"></i>
                            <input type="text" class="search-bar__input" id="hero-search-input"
                                   placeholder="Bạn muốn tìm gì hôm nay?">
                            <button class="btn btn--primary" id="hero-search-btn" style="position: absolute; right: 8px; top: 8px; bottom: 8px;">
                                Tìm kiếm
                            </button>
                        </div>
                        <div class="hero__tags">
                            <span>Phổ biến:</span>
                            <a href="#/tim-kiem?q=phở" class="hero__tag">Phở</a>
                            <a href="#/tim-kiem?q=cafe" class="hero__tag">Cafe</a>
                            <a href="#/tim-kiem?q=karaoke" class="hero__tag">Karaoke</a>
                            <a href="#/tim-kiem?q=Na Hang" class="hero__tag">Na Hang</a>
                        </div>
                    </div>
                </div>
                <div class="hero__stats animate-on-scroll">
                    <div class="hero__stat">
                        <span class="hero__stat-num">${PLACES.length}+</span>
                        <span class="hero__stat-label">Địa điểm</span>
                    </div>
                    <div class="hero__stat">
                        <span class="hero__stat-num">${CATEGORIES.length}</span>
                        <span class="hero__stat-label">Danh mục</span>
                    </div>
                    <div class="hero__stat">
                        <span class="hero__stat-num">${getTotalReviews()}+</span>
                        <span class="hero__stat-label">Đánh giá</span>
                    </div>
                </div>
            </div>
            <div class="hero__scroll-indicator">
                <span>Kéo xuống để khám phá</span>
                <i data-lucide="chevron-down" class="bounce"></i>
            </div>
        </section>

        <!-- Categories Section -->
        <section class="section section--categories" id="categories-section">
            <div class="container">
                <div class="section__header animate-on-scroll">
                    <h2 class="section__title">Khám phá theo danh mục</h2>
                    <p class="section__subtitle">Chọn danh mục bạn quan tâm</p>
                </div>
                <div class="categories-grid">
                    ${CATEGORIES.map((cat, index) => `
                        <a href="#/danh-muc/${cat.id}" class="category-card animate-on-scroll" style="--delay: ${index * 0.1}s">
                            <div class="category-card__icon" style="background: linear-gradient(135deg, ${cat.color}, ${adjustColor(cat.color, -20)})">
                                <span>${cat.icon}</span>
                            </div>
                            <h3 class="category-card__name">${cat.name}</h3>
                            <p class="category-card__count">${getPlacesByCategory(cat.id).length} địa điểm</p>
                            <div class="category-card__arrow">
                                <i data-lucide="arrow-right"></i>
                            </div>
                        </a>
                    `).join('')}
                </div>
            </div>
        </section>

        <!-- Featured Section -->
        ${featured.length > 0 ? `
        <section class="section section--featured" id="featured-section">
            <div class="container">
                <div class="section__header animate-on-scroll">
                    <div>
                        <h2 class="section__title">⭐ Nổi bật</h2>
                        <p class="section__subtitle">Những địa điểm được yêu thích nhất</p>
                    </div>
                </div>
                <div class="carousel" id="featured-carousel">
                    <button class="carousel__prev" aria-label="Trước">
                        <i data-lucide="chevron-left"></i>
                    </button>
                    <div class="carousel__track">
                        ${featured.map(place => `
                            <div class="carousel__item">
                                ${createPlaceCard(place)}
                            </div>
                        `).join('')}
                    </div>
                    <button class="carousel__next" aria-label="Sau">
                        <i data-lucide="chevron-right"></i>
                    </button>
                    <div class="carousel__dots"></div>
                </div>
            </div>
        </section>
        ` : ''}

        <!-- Itineraries Section -->
        <section class="section section--itineraries" id="itineraries-section" style="background: var(--bg-card); border-top: 1px solid var(--border-color); border-bottom: 1px solid var(--border-color);">
            <div class="container">
                <div class="section__header animate-on-scroll">
                    <div>
                        <h2 class="section__title">🗺️ Lộ trình nổi bật</h2>
                        <p class="section__subtitle">Gợi ý lịch trình hoàn hảo cho chuyến đi của bạn</p>
                    </div>
                    <a href="#/lo-trinh" class="section__see-all">
                        Xem tất cả <i data-lucide="arrow-right"></i>
                    </a>
                </div>
                <div class="grid" style="--grid-cols: 2;">
                    ${ITINERARIES.slice(0, 2).map(it => `
                        <a href="#/lo-trinh/${it.id}" class="card animate-on-scroll" style="text-decoration: none;">
                            <div class="card__image-wrapper" style="padding-bottom: 56.25%;">
                                <img src="${it.image}" alt="${it.title}" loading="lazy" class="card__image" style="object-fit: cover; width: 100%; height: 100%; position: absolute; top: 0; left: 0;">
                                <div class="card__badges" style="position: absolute; top: 10px; left: 10px;">
                                    <span class="badge" style="background: var(--color-primary); color: white;">${it.duration}</span>
                                </div>
                            </div>
                            <div class="card__content" style="padding: var(--space-4);">
                                <h3 class="card__title" style="font-size: 1.1rem; margin-bottom: var(--space-2); color: var(--text-main);">${it.title}</h3>
                                <p style="color: var(--text-muted); font-size: 0.9rem; margin-bottom: var(--space-3); line-height: 1.4;">${it.shortDesc}</p>
                                <div style="display: flex; justify-content: space-between; align-items: center; border-top: 1px solid var(--border-color); padding-top: var(--space-3); font-size: 0.85rem; color: var(--text-main);">
                                    <span style="display: flex; align-items: center; gap: 4px;"><i data-lucide="map" style="width: 14px; height: 14px;"></i> ${it.distance}</span>
                                    <span style="display: flex; align-items: center; gap: 4px; font-weight: 600; color: var(--color-danger);"><i data-lucide="wallet" style="width: 14px; height: 14px;"></i> ${it.costEstimate.split('/')[0]}</span>
                                </div>
                            </div>
                        </a>
                    `).join('')}
                </div>
            </div>
        </section>


        <!-- Top Rated Section -->
        <section class="section section--top-rated" id="top-rated-section">
            <div class="container">
                <div class="section__header animate-on-scroll">
                    <div>
                        <h2 class="section__title">🏆 Đánh giá cao nhất</h2>
                        <p class="section__subtitle">Được cộng đồng tin tưởng</p>
                    </div>
                    <a href="#/danh-muc/an-uong" class="section__see-all">
                        Xem tất cả <i data-lucide="arrow-right"></i>
                    </a>
                </div>
                <div class="venue-grid">
                    ${topRated.map(place => createPlaceCard(place)).join('')}
                </div>
            </div>
        </section>

        <!-- New Places Section -->
        ${newPlaces.length > 0 ? `
        <section class="section section--new" id="new-section">
            <div class="container">
                <div class="section__header animate-on-scroll">
                    <div>
                        <h2 class="section__title">🆕 Mới cập nhật</h2>
                        <p class="section__subtitle">Địa điểm mới thêm gần đây</p>
                    </div>
                </div>
                <div class="venue-grid venue-grid--2">
                    ${newPlaces.map(place => createPlaceCard(place)).join('')}
                </div>
            </div>
        </section>
        ` : ''}

        <!-- Category Previews -->
        ${CATEGORIES.map((cat, index) => {
            const catPlaces = getPlacesByCategory(cat.id).slice(0, 4);
            if (catPlaces.length === 0) return '';
            return `
            <section class="section section--category-preview" id="preview-${cat.id}">
                <div class="container">
                    <div class="section__header animate-on-scroll">
                        <div>
                            <h2 class="section__title">${cat.icon} ${cat.name}</h2>
                            <p class="section__subtitle">${cat.description}</p>
                        </div>
                        <a href="#/danh-muc/${cat.id}" class="section__see-all">
                            Xem tất cả <i data-lucide="arrow-right"></i>
                        </a>
                    </div>
                    <div class="venue-grid">
                        ${catPlaces.map(place => createPlaceCard(place)).join('')}
                    </div>
                </div>
            </section>
            `;
        }).join('')}

        <!-- CTA Section -->
        <section class="section section--cta" id="cta-section">
            <div class="container">
                <div class="cta-card animate-on-scroll">
                    <div class="cta-card__content">
                        <h2 class="cta-card__title">Bạn là chủ quán?</h2>
                        <p class="cta-card__text">Đăng ký địa điểm của bạn trên Thuồng Luồng Mini để tiếp cận hàng nghìn khách hàng tiềm năng tại Tuyên Quang!</p>
                        <div class="cta-card__features">
                            <div class="cta-card__feature">
                                <i data-lucide="check-circle"></i>
                                <span>Miễn phí đăng ký</span>
                            </div>
                            <div class="cta-card__feature">
                                <i data-lucide="check-circle"></i>
                                <span>Tiếp cận khách hàng</span>
                            </div>
                            <div class="cta-card__feature">
                                <i data-lucide="check-circle"></i>
                                <span>Nhận đánh giá</span>
                            </div>
                        </div>
                        <a href="https://www.facebook.com/ThuongLuongMini" target="_blank" rel="noopener" class="btn btn--primary btn--lg">
                            Liên hệ ngay
                            <i data-lucide="external-link"></i>
                        </a>
                    </div>
                    <div class="cta-card__visual">
                        <div class="cta-card__emoji">🐉</div>
                    </div>
                </div>
            </div>
        </section>
    `;
}

// ============================================
// Helper Functions
// ============================================
function getTotalReviews() {
    return PLACES.reduce((sum, p) => sum + p.totalReviews, 0);
}

function adjustColor(hex, amount) {
    // Simple color adjustment
    const num = parseInt(hex.replace('#', ''), 16);
    const r = Math.min(255, Math.max(0, (num >> 16) + amount));
    const g = Math.min(255, Math.max(0, ((num >> 8) & 0x00FF) + amount));
    const b = Math.min(255, Math.max(0, (num & 0x0000FF) + amount));
    return `#${(r << 16 | g << 8 | b).toString(16).padStart(6, '0')}`;
}

// Initialize hero search after page render
document.addEventListener('click', (e) => {
    if (e.target.id === 'hero-search-btn' || e.target.closest('#hero-search-btn')) {
        const input = document.getElementById('hero-search-input');
        if (input && input.value.trim()) {
            window.location.hash = `#/tim-kiem?q=${encodeURIComponent(input.value.trim())}`;
        }
    }
});

document.addEventListener('keydown', (e) => {
    if (e.key === 'Enter' && e.target.id === 'hero-search-input') {
        const query = e.target.value.trim();
        if (query) {
            window.location.hash = `#/tim-kiem?q=${encodeURIComponent(query)}`;
        }
    }
});
