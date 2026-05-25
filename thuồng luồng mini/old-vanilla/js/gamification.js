// js/gamification.js

import { database } from './firebase-config.js';
import { ref, get, set, update } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-database.js";

export const RANKS = [
    { id: 'bronze', name: 'Thường Dân', minPoints: 0, color: '#CD7F32', icon: '🥉' },
    { id: 'silver', name: 'Phượt Thủ', minPoints: 50, color: '#C0C0C0', icon: '🥈' },
    { id: 'gold', name: 'Thổ Địa', minPoints: 150, color: '#FFD700', icon: '🥇' },
    { id: 'diamond', name: 'Chiến Thần', minPoints: 300, color: '#00BFFF', icon: '💎' }
];

// Get user data asynchronously from Firebase
export async function getGamificationDataAsync(userId) {
    const defaultData = { points: 0, totalReviews: 0, checkIns: 0, rankId: 'bronze' };
    if (!userId) return defaultData;
    
    try {
        const userRef = ref(database, 'users/' + userId + '/gamification');
        const snapshot = await get(userRef);
        if (snapshot.exists()) {
            const data = snapshot.val();
            // Cache locally
            localStorage.setItem(`tlm_user_${userId}`, JSON.stringify(data));
            return data;
        }
    } catch (e) {
        console.error("Firebase getGamificationDataAsync error:", e);
    }
    
    // Fallback to local
    return getGamificationData(userId);
}

// Get user data synchronously from LocalStorage (for fast UI rendering)
export function getGamificationData(userId) {
    const defaultData = {
        points: 0,
        totalReviews: 0,
        checkIns: 0,
        rankId: 'bronze'
    };
    
    if (!userId) return defaultData;
    
    try {
        const data = JSON.parse(localStorage.getItem(`tlm_user_${userId}`) || 'null');
        return data || defaultData;
    } catch (e) {
        return defaultData;
    }
}

export async function updateGamificationData(userId, action) {
    if (!userId) return null;
    
    // Get latest from cache or DB
    const data = getGamificationData(userId);
    let pointsAdded = 0;
    
    switch (action) {
        case 'ADD_REVIEW':
            pointsAdded = 10;
            data.totalReviews += 1;
            break;
        case 'CHECK_IN':
            pointsAdded = 5;
            data.checkIns += 1;
            break;
    }
    
    data.points += pointsAdded;
    
    // Calculate new rank
    let newRankId = 'bronze';
    for (const rank of [...RANKS].reverse()) {
        if (data.points >= rank.minPoints) {
            newRankId = rank.id;
            break;
        }
    }
    
    const rankChanged = data.rankId !== newRankId;
    data.rankId = newRankId;
    
    // Save to LocalStorage immediately
    localStorage.setItem(`tlm_user_${userId}`, JSON.stringify(data));
    
    // Save to Firebase asynchronously
    try {
        const userRef = ref(database, 'users/' + userId + '/gamification');
        await set(userRef, data);
    } catch (e) {
        console.error("Firebase updateGamificationData error:", e);
    }
    
    return { pointsAdded, rankChanged, newRank: RANKS.find(r => r.id === newRankId) };
}
