"use client";

import Link from "next/link";
import { Search, X, Moon, Sun, User, Shield, LogOut, Menu, Home, Compass, Heart } from "lucide-react";
import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import AuthModal from "./AuthModal";
import { auth } from "@/lib/firebase";
import { onAuthStateChanged, signOut, User as FirebaseUser } from "firebase/auth";
import PushNotificationManager from "./PushNotificationManager";

export default function Header() {
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [user, setUser] = useState<FirebaseUser | null>(null);
  const pathname = usePathname();

  useEffect(() => {
    // Check initial dark mode preference
    const isDark = document.documentElement.getAttribute('data-theme') === 'dark' || 
                   localStorage.getItem('tlm_theme') === 'dark' ||
                   (!localStorage.getItem('tlm_theme') && window.matchMedia('(prefers-color-scheme: dark)').matches);
    
    if (isDark) {
      setIsDarkMode(true);
      document.documentElement.setAttribute('data-theme', 'dark');
    } else {
      setIsDarkMode(false);
      document.documentElement.setAttribute('data-theme', 'light');
    }

    // Listen to Firebase Auth state
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });

    return () => unsubscribe();
  }, []);

  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
    if (!isDarkMode) {
      document.documentElement.setAttribute('data-theme', 'dark');
      localStorage.setItem('tlm_theme', 'dark');
    } else {
      document.documentElement.setAttribute('data-theme', 'light');
      localStorage.setItem('tlm_theme', 'light');
    }
  };

  const handleLogout = () => {
    signOut(auth);
    setIsMobileMenuOpen(false);
  };

  const isActive = (path: string) => pathname === path ? "active" : "";

  return (
    <>
      <header className="header" id="main-header" role="banner">
        <div className="header__inner container">
          <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
            <button 
              className="mobile-menu-toggle d-none" 
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              style={{ background: "none", border: "none", color: "var(--color-text)", cursor: "pointer", padding: "5px" }}
              aria-label="Menu"
            >
              {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
            <Link href="/" className="header__logo" aria-label="Về trang chủ Thuồng Luồng Mini" onClick={() => setIsMobileMenuOpen(false)}>
              <img src="/assets/logo.jpg" alt="Thuồng Luồng Mini" className="header__logo-img" width={40} height={40} />
              <span className="header__logo-text">Thuồng Luồng Mini</span>
            </Link>
          </div>
          
          <nav className="nav" aria-label="Điều hướng chính">
            <ul className="nav__list">
              <li className="nav__item"><Link href="/" className={`nav__link ${isActive("/")}`}>Trang chủ</Link></li>
              <li className="nav__item"><Link href="/danh-muc/an-uong" className={`nav__link ${isActive("/danh-muc/an-uong")}`}>Ăn uống</Link></li>
              <li className="nav__item"><Link href="/lo-trinh" className={`nav__link ${isActive("/lo-trinh")}`}>Lộ trình</Link></li>
              <li className="nav__item"><Link href="/leaderboard" className={`nav__link ${isActive("/leaderboard")}`} style={{display: "flex", alignItems: "center", gap: "5px", color: "var(--color-primary)"}}>Bảng Xếp Hạng</Link></li>
            </ul>
          </nav>
          
          <div className="header__search" role="search">
            <div className="search-bar">
              <Search className="search-bar__icon" aria-hidden="true" size={18} />
              <input type="text" className="search-bar__input" placeholder="Tìm quán ăn, cafe..." style={{paddingLeft: "3.5rem"}} />
            </div>
          </div>
          
          <div className="header__actions">
            {/* Dark Mode Toggle */}
            <button className="header__action-btn dark-mode-toggle" onClick={toggleDarkMode} aria-label="Chuyển sang chế độ tối" style={{marginRight: "10px"}}>
              {isDarkMode ? <Sun size={20} className="dark-mode-icon" /> : <Moon size={20} className="dark-mode-icon" />}
            </button>
            
            {user ? (
              <div style={{display: "flex", alignItems: "center", gap: "10px"}}>
                {["minhnhatzany@gmail.com", "minhnhat@gmail.com", "admin@thuongluongmini.com"].some(email => user.email?.includes(email.split('@')[0])) && (
                  <Link href="/admin" className="btn btn--outline btn--sm hide-on-mobile" style={{padding: "5px 10px", borderColor: "var(--color-primary)", color: "var(--color-primary)"}}>
                    <Shield size={16} /> Admin
                  </Link>
                )}
                <Link href="/profile" style={{display: "flex", alignItems: "center", gap: "5px", textDecoration: "none", color: "var(--color-text)"}}>
                  {user.photoURL ? (
                    <img src={user.photoURL} alt="Avatar" style={{width: "32px", height: "32px", borderRadius: "50%", objectFit: "cover", border: "2px solid var(--color-primary)"}} />
                  ) : (
                    <div style={{width: "32px", height: "32px", borderRadius: "50%", background: "var(--color-primary)", color: "white", display: "flex", alignItems: "center", justifyContent: "center", fontWeight: "bold"}}>
                      {(user.displayName || user.email || "U")[0].toUpperCase()}
                    </div>
                  )}
                  <span className="hide-on-mobile" style={{fontWeight: 600}}>{(user.displayName || user.email || "").split("@")[0]}</span>
                </Link>
                <button onClick={handleLogout} className="btn btn--outline btn--sm hide-on-mobile" style={{padding: "5px", borderColor: "var(--color-border-dark)"}} aria-label="Đăng xuất">
                  <LogOut size={16} />
                </button>
              </div>
            ) : (
              <button onClick={() => setIsAuthModalOpen(true)} className="btn btn--outline btn--sm" aria-label="Đăng nhập hoặc đăng ký">
                <User size={16} />
                <span className="hide-on-mobile">Đăng nhập</span>
              </button>
            )}
          </div>
        </div>
      </header>

      {/* Mobile Menu Overlay */}
      <div className={`mobile-menu-overlay ${isMobileMenuOpen ? 'active' : ''}`}>
        <div className="mobile-menu-content">
          <nav className="mobile-menu-nav">
            <Link href="/" className={`mobile-menu-link ${isActive("/")}`} onClick={() => setIsMobileMenuOpen(false)}>
              <Home size={20} /> Trang chủ
            </Link>
            <Link href="/danh-muc/an-uong" className={`mobile-menu-link ${isActive("/danh-muc/an-uong")}`} onClick={() => setIsMobileMenuOpen(false)}>
              <Compass size={20} /> Khám phá
            </Link>
            <Link href="/tim-kiem" className={`mobile-menu-link ${isActive("/tim-kiem")}`} onClick={() => setIsMobileMenuOpen(false)}>
              <Search size={20} /> Tìm kiếm
            </Link>
            <Link href="/yeu-thich" className={`mobile-menu-link ${isActive("/yeu-thich")}`} onClick={() => setIsMobileMenuOpen(false)}>
              <Heart size={20} /> Yêu thích
            </Link>
            <Link href="/lo-trinh" className={`mobile-menu-link ${isActive("/lo-trinh")}`} onClick={() => setIsMobileMenuOpen(false)}>
              <Compass size={20} /> Lộ trình
            </Link>
            <Link href="/leaderboard" className={`mobile-menu-link ${isActive("/leaderboard")}`} onClick={() => setIsMobileMenuOpen(false)} style={{ color: "var(--color-primary)" }}>
              Bảng Xếp Hạng
            </Link>
          </nav>
          
          <div className="mobile-menu-divider"></div>
          
          <div className="mobile-menu-actions">
            <button onClick={toggleDarkMode} style={{ display: "flex", alignItems: "center", gap: "10px", padding: "10px", width: "100%", background: "transparent", border: "none", color: "var(--color-text)", cursor: "pointer", textAlign: "left", marginBottom: "5px" }}>
              {isDarkMode ? <Sun size={20} /> : <Moon size={20} />}
              <span>{isDarkMode ? "Chế độ sáng" : "Chế độ tối"}</span>
            </button>
            <PushNotificationManager />
            
            {user && (
              <button onClick={handleLogout} style={{ display: "flex", alignItems: "center", gap: "10px", padding: "10px", width: "100%", background: "transparent", border: "none", color: "var(--color-danger)", cursor: "pointer", textAlign: "left", marginTop: "10px" }}>
                <LogOut size={20} />
                <span>Đăng xuất</span>
              </button>
            )}
          </div>
        </div>
      </div>

      <AuthModal isOpen={isAuthModalOpen} onClose={() => setIsAuthModalOpen(false)} />
    </>
  );
}
