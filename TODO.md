# Checklist Fix & Nâng cấp Thuồng Luồng Mini

## 🐛 Bug Critical
- [ ] Fix `escapeHtml` trong `utils.js` — `&` -> `&` (XSS) — ĐÃ FIX
- [ ] Fix `getNewPlaces` — home.js gọi với limit param nhưng hàm không nhận param
- [ ] Xoá Lotte Cinema trùng (id=10 và id=18)
- [ ] Fix TOURISM_PLACES thiếu fields: subCategory, slug, priceText, fullDescription, phone, openHours, social, menu
- [ ] Fix `JSON.stringify` trong data attribute category.js (XSS/injection)

## 🎨 Thiếu CSS
- [ ] Kiểm tra và thêm CSS bị thiếu cho các component
- [ ] Thêm CSS cho `.card__desc`, `.page-transitioning`, `.page-header`, `.page-title`, `.page-subtitle`
- [ ] Thêm CSS cho `.category-hero` styles
- [ ] Thêm CSS cho `.hero__stats`, `.hero__stat`, `.hero__scroll-indicator`, `.hero__badge`, `.highlight`
- [ ] Thêm CSS cho `.cta-card`, `.section__see-all`, `.section-header`, `.section-title`
- [ ] Thêm CSS cho `.admin-dashboard`, `.admin-nav`, `.admin-main`, `.admin-user`, `.form-group`, `.form-control`
- [ ] Thêm CSS cho `.category-map`, `.category-map-section`, `.category-card__arrow`, `.category-card__count`
- [ ] Thêm CSS cho `.profile-card`, `.stats-grid`, `.stat-card`, `.rank-badge`
- [ ] Thêm CSS cho `.toast__close` button style
- [ ] Thêm CSS cho `.search-bar--lg`, `.search-page-bar`, `.search-page-header`
- [ ] Thêm CSS cho `.itinerary-timeline`, `.timeline-item` styles
- [ ] Thêm CSS cho `.two-col-layout` responsive styles

## 📱 Mobile Fixes
- [ ] Fix hero search button overlap trên mobile
- [ ] Fix detail mobile CTA overlap với bottom nav
- [ ] Touch targets tối thiểu 44px
- [ ] Fix bottom safe area cho iOS notch
- [ ] Thêm CSS cho `.mobile-nav` active states
- [ ] Fix chatbot window trên mobile bị che

## ⚡ Performance & SEO
- [ ] Thêm `preconnect` cho Google Fonts và Firebase
- [ ] Thêm `alt` text cho ảnh thiếu
- [ ] Thêm `loading="lazy"` cho ảnh gallery
- [ ] PWA manifest: icons PNG thay vì JPEG
- [ ] Sitemap cập nhật

## 🔧 Functional Fixes
- [ ] Fix `openAuthModal` fallback khi chưa định nghĩa
- [ ] Fix `checkInPlace` — kiểm tra window.openAuthModal tồn tại
- [ ] Fix review loading race condition (Symbol loadId)
- [ ] Fix booking form — không mở tel nếu ko có phone
- [ ] Thêm hiệu ứng loading khi chuyển trang
