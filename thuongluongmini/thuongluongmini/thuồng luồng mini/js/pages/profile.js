// js/pages/profile.js
import { getGamificationData, getGamificationDataAsync, RANKS } from '../gamification.js';
import { escapeHtml } from '../utils.js';

function buildProfileStatsHtml(userData) {
    const currentRank = RANKS.find(r => r.id === userData.rankId) || RANKS[0];
    const nextRankIdx = RANKS.findIndex(r => r.id === userData.rankId) + 1;
    const nextRank = nextRankIdx < RANKS.length ? RANKS[nextRankIdx] : null;

    let progressHtml = '';
    if (nextRank) {
        const pointsNeeded = nextRank.minPoints - userData.points;
        const totalPointsForLevel = nextRank.minPoints - currentRank.minPoints;
        const currentLevelPoints = userData.points - currentRank.minPoints;
        const progressPercent = Math.min(100, Math.max(0, (currentLevelPoints / totalPointsForLevel) * 100));

        progressHtml = `
            <div class="rank-progress" style="margin-top: 20px;">
                <div style="display: flex; justify-content: space-between; margin-bottom: 8px; font-size: 0.9rem;">
                    <span>${userData.points} điểm</span>
                    <span style="color: var(--text-muted);">Cần ${pointsNeeded} điểm để lên <strong>${escapeHtml(nextRank.name)}</strong></span>
                </div>
                <div class="progress-bar" style="height: 8px; background: #eee; border-radius: 4px; overflow: hidden;">
                    <div style="height: 100%; width: ${progressPercent}%; background: var(--color-primary); border-radius: 4px; transition: width 0.5s ease;"></div>
                </div>
            </div>
        `;
    } else {
        progressHtml = `
            <div class="rank-progress" style="margin-top: 20px; text-align: center; color: var(--color-primary); font-weight: bold;">
                🎉 Bạn đã đạt cấp bậc cao nhất!
            </div>
        `;
    }

    return `
        <div class="rank-badge" style="display: inline-flex; align-items: center; gap: 8px; background: ${currentRank.color}15; color: ${currentRank.color}; padding: 8px 16px; border-radius: 20px; font-weight: 600;">
            <span>${currentRank.icon}</span>
            <span>${escapeHtml(currentRank.name)}</span>
        </div>
        ${progressHtml}
        <div class="stats-grid" style="display: grid; grid-template-columns: 1fr 1fr; gap: 20px; margin-top: 30px;">
            <div class="stat-card" style="background: white; padding: 20px; border-radius: 16px; text-align: center; box-shadow: 0 2px 10px rgba(0,0,0,0.03);">
                <div style="font-size: 2rem; color: var(--color-primary); font-weight: 700;">${userData.totalReviews}</div>
                <div style="color: var(--text-muted); font-size: 0.9rem; margin-top: 5px;">Đánh giá đã viết</div>
            </div>
            <div class="stat-card" style="background: white; padding: 20px; border-radius: 16px; text-align: center; box-shadow: 0 2px 10px rgba(0,0,0,0.03);">
                <div style="font-size: 2rem; color: #2A9D8F; font-weight: 700;">${userData.checkIns}</div>
                <div style="color: var(--text-muted); font-size: 0.9rem; margin-top: 5px;">Lượt Check-in</div>
            </div>
        </div>
    `;
}

export function renderProfilePage() {
    if (!window.currentUser) {
        return `
            <div class="page-container" style="display: flex; align-items: center; justify-content: center; min-height: 70vh;">
                <div class="empty-state" style="text-align: center;">
                    <i data-lucide="user-x" style="width: 64px; height: 64px; color: var(--text-muted);"></i>
                    <h2 class="empty-state__title" style="margin-top: 20px;">Bạn chưa đăng nhập</h2>
                    <p class="empty-state__text">Vui lòng đăng nhập để xem hồ sơ và tích điểm nâng hạng.</p>
                    <button class="btn btn--primary" style="margin-top: 20px;" onclick="window.openAuthModal()">
                        Đăng nhập
                    </button>
                </div>
            </div>
        `;
    }

    const user = window.currentUser;
    const userData = getGamificationData(user.uid);

    return `
        <div class="page-container" style="padding-top: 40px; padding-bottom: 60px; max-width: 800px; margin: 0 auto;">
            <div class="profile-card" style="background: white; border-radius: 16px; padding: 30px; box-shadow: 0 4px 20px rgba(0,0,0,0.05); text-align: center;">
                <img src="${escapeHtml(user.photoURL || 'https://ui-avatars.com/api/?name=User')}" alt="Avatar" style="width: 100px; height: 100px; border-radius: 50%; border: 4px solid white; box-shadow: 0 4px 10px rgba(0,0,0,0.1); margin: 0 auto 20px;">
                
                <h1 style="font-size: 1.5rem; margin-bottom: 5px; color: var(--text-main); font-weight: 700;">${escapeHtml(user.displayName || 'Người dùng')}</h1>
                <p style="color: var(--text-muted); font-size: 0.9rem; margin-bottom: 20px;">${escapeHtml(user.email || '')}</p>
                
                <div id="profile-stats-root">
                    ${buildProfileStatsHtml(userData)}
                </div>
            </div>

            <div class="action-buttons" style="margin-top: 40px; text-align: center;">
                <a href="#/yeu-thich" class="btn btn--secondary" style="width: 100%; max-width: 300px; margin-bottom: 12px; display: inline-flex; justify-content: center; gap: 8px;">
                    <i data-lucide="heart"></i> Địa điểm yêu thích
                </a>
                <button class="btn btn--secondary" onclick="window.logOut()" style="width: 100%; max-width: 300px;">
                    <i data-lucide="log-out"></i> Đăng xuất
                </button>
            </div>
        </div>
    `;
}

export async function initProfilePage() {
    if (!window.currentUser) return;
    const root = document.getElementById('profile-stats-root');
    if (!root) return;

    const userData = await getGamificationDataAsync(window.currentUser.uid);
    root.innerHTML = buildProfileStatsHtml(userData);
    if (window.lucide) window.lucide.createIcons();
}
