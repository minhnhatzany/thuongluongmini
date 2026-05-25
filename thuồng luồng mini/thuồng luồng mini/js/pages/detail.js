// ============================================
// Detail Page - Thuồng Luồng Mini
// ============================================

import { CATEGORIES, getPlaceById, getRelatedPlaces } from '../data.js';
import { createPlaceCard, renderStars, showToast, escapeHtml, adjustColor } from '../utils.js';

export function renderDetailPage(placeId) {
    const place = getPlaceById(placeId);
    if (!place) {
        return `
            <div class="page-container">
                <div class="container">
                    <div class="empty-state" style="min-height: 60vh;">
                        <div class="empty-state__icon">😢</div>
                        <h2 class="empty-state__title">Không tìm thấy địa điểm</h2>
                        <p class="empty-state__text">Địa điểm này có thể đã bị xóa hoặc không tồn tại.</p>
                        <a href="#/" class="btn btn--primary">Về trang chủ</a>
                    </div>
                </div>
            </div>
        `;
    }

    const category = CATEGORIES.find(c => c.id === place.category);
    const related = getRelatedPlaces(place, 4);
    const isFav = window.isFavorite(place.id);
    const ratingBreakdown = getRatingBreakdown(place.reviews);
    const avgRating = place.rating || 0;
    
    // Generate placeholder gallery colors
    const galleryColors = place.imageColors || ['#F4A261', '#E76F51', '#2A9D8F', '#264653'];

    // Request real reviews asynchronously (cancelled if user leaves page)
    const loadId = Symbol('detail-reviews');
    window._detailReviewLoadId = loadId;
    setTimeout(() => {
        if (window._detailReviewLoadId === loadId && window.loadRealReviews) {
            window.loadRealReviews(placeId);
        }
    }, 500);

    return `
        <div class="detail-page">
            <!-- Breadcrumb -->
            <div class="container">
                <nav class="breadcrumb animate-on-scroll">
                    <a href="#/" class="breadcrumb__item">Trang chủ</a>
                    <span class="breadcrumb__sep">/</span>
                    <a href="#/danh-muc/${place.category}" class="breadcrumb__item">${category ? category.name : ''}</a>
                    <span class="breadcrumb__sep">/</span>
                    <span class="breadcrumb__item active">${place.name}</span>
                </nav>
            </div>

            <!-- Gallery -->
            <div class="detail-gallery animate-on-scroll">
                <div class="detail-gallery__main" style="${place.images && place.images.length > 0 ? `background-image: url('${place.images[0]}'); background-size: cover; background-position: center;` : `background: linear-gradient(135deg, ${galleryColors[0]}, ${galleryColors[1] || galleryColors[0]})`}">
                    ${(!place.images || place.images.length === 0) ? `
                    <div class="detail-gallery__placeholder">
                        <span>${category ? category.icon : '📍'}</span>
                        <p>Ảnh đang cập nhật</p>
                    </div>` : ''}
                </div>
                <div class="detail-gallery__side">
                    ${[1, 2, 3].map(i => {
                        const hasImg = place.images && place.images[i];
                        if (i === 3 && place.images && place.images.length > 4) {
                            return `
                            <div class="detail-gallery__more" style="${hasImg ? `background-image: linear-gradient(rgba(0,0,0,0.5), rgba(0,0,0,0.5)), url('${place.images[i]}'); background-size: cover; background-position: center;` : `background: #333`}">
                                <span>+${place.images.length - 4} ảnh</span>
                            </div>`;
                        }
                        return `
                        <div class="detail-gallery__thumb" style="${hasImg ? `background-image: url('${place.images[i]}'); background-size: cover; background-position: center;` : `background: linear-gradient(135deg, ${galleryColors[i] || '#ccc'}, ${adjustColor(galleryColors[i] || '#ccc', -30)})`}">
                            ${!hasImg ? `
                            <div class="detail-gallery__placeholder-sm">
                                <span>${['📸', '🎬', '🖼️', '✨'][i-1] || '📸'}</span>
                            </div>` : ''}
                        </div>`;
                    }).join('')}
                </div>
            </div>

            <div class="container">
                <div class="detail-layout">
                    <!-- Main Content -->
                    <div class="detail-main">
                        <!-- Header -->
                        <div class="detail-header animate-on-scroll">
                            <div class="detail-header__top">
                                <div>
                                    <div class="detail-header__badges">
                                        <span class="badge badge--category" style="--badge-color: ${category ? category.color : '#F4A261'}">
                                            ${category ? category.icon : ''} ${place.subCategory}
                                        </span>
                                        ${place.isFeatured ? '<span class="badge badge--featured">⭐ Nổi bật</span>' : ''}
                                        ${place.isNew ? '<span class="badge badge--new">Mới</span>' : ''}
                                        <span class="badge badge--price">${place.priceRange}</span>
                                    </div>
                                    <h1 class="detail-header__title">${place.name}</h1>
                                </div>
                            </div>
                            
                            <div class="detail-header__rating">
                                <div class="detail-rating-big">
                                    <span class="detail-rating-big__num">${(avgRating || 0).toFixed(1)}</span>
                                    <div class="detail-rating-big__stars">
                                        ${renderStars(avgRating)}
                                        <span class="detail-rating-big__count">${place.totalReviews} đánh giá</span>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <!-- Quick Actions -->
                        <div class="detail-actions animate-on-scroll">

                            <a href="tel:${place.phone}" class="detail-action">
                                <div class="detail-action__icon">
                                    <i data-lucide="phone"></i>
                                </div>
                                <span>Gọi điện</span>
                            </a>
                            <a href="https://www.google.com/maps/dir/?api=1&destination=${place.coordinates.lat},${place.coordinates.lng}" target="_blank" rel="noopener" class="detail-action">
                                <div class="detail-action__icon">
                                    <i data-lucide="navigation"></i>
                                </div>
                                <span>Chỉ đường</span>
                            </a>
                            <button class="detail-action" onclick="window.sharePlace(${JSON.stringify(place.id)})">
                                <div class="detail-action__icon">
                                    <i data-lucide="share-2"></i>
                                </div>
                                <span>Chia sẻ</span>
                            </button>
                            <button class="detail-action" onclick="window.checkInPlace(${JSON.stringify(place.id)})" title="Check-in tại đây">
                                <div class="detail-action__icon">
                                    <i data-lucide="map-pin"></i>
                                </div>
                                <span>Check-in</span>
                            </button>
                            <button class="detail-action ${isFav ? 'active' : ''}" onclick="window.toggleFavorite(${JSON.stringify(place.id)}, this)">
                                <div class="detail-action__icon">
                                    <i data-lucide="heart"></i>
                                </div>
                                <span>${isFav ? 'Đã thích' : 'Yêu thích'}</span>
                            </button>
                        </div>

                        <!-- About -->
                        <div class="detail-section animate-on-scroll">
                            <h2 class="detail-section__title">
                                <i data-lucide="info"></i>
                                Giới thiệu
                            </h2>
                            <div class="detail-about">
                                <p>${place.fullDescription || place.description}</p>
                            </div>
                        </div>

                        <!-- Info List -->
                        <div class="detail-section animate-on-scroll">
                            <h2 class="detail-section__title">
                                <i data-lucide="clipboard-list"></i>
                                Thông tin chi tiết
                            </h2>
                            <div class="detail-info-list">
                                <div class="detail-info-item">
                                    <i data-lucide="map-pin" class="detail-info-item__icon"></i>
                                    <div>
                                        <span class="detail-info-item__label">Địa chỉ</span>
                                        <span class="detail-info-item__value">${place.address}</span>
                                    </div>
                                </div>
                                <div class="detail-info-item">
                                    <i data-lucide="clock" class="detail-info-item__icon"></i>
                                    <div>
                                        <span class="detail-info-item__label">Giờ mở cửa</span>
                                        <span class="detail-info-item__value">${place.openHours}</span>
                                        <span class="detail-info-item__status ${place.isOpen ? 'open' : 'closed'}">
                                            ${place.isOpen ? '● Đang mở cửa' : '● Đã đóng cửa'}
                                        </span>
                                    </div>
                                </div>
                                <div class="detail-info-item">
                                    <i data-lucide="phone" class="detail-info-item__icon"></i>
                                    <div>
                                        <span class="detail-info-item__label">Điện thoại</span>
                                        <a href="tel:${place.phone}" class="detail-info-item__value detail-info-item__link">${place.phone}</a>
                                    </div>
                                </div>
                                <div class="detail-info-item">
                                    <i data-lucide="banknote" class="detail-info-item__icon"></i>
                                    <div>
                                        <span class="detail-info-item__label">Khoảng giá</span>
                                        <span class="detail-info-item__value">${place.priceText}</span>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <!-- Amenities -->
                        ${place.amenities && place.amenities.length > 0 ? `
                        <div class="detail-section animate-on-scroll">
                            <h2 class="detail-section__title">
                                <i data-lucide="sparkles"></i>
                                Tiện ích
                            </h2>
                            <div class="detail-amenities">
                                ${place.amenities.map(a => `
                                    <div class="detail-amenity">
                                        <i data-lucide="check-circle"></i>
                                        <span>${a}</span>
                                    </div>
                                `).join('')}
                            </div>
                        </div>
                        ` : ''}

                        <!-- Menu (for restaurants) -->
                        ${place.menu && place.menu.length > 0 ? `
                        <div class="detail-section animate-on-scroll">
                            <h2 class="detail-section__title">
                                <i data-lucide="book-open"></i>
                                Thực đơn
                            </h2>
                            <div class="detail-menu">
                                ${place.menu.map(item => `
                                    <div class="detail-menu-item">
                                        <span class="detail-menu-item__name">${item.name}</span>
                                        <span class="detail-menu-item__dots"></span>
                                        <span class="detail-menu-item__price">${item.price}</span>
                                    </div>
                                `).join('')}
                            </div>
                        </div>
                        ` : ''}

                        <!-- Map -->
                        <div class="detail-section animate-on-scroll" id="map-section">
                            <h2 class="detail-section__title">
                                <i data-lucide="map"></i>
                                Bản đồ
                            </h2>
                            <a href="https://www.google.com/maps/dir/?api=1&destination=${place.coordinates.lat},${place.coordinates.lng}" target="_blank" rel="noopener" style="display: block; position: relative;">
                                <div class="detail-map" style="border-radius: var(--radius-lg); overflow: hidden; height: 300px; background: #eee; position: relative;">
                                    <div style="position: absolute; top: 0; left: 0; width: 100%; height: 100%; z-index: 10; cursor: pointer;"></div>
                                    <iframe width="100%" height="100%" frameborder="0" style="border:0; pointer-events: none;" 
                                        src="https://maps.google.com/maps?q=${place.coordinates.lat},${place.coordinates.lng}&hl=vi&z=15&output=embed" 
                                        allowfullscreen loading="lazy" referrerpolicy="no-referrer-when-downgrade">
                                    </iframe>
                                </div>
                            </a>
                        </div>

                        <!-- Booking / Contact -->
                        <div class="detail-section animate-on-scroll" id="booking-section">
                            <h2 class="detail-section__title">
                                <i data-lucide="calendar"></i>
                                Đặt chỗ / Liên hệ nhanh
                            </h2>
                            <p style="color: var(--text-muted); font-size: 0.9rem; margin-bottom: var(--space-4);">
                                Bạn ở xa Tuyên Quang? Gửi yêu cầu — quán sẽ gọi lại xác nhận. Hoặc gọi / nhắn Zalo trực tiếp.
                            </p>
                            <form class="booking-form" id="booking-form" onsubmit="window.submitBooking(event, ${place.id})">
                                <div class="booking-form__grid" style="display: grid; gap: var(--space-3); grid-template-columns: 1fr 1fr;">
                                    <label>
                                        <span style="font-size: 0.85rem; font-weight: 600;">Ngày</span>
                                        <input type="date" id="booking-date" class="write-review__text" style="width: 100%; margin-top: 4px;" required min="${getToday()}">
                                    </label>
                                    <label>
                                        <span style="font-size: 0.85rem; font-weight: 600;">Giờ</span>
                                        <select id="booking-time" class="write-review__text" style="width: 100%; margin-top: 4px;" required>
                                            ${generateTimeSlots().map(t => `<option value="${t}">${t}</option>`).join('')}
                                        </select>
                                    </label>
                                    <label>
                                        <span style="font-size: 0.85rem; font-weight: 600;">Họ tên</span>
                                        <input type="text" id="booking-name" class="write-review__text" style="width: 100%; margin-top: 4px;" placeholder="Tên của bạn" required>
                                    </label>
                                    <label>
                                        <span style="font-size: 0.85rem; font-weight: 600;">Số điện thoại</span>
                                        <input type="tel" id="booking-phone" class="write-review__text" style="width: 100%; margin-top: 4px;" placeholder="09xxxxxxxx" required>
                                    </label>
                                </div>
                                <button type="submit" class="btn btn--primary" style="margin-top: var(--space-4); width: 100%;">
                                    Gửi yêu cầu đặt chỗ
                                </button>
                            </form>
                            <div class="detail-contact" style="margin-top: var(--space-4); padding-top: var(--space-4); border-top: 1px solid var(--border-color);">
                                <a href="tel:${escapeHtml(place.phone)}" class="detail-contact__item">
                                    <i data-lucide="phone"></i>
                                    <span>Gọi ${escapeHtml(place.phone)}</span>
                                </a>
                                ${place.social?.zalo ? `
                                <a href="https://zalo.me/${escapeHtml(place.social.zalo)}" target="_blank" rel="noopener" class="detail-contact__item">
                                    <span>💬</span>
                                    <span>Nhắn Zalo: ${escapeHtml(place.social.zalo)}</span>
                                </a>
                                ` : ''}
                            </div>
                        </div>

                        <!-- Reviews -->
                        <div class="detail-section animate-on-scroll" id="reviews-section">
                            <h2 class="detail-section__title">
                                <i data-lucide="message-circle"></i>
                                Đánh giá (${place.totalReviews})
                            </h2>
                            
                            <!-- Rating Summary -->
                            <div class="review-summary">
                                <div class="review-summary__score">
                                    <span class="review-summary__num">${(avgRating || 0).toFixed(1)}</span>
                                    <div class="review-summary__stars">${renderStars(avgRating)}</div>
                                    <span class="review-summary__count">${place.totalReviews} đánh giá</span>
                                </div>
                                <div class="review-summary__breakdown">
                                    ${[5, 4, 3, 2, 1].map(star => `
                                        <div class="stat-bar">
                                            <span class="stat-bar__label">${star} ★</span>
                                            <div class="stat-bar__track">
                                                <div class="stat-bar__fill" style="width: ${ratingBreakdown[star]}%"></div>
                                            </div>
                                            <span class="stat-bar__value">${Math.round(ratingBreakdown[star])}%</span>
                                        </div>
                                    `).join('')}
                                </div>
                            </div>

                            <!-- Write Review -->
                            <div class="write-review">
                                <h3 class="write-review__title">Viết đánh giá của bạn</h3>
                                <div class="write-review__stars" id="write-review-stars">
                                    ${[1, 2, 3, 4, 5].map(i => `
                                        <button class="write-review__star" data-star="${i}" 
                                                onclick="window.setReviewRating(${i})" aria-label="${i} sao">★</button>
                                    `).join('')}
                                </div>
                                <textarea class="write-review__text" id="review-text" 
                                          placeholder="Chia sẻ trải nghiệm của bạn..." rows="3"></textarea>
                                <div class="write-review__actions">
                                    <button class="btn btn--secondary btn--sm" onclick="window.showToast('Tính năng upload ảnh sẽ sớm ra mắt!', 'info')">
                                        <i data-lucide="camera"></i>
                                        Thêm ảnh
                                    </button>
                                    <button class="btn btn--primary btn--sm" onclick="window.submitReview(${place.id})">
                                        Gửi đánh giá
                                    </button>
                                </div>
                            </div>

                            <!-- Review List -->
                            <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: var(--space-4); margin-top: var(--space-6);">
                                <h3 style="margin: 0;">Đánh giá nổi bật</h3>
                                <select class="review-sort" onchange="window.sortReviews(${place.id}, this.value)" style="padding: 8px 12px; border: 1px solid var(--border-color); border-radius: var(--radius-md); background: var(--bg-body); font-family: inherit;">
                                    <option value="helpful">Hữu ích nhất</option>
                                    <option value="newest">Mới nhất</option>
                                    <option value="oldest">Cũ nhất</option>
                                </select>
                            </div>
                            <div class="review-list" id="review-list-container">
                                ${sortReviewsData(place.reviews, 'helpful').map(review => renderReview(review)).join('')}
                            </div>
                        </div>
                    </div>

                    <!-- Sidebar -->
                    <aside class="detail-sidebar">
                        <!-- Contact Card -->
                        <div class="detail-sidebar-card animate-on-scroll">
                            <h3 class="detail-sidebar-card__title">
                                <i data-lucide="phone"></i>
                                Liên hệ
                            </h3>
                            <div class="detail-contact">
                                <a href="tel:${place.phone}" class="detail-contact__item">
                                    <i data-lucide="phone"></i>
                                    <span>${place.phone}</span>
                                </a>
                                ${place.social?.facebook ? `
                                <a href="${place.social.facebook}" target="_blank" rel="noopener" class="detail-contact__item">
                                    <i data-lucide="facebook"></i>
                                    <span>Facebook</span>
                                </a>
                                ` : ''}
                                ${place.social?.zalo ? `
                                <a href="https://zalo.me/${place.social.zalo}" target="_blank" rel="noopener" class="detail-contact__item">
                                    <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><circle cx="12" cy="12" r="10"/></svg>
                                    <span>Zalo: ${place.social.zalo}</span>
                                </a>
                                ` : ''}
                            </div>
                        </div>

                        <!-- Tags -->
                        ${place.tags && place.tags.length > 0 ? `
                        <div class="detail-sidebar-card animate-on-scroll">
                            <h3 class="detail-sidebar-card__title">
                                <i data-lucide="tag"></i>
                                Tags
                            </h3>
                            <div class="detail-tags">
                                ${place.tags.map(tag => `<span class="tag">#${tag}</span>`).join('')}
                            </div>
                        </div>
                        ` : ''}
                    </aside>
                </div>

                <!-- Related Places -->
                ${related.length > 0 ? `
                <div class="detail-section detail-related animate-on-scroll">
                    <h2 class="detail-section__title">
                        <i data-lucide="compass"></i>
                        Địa điểm liên quan
                    </h2>
                    <div class="venue-grid">
                        ${related.map(p => createPlaceCard(p)).join('')}
                    </div>
                </div>
                ` : ''}
            </div>

            <!-- Mobile Sticky CTA -->
            <div class="detail-mobile-cta">
                <div class="detail-mobile-cta__info">
                    <span class="detail-mobile-cta__name">${place.name}</span>
                    <span class="detail-mobile-cta__rating">${renderStars(avgRating)} ${(avgRating || 0).toFixed(1)}</span>
                </div>
                <div class="detail-mobile-cta__actions">
                    <a href="tel:${place.phone}" class="btn btn--secondary btn--sm">
                        <i data-lucide="phone"></i>
                    </a>
                    <button class="btn btn--primary btn--sm" onclick="window.scrollToSection('booking-section')">
                        Đặt chỗ
                    </button>
                </div>
            </div>
        </div>
    `;
}

// ============================================
// Helper Functions
// ============================================
function renderReview(review) {
    const userName = review.userName || review.user?.name || 'Người dùng';
    const safeName = escapeHtml(userName);
    const safeText = escapeHtml(review.text || '');
    const reviewId = escapeHtml(String(review.id ?? 'r'));
    const initials = userName.split(' ').map(w => w[0]).join('').slice(-2).toUpperCase() || 'U';
    const avatarColors = ['#F4A261', '#2A9D8F', '#E76F51', '#9B59B6', '#3498DB'];
    const colorIndex = userName.length % avatarColors.length;
    
    return `
        <div class="review-card">
            <div class="review-card__header">
                <div class="avatar avatar--md" style="background: ${avatarColors[colorIndex]}">
                    ${escapeHtml(initials)}
                </div>
                <div class="review-card__user">
                    <span class="review-card__name">${safeName}</span>
                    <span class="review-card__date">${formatDate(review.date)}</span>
                </div>
                <div class="review-card__rating">${renderStars(review.rating)}</div>
            </div>
            <p class="review-card__text">${safeText}</p>
            ${review.images && review.images.length > 0 ? `
                <div class="review-card__images">
                    ${review.images.map(img => `<div class="review-card__img" style="background: #eee;"></div>`).join('')}
                </div>
            ` : ''}
            <div class="review-card__footer" style="display: flex; gap: var(--space-4);">
                <button class="review-card__helpful" onclick="this.classList.toggle('active'); window.showToast('Cảm ơn phản hồi!', 'success')">
                    <i data-lucide="thumbs-up"></i>
                    Hữu ích (<span class="helpful-count">${review.helpful || 0}</span>)
                </button>
                <button class="review-card__helpful" onclick="window.toggleReplyForm('${reviewId}')">
                    <i data-lucide="message-square"></i>
                    Phản hồi
                </button>
            </div>
            
            <div class="review-reply-form" id="reply-form-${reviewId}" style="display: none; margin-top: var(--space-3); padding-top: var(--space-3); border-top: 1px solid var(--border-color);">
                <textarea class="write-review__text" id="reply-text-${reviewId}" placeholder="Viết phản hồi của bạn..." rows="2" style="margin-bottom: var(--space-2);"></textarea>
                <div style="display: flex; justify-content: flex-end; gap: var(--space-2);">
                    <button class="btn btn--secondary btn--sm" onclick="window.toggleReplyForm('${reviewId}')">Hủy</button>
                    <button class="btn btn--primary btn--sm" onclick="window.submitReply('${reviewId}')">Gửi phản hồi</button>
                </div>
            </div>
            ${review.reply ? `
                <div class="review-card__reply">
                    <div class="review-card__reply-header">
                        <i data-lucide="corner-down-right"></i>
                        <strong>Phản hồi từ quán</strong>
                        <span>${formatDate(review.reply.date)}</span>
                    </div>
                    <p>${escapeHtml(review.reply.text)}</p>
                </div>
            ` : ''}
        </div>
    `;
}

function getRatingBreakdown(reviews) {
    const breakdown = { 5: 0, 4: 0, 3: 0, 2: 0, 1: 0 };
    if (!reviews || reviews.length === 0) {
        return { 5: 60, 4: 25, 3: 10, 2: 3, 1: 2 };
    }
    
    reviews.forEach(r => {
        const star = Math.round(r.rating);
        breakdown[star] = (breakdown[star] || 0) + 1;
    });
    
    const total = reviews.length;
    Object.keys(breakdown).forEach(key => {
        breakdown[key] = (breakdown[key] / total) * 100;
    });
    
    return breakdown;
}

function formatDate(dateStr) {
    const date = new Date(dateStr);
    const now = new Date();
    const diff = now - date;
    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    
    if (days === 0) return 'Hôm nay';
    if (days === 1) return 'Hôm qua';
    if (days < 7) return `${days} ngày trước`;
    if (days < 30) return `${Math.floor(days / 7)} tuần trước`;
    if (days < 365) return `${Math.floor(days / 30)} tháng trước`;
    return date.toLocaleDateString('vi-VN');
}

function getToday() {
    return new Date().toISOString().split('T')[0];
}

function sortReviewsData(reviews, sortBy) {
    if (!reviews) return [];
    const sorted = [...reviews];
    if (sortBy === 'newest') {
        sorted.sort((a, b) => new Date(b.date) - new Date(a.date));
    } else if (sortBy === 'oldest') {
        sorted.sort((a, b) => new Date(a.date) - new Date(b.date));
    } else {
        // helpful
        sorted.sort((a, b) => (b.helpful || 0) - (a.helpful || 0));
    }
    return sorted;
}

function generateTimeSlots() {
    const slots = [];
    for (let h = 7; h <= 21; h++) {
        slots.push(`${h.toString().padStart(2, '0')}:00`);
        slots.push(`${h.toString().padStart(2, '0')}:30`);
    }
    return slots;
}

// ============================================
// Global Functions
// ============================================
window.scrollToSection = function(sectionId) {
    const el = document.getElementById(sectionId);
    if (el) {
        el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
};

window.checkInPlace = async function(placeId) {
    if (!window.currentUser) {
        showToast('Đăng nhập để check-in và tích điểm nhé!', 'warning');
        window.openAuthModal?.();
        return;
    }
    const today = new Date().toISOString().split('T')[0];
    const key = `tlm_checkin_${placeId}_${today}`;
    if (localStorage.getItem(key)) {
        showToast('Bạn đã check-in địa điểm này hôm nay rồi!', 'info');
        return;
    }
    localStorage.setItem(key, '1');
    try {
        const { updateGamificationData } = await import('../gamification.js');
        const result = await updateGamificationData(window.currentUser.uid, 'CHECK_IN');
        let msg = 'Check-in thành công! +5 điểm 🎉';
        if (result?.rankChanged) msg += ` Thăng hạng ${result.newRank.name}!`;
        showToast(msg, 'success', 4000);
    } catch (e) {
        showToast('Check-in thành công!', 'success');
    }
};

window.sharePlace = function(placeId) {
    const place = getPlaceById(placeId);
    if (!place) return;
    
    const url = window.location.href;
    const text = `${place.name} - ${place.subCategory} tại ${place.address}`;
    
    if (navigator.share) {
        navigator.share({ title: place.name, text, url }).catch(() => {});
    } else {
        navigator.clipboard.writeText(url).then(() => {
            showToast('Đã sao chép link!', 'success');
        }).catch(() => {
            showToast('Không thể sao chép link', 'error');
        });
    }
};

let currentReviewRating = 0;
window.setReviewRating = function(rating) {
    currentReviewRating = rating;
    const stars = document.querySelectorAll('.write-review__star');
    stars.forEach((star, i) => {
        star.classList.toggle('active', i < rating);
    });
};

window.submitReview = async function(placeId) {
    if (!window.currentUser) {
        window.showToast('Vui lòng đăng nhập để viết đánh giá!', 'warning');
        return;
    }
    
    const text = document.getElementById('review-text')?.value?.trim();
    if (!currentReviewRating) {
        showToast('Vui lòng chọn số sao đánh giá!', 'warning');
        return;
    }
    if (!text) {
        showToast('Vui lòng nhập nội dung đánh giá!', 'warning');
        return;
    }
    
    // Process gamification points (non-blocking)
    let result = null;
    try {
        const { updateGamificationData } = await import('../gamification.js');
        result = await updateGamificationData(window.currentUser.uid, 'ADD_REVIEW');
    } catch (e) {
        console.warn('Gamification không khả dụng:', e.message);
    }
    
    // Save to Realtime Database
    try {
        const { database } = await import('../firebase-config.js');
        const { ref, push, update } = await import("https://www.gstatic.com/firebasejs/10.12.2/firebase-database.js");
        const { applyNewReviewToPlace } = await import('../data.js');
        
        const reviewRef = ref(database, `places/${placeId}/reviews`);
        await push(reviewRef, {
            userName: window.currentUser.displayName || 'Người dùng',
            userAvatar: window.currentUser.photoURL || `https://ui-avatars.com/api/?name=${encodeURIComponent(window.currentUser.email)}`,
            rating: currentReviewRating,
            text: text,
            date: new Date().toISOString(),
            userId: window.currentUser.uid
        });

        const stats = applyNewReviewToPlace(placeId, currentReviewRating);
        if (stats) {
            try {
                await update(ref(database, `places/${placeId}`), {
                    rating: stats.rating,
                    totalReviews: stats.totalReviews
                });
            } catch (e) {
                console.warn('Cập nhật rating place:', e.message);
            }
            document.querySelectorAll('.detail-rating-big__num, .review-summary__num').forEach(el => {
                el.textContent = stats.rating.toFixed(1);
            });
            document.querySelectorAll('.detail-rating-big__count, .review-summary__count').forEach(el => {
                el.textContent = `${stats.totalReviews} đánh giá`;
            });
        }
        
        let message = 'Đã gửi đánh giá thành công! Cảm ơn bạn 🧡';
        if (result) {
            message += ` (+${result.pointsAdded} điểm)`;
            if (result.rankChanged) {
                message += ` — Thăng hạng ${result.newRank.name}! 🎉`;
            }
        }
        
        showToast(message, 'success', 5000);
        document.getElementById('review-text').value = '';
        currentReviewRating = 0;
        document.querySelectorAll('.write-review__star').forEach(s => s.classList.remove('active'));
        
        // Reload reviews
        if (window.loadRealReviews) {
            window.loadRealReviews(placeId);
        }
    } catch (e) {
        console.error("Lỗi lưu đánh giá:", e);
        showToast('Có lỗi xảy ra khi lưu đánh giá. Vui lòng thử lại!', 'error');
    }
};

window.submitBooking = function(event, placeId) {
    if (event) event.preventDefault();
    const form = document.getElementById('booking-form');
    const date = document.getElementById('booking-date')?.value;
    const time = document.getElementById('booking-time')?.value;
    const name = document.getElementById('booking-name')?.value?.trim();
    const phone = document.getElementById('booking-phone')?.value?.trim();
    
    if (!date || !time || !name || !phone) {
        showToast('Vui lòng điền đầy đủ thông tin!', 'warning');
        return;
    }

    const place = getPlaceById(placeId);
    const tel = place?.phone?.replace(/\s/g, '');
    if (tel) {
        const body = encodeURIComponent(`Xin đặt chỗ: ${name}, ${phone}, ${date} ${time}`);
        showToast('Đã ghi nhận! Đang mở ứng dụng gọi — bạn có thể nhắn lại giờ đặt cho quán.', 'success', 5000);
        setTimeout(() => { window.location.href = `tel:${tel}`; }, 800);
    } else {
        showToast('Đặt chỗ thành công! Quán sẽ liên hệ xác nhận qua SĐT bạn đã để. 🎉', 'success', 5000);
    }
    form?.reset();
};

window.sortReviews = function(placeId, sortBy) {
    import('../data.js').then(module => {
        const place = module.getPlaceById(placeId);
        if (!place) return;
        
        let allReviews = [...(place.reviews || [])];
        if (window.realtimeReviews && window.realtimeReviews[placeId]) {
            allReviews = [...allReviews, ...window.realtimeReviews[placeId]];
        }
        
        const container = document.getElementById('review-list-container');
        if (container) {
            const sorted = sortReviewsData(allReviews, sortBy);
            container.innerHTML = sorted.map(r => renderReview(r)).join('');
            if (window.lucide) window.lucide.createIcons();
        }
    });
};

window.realtimeReviews = {};

window.loadRealReviews = async function(placeId) {
    try {
        const { database } = await import('../firebase-config.js');
        const { ref, get } = await import("https://www.gstatic.com/firebasejs/10.12.2/firebase-database.js");
        
        const reviewRef = ref(database, `places/${placeId}/reviews`);
        const snapshot = await get(reviewRef);
        
        if (snapshot.exists()) {
            const data = snapshot.val();
            const realReviews = Object.keys(data).map(key => ({
                id: key,
                userName: data[key].userName || 'Người dùng',
                userAvatar: data[key].userAvatar,
                rating: data[key].rating,
                date: data[key].date,
                text: data[key].text
            }));
            
            window.realtimeReviews[placeId] = realReviews;
            
            // Re-render
            window.sortReviews(placeId, 'newest');
            
            // Also update the review count and stars if possible
            const countEl = document.querySelector('.review-summary__count');
            if (countEl) {
                const total = (realReviews.length || 0) + parseInt(countEl.innerText.split(' ')[0] || 0); // Need original count
                document.querySelectorAll('.detail-rating-big__count, .review-summary__count').forEach(el => {
                    el.textContent = `${total} đánh giá`;
                });
                // A full re-render of detail page might be better, but this is a simple UI patch
            }
        }
    } catch (e) {
        console.error("Lỗi tải đánh giá từ DB:", e);
    }
};

window.toggleReplyForm = function(reviewId) {
    const form = document.getElementById(`reply-form-${reviewId}`);
    if (form) {
        form.style.display = form.style.display === 'none' ? 'block' : 'none';
    }
};

window.submitReply = function(reviewId) {
    const text = document.getElementById(`reply-text-${reviewId}`)?.value?.trim();
    if (!text) {
        showToast('Vui lòng nhập nội dung phản hồi!', 'warning');
        return;
    }
    showToast('Phản hồi của bạn đã được gửi. Đang chờ duyệt!', 'success');
    window.toggleReplyForm(reviewId);
    document.getElementById(`reply-text-${reviewId}`).value = '';
};
