// js/utils.js - Shared utilities (no circular deps)
import { CATEGORIES } from './data.js';

// ============================================
// HTML escaping (XSS prevention)
// ============================================
export function escapeHtml(str) {
    if (str == null) return '';
    return String(str)
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')
        .replace(/"/g, '&quot;')
        .replace(/'/g, '&#39;');
}

/** Safe subset of markdown for chatbot replies only */
export function formatChatReply(text) {
    const escaped = escapeHtml(text);
    return escaped
        .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
        .replace(/\n\*/g, '<br>•')
        .replace(/\n/g, '<br>');
}

// ============================================
// Stars renderer
// ============================================
export function renderStars(rating) {
    rating = rating || 0;
    let html = '';
    for (let i = 1; i <= 5; i++) {
        if (i <= Math.floor(rating)) {
            html += '<span class="star filled">★</span>';
        } else if (i - 0.5 <= rating) {
            html += '<span class="star half">★</span>';
        } else {
            html += '<span class="star empty">★</span>';
        }
    }
    return html;
}

// ============================================
// Toast notification
// ============================================
export function showToast(message, type = 'info', duration = 3000, { allowHtml = false } = {}) {
    const container = document.getElementById('toast-container');
    if (!container) return;
    const toast = document.createElement('div');
    toast.className = `toast toast--${type}`;
    const icons = { success: 'check-circle', error: 'alert-circle', info: 'info', warning: 'alert-triangle' };
    const icon = document.createElement('i');
    icon.dataset.lucide = icons[type] || 'info';
    icon.className = 'toast__icon';
    const msgEl = document.createElement('span');
    msgEl.className = 'toast__message';
    if (allowHtml) msgEl.innerHTML = message;
    else msgEl.textContent = message;
    const closeBtn = document.createElement('button');
    closeBtn.className = 'toast__close';
    closeBtn.type = 'button';
    closeBtn.setAttribute('aria-label', 'Đóng');
    closeBtn.onclick = () => toast.remove();
    const closeIcon = document.createElement('i');
    closeIcon.dataset.lucide = 'x';
    closeBtn.appendChild(closeIcon);
    toast.append(icon, msgEl, closeBtn);
    container.appendChild(toast);
    if (window.lucide) window.lucide.createIcons();
    requestAnimationFrame(() => toast.classList.add('show'));
    setTimeout(() => {
        toast.classList.remove('show');
        setTimeout(() => toast.remove(), 300);
    }, duration);
}

// ============================================
// Place Card component
// ============================================
function cardIsFavorite(placeId) {
    if (typeof window.isFavorite === 'function') return window.isFavorite(placeId);
    try {
        const favorites = JSON.parse(localStorage.getItem('tlm_favorites') || '[]');
        return favorites.some(id => String(id) === String(placeId));
    } catch {
        return false;
    }
}

export function createPlaceCard(place) {
    const isFav = cardIsFavorite(place.id);
    const category = CATEGORIES.find(c => c.id === place.category);
    const stars = renderStars(place.rating);
    const name = escapeHtml(place.name);
    const desc = escapeHtml(place.description);
    const subCat = escapeHtml(place.subCategory);
    const address = escapeHtml(place.address || 'Đang cập nhật');
    const addressShort = (place.address || '').length > 35
        ? escapeHtml((place.address || '').substring(0, 35) + '...')
        : address;
    const imgUrl = place.images?.[0] ? escapeHtml(place.images[0]) : '';
    
    const gradientColors = place.imageColors || ['#F4A261', '#E76F51'];
    const placeholderStyle = `background: linear-gradient(135deg, ${gradientColors[0]}, ${gradientColors[1] || gradientColors[0]});`;
    
    return `
        <article class="card animate-on-scroll" data-place-id="${place.id}">
            <a href="#/dia-diem/${place.id}/${place.slug}" class="card__link">
                <div class="card__image" style="${placeholderStyle}">
                    ${place.images && place.images.length > 0 && !place.images[0].includes('placeholder') ? 
                        `<img src="${imgUrl}" alt="${name}" loading="lazy" decoding="async" style="width: 100%; height: 100%; object-fit: cover; position: absolute; top: 0; left: 0;">` : 
                        `<div class="card__image-placeholder">
                            <span>${category ? category.icon : '📍'}</span>
                        </div>`
                    }
                    <div class="card__badges">
                        ${place.isFeatured ? '<span class="badge badge--featured">⭐ Nổi bật</span>' : ''}
                        ${place.isNew ? '<span class="badge badge--new">Mới</span>' : ''}
                    </div>
                    <button class="card__fav-btn ${isFav ? 'active' : ''}" 
                            onclick="event.preventDefault(); event.stopPropagation(); window.toggleFavorite(${JSON.stringify(place.id)}, this)" 
                            aria-label="${isFav ? 'Bỏ yêu thích' : 'Yêu thích'}">
                        <i data-lucide="heart" class="${isFav ? 'filled' : ''}"></i>
                    </button>
                    <div class="card__price-badge">${place.priceRange}</div>
                </div>
                <div class="card__content">
                    <div class="card__category">
                        <span class="card__category-dot" style="background: ${category ? category.color : '#F4A261'}"></span>
                        ${subCat}
                    </div>
                    <h3 class="card__title">${name}</h3>
                    <p class="card__desc">${desc}</p>
                    <div class="card__meta">
                        <div class="card__rating">
                            ${stars}
                            <span class="card__rating-num">${(place.rating || 0).toFixed(1)}</span>
                            <span class="card__review-count">(${place.totalReviews})</span>
                        </div>
                    </div>
                    <div class="card__footer">
                        <div class="card__location">
                            <i data-lucide="map-pin"></i>
                            <span>${addressShort}</span>
                        </div>
                        <a href="https://www.google.com/maps/dir/?api=1&destination=${place.coordinates?.lat || ''},${place.coordinates?.lng || ''}" 
                           target="_blank" 
                           class="btn btn--primary btn--sm" 
                           style="padding: 0.25rem 0.75rem; border-radius: 20px; font-size: 0.8rem; flex-shrink: 0;"
                           onclick="event.preventDefault(); event.stopPropagation(); window.open(this.href, '_blank');">
                            <i data-lucide="navigation" style="width: 14px; height: 14px;"></i> Chỉ đường
                        </a>
                    </div>
                </div>
            </a>
        </article>
    `;
}
