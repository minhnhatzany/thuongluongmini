import { PLACES } from '../data.js';
import { createPlaceCard } from '../utils.js';

export function renderItineraryGenerator() {
    return `
        <div class="page-container" style="background: var(--color-bg-white);">
            <div class="container" style="max-width: 800px; padding: var(--space-8) var(--space-4);">
                
                <div class="itinerary-header" style="text-align: center; margin-bottom: var(--space-8);">
                    <div style="font-size: 48px; margin-bottom: var(--space-4);">✨</div>
                    <h1 style="font-size: var(--text-4xl); font-weight: var(--weight-black); margin-bottom: var(--space-2); color: var(--color-text-heading);">Tạo Lịch Trình Tự Động</h1>
                    <p style="color: var(--color-text-secondary); font-size: var(--text-lg);">Trả lời 3 câu hỏi nhanh, Thuồng Luồng sẽ sắp xếp cho bạn một lịch trình đi chơi hoàn hảo!</p>
                </div>

                <div id="itinerary-form-container" class="card" style="padding: var(--space-6); border-radius: var(--radius-2xl); box-shadow: var(--shadow-lg); background: var(--color-bg-card);">
                    <form id="ai-itinerary-form" onsubmit="window.generateAIItinerary(event)">
                        
                        <!-- Question 1 -->
                        <div style="margin-bottom: var(--space-6);">
                            <label style="display: block; font-weight: var(--weight-bold); font-size: var(--text-lg); margin-bottom: var(--space-3); color: var(--color-text-heading);">
                                1. Bạn đi với ai? 👥
                            </label>
                            <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(140px, 1fr)); gap: var(--space-3);">
                                <label class="radio-card">
                                    <input type="radio" name="who" value="solo" required>
                                    <div class="radio-card__content">
                                        <div class="radio-card__icon">🚶</div>
                                        <div>Một mình</div>
                                    </div>
                                </label>
                                <label class="radio-card">
                                    <input type="radio" name="who" value="couple">
                                    <div class="radio-card__content">
                                        <div class="radio-card__icon">👩‍❤️‍👨</div>
                                        <div>Cặp đôi</div>
                                    </div>
                                </label>
                                <label class="radio-card">
                                    <input type="radio" name="who" value="friends">
                                    <div class="radio-card__content">
                                        <div class="radio-card__icon">👯‍♂️</div>
                                        <div>Nhóm bạn</div>
                                    </div>
                                </label>
                                <label class="radio-card">
                                    <input type="radio" name="who" value="family">
                                    <div class="radio-card__content">
                                        <div class="radio-card__icon">👨‍👩‍👧‍👦</div>
                                        <div>Gia đình</div>
                                    </div>
                                </label>
                            </div>
                        </div>

                        <!-- Question 2 -->
                        <div style="margin-bottom: var(--space-6);">
                            <label style="display: block; font-weight: var(--weight-bold); font-size: var(--text-lg); margin-bottom: var(--space-3); color: var(--color-text-heading);">
                                2. "Hầu bao" của bạn thế nào? 💰
                            </label>
                            <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(140px, 1fr)); gap: var(--space-3);">
                                <label class="radio-card">
                                    <input type="radio" name="budget" value="cheap" required>
                                    <div class="radio-card__content">
                                        <div class="radio-card__icon">🍜</div>
                                        <div>HSSV / Tiết kiệm</div>
                                    </div>
                                </label>
                                <label class="radio-card">
                                    <input type="radio" name="budget" value="mid">
                                    <div class="radio-card__content">
                                        <div class="radio-card__icon">🍕</div>
                                        <div>Vừa phải</div>
                                    </div>
                                </label>
                                <label class="radio-card">
                                    <input type="radio" name="budget" value="high">
                                    <div class="radio-card__content">
                                        <div class="radio-card__icon">🦞</div>
                                        <div>Sang chảnh</div>
                                    </div>
                                </label>
                            </div>
                        </div>

                        <!-- Question 3 -->
                        <div style="margin-bottom: var(--space-8);">
                            <label style="display: block; font-weight: var(--weight-bold); font-size: var(--text-lg); margin-bottom: var(--space-3); color: var(--color-text-heading);">
                                3. Phong cách bạn muốn? 🎯
                            </label>
                            <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(140px, 1fr)); gap: var(--space-3);">
                                <label class="radio-card">
                                    <input type="radio" name="vibe" value="foodie" required>
                                    <div class="radio-card__content">
                                        <div class="radio-card__icon">🤤</div>
                                        <div>Ăn sập Tuyên Quang</div>
                                    </div>
                                </label>
                                <label class="radio-card">
                                    <input type="radio" name="vibe" value="chill">
                                    <div class="radio-card__content">
                                        <div class="radio-card__icon">🍃</div>
                                        <div>Nhẹ nhàng Chill</div>
                                    </div>
                                </label>
                                <label class="radio-card">
                                    <input type="radio" name="vibe" value="explore">
                                    <div class="radio-card__content">
                                        <div class="radio-card__icon">📸</div>
                                        <div>Sống ảo / Khám phá</div>
                                    </div>
                                </label>
                            </div>
                        </div>

                        <button type="submit" class="btn btn--primary btn--lg btn--full" style="font-size: var(--text-xl); border-radius: var(--radius-full); padding: var(--space-4);">
                            Bắt đầu tạo lịch trình <i data-lucide="wand-2"></i>
                        </button>
                    </form>
                </div>

                <!-- Result Container -->
                <div id="itinerary-result-container" style="display: none; margin-top: var(--space-8);">
                    <div style="text-align: center; margin-bottom: var(--space-6);">
                        <h2 style="font-size: var(--text-3xl); font-weight: var(--weight-bold); color: var(--color-primary); margin-bottom: var(--space-2);">Tèn ten! Lịch trình của bạn đây 🎉</h2>
                        <p style="color: var(--color-text-secondary);">Bạn có thể lưu lại hoặc chia sẻ cho bạn bè!</p>
                    </div>

                    <div class="itinerary-timeline" id="ai-timeline-content">
                        <!-- Filled via JS -->
                    </div>

                    <div style="margin-top: var(--space-8); display: flex; gap: var(--space-4); justify-content: center;">
                        <button class="btn btn--outline" onclick="document.getElementById('itinerary-form-container').style.display='block'; document.getElementById('itinerary-result-container').style.display='none'; window.scrollTo(0,0);">
                            <i data-lucide="refresh-cw"></i> Tạo lại
                        </button>
                        <button class="btn btn--primary" onclick="alert('Đã lưu lịch trình (tính năng đang phát triển)')">
                            <i data-lucide="save"></i> Lưu lịch trình
                        </button>
                    </div>
                </div>

            </div>
        </div>

        <style>
            .radio-card input {
                display: none;
            }
            .radio-card__content {
                display: flex;
                flex-direction: column;
                align-items: center;
                justify-content: center;
                padding: var(--space-4);
                border: 2px solid var(--color-border);
                border-radius: var(--radius-xl);
                cursor: pointer;
                transition: all var(--duration-fast);
                background: var(--color-bg-white);
                text-align: center;
                height: 100%;
                font-weight: var(--weight-semibold);
                color: var(--color-text-secondary);
            }
            .radio-card__icon {
                font-size: 32px;
                margin-bottom: var(--space-2);
            }
            .radio-card input:checked + .radio-card__content {
                border-color: var(--color-primary);
                background: var(--color-primary-lighter);
                color: var(--color-primary-dark);
                box-shadow: 0 4px 12px rgba(244, 162, 97, 0.2);
                transform: translateY(-2px);
            }
            .radio-card:hover .radio-card__content {
                border-color: var(--color-primary-light);
            }
        </style>
    `;
}

export function initItineraryGenerator() {
    if (window.lucide) {
        window.lucide.createIcons();
    }
}

window.generateAIItinerary = function(e) {
    e.preventDefault();
    
    // Simulate loading
    const btn = e.target.querySelector('button[type="submit"]');
    const originalText = btn.innerHTML;
    btn.innerHTML = '<i data-lucide="loader" class="spin"></i> Đang tính toán...';
    if (window.lucide) window.lucide.createIcons();
    
    setTimeout(() => {
        btn.innerHTML = originalText;
        if (window.lucide) window.lucide.createIcons();
        
        document.getElementById('itinerary-form-container').style.display = 'none';
        document.getElementById('itinerary-result-container').style.display = 'block';
        
        // Simple logic to pick places
        const formData = new FormData(e.target);
        const budget = formData.get('budget');
        const vibe = formData.get('vibe');
        
        // Filter pool
        let pool = [...PLACES];
        
        // Very basic mock logic to pick 4 places for morning, noon, afternoon, evening
        const morning = pool.filter(p => p.category === 'an-uong' && (p.name.toLowerCase().includes('phở') || p.name.toLowerCase().includes('bún')))[0] || pool[0];
        const noon = pool.filter(p => p.category === 'an-uong' && p.subCategory !== 'cafe')[1] || pool[1];
        const afternoon = pool.filter(p => p.category === 'cafe')[0] || pool[2];
        const evening = pool.filter(p => p.category === 'an-uong' && (p.name.toLowerCase().includes('lẩu') || p.name.toLowerCase().includes('nhậu')))[0] || pool[3];
        
        const timelineHtml = `
            <div class="itinerary-detail__timeline" style="max-width: 600px; margin: 0 auto; text-align: left;">
                <div class="timeline-item">
                    <div class="timeline-item__time">08:00</div>
                    <div class="timeline-item__content">
                        <h4 style="margin-top:0; color: var(--color-primary);">Ăn sáng nạp năng lượng ☀️</h4>
                        ${createPlaceCard(morning)}
                    </div>
                </div>
                <div class="timeline-item">
                    <div class="timeline-item__time">12:00</div>
                    <div class="timeline-item__content">
                        <h4 style="margin-top:0; color: var(--color-primary);">Ăn trưa no nê 🍲</h4>
                        ${createPlaceCard(noon)}
                    </div>
                </div>
                <div class="timeline-item">
                    <div class="timeline-item__time">15:00</div>
                    <div class="timeline-item__content">
                        <h4 style="margin-top:0; color: var(--color-primary);">Cafe chém gió & Sống ảo 📸</h4>
                        ${createPlaceCard(afternoon)}
                    </div>
                </div>
                <div class="timeline-item">
                    <div class="timeline-item__time">19:00</div>
                    <div class="timeline-item__content">
                        <h4 style="margin-top:0; color: var(--color-primary);">Ăn tối sương sương 🌙</h4>
                        ${createPlaceCard(evening)}
                    </div>
                </div>
            </div>
        `;
        
        document.getElementById('ai-timeline-content').innerHTML = timelineHtml;
        if (window.lucide) window.lucide.createIcons();
        window.scrollTo(0, 0);
        
    }, 1500); // 1.5s fake loading
};
