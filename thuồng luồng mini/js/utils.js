// js/utils.js - Shared utilities (no circular deps)
import { CATEGORIES } from './data.js';

// ============================================
// Stars renderer
// ============================================
export function renderStars(rating) {
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
export function showToast(message, type = 'info', duration = 3000) {
    const container = document.getElementById('toast-container');
    if (!container) return;
    const toast = document.createElement('div');
    toast.className = `toast toast--${type}`;
    const icons = { success: 'check-circle', error: 'alert-circle', info: 'info', warning: 'alert-triangle' };
    toast.innerHTML = `
        <i data-lucide="${icons[type] || 'info'}" class="toast__icon"></i>
        <span class="toast__message">${message}</span>
        <button class="toast__close" onclick="this.parentElement.remove()">
            <i data-lucide="x"></i>
        </button>
    `;
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
export function createPlaceCard(place) {
    const favorites = JSON.parse(localStorage.getItem('tlm_favorites') || '[]');
    const isFav = favorites.includes(place.id);
    const category = CATEGORIES.find(c => c.id === place.category);
    const stars = renderStars(place.rating);
    
    const gradientColors = place.imageColors || ['#F4A261', '#E76F51'];
    const placeholderStyle = `background: linear-gradient(135deg, ${gradientColors[0]}, ${gradientColors[1] || gradientColors[0]});`;
    
    return `
        <article class="card animate-on-scroll" data-place-id="${place.id}">
            <a href="#/dia-diem/${place.id}/${place.slug}" class="card__link">
                <div class="card__image" style="${placeholderStyle}">
                    <div class="card__image-placeholder">
                        <span>${category ? category.icon : '📍'}</span>
                    </div>
                    <div class="card__badges">
                        ${place.isFeatured ? '<span class="badge badge--featured">⭐ Nổi bật</span>' : ''}
                        ${place.isNew ? '<span class="badge badge--new">Mới</span>' : ''}
                    </div>
                    <button class="card__fav-btn ${isFav ? 'active' : ''}" 
                            onclick="event.preventDefault(); event.stopPropagation(); window.toggleFavorite(${place.id}, this)" 
                            aria-label="${isFav ? 'Bỏ yêu thích' : 'Yêu thích'}">
                        <i data-lucide="heart" class="${isFav ? 'filled' : ''}"></i>
                    </button>
                    <div class="card__price-badge">${place.priceRange}</div>
                </div>
                <div class="card__content">
                    <div class="card__category">
                        <span class="card__category-dot" style="background: ${category ? category.color : '#F4A261'}"></span>
                        ${place.subCategory}
                    </div>
                    <h3 class="card__title">${place.name}</h3>
                    <p class="card__desc">${place.description}</p>
                    <div class="card__meta">
                        <div class="card__rating">
                            ${stars}
                            <span class="card__rating-num">${place.rating.toFixed(1)}</span>
                            <span class="card__review-count">(${place.totalReviews})</span>
                        </div>
                    </div>
                    <div class="card__footer">
                        <div class="card__location">
                            <i data-lucide="map-pin"></i>
                            <span>${place.address.length > 35 ? place.address.substring(0, 35) + '...' : place.address}</span>
                        </div>
                        <a href="https://www.google.com/maps/dir/?api=1&destination=${place.coordinates.lat},${place.coordinates.lng}" 
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
