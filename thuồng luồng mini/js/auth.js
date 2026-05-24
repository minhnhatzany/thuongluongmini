// js/auth.js
import { auth, database } from './firebase-config.js';
import { ref, update } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-database.js";
import { 
    GoogleAuthProvider, 
    FacebookAuthProvider, 
    signInWithPopup, 
    signOut, 
    onAuthStateChanged 
} from "https://www.gstatic.com/firebasejs/10.12.2/firebase-auth.js";

// Global user state
window.currentUser = null;
window.isAdmin = false;

// Admin email configured by user
const ADMIN_EMAIL = 'minhnhatzany@gmail.com';

export function initAuth() {
    // Listen for auth state changes
    onAuthStateChanged(auth, async (user) => {
        if (user) {
            window.currentUser = user;
            window.isAdmin = (user.email === ADMIN_EMAIL);
            console.log("Logged in as:", user.displayName, window.isAdmin ? "(Admin)" : "(User)");
            
            // Save user profile to Realtime DB
            try {
                const userRef = ref(database, 'users/' + user.uid + '/profile');
                await update(userRef, {
                    name: user.displayName || 'Người dùng',
                    email: user.email,
                    avatar: user.photoURL || '',
                    lastLogin: new Date().toISOString(),
                    isAdmin: window.isAdmin
                });
            } catch (e) {
                console.error("Error saving user to DB:", e);
            }
            
            updateAuthUI(user);
        } else {
            window.currentUser = null;
            window.isAdmin = false;
            updateAuthUI(null);
        }
    });
}

// Attach immediately upon module load
window.signInWithGoogle = async () => {
    console.log("Clicked Google Sign-In");
    try {
        const provider = new GoogleAuthProvider();
        await signInWithPopup(auth, provider);
        if (window.closeAuthModal) window.closeAuthModal();
    } catch (error) {
        console.error("Google sign-in error:", error);
        if (error.code === 'auth/popup-blocked') {
            alert("Trình duyệt của bạn đã chặn cửa sổ bật lên (popup). Vui lòng cho phép popup để đăng nhập.");
        } else if (error.code === 'auth/unauthorized-domain') {
            alert("Tên miền này chưa được cấp phép trong Firebase. Vui lòng thêm vào Authorized domains trên Firebase Console.");
        } else {
            alert("Lỗi đăng nhập Google: " + error.message);
        }
    }
};

window.signInWithFacebook = async () => {
    console.log("Clicked Facebook Sign-In");
    try {
        const provider = new FacebookAuthProvider();
        await signInWithPopup(auth, provider);
        if (window.closeAuthModal) window.closeAuthModal();
    } catch (error) {
        console.error("Facebook sign-in error:", error);
        alert("Lỗi đăng nhập Facebook: " + error.message);
    }
};

window.logOut = async () => {
    try {
        await signOut(auth);
        if (window.location.hash.startsWith('#/admin') || window.location.hash.startsWith('#/ho-so')) {
            window.location.hash = '#/';
        }
    } catch (error) {
        console.error("Logout error:", error);
    }
};


function updateAuthUI(user) {
    const authBtn = document.getElementById('header-auth-btn');
    const userMenu = document.getElementById('header-user-menu');
    
    if (user) {
        // Logged in state
        if (authBtn) authBtn.style.display = 'none';
        
        if (userMenu) {
            userMenu.style.display = 'flex';
            const avatar = userMenu.querySelector('.user-avatar img');
            if (avatar) {
                avatar.src = user.photoURL || `https://ui-avatars.com/api/?name=${encodeURIComponent(user.displayName || 'User')}&background=F4A261&color=fff`;
            }
            
            // Show/hide admin link in dropdown
            const adminLink = document.getElementById('admin-link');
            if (adminLink) {
                adminLink.style.display = window.isAdmin ? 'block' : 'none';
            }
        }
    } else {
        // Logged out state
        if (authBtn) authBtn.style.display = 'flex';
        if (userMenu) userMenu.style.display = 'none';
    }
}
