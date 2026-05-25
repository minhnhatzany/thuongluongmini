"use client";

import Link from "next/link";
import { Search, X, Moon, Sun, User, Shield, LogOut, Menu } from "lucide-react";
import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import AuthModal from "./AuthModal";
import { auth } from "@/lib/firebase";
import { onAuthStateChanged, signOut, User as FirebaseUser } from "firebase/auth";

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
  };

  const isActive = (path: string) => pathname === path ? "active" : "";

  return (
    <>
      <header className="header" id="main-header" role="banner">
        <div className="header__inner container">
          <Link href="/" className="header__logo" aria-label="Về trang chủ Thuồng Luồng Mini">
            <img src="/assets/logo.jpg" alt="Thuồng Luồng Mini" className="header__logo-img" width={40} height={40} />
            <span className="header__logo-text">Thuồng Luồng Mini</span>
          </Link>
          
          <nav className="nav" aria-label="Điều hướng chính">
            <ul className="nav__list">
              <li className="nav__item"><Link href="/" className={`nav__link ${isActive("/")}`}>Trang chủ</Link></li>
              <li className="nav__item"><Link href="/danh-muc/an-uong" className={`nav__link ${isActive("/danh-muc/an-uong")}`}>Ăn uống</Link></li>
              <li className="nav__item"><Link href="/danh-muc/vui-choi" className={`nav__link ${isActive("/danh-muc/vui-choi")}`}>Vui chơi</Link></li>
              <li className="nav__item"><Link href="/danh-muc/du-lich" className={`nav__link ${isActive("/danh-muc/du-lich")}`}>Du lịch</Link></li>
              <li className="nav__item"><Link href="/danh-muc/trang-phuc" className={`nav__link ${isActive("/danh-muc/trang-phuc")}`}>Trang phục</Link></li>
              <li className="nav__item"><Link href="/lo-trinh" className={`nav__link ${isActive("/lo-trinh")}`}>Lộ trình</Link></li>
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
                <Link href="/yeu-thich" style={{display: "flex", alignItems: "center", gap: "5px", textDecoration: "none", color: "var(--color-text)"}}>
                  {user.photoURL ? (
                    <img src={user.photoURL} alt="Avatar" style={{width: "32px", height: "32px", borderRadius: "50%", objectFit: "cover", border: "2px solid var(--color-primary)"}} />
                  ) : (
                    <div style={{width: "32px", height: "32px", borderRadius: "50%", background: "var(--color-primary)", color: "white", display: "flex", alignItems: "center", justifyContent: "center", fontWeight: "bold"}}>
                      {(user.displayName || user.email || "U")[0].toUpperCase()}
                    </div>
                  )}
                  <span className="hide-on-mobile" style={{fontWeight: 600}}>{(user.displayName || user.email || "").split("@")[0]}</span>
                </Link>
                <button onClick={handleLogout} className="btn btn--outline btn--sm" style={{padding: "5px", borderColor: "var(--color-border-dark)"}} aria-label="Đăng xuất">
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

      <AuthModal isOpen={isAuthModalOpen} onClose={() => setIsAuthModalOpen(false)} />
    </>
  );
}
