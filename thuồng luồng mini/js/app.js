// ============================================
// Thuồng Luồng Mini - Main Application
// Cloudflare Pages version - Pure hash routing
// ============================================

import { CATEGORIES, PLACES, getPlacesByCategory, getPlaceById, getFeaturedPlaces, getTopRatedPlaces, searchPlaces, getRelatedPlaces, getNewPlaces } from './data.js';
import { createPlaceCard, renderStars, showToast } from './utils.js';
import { renderHomePage } from './pages/home.js';
import { renderCategoryPage } from './pages/category.js';
import { renderDetailPage } from './pages/detail.js';
import { renderSearchPage } from './pages/search.js';
import { renderItineraryList, renderItineraryDetail } from './pages/itinerary.js';
import { renderAdminPage } from './pages/admin.js';
import { renderProfilePage } from './pages/profile.js';

// ============================================
// Global State
// ============================================
const state = {
    currentPage: 'home',
    favorites: JSON.parse(localStorage.getItem('tlm_favorites') || '[]'),
    searchQuery: '',
    scrollPositions: {}
};

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
    
    const detailMatch = route.match(/^\/dia-diem\/(\d+)(?:\/([a-z0-9-]+))?$/);
    if (detailMatch) return { page: 'detail', placeId: parseInt(detailMatch[1]), slug: detailMatch[2], params };
    
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
            case 'profile':     mainContent.innerHTML = renderProfilePage(); break;
            default:            mainContent.innerHTML = render404Page();
        }
    } catch (err) {
        console.error('Page render error:', err);
        mainContent.innerHTML = `
            <div class="page-container"><div class="container">
                <div class="empty-state" style="min-height:60vh">
                    <div class="empty-state__icon">⚠️</div>
                    <h2>Lỗi tải trang</h2>
                    <p style="color:red;font-size:0.85rem;max-width:600px;word-break:break-all">${err.message}</p>
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
    const idx = state.favorites.indexOf(placeId);
    if (idx === -1) {
        state.favorites.push(placeId);
        if (btnEl) { btnEl.classList.add('active', 'pulse'); setTimeout(() => btnEl.classList.remove('pulse'), 600); }
        showToast('Đã thêm vào yêu thích! 💛', 'success');
    } else {
        state.favorites.splice(idx, 1);
        if (btnEl) btnEl.classList.remove('active');
        showToast('Đã bỏ yêu thích', 'info');
    }
    localStorage.setItem('tlm_favorites', JSON.stringify(state.favorites));
    document.querySelectorAll(`[data-place-id="${placeId}"] .card__fav-btn`).forEach(btn => {
        state.favorites.includes(placeId) ? btn.classList.add('active') : btn.classList.remove('active');
    });
    updateFavCount();
};

window.isFavorite = function(placeId) { return state.favorites.includes(placeId); };
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
// SEO
// ============================================
function injectSEO(parsed) {
    let script = document.getElementById('json-ld');
    if (!script) { script = document.createElement('script'); script.id = 'json-ld'; script.type = 'application/ld+json'; document.head.appendChild(script); }
    
    let title = 'Thuồng Luồng Mini - Khám phá Tuyên Quang';
    let data = { "@context": "https://schema.org", "@type": "WebSite", "name": "Thuồng Luồng Mini", "url": "https://thuongluongmini.pages.dev" };

    if (parsed.page === 'detail' && parsed.placeId) {
        const place = getPlaceById(parsed.placeId);
        if (place) {
            title = `${place.name} - Đánh giá & Trải nghiệm | Thuồng Luồng Mini`;
            data = { "@context": "https://schema.org", "@type": "LocalBusiness", "name": place.name, "address": { "@type": "PostalAddress", "streetAddress": place.address, "addressLocality": "Tuyên Quang", "addressCountry": "VN" }, "aggregateRating": { "@type": "AggregateRating", "ratingValue": place.rating, "reviewCount": place.totalReviews } };
        }
    }
    document.title = title;
    script.textContent = JSON.stringify(data);
}

// ============================================
// Header Scroll
// ============================================
function initHeaderScroll() {
    const header = document.getElementById('main-header');
    let lastScroll = 0;
    window.addEventListener('scroll', () => {
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
            if (found.length === 0) {
                results.innerHTML = `<div style="padding:12px;color:var(--text-muted)">Không tìm thấy kết quả cho "${query}"</div>`;
            } else {
                results.innerHTML = found.map(place => {
                    const cat = CATEGORIES.find(c => c.id === place.category);
                    return `<a href="#/dia-diem/${place.id}/${place.slug}" style="display:flex;align-items:center;gap:12px;padding:10px;text-decoration:none;color:inherit;border-radius:8px;">
                        <div style="width:36px;height:36px;border-radius:8px;background:${cat ? cat.color : '#F4A261'};display:flex;align-items:center;justify-content:center;font-size:1.2rem;flex-shrink:0;">${cat ? cat.icon : '📍'}</div>
                        <div><div style="font-weight:600;font-size:0.9rem">${place.name}</div><div style="color:var(--text-muted);font-size:0.8rem">${place.subCategory} · ${place.rating.toFixed(1)} ★</div></div>
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
    initFilters();
}

// ============================================
// Maps
// ============================================
function initMapsOnPage() {
    document.querySelectorAll('[data-map]').forEach(mapEl => {
        const lat = parseFloat(mapEl.dataset.lat);
        const lng = parseFloat(mapEl.dataset.lng);
        const name = mapEl.dataset.name || '';
        if (isNaN(lat) || isNaN(lng) || mapEl._leaflet_id) return;
        const map = L.map(mapEl, { scrollWheelZoom: false }).setView([lat, lng], 15);
        L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', { attribution: '© OpenStreetMap' }).addTo(map);
        const icon = L.divIcon({ className: 'custom-map-marker', html: '<div class="map-marker-pin"><span>📍</span></div>', iconSize: [40, 40], iconAnchor: [20, 40], popupAnchor: [0, -40] });
        L.marker([lat, lng], { icon }).addTo(map).bindPopup(`<b>${name}</b>`).openPopup();
        setTimeout(() => map.invalidateSize(), 100);
    });
}

// ============================================
// Carousel
// ============================================
function initCarousels() {
    document.querySelectorAll('.carousel').forEach(carousel => {
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
// Filters
// ============================================
function initFilters() {
    const sortSelect = document.getElementById('sort-select');
    sortSelect?.addEventListener('change', () => navigateTo(getRoute()));
}

// ============================================
// Init App
// ============================================
async function init() {
    if (window.lucide) window.lucide.createIcons();
    
    try {
        const { database } = await import('./firebase-config.js');
        const { ref, get } = await import("https://www.gstatic.com/firebasejs/10.12.2/firebase-database.js");
        const snapshot = await get(ref(database, 'places'));
        if (snapshot.exists()) {
            const placesArray = Object.values(snapshot.val());
            const { setPlaces } = await import('./data.js');
            setPlaces(placesArray);
            console.log("✅ Loaded " + placesArray.length + " places from Firebase");
        }
    } catch(e) {
        console.log("📦 Using static data:", e.message);
    }

    initChatbot();
    navigateTo(getRoute());
    
    // Pure hash routing
    window.addEventListener('hashchange', () => navigateTo(getRoute()));
    
    initHeaderScroll();
    initSearch();
    initMobileMenu();
    initBackToTop();
    
    console.log('🐉 Thuồng Luồng Mini đã sẵn sàng!');
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
                    <input type="text" id="chatbot-input-field" placeholder="Nhập câu hỏi của bạn..." onkeypress="if(event.key === 'Enter') window.sendChatMessage()">
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
        const response = await fetch('/api/chat', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ messages: window.chatHistory, contextData }) });
        const data = await response.json();
        document.getElementById('chat-typing')?.remove();
        if (response.ok && data.reply) {
            window.chatHistory.push({ role: 'model', content: data.reply });
            appendMessage('ai', data.reply.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>').replace(/\n\*/g, '<br>•').replace(/\n/g, '<br>'));
        } else {
            appendMessage('ai', 'Xin lỗi, em đang bị lỗi. (Lỗi: ' + (data.error || 'Unknown') + ')');
        }
    } catch (e) {
        document.getElementById('chat-typing')?.remove();
        appendMessage('ai', 'Lỗi mạng! Không thể kết nối với server.');
    }
};

function appendMessage(role, text) {
    const messagesDiv = document.getElementById('chatbot-messages');
    const time = new Date().toLocaleTimeString('vi-VN', { hour: '2-digit', minute: '2-digit' });
    messagesDiv.insertAdjacentHTML('beforeend', `<div class="chat-msg chat-msg--${role}"><p>${text}</p><span class="chat-msg__time">${time}</span></div>`);
    messagesDiv.scrollTop = messagesDiv.scrollHeight;
}

if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
} else {
    init();
}
