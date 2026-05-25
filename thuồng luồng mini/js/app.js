// ============================================
// Thuồng Luồng Mini - Main Application
// Cloudflare Pages version - Pure hash routing
// ============================================

import { CATEGORIES, PLACES, getPlacesByCategory, getPlaceById, getFeaturedPlaces, getTopRatedPlaces, searchPlaces, getRelatedPlaces, getNewPlaces } from './data.js';
import { createPlaceCard, renderStars, showToast, escapeHtml, formatChatReply } from './utils.js';
import { renderHomePage } from './pages/home.js';
import { renderCategoryPage } from './pages/category.js';
import { renderDetailPage } from './pages/detail.js';
import { renderSearchPage } from './pages/search.js';
import { renderItineraryList, renderItineraryDetail } from './pages/itinerary.js';
import { renderAdminPage } from './pages/admin.js';
import { renderProfilePage } from './pages/profile.js';
import { initAuth } from './auth.js';
import { destroyActiveMaps, initCategoryMap, initPointMap } from './map.js';
import { saveFavoritesToCloud } from './favorites-sync.js';

// ============================================
// Global State
// ============================================
function loadFavoritesFromStorage() {
    try {
        return JSON.parse(localStorage.getItem('tlm_favorites') || '[]');
    } catch {
        return [];
    }
}

const state = {
    currentPage: 'home',
    favorites: loadFavoritesFromStorage(),
    searchQuery: '',
    scrollPositions: {}
};

function normalizeFavId(id) {
    const n = Number(id);
    return Number.isNaN(n) ? String(id) : n;
}

function favIncludes(list, placeId) {
    const target = normalizeFavId(placeId);
    return list.some(id => normalizeFavId(id) === target);
}

window.tlmApplyFavorites = function(ids) {
    state.favorites = ids || [];
    updateFavCount();
    document.querySelectorAll('[data-place-id]').forEach(card => {
        const pid = card.dataset.placeId;
        const btn = card.querySelector('.card__fav-btn');
        if (btn) btn.classList.toggle('active', favIncludes(state.favorites, pid));
    });
};

function persistFavorites() {
    localStorage.setItem('tlm_favorites', JSON.stringify(state.favorites));
    if (window.currentUser?.uid) {
        saveFavoritesToCloud(window.currentUser.uid, state.favorites);
    }
}

// ============================================
// Router - Pure Hash Routing
// ============================================
function getRoute() {
    const hash = window.location.hash;
    if (hash && hash.startsWith('#/')) {
        return hash.slice(1);
    }
    return '/';
}

function parseRoute(path) {
    const [route, queryString] = path.split('?');
    const params = {};
    
    if (queryString) {
        queryString.split('&').forEach(param => {
            const [key, value] = param.split('=');
            params[key] = decodeURIComponent(value || '');
        });
    }
    
    if (route === '/' || route === '') return { page: 'home', params };
    
    const categoryMatch = route.match(/^\/danh-muc\/([a-z-]+)$/);
    if (categoryMatch) return { page: 'category', categoryId: categoryMatch[1], params };
    
    const detailMatch = route.match(/^\/dia-diem\/([^/]+)(?:\/([a-z0-9-]+))?$/);
    if (detailMatch) {
        const rawId = detailMatch[1];
        const placeId = /^\d+$/.test(rawId) ? parseInt(rawId, 10) : rawId;
        return { page: 'detail', placeId, slug: detailMatch[2], params };
    }
    
    if (route === '/tim-kiem') return { page: 'search', params };
    if (route === '/lo-trinh') return { page: 'itineraryList', params };
    
    const itineraryMatch = route.match(/^\/lo-trinh\/([a-z0-9-]+)$/);
    if (itineraryMatch) return { page: 'itineraryDetail', id: itineraryMatch[1], params };
    
    if (route === '/yeu-thich') return { page: 'favorites', params };
    if (route === '/admin') return { page: 'admin', params };
    if (route === '/ho-so') return { page: 'profile', params };
    
    return { page: '404', params };
}

async function navigateTo(route) {
    state.scrollPositions[state.currentPage] = window.scrollY;
    
    const parsed = parseRoute(route);
    state.currentPage = parsed.page;
    
    const mainContent = document.getElementById('main-content');
    const footer = document.getElementById('main-footer');
    
    mainContent.classList.add('page-transitioning');
    await new Promise(resolve => setTimeout(resolve, 150));
    destroyActiveMaps();
    window.scrollTo({ top: 0, behavior: 'instant' });
    
    try {
        switch (parsed.page) {
            case 'home':        mainContent.innerHTML = renderHomePage(); break;
            case 'category':    mainContent.innerHTML = renderCategoryPage(parsed.categoryId); break;
            case 'detail':      mainContent.innerHTML = renderDetailPage(parsed.placeId); break;
            case 'search':      mainContent.innerHTML = renderSearchPage(parsed.params.q || ''); break;
            case 'favorites':   mainContent.innerHTML = renderFavoritesPage(); break;
            case 'itineraryList':   mainContent.innerHTML = renderItineraryList(); break;
            case 'itineraryDetail': mainContent.innerHTML = renderItineraryDetail(parsed.id); break;
            case 'admin':       mainContent.innerHTML = renderAdminPage(); break;
            case 'profile':
                mainContent.innerHTML = renderProfilePage();
                import('./pages/profile.js').then(m => m.initProfilePage?.());
                break;
            default:            mainContent.innerHTML = render404Page();
        }
    } catch (err) {
        console.error('Page render error:', err);
        mainContent.innerHTML = `
            <div class="page-container"><div class="container">
                <div class="empty-state" style="min-height:60vh">
                    <div class="empty-state__icon">⚠️</div>
                    <h2>Lỗi tải trang</h2>
                    <p style="color:red;font-size:0.85rem;max-width:600px;word-break:break-all">${escapeHtml(err.message)}</p>
                    <a href="#/" class="btn btn--primary" style="margin-top:20px">Về trang chủ</a>
                </div>
            </div></div>`;
    }
    
    if (footer) footer.style.display = parsed.page === 'admin' ? 'none' : '';
    
    requestAnimationFrame(() => {
        mainContent.classList.remove('page-transitioning');
        initPageComponents();
        updateActiveNav(parsed);
        injectSEO(parsed);
        if (window.lucide) window.lucide.createIcons();
    });
}

// ============================================
// Favorites Page
// ============================================
function renderFavoritesPage() {
    const favPlaces = state.favorites.map(id => getPlaceById(id)).filter(Boolean);
    return `
        <div class="page-container"><div class="container">
            <div class="page-header">
                <h1 class="page-title">💛 Địa điểm yêu thích</h1>
                <p class="page-subtitle">${favPlaces.length} địa điểm đã lưu</p>
            </div>
            ${favPlaces.length === 0 ? `
                <div class="empty-state">
                    <div class="empty-state__icon">💛</div>
                    <h3 class="empty-state__title">Chưa có địa điểm yêu thích</h3>
                    <p class="empty-state__text">Nhấn vào biểu tượng trái tim trên các địa điểm để lưu lại nhé!</p>
                    <a href="#/" class="btn btn--primary">Khám phá ngay</a>
                </div>
            ` : `<div class="venue-grid">${favPlaces.map(p => createPlaceCard(p)).join('')}</div>`}
        </div></div>`;
}

// ============================================
// 404 Page
// ============================================
function render404Page() {
    return `
        <div class="page-container"><div class="container">
            <div class="empty-state" style="min-height: 60vh;">
                <div class="empty-state__icon">🐉</div>
                <h2 class="empty-state__title">Oops! Trang không tồn tại</h2>
                <p class="empty-state__text">Thuồng Luồng không tìm thấy trang bạn đang tìm kiếm</p>
                <a href="#/" class="btn btn--primary">Về trang chủ</a>
            </div>
        </div></div>`;
}

// ============================================
// Global Functions
// ============================================
window.toggleFavorite = function(placeId, btnEl) {
    const normalized = normalizeFavId(placeId);
    const idx = state.favorites.findIndex(id => normalizeFavId(id) === normalized);
    if (idx === -1) {
        state.favorites.push(normalized);
        if (btnEl) { btnEl.classList.add('active', 'pulse'); setTimeout(() => btnEl.classList.remove('pulse'), 600); }
        showToast('Đã thêm vào yêu thích! 💛', 'success');
    } else {
        state.favorites.splice(idx, 1);
        if (btnEl) btnEl.classList.remove('active');
        showToast('Đã bỏ yêu thích', 'info');
    }
    persistFavorites();
    document.querySelectorAll(`[data-place-id="${placeId}"] .card__fav-btn`).forEach(btn => {
        favIncludes(state.favorites, placeId) ? btn.classList.add('active') : btn.classList.remove('active');
    });
    updateFavCount();
};

window.isFavorite = function(placeId) { return favIncludes(state.favorites, placeId); };
window.showToast = showToast;

function updateFavCount() {
    const badge = document.querySelector('#mob-nav-favs .mobile-bottom-nav__badge');
    if (state.favorites.length > 0) {
        if (badge) { badge.textContent = state.favorites.length; }
        else {
            const navItem = document.getElementById('mob-nav-favs');
            if (navItem) {
                const badgeEl = document.createElement('span');
                badgeEl.className = 'mobile-bottom-nav__badge';
                badgeEl.textContent = state.favorites.length;
                navItem.appendChild(badgeEl);
            }
        }
    } else { if (badge) badge.remove(); }
}

// ============================================
// Navigation Helpers
// ============================================
function updateActiveNav(parsed) {
    document.querySelectorAll('.nav__link').forEach(link => {
        link.classList.remove('active');
        if (parsed.page === 'home' && link.dataset.page === 'home') link.classList.add('active');
        if (parsed.page === 'category' && link.dataset.category === parsed.categoryId) link.classList.add('active');
        if (parsed.page === 'itineraryList' && link.dataset.page === 'itineraryList') link.classList.add('active');
    });
    document.querySelectorAll('.mobile-menu__link').forEach(link => {
        link.classList.remove('active');
        if (parsed.page === 'home' && link.dataset.page === 'home') link.classList.add('active');
        if (parsed.page === 'category' && link.dataset.category === parsed.categoryId) link.classList.add('active');
    });
    if (parsed.page === 'home') document.getElementById('mob-nav-home')?.classList.add('active');
    else if (['category','detail'].includes(parsed.page)) document.getElementById('mob-nav-explore')?.classList.add('active');
    else if (parsed.page === 'search') document.getElementById('mob-nav-search')?.classList.add('active');
    else if (parsed.page === 'favorites') document.getElementById('mob-nav-favs')?.classList.add('active');
}

// ============================================
// SEO - Comprehensive Meta & Structured Data
// ============================================
function injectSEO(parsed) {
    const BASE_URL = 'https://thuongluongmini.pages.dev';
    
    let title = 'Thuồng Luồng Mini - Khám phá Tuyên Quang';
    let description = 'Review địa điểm ăn uống, vui chơi, du lịch tại Tuyên Quang. Lộ trình, bản đồ, đánh giá thật từ cộng đồng — dù bạn ở trong hay ngoài tỉnh.';
    let image = 'https://thuongluongmini.pages.dev/assets/logo.jpg';
    let canonical = BASE_URL + '/';
    let keywords = 'Tuyên Quang, review, ăn uống, du lịch, Na Hang, Thác Bà, lộ trình, ẩm thực Tuyên Quang';
    let jsonLd = null;
    let breadcrumb = null;

    if (parsed.page === 'detail' && parsed.placeId) {
        const place = getPlaceById(parsed.placeId);
        if (place) {
            const cat = CATEGORIES.find(c => c.id === place.category);
            title = `${place.name} - Review, Đánh giá & Trải nghiệm | Thuồng Luồng Mini`;
            description = `${place.name} - ${place.description} ${place.address ? '📍 ' + place.address : ''}. ⭐ ${place.rating}/5 (${place.totalReviews} đánh giá). Xem review thật từ cộng đồng Tuyên Quang.`;
            image = (place.images && place.images[0]) ? place.images[0] : image;
            canonical = `${BASE_URL}/#/dia-diem/${place.id}/${place.slug || ''}`;
            keywords = `${place.name}, ${place.subCategory}, Tuyên Quang, review ${place.name}, ${cat ? cat.name : ''} Tuyên Quang`;
            
            jsonLd = {
                "@context": "https://schema.org",
                "@type": "LocalBusiness",
                "name": place.name,
                "description": place.description,
                "image": image,
                "url": canonical,
                "telephone": place.phone || '',
                "priceRange": place.priceRange || '',
                "address": {
                    "@type": "PostalAddress",
                    "streetAddress": place.address || '',
                    "addressLocality": "Tuyên Quang",
                    "addressRegion": "Tuyên Quang",
                    "addressCountry": "VN"
                },
                "aggregateRating": {
                    "@type": "AggregateRating",
                    "ratingValue": place.rating || 0,
                    "reviewCount": place.totalReviews || 0,
                    "bestRating": 5
                },
                "geo": place.coordinates ? {
                    "@type": "GeoCoordinates",
                    "latitude": place.coordinates.lat,
                    "longitude": place.coordinates.lng
                } : undefined
            };
            
            breadcrumb = {
                "@context": "https://schema.org",
                "@type": "BreadcrumbList",
                "itemListElement": [
                    { "@type": "ListItem", "position": 1, "name": "Trang chủ", "item": BASE_URL + "/" },
                    { "@type": "ListItem", "position": 2, "name": cat ? cat.name : "Danh mục", "item": BASE_URL + "/#/danh-muc/" + place.category },
                    { "@type": "ListItem", "position": 3, "name": place.name, "item": canonical }
                ]
            };
        }
    } else if (parsed.page === 'category' && parsed.categoryId) {
        const cat = CATEGORIES.find(c => c.id === parsed.categoryId);
        if (cat) {
            title = `${cat.name} Tuyên Quang - Danh sách địa điểm ${cat.name.toLowerCase()} | Thuồng Luồng Mini`;
            description = `Khám phá ${getPlacesByCategory(parsed.categoryId).length} địa điểm ${cat.name.toLowerCase()} tại Tuyên Quang. ${cat.description}`;
            canonical = `${BASE_URL}/#/danh-muc/${parsed.categoryId}`;
            keywords = `${cat.name} Tuyên Quang, địa điểm ${cat.name.toLowerCase()}, ${cat.name} ngon Tuyên Quang`;
            
            breadcrumb = {
                "@context": "https://schema.org",
                "@type": "BreadcrumbList",
                "itemListElement": [
                    { "@type": "ListItem", "position": 1, "name": "Trang chủ", "item": BASE_URL + "/" },
                    { "@type": "ListItem", "position": 2, "name": cat.name, "item": canonical }
                ]
            };
        }
    } else if (parsed.page === 'search' && parsed.params?.q) {
        const q = parsed.params.q;
        title = `Tìm kiếm "${q}" tại Tuyên Quang - Kết quả | Thuồng Luồng Mini`;
        description = `Tìm thấy các địa điểm phù hợp với "${q}" tại Tuyên Quang. Khám phá review, đánh giá và địa chỉ chính xác.`;
        canonical = `${BASE_URL}/#/tim-kiem?q=${encodeURIComponent(q)}`;
        keywords = `${q} Tuyên Quang, tìm ${q}, ${q} ở đâu Tuyên Quang`;
    } else if (parsed.page === 'itineraryList') {
        title = 'Lộ trình du lịch Tuyên Quang - Gợi ý hành trình | Thuồng Luồng Mini';
        description = 'Khám phá các lộ trình du lịch Tuyên Quang chi tiết: Na Hang, Thác Bà, Làng Văn hóa... Lịch trình, chi phí, khoảng cách.';
        canonical = `${BASE_URL}/#/lo-trinh`;
        keywords = 'lộ trình Tuyên Quang, du lịch Tuyên Quang, itinerary Tuyên Quang, Na Hang itinerary';
    } else if (parsed.page === 'favorites') {
        title = 'Địa điểm yêu thích - Thuồng Luồng Mini';
        description = 'Danh sách địa điểm yêu thích của bạn tại Tuyên Quang.';
        canonical = `${BASE_URL}/#/yeu-thich`;
    }

    // Update document title
    document.title = title;
    
    // Update canonical
    let linkEl = document.querySelector('link[rel="canonical"]');
    if (!linkEl) {
        linkEl = document.createElement('link');
        linkEl.setAttribute('rel', 'canonical');
        document.head.appendChild(linkEl);
    }
    linkEl.setAttribute('href', canonical);

    // Update meta tags
    const setMeta = (name, content, isProperty = false) => {
        if (!content) return;
        let meta = document.querySelector(`meta[${isProperty ? 'property' : 'name'}="${name}"]`);
        if (!meta) {
            meta = document.createElement('meta');
            if (isProperty) meta.setAttribute('property', name);
            else meta.setAttribute('name', name);
            document.head.appendChild(meta);
        }
        meta.setAttribute('content', content);
    };
    
    setMeta('description', description);
    setMeta('keywords', keywords);
    setMeta('og:title', title, true);
    setMeta('og:description', description, true);
    setMeta('og:image', image, true);
    setMeta('og:url', canonical, true);
    setMeta('twitter:title', title);
    setMeta('twitter:description', description);
    setMeta('twitter:image', image);

    // Update JSON-LD
    let script = document.getElementById('json-ld');
    if (!script) {
        script = document.createElement('script');
        script.id = 'json-ld';
        script.type = 'application/ld+json';
        document.head.appendChild(script);
    }
    
    const schemas = [];
    // Always include WebSite schema
    schemas.push({
        "@context": "https://schema.org",
        "@type": "WebSite",
        "name": "Thuồng Luồng Mini",
        "url": BASE_URL,
        "description": "Nền tảng review địa phương số 1 Tuyên Quang",
        "inLanguage": "vi-VN",
        "potentialAction": {
            "@type": "SearchAction",
            "target": BASE_URL + "/#/tim-kiem?q={search_term_string}",
            "query-input": "required name=search_term_string"
        }
    });
    
    if (jsonLd) schemas.push(jsonLd);
    if (breadcrumb) schemas.push(breadcrumb);
    
    script.textContent = JSON.stringify(schemas.length === 1 ? schemas[0] : schemas);
}

// ============================================
// Header Scroll
// ============================================
function initHeaderScroll() {
    let lastScroll = 0;
    window.addEventListener('scroll', () => {
        const header = document.getElementById('main-header');
        if (!header) return;
        const currentScroll = window.scrollY;
        header.classList.toggle('scrolled', currentScroll > 50);
        header.classList.toggle('hidden', currentScroll > lastScroll && currentScroll > 200);
        lastScroll = currentScroll;
    }, { passive: true });
}

// ============================================
// Search
// ============================================
function initSearch() {
    const input = document.getElementById('search-input');
    const clear = document.getElementById('search-clear');
    const resultsContainer = document.getElementById('search-results-container');
    const results = document.getElementById('search-results');
    
    clear?.addEventListener('click', () => { if(input) input.value = ''; if(resultsContainer) resultsContainer.style.display = 'none'; input?.focus(); });
    document.addEventListener('keydown', (e) => { if (e.key === 'Escape' && resultsContainer) resultsContainer.style.display = 'none'; });
    document.addEventListener('click', (e) => { if (!e.target.closest('.header__search') && resultsContainer) resultsContainer.style.display = 'none'; });
    
    let searchTimeout;
    input?.addEventListener('input', () => {
        clearTimeout(searchTimeout);
        const query = input.value.trim();
        if (query.length < 2) { if(resultsContainer) resultsContainer.style.display = 'none'; return; }
        
        searchTimeout = setTimeout(() => {
            const found = searchPlaces(query).slice(0, 6);
            if (!results) return;
            const safeQuery = escapeHtml(query);
            if (found.length === 0) {
                results.innerHTML = `<div style="padding:12px;color:var(--text-muted)">Không tìm thấy kết quả cho "${safeQuery}"</div>`;
            } else {
                results.innerHTML = found.map(place => {
                    const cat = CATEGORIES.find(c => c.id === place.category);
                    return `<a href="#/dia-diem/${place.id}/${place.slug}" style="display:flex;align-items:center;gap:12px;padding:10px;text-decoration:none;color:inherit;border-radius:8px;">
                        <div style="width:36px;height:36px;border-radius:8px;background:${cat ? cat.color : '#F4A261'};display:flex;align-items:center;justify-content:center;font-size:1.2rem;flex-shrink:0;">${cat ? cat.icon : '📍'}</div>
                        <div><div style="font-weight:600;font-size:0.9rem">${escapeHtml(place.name)}</div><div style="color:var(--text-muted);font-size:0.8rem">${escapeHtml(place.subCategory)} · ${place.rating.toFixed(1)} ★</div></div>
                    </a>`;
                }).join('') + `<a href="#/tim-kiem?q=${encodeURIComponent(query)}" style="display:block;padding:10px;text-align:center;color:var(--color-primary);font-weight:600;font-size:0.9rem;border-top:1px solid var(--border-color);margin-top:4px">Xem tất cả kết quả →</a>`;
            }
            if(resultsContainer) resultsContainer.style.display = 'block';
        }, 200);
    });
    
    input?.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' && input.value.trim()) {
            window.location.hash = `#/tim-kiem?q=${encodeURIComponent(input.value.trim())}`;
            if(resultsContainer) resultsContainer.style.display = 'none';
        }
    });
}

// ============================================
// Mobile Menu
// ============================================
function initMobileMenu() {
    const menuToggle = document.getElementById('menu-toggle');
    const sidebar = document.getElementById('mobile-sidebar');
    const overlay = document.getElementById('mobile-overlay');
    const closeBtn = document.getElementById('sidebar-close');
    
    const openMenu = () => { sidebar?.classList.add('active'); overlay?.classList.add('active'); document.body.style.overflow = 'hidden'; };
    const closeMenu = () => { sidebar?.classList.remove('active'); overlay?.classList.remove('active'); document.body.style.overflow = ''; };
    
    menuToggle?.addEventListener('click', openMenu);
    closeBtn?.addEventListener('click', closeMenu);
    overlay?.addEventListener('click', closeMenu);
    sidebar?.querySelectorAll('a').forEach(link => link.addEventListener('click', closeMenu));
}

// ============================================
// Back to Top
// ============================================
function initBackToTop() {
    const btn = document.getElementById('back-to-top');
    window.addEventListener('scroll', () => btn?.classList.toggle('visible', window.scrollY > 500), { passive: true });
    btn?.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));
}

// ============================================
// Scroll Animations
// ============================================
function initScrollAnimations() {
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => { if (entry.isIntersecting) { entry.target.classList.add('visible'); observer.unobserve(entry.target); } });
    }, { threshold: 0.1, rootMargin: '0px 0px -50px 0px' });
    document.querySelectorAll('.animate-on-scroll').forEach(el => observer.observe(el));
}

function initPageComponents() {
    initScrollAnimations();
    updateFavCount();
    initMapsOnPage();
    initCarousels();
}

// ============================================
// Maps
// ============================================
function initMapsOnPage() {
    const categoryMapEl = document.querySelector('[data-category-map]');
    if (categoryMapEl) {
        initCategoryMap(categoryMapEl);
    }

    document.querySelectorAll('[data-map]').forEach(mapEl => {
        const lat = parseFloat(mapEl.dataset.lat);
        const lng = parseFloat(mapEl.dataset.lng);
        const name = mapEl.dataset.name || '';
        if (isNaN(lat) || isNaN(lng)) return;
        initPointMap(mapEl, lat, lng, name);
    });
}

// ============================================
// Carousel
// ============================================
function initCarousels() {
    document.querySelectorAll('.carousel:not([data-carousel-init])').forEach(carousel => {
        carousel.dataset.carouselInit = 'true';
        const track = carousel.querySelector('.carousel__track');
        const prevBtn = carousel.querySelector('.carousel__prev');
        const nextBtn = carousel.querySelector('.carousel__next');
        const dots = carousel.querySelector('.carousel__dots');
        if (!track) return;
        const items = track.children;
        const itemWidth = items[0]?.offsetWidth || 300;
        let currentIndex = 0;
        
        if (dots) {
            for (let i = 0; i < items.length; i++) {
                const dot = document.createElement('button');
                dot.className = `carousel__dot ${i === 0 ? 'active' : ''}`;
                dot.addEventListener('click', () => goToSlide(i));
                dots.appendChild(dot);
            }
        }
        const updateDots = () => dots?.querySelectorAll('.carousel__dot').forEach((dot, i) => dot.classList.toggle('active', i === currentIndex));
        function goToSlide(index) { currentIndex = index; track.scrollTo({ left: index * (itemWidth + 16), behavior: 'smooth' }); updateDots(); }
        prevBtn?.addEventListener('click', () => { if (currentIndex > 0) goToSlide(currentIndex - 1); });
        nextBtn?.addEventListener('click', () => { if (currentIndex < items.length - 1) goToSlide(currentIndex + 1); });
        track.addEventListener('scroll', () => { const n = Math.round(track.scrollLeft / (itemWidth + 16)); if (n !== currentIndex) { currentIndex = n; updateDots(); } }, { passive: true });
    });
}

// ============================================
// Global delegated events (bind once)
// ============================================
let globalEventsInitialized = false;

function initGlobalDelegatedEvents() {
    if (globalEventsInitialized) return;
    globalEventsInitialized = true;

    document.addEventListener('click', (e) => {
        if (e.target.closest('#hero-search-btn')) {
            const input = document.getElementById('hero-search-input');
            const query = input?.value.trim();
            if (query) {
                window.location.hash = `#/tim-kiem?q=${encodeURIComponent(query)}`;
            }
        }
    });

    document.addEventListener('keydown', (e) => {
        if (e.key !== 'Enter') return;
        const target = e.target;
        if (!(target instanceof HTMLInputElement)) return;

        const query = target.value.trim();
        if (!query) return;

        if (target.id === 'hero-search-input' || target.id === 'page-search-input') {
            window.location.hash = `#/tim-kiem?q=${encodeURIComponent(query)}`;
        }
        if (target.id === 'chatbot-input-field') {
            window.sendChatMessage();
        }
    });
}

// ============================================
// Init App
// ============================================
async function init() {
    if (window.lucide) window.lucide.createIcons();
    initAuth();
    
    try {
        const { database } = await import('./firebase-config.js');
        const { ref, get } = await import("https://www.gstatic.com/firebasejs/10.12.2/firebase-database.js");
        const snapshot = await get(ref(database, 'places'));
        if (snapshot.exists()) {
            const firebaseData = snapshot.val();
            // Firebase might return an array or object
            let rawArray = Array.isArray(firebaseData) ? firebaseData : Object.values(firebaseData);
            // Strictly filter out nulls or invalid places that don't even have an ID
            rawArray = rawArray.filter(p => p && p.id && p.category);
            
            if (rawArray.length > 0) {
                const placesArray = rawArray.map(p => ({
                    ...p,
                    rating: p.rating || 0,
                    totalReviews: p.totalReviews || 0,
                    reviews: p.reviews ? (Array.isArray(p.reviews) ? p.reviews : Object.values(p.reviews)) : [],
                    images: p.images || [],
                    imageColors: p.imageColors || ['#F4A261', '#E76F51'],
                    tags: p.tags || [],
                    amenities: p.amenities || [],
                    coordinates: p.coordinates || { lat: 21.82, lng: 105.21 },
                    social: p.social || {},
                    priceRange: p.priceRange || '$',
                    isOpen: p.isOpen !== false,
                }));
                const { setPlaces } = await import('./data.js');
                setPlaces(placesArray);
                console.log("✅ Loaded " + placesArray.length + " places from Firebase");
            } else {
                console.log("📦 Firebase places empty, using static data");
            }
        }
    } catch(e) {
        console.log("📦 Using static data:", e.message);
    }

    initChatbot();
    navigateTo(getRoute());
    
    // Pure hash routing
    window.addEventListener('hashchange', () => navigateTo(getRoute()));
    
    initGlobalDelegatedEvents();
    initHeaderScroll();
    initSearch();
    initMobileMenu();
    initBackToTop();
    registerServiceWorker();
    
    console.log('🐉 Thuồng Luồng Mini đã sẵn sàng!');
}

function registerServiceWorker() {
    if (!('serviceWorker' in navigator)) return;
    navigator.serviceWorker.register('/sw.js').catch(err => {
        console.warn('Service worker:', err.message);
    });
}

// ============================================
// Chatbot
// ============================================
function initChatbot() {
    document.body.insertAdjacentHTML('beforeend', `
        <div class="chatbot-widget">
            <div class="chatbot-window" id="chatbot-window">
                <div class="chatbot-header">
                    <div class="chatbot-header__info">
                        <div class="chatbot-header__avatar">🦕</div>
                        <div>
                            <h3 class="chatbot-header__title">Bé Thuồng Luồng</h3>
                            <span class="chatbot-header__status">Trợ lý du lịch ảo</span>
                        </div>
                    </div>
                    <button class="chatbot-close" onclick="window.toggleChatbot()"><i data-lucide="x"></i></button>
                </div>
                <div class="chatbot-messages" id="chatbot-messages">
                    <div class="chat-msg chat-msg--ai">
                        <p>Chào sếp! Em là Bé Thuồng Luồng, trợ lý ảo rành rọt mọi ngóc ngách của Tuyên Quang đây! Cứ hỏi em nhé! ✨</p>
                        <span class="chat-msg__time">Vừa xong</span>
                    </div>
                </div>
                <div class="chatbot-input">
                    <input type="text" id="chatbot-input-field" placeholder="Nhập câu hỏi của bạn..." autocomplete="off">
                    <button onclick="window.sendChatMessage()" id="chatbot-send-btn"><i data-lucide="send"></i></button>
                </div>
            </div>
            <button class="chatbot-toggle" onclick="window.toggleChatbot()" id="chatbot-toggle-btn">
                <i data-lucide="message-circle"></i>
            </button>
        </div>
    `);
    if (window.lucide) window.lucide.createIcons();
}

window.chatHistory = [];

window.toggleChatbot = function() {
    const win = document.getElementById('chatbot-window');
    const icon = document.querySelector('#chatbot-toggle-btn i');
    const isOpen = win.classList.toggle('active');
    icon.setAttribute('data-lucide', isOpen ? 'x' : 'message-circle');
    if (isOpen) document.getElementById('chatbot-input-field').focus();
    if (window.lucide) window.lucide.createIcons();
};

window.sendChatMessage = async function() {
    const input = document.getElementById('chatbot-input-field');
    const msg = input.value.trim();
    if (!msg) return;
    input.value = '';
    appendMessage('user', msg);
    const messagesDiv = document.getElementById('chatbot-messages');
    messagesDiv.insertAdjacentHTML('beforeend', `<div class="chat-typing" id="chat-typing"><span></span><span></span><span></span></div>`);
    messagesDiv.scrollTop = messagesDiv.scrollHeight;
    
    const contextData = PLACES.map(p => `- ${p.name} (${p.category}): ${p.address}. Giá: ${p.priceText}. Đánh giá: ${p.rating} sao.`).join('\n');
    window.chatHistory.push({ role: 'user', content: msg });
    
    try {
        // Try backend API first
        const apiUrl = window.location.hostname === 'localhost' || window.location.protocol === 'file:' 
            ? 'https://thuongluongmini.pages.dev/api/chat' 
            : '/api/chat';
        
        const response = await fetch(apiUrl, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ messages: window.chatHistory, contextData }) });
        const data = await response.json();
        document.getElementById('chat-typing')?.remove();
        
        if (response.ok && data.reply) {
            window.chatHistory.push({ role: 'assistant', content: data.reply });
            appendMessage('ai', data.reply, { formatMarkdown: true });
        } else if (data.error) {
            appendMessage('ai', `⚠️ Lỗi hệ thống: ${data.error}`);
        } else {
            throw new Error('API failed');
        }
    } catch (e) {
        // Fallback to local regex-based smart bot ONLY if fetch completely fails (e.g. running locally without Wrangler or 404)
        document.getElementById('chat-typing')?.remove();
        console.log("Fallback bot activated. Error:", e);
        
        const text = msg.toLowerCase();
        let reply = "Xin lỗi sếp, em đang bị mất mạng xíu. Sếp thử tìm kiếm bằng thanh công cụ ở trên nhé!";
        
        if (text.includes("phở") || text.includes("bún") || text.includes("cháo")) {
            const food = PLACES.filter(p => p.category === 'an-uong');
            reply = `Sếp thèm ăn hả? Ở Tuyên Quang có ${food.length} quán ngon lắm, sếp thử xem quán ${food[0]?.name} ở ${food[0]?.address} xem sao!`;
        } else if (text.includes("chơi") || text.includes("karaoke") || text.includes("phim")) {
            const fun = PLACES.filter(p => p.category === 'vui-choi');
            reply = `Muốn đi quẩy thì em gợi ý sếp tới ${fun[0]?.name} nha. Đang được rate ${fun[0]?.rating} sao đó!`;
        } else if (text.includes("cafe") || text.includes("trà sữa") || text.includes("uống")) {
            const cafe = PLACES.filter(p => p.subCategory?.includes('Cafe') || p.subCategory?.includes('Trà sữa'));
            reply = `Đi cafe chill chill thì sếp chốt ngay ${cafe[0]?.name} nhé, view đẹp đồ uống ngon!`;
        } else if (text.includes("du lịch") || text.includes("chụp ảnh") || text.includes("đẹp")) {
            const travel = PLACES.filter(p => p.category === 'du-lich');
            reply = `Tuyên Quang quê em cảnh đẹp ngút ngàn! Sếp thử đi ${travel[0]?.name} xem, chụp ảnh sống ảo cháy máy luôn.`;
        } else if (text.includes("chào") || text.includes("hi") || text.includes("hello")) {
            reply = `Chào sếp! Sếp muốn em tư vấn chỗ ăn chơi nào hôm nay ạ?`;
        }
        
        window.chatHistory.push({ role: 'assistant', content: reply });
        appendMessage('ai', reply);
    }
};

function appendMessage(role, text, { formatMarkdown = false } = {}) {
    const messagesDiv = document.getElementById('chatbot-messages');
    if (!messagesDiv) return;
    const time = new Date().toLocaleTimeString('vi-VN', { hour: '2-digit', minute: '2-digit' });
    const wrap = document.createElement('div');
    wrap.className = `chat-msg chat-msg--${role}`;
    const p = document.createElement('p');
    if (formatMarkdown && role === 'ai') {
        p.innerHTML = formatChatReply(text);
    } else {
        p.textContent = text;
    }
    const timeEl = document.createElement('span');
    timeEl.className = 'chat-msg__time';
    timeEl.textContent = time;
    wrap.append(p, timeEl);
    messagesDiv.appendChild(wrap);
    messagesDiv.scrollTop = messagesDiv.scrollHeight;
}

if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
} else {
    init();
}
