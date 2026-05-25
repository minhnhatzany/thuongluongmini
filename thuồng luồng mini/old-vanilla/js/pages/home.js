// ============================================
// Home Page - Thuồng Luồng Mini
// ============================================

import { CATEGORIES, PLACES, getFeaturedPlaces, getTopRatedPlaces, getNewPlaces, getPlacesByCategory, getPlacesByTimeOfDay } from '../data.js';
import { ITINERARIES } from '../itinerary-data.js';
import { createPlaceCard, renderStars, adjustColor } from '../utils.js';

export function renderHomePage() {
    const featured = getFeaturedPlaces();
    const topRated = getTopRatedPlaces(8);
    const newPlaces = getNewPlaces(4);
    const timeSuggested = getPlacesByTimeOfDay(6);
    
    return `
        <!-- Hero Section (TripAdvisor Style) -->
        <section class="hero" id="hero-section">
            <div class="hero__bg"></div>
            <div class="hero__content container">
                <div class="hero__text animate-on-scroll">
                    <h1 class="hero__title">
                        Tuyên Quang, <br/> bạn muốn đi đâu?
                    </h1>
                    
                    <div class="hero__search">
                        <div class="hero__tags">
                            <a href="#/tim-kiem?q=Tất cả" class="hero__tag active">
                                <i data-lucide="globe"></i> Khám phá
                            </a>
                            <a href="#/danh-muc/an-uong" class="hero__tag">
                                <i data-lucide="utensils"></i> Ăn uống
                            </a>
                            <a href="#/danh-muc/vui-choi" class="hero__tag">
                                <i data-lucide="music"></i> Vui chơi
                            </a>
                            <a href="#/danh-muc/du-lich" class="hero__tag">
                                <i data-lucide="camera"></i> Du lịch
                            </a>
                            <a href="#/danh-muc/luu-tru" class="hero__tag">
                                <i data-lucide="bed"></i> Lưu trú
                            </a>
                        </div>
                        
                        <div class="search-bar search-bar--lg" style="margin-top: 16px;">
                            <i data-lucide="search" class="search-bar__icon"></i>
                            <input type="text" class="search-bar__input" id="hero-search-input"
                                   placeholder="Thử tìm 'Bún cá', 'Na Hang' hay 'Quán nhậu'...">
                            <button class="btn btn--primary" id="hero-search-btn" style="position: absolute; right: 6px; top: 6px; bottom: 6px; border-radius: var(--radius-full); padding: 0 var(--space-6); font-weight: var(--weight-bold);">
                                Tìm kiếm
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </section>

        <!-- Khám phá theo danh mục -->
        <section class="section section--categories" id="categories-section" style="padding-top: var(--space-4);">
            <div class="container">
                <div class="categories-grid categories-grid--compact scroller">
                    ${CATEGORIES.map((cat, index) => `
                        <a href="#/danh-muc/${cat.id}" class="category-card animate-on-scroll" style="--delay: ${index * 0.1}s; min-width: 140px;">
                            <div class="category-card__icon" style="background: linear-gradient(135deg, ${cat.color}, ${adjustColor(cat.color, -20)})">
                                <span>${cat.icon}</span>
                            </div>
                            <h3 class="category-card__name">${cat.name}</h3>
                        </a>
                    `).join('')}
                </div>
            </div>
        </section>

        <!-- Gợi ý theo giờ sinh học (Smart UX) -->
        ${timeSuggested.places.length > 0 ? `
        <section class="section" id="time-suggest-section" style="background: var(--color-bg-secondary);">
            <div class="container">
                <div class="section__header animate-on-scroll">
                    <div>
                        <h2 class="section__title">${timeSuggested.timeOfDay === 'day' ? '☀️' : '🌙'} ${timeSuggested.greeting}</h2>
                        <p class="section__subtitle">Gợi ý hoàn hảo cho thời điểm này trong ngày</p>
                    </div>
                </div>
                <div class="scroller">
                    ${timeSuggested.places.map(place => createPlaceCard(place)).join('')}
                </div>
            </div>
        </section>
        ` : ''}

        <!-- Top Rated Section -->
        <section class="section section--top-rated" id="top-rated-section">
            <div class="container">
                <div class="section__header animate-on-scroll">
                    <div>
                        <h2 class="section__title">🏆 Đánh giá cao nhất</h2>
                        <p class="section__subtitle">Được cộng đồng Thuồng Luồng tin tưởng</p>
                    </div>
                    <a href="#/danh-muc/an-uong" class="section__see-all">
                        Xem tất cả <i data-lucide="arrow-right"></i>
                    </a>
                </div>
                <div class="scroller">
                    ${topRated.map(place => createPlaceCard(place)).join('')}
                </div>
            </div>
        </section>

        <!-- Itineraries Section -->
        <section class="section section--itineraries" id="itineraries-section" style="background: var(--color-bg-tertiary);">
            <div class="container">
                <div class="section__header animate-on-scroll">
                    <div>
                        <h2 class="section__title">🗺️ Gợi ý lộ trình</h2>
                        <p class="section__subtitle">Không biết đi đâu? Để chúng mình lo!</p>
                    </div>
                    <a href="#/lo-trinh" class="section__see-all">
                        Xem tất cả lộ trình <i data-lucide="arrow-right"></i>
                    </a>
                </div>
                <div class="scroller" style="margin-bottom: var(--space-6);">
                    ${ITINERARIES.slice(0, 3).map(it => `
                        <a href="#/lo-trinh/${it.id}" class="card animate-on-scroll" style="text-decoration: none; min-width: 280px;">
                            <div class="card__image-wrapper" style="padding-bottom: 56.25%;">
                                <img src="${it.image}" alt="${it.title}" loading="lazy" class="card__image" style="object-fit: cover; width: 100%; height: 100%; position: absolute; top: 0; left: 0;">
                                <div class="card__badges" style="position: absolute; top: 10px; left: 10px;">
                                    <span class="badge" style="background: var(--color-primary); color: white;">${it.duration}</span>
                                </div>
                            </div>
                            <div class="card__content" style="padding: var(--space-4);">
                                <h3 class="card__title" style="font-size: 1.1rem; margin-bottom: var(--space-2); color: var(--color-text-heading);">${it.title}</h3>
                                <p style="color: var(--color-text-secondary); font-size: 0.9rem; margin-bottom: var(--space-3); line-height: 1.4;">${it.shortDesc}</p>
                                <div style="display: flex; justify-content: space-between; align-items: center; border-top: 1px solid var(--color-border-light); padding-top: var(--space-3); font-size: 0.85rem; color: var(--color-text);">
                                    <span style="display: flex; align-items: center; gap: 4px;"><i data-lucide="map" style="width: 14px; height: 14px;"></i> ${it.distance}</span>
                                    <span style="display: flex; align-items: center; gap: 4px; font-weight: 600; color: var(--color-primary);"><i data-lucide="wallet" style="width: 14px; height: 14px;"></i> ${it.costEstimate.split('/')[0]}</span>
                                </div>
                            </div>
                        </a>
                    `).join('')}
                </div>
                <div style="text-align: center;">
                    <a href="#/tao-lo-trinh" class="btn btn--primary btn--lg animate-on-scroll" style="border-radius: var(--radius-full); box-shadow: var(--shadow-md);">
                        <i data-lucide="wand-2"></i> Trải nghiệm Tạo Lịch Trình Tự Động
                    </a>
                </div>
            </div>
        </section>

        <!-- Mới cập nhật -->
        ${newPlaces.length > 0 ? `
        <section class="section section--new" id="new-section">
            <div class="container">
                <div class="section__header animate-on-scroll">
                    <div>
                        <h2 class="section__title">🆕 Địa điểm mới tinh</h2>
                        <p class="section__subtitle">Khám phá những nơi vừa được cộng đồng khai phá</p>
                    </div>
                </div>
                <div class="scroller">
                    ${newPlaces.map(place => createPlaceCard(place)).join('')}
                </div>
            </div>
        </section>
        ` : ''}

        <!-- CTA Section -->
        <section class="section section--cta" id="cta-section" style="background: var(--color-bg-secondary);">
            <div class="container">
                <div class="cta-card animate-on-scroll" style="background: linear-gradient(135deg, #FDDCB5 0%, #F4A261 100%); padding: var(--space-8); border-radius: var(--radius-2xl); text-align: center; box-shadow: var(--shadow-lg);">
                    <div class="cta-card__content">
                        <h2 class="cta-card__title" style="color: #1F2937; margin-bottom: var(--space-2); font-size: var(--text-3xl); font-weight: var(--weight-black);">Bạn là chủ quán? 🐉</h2>
                        <p class="cta-card__text" style="color: #374151; margin-bottom: var(--space-6); font-size: var(--text-lg); max-width: 600px; margin-left: auto; margin-right: auto;">Đăng ký địa điểm của bạn trên Thuồng Luồng Mini để tiếp cận hàng nghìn khách hàng tiềm năng tại Tuyên Quang!</p>
                        <a href="https://www.facebook.com/ThuongLuongMini" target="_blank" rel="noopener" class="btn btn--primary btn--lg" style="background: #1F2937; color: #FFF; box-shadow: 0 4px 12px rgba(0,0,0,0.1);">
                            Liên hệ thêm quán miễn phí
                            <i data-lucide="arrow-right"></i>
                        </a>
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
    return PLACES.reduce((sum, p) => sum + (p.totalReviews || 0), 0);
}
