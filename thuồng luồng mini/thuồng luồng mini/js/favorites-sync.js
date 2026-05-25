// Sync favorites between localStorage and Firebase (logged-in users)
import { database } from './firebase-config.js';
import { ref, get, set } from 'https://www.gstatic.com/firebasejs/10.12.2/firebase-database.js';

function normalizeFavoriteIds(ids) {
    if (!Array.isArray(ids)) return [];
    return [...new Set(ids.map(id => {
        const n = Number(id);
        return Number.isNaN(n) ? String(id) : n;
    }))];
}

export async function loadFavoritesFromCloud(uid) {
    if (!uid) return null;
    try {
        const snap = await get(ref(database, `users/${uid}/favorites`));
        if (!snap.exists()) return null;
        const val = snap.val();
        if (Array.isArray(val)) return normalizeFavoriteIds(val);
        if (val && typeof val === 'object') return normalizeFavoriteIds(Object.values(val));
        return [];
    } catch (e) {
        console.warn('Không tải được yêu thích từ cloud:', e.message);
        return null;
    }
}

export async function saveFavoritesToCloud(uid, favorites) {
    if (!uid) return;
    try {
        await set(ref(database, `users/${uid}/favorites`), normalizeFavoriteIds(favorites));
    } catch (e) {
        console.warn('Không lưu yêu thích lên cloud:', e.message);
    }
}

export function mergeFavoriteLists(local, cloud) {
    const merged = [...(local || []), ...(cloud || [])];
    return normalizeFavoriteIds(merged);
}
