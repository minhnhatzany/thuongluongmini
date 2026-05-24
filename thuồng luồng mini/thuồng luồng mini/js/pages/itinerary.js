// js/pages/itinerary.js

import { ITINERARIES } from '../itinerary-data.js';

export function renderItineraryList() {
    return `
        <div class="page-container">
            <div class="container animate-on-scroll">
                <div class="section-header">
                    <h1 class="section-title">Lộ trình nổi bật</h1>
                    <p style="color: var(--text-muted); margin-top: var(--space-2);">Gợi ý lịch trình hoàn hảo cho chuyến đi của bạn</p>
                </div>
                
                <div class="grid" style="--grid-cols: 2; margin-top: var(--space-6);">
                    ${ITINERARIES.map(it => `
                        <a href="#/lo-trinh/${it.id}" class="card" style="text-decoration: none;">
                            <div class="card__image-wrapper" style="padding-bottom: 56.25%;">
                                <img src="${it.image}" alt="${it.title}" loading="lazy" class="card__image" style="object-fit: cover; width: 100%; height: 100%; position: absolute; top: 0; left: 0;">
                                <div class="card__badges" style="position: absolute; top: 10px; left: 10px;">
                                    <span class="badge" style="background: var(--color-primary); color: white;">${it.duration}</span>
                                </div>
                            </div>
                            <div class="card__content" style="padding: var(--space-4);">
                                <h3 class="card__title" style="font-size: 1.25rem; margin-bottom: var(--space-2); color: var(--text-main);">${it.title}</h3>
                                <p style="color: var(--text-muted); font-size: 0.95rem; margin-bottom: var(--space-3); line-height: 1.5;">${it.shortDesc}</p>
                                
                                <div style="display: flex; gap: var(--space-2); flex-wrap: wrap; margin-bottom: var(--space-4);">
                                    ${it.tags.map(tag => `<span class="tag" style="background: var(--bg-body); padding: 2px 8px; border-radius: 12px; font-size: 0.8rem; color: var(--color-primary);">#${tag}</span>`).join('')}
                                </div>
                                
                                <div style="display: flex; justify-content: space-between; align-items: center; border-top: 1px solid var(--border-color); padding-top: var(--space-3); font-size: 0.9rem; color: var(--text-main);">
                                    <span style="display: flex; align-items: center; gap: 4px;"><i data-lucide="map" style="width: 16px; height: 16px;"></i> ${it.distance}</span>
                                    <span style="display: flex; align-items: center; gap: 4px; font-weight: 600; color: var(--color-danger);"><i data-lucide="wallet" style="width: 16px; height: 16px;"></i> ${it.costEstimate.split('/')[0]}</span>
                                </div>
                            </div>
                        </a>
                    `).join('')}
                </div>
            </div>
        </div>
    `;
}

export function renderItineraryDetail(id) {
    const it = ITINERARIES.find(i => i.id === id);
    if (!it) return `<div class="container"><div class="empty-state"><h2>Không tìm thấy lộ trình</h2><a href="#/lo-trinh" class="btn btn--primary">Quay lại</a></div></div>`;

    return `
        <div class="page-container">
            <!-- Hero -->
            <div style="position: relative; height: 40vh; min-height: 300px; display: flex; align-items: flex-end; padding-bottom: var(--space-6);">
                <div style="position: absolute; inset: 0; background: url('${it.image}') center/cover; z-index: 0;"></div>
                <div style="position: absolute; inset: 0; background: linear-gradient(to bottom, transparent, rgba(0,0,0,0.8)); z-index: 1;"></div>
                <div class="container" style="position: relative; z-index: 2; color: white;">
                    <a href="#/lo-trinh" style="color: white; text-decoration: none; display: inline-flex; align-items: center; gap: 8px; margin-bottom: var(--space-4); opacity: 0.8; font-weight: 600;">
                        <i data-lucide="arrow-left"></i> Trở về danh sách
                    </a>
                    <div style="display: flex; gap: var(--space-2); margin-bottom: var(--space-3);">
                        <span class="badge" style="background: var(--color-primary); color: white; border: none;">${it.duration}</span>
                        <span class="badge" style="background: rgba(255,255,255,0.2); color: white; backdrop-filter: blur(4px); border: none;">${it.distance}</span>
                        <span class="badge" style="background: rgba(255,255,255,0.2); color: white; backdrop-filter: blur(4px); border: none;">${it.transport}</span>
                    </div>
                    <h1 style="font-size: clamp(2rem, 5vw, 3rem); font-weight: 800; margin-bottom: var(--space-2); line-height: 1.2;">${it.title}</h1>
                    <p style="font-size: 1.1rem; opacity: 0.9; max-width: 600px;">${it.shortDesc}</p>
                </div>
            </div>

            <div class="container" style="margin-top: var(--space-8);">
                <div class="two-col-layout" style="--sidebar-width: 350px;">
                    <!-- Timeline Main -->
                    <div class="itinerary-timeline">
                        <div class="section-header animate-on-scroll" style="margin-bottom: var(--space-6);">
                            <h2 style="font-size: 1.8rem; display: flex; align-items: center; gap: var(--space-2); color: var(--text-main);">
                                <i data-lucide="map" style="color: var(--color-primary);"></i> Lịch trình chi tiết
                            </h2>
                        </div>
                        
                        <div style="display: flex; flex-direction: column; gap: var(--space-6);">
                            ${it.days.map(day => `
                                <div class="itinerary-day animate-on-scroll" style="background: var(--bg-card); padding: var(--space-6); border-radius: var(--radius-lg); box-shadow: var(--shadow-sm); border: 1px solid var(--border-color);">
                                    <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: var(--space-5); padding-bottom: var(--space-3); border-bottom: 1px dashed var(--border-color);">
                                        <h3 style="font-size: 1.3rem; color: var(--color-primary); display: flex; align-items: center; gap: 8px;">
                                            <span style="background: var(--color-primary-light); color: var(--color-primary-dark); padding: 4px 12px; border-radius: 20px; font-size: 0.9rem;">Ngày ${day.day}</span>
                                            ${day.title}
                                        </h3>
                                        <span style="color: var(--text-muted); font-size: 0.9rem; font-weight: 600;">Quãng đường: ${day.distance}</span>
                                    </div>
                                    
                                    <div class="timeline" style="position: relative; padding-left: 20px;">
                                        <!-- Vertical line -->
                                        <div style="position: absolute; top: 10px; bottom: 10px; left: 0; width: 2px; background: var(--border-color);"></div>
                                        
                                        ${day.activities.map(act => `
                                            <div class="timeline-item" style="position: relative; margin-bottom: var(--space-4); display: flex; gap: var(--space-4);">
                                                <div style="position: absolute; left: -25px; top: 4px; width: 12px; height: 12px; border-radius: 50%; background: white; border: 2px solid ${getIconColor(act.type)}; z-index: 2;"></div>
                                                <div style="font-weight: 700; color: var(--text-main); min-width: 50px;">${act.time}</div>
                                                <div style="color: var(--text-muted); flex: 1;">${act.desc}</div>
                                            </div>
                                        `).join('')}
                                    </div>
                                </div>
                            `).join('')}
                        </div>
                    </div>

                    <!-- Sidebar -->
                    <aside>
                        <!-- Booking Tips Card -->
                        <div class="detail-sidebar-card animate-on-scroll" style="position: sticky; top: calc(var(--header-height) + 20px);">
                            <h3 class="detail-sidebar-card__title">
                                <i data-lucide="info"></i>
                                Thông tin cần biết
                            </h3>
                            
                            <div style="margin-bottom: var(--space-4); padding-bottom: var(--space-4); border-bottom: 1px solid var(--border-color);">
                                <div style="display: flex; justify-content: space-between; margin-bottom: var(--space-2);">
                                    <span style="color: var(--text-muted);">Chi phí dự kiến:</span>
                                    <span style="font-weight: 700; color: var(--color-danger);">${it.costEstimate}</span>
                                </div>
                            </div>
                            
                            <h4 style="font-size: 1rem; margin-bottom: var(--space-2); color: var(--text-main);">💡 Tips hữu ích</h4>
                            <ul style="padding-left: var(--space-4); margin-bottom: var(--space-5); color: var(--text-muted); font-size: 0.95rem;">
                                ${it.tips.map(tip => `<li style="margin-bottom: 8px;">${tip}</li>`).join('')}
                            </ul>

                            <h4 style="font-size: 1rem; margin-bottom: var(--space-2); color: var(--text-main);">🏠 Gợi ý đặt phòng</h4>
                            ${it.days.filter(d => d.sleepLocation && d.bookingLinks.length > 0).map(d => `
                                <div style="margin-bottom: var(--space-3);">
                                    <div style="font-weight: 600; font-size: 0.9rem; color: var(--color-primary); margin-bottom: 4px;">Ngủ đêm tại ${d.sleepLocation}:</div>
                                    <div style="display: flex; flex-direction: column; gap: 8px;">
                                        ${d.bookingLinks.map(link => `
                                            <a href="${link.url}" onclick="window.showToast('Đang chuyển đến đối tác đặt phòng...', 'info')" class="btn btn--outline btn--sm" style="justify-content: flex-start; text-align: left; padding: 8px 12px;">
                                                <i data-lucide="hotel" style="width: 14px; height: 14px;"></i> ${link.name}
                                            </a>
                                        `).join('')}
                                    </div>
                                </div>
                            `).join('')}
                            
                            <button class="btn btn--primary btn--block" onclick="window.showToast('Bạn phải lưu vào yêu thích mới xài offline được nhé!', 'info')" style="margin-top: var(--space-4);">
                                <i data-lucide="download"></i> Tải lộ trình (Offline)
                            </button>
                        </div>
                    </aside>
                </div>
            </div>
        </div>
    `;
}

function getIconColor(type) {
    const colors = {
        'location': '#2A9D8F',
        'photo': '#E9C46A',
        'food': '#F4A261',
        'culture': '#9B59B6',
        'history': '#34495E',
        'sleep': '#003580',
        'activity': '#E76F51',
        'shopping': '#E84393'
    };
    return colors[type] || '#2A9D8F';
}
