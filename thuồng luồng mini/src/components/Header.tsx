"use client";

import Link from "next/link";
import { Search, X, Moon, Sun, User, Shield, LogOut, Menu, Home, Compass, Heart, Map, Trophy } from "lucide-react";
import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import AuthModal from "./AuthModal";
import { auth } from "@/lib/firebase";
import { onAuthStateChanged, signOut, User as FirebaseUser } from "firebase/auth";
import PushNotificationManager from "./PushNotificationManager";

export default function Header() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [user, setUser] = useState<FirebaseUser | null>(null);
  const pathname = usePathname();

  useEffect(() => {
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
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });
    return () => unsubscribe();
  }, []);

  // Khoá scroll body khi mở menu
  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => { document.body.style.overflow = ''; };
  }, [isMobileMenuOpen]);

  const toggleDarkMode = () => {
    const newDark = !isDarkMode;
    setIsDarkMode(newDark);
    document.documentElement.setAttribute('data-theme', newDark ? 'dark' : 'light');
    localStorage.setItem('tlm_theme', newDark ? 'dark' : 'light');
  };

  const handleLogout = () => {
    signOut(auth);
    setIsMobileMenuOpen(false);
  };

  const closeMenu = () => setIsMobileMenuOpen(false);

  const navLinks = [
    { href: "/", icon: <Home size={18} />, label: "Trang chủ" },
    { href: "/danh-muc/an-uong", icon: <Compass size={18} />, label: "Khám phá" },
    { href: "/tim-kiem", icon: <Search size={18} />, label: "Tìm kiếm" },
    { href: "/yeu-thich", icon: <Heart size={18} />, label: "Yêu thích" },
    { href: "/lo-trinh", icon: <Map size={18} />, label: "Lộ trình" },
    { href: "/leaderboard", icon: <Trophy size={18} />, label: "Bảng xếp hạng" },
  ];

  return (
    <>
      <header className="header" id="main-header" role="banner">
        <div className="header__inner container">
          <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
            {/* Hamburger - chỉ hiện trên mobile */}
            <button
              className="mobile-menu-toggle d-none"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              style={{ background: "none", border: "none", color: "var(--color-text)", cursor: "pointer", padding: "6px", borderRadius: "8px" }}
              aria-label="Menu"
            >
              {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
            <Link href="/" className="header__logo" aria-label="Về trang chủ" onClick={closeMenu}>
              <img src="/assets/logo.jpg" alt="Thuồng Luồng Mini" className="header__logo-img" width={40} height={40} />
              <span className="header__logo-text">Thuồng Luồng Mini</span>
            </Link>
          </div>

          <nav className="nav" aria-label="Điều hướng chính">
            <ul className="nav__list">
              <li className="nav__item"><Link href="/" className={`nav__link ${pathname === "/" ? "active" : ""}`}>Trang chủ</Link></li>
              <li className="nav__item"><Link href="/danh-muc/an-uong" className={`nav__link ${pathname.startsWith("/danh-muc") ? "active" : ""}`}>Ăn uống</Link></li>
              <li className="nav__item"><Link href="/lo-trinh" className={`nav__link ${pathname === "/lo-trinh" ? "active" : ""}`}>Lộ trình</Link></li>
              <li className="nav__item"><Link href="/leaderboard" className={`nav__link ${pathname === "/leaderboard" ? "active" : ""}`} style={{ color: "var(--color-primary)" }}>Bảng Xếp Hạng</Link></li>
            </ul>
          </nav>

          <div className="header__actions">
            <button className="header__action-btn dark-mode-toggle" onClick={toggleDarkMode} aria-label="Đổi chế độ sáng/tối" style={{ marginRight: "10px" }}>
              {isDarkMode ? <Sun size={20} /> : <Moon size={20} />}
            </button>
            {user ? (
              <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                {["minhnhatzany@gmail.com", "minhnhat@gmail.com", "admin@thuongluongmini.com"].some(email => user.email?.includes(email.split('@')[0])) && (
                  <Link href="/admin" className="btn btn--outline btn--sm hide-on-mobile" style={{ padding: "5px 10px", borderColor: "var(--color-primary)", color: "var(--color-primary)" }}>
                    <Shield size={16} /> Admin
                  </Link>
                )}
                <Link href="/profile" style={{ display: "flex", alignItems: "center", gap: "5px", textDecoration: "none", color: "var(--color-text)" }}>
                  {user.photoURL ? (
                    <img src={user.photoURL} alt="Avatar" style={{ width: "32px", height: "32px", borderRadius: "50%", objectFit: "cover", border: "2px solid var(--color-primary)" }} />
                  ) : (
                    <div style={{ width: "32px", height: "32px", borderRadius: "50%", background: "var(--color-primary)", color: "white", display: "flex", alignItems: "center", justifyContent: "center", fontWeight: "bold" }}>
                      {(user.displayName || user.email || "U")[0].toUpperCase()}
                    </div>
                  )}
                  <span className="hide-on-mobile" style={{ fontWeight: 600 }}>{(user.displayName || user.email || "").split("@")[0]}</span>
                </Link>
                <button onClick={handleLogout} className="btn btn--outline btn--sm hide-on-mobile" style={{ padding: "5px" }} aria-label="Đăng xuất">
                  <LogOut size={16} />
                </button>
              </div>
            ) : (
              <button onClick={() => setIsAuthModalOpen(true)} className="btn btn--outline btn--sm" aria-label="Đăng nhập">
                <User size={16} />
                <span className="hide-on-mobile">Đăng nhập</span>
              </button>
            )}
          </div>
        </div>
      </header>

      {/* Mobile Menu Backdrop */}
      {isMobileMenuOpen && (
        <div
          onClick={closeMenu}
          style={{ position: "fixed", inset: 0, background: "rgba(0,0,0,0.5)", zIndex: 88, backdropFilter: "blur(2px)" }}
        />
      )}

      {/* Mobile Menu - drawer trượt từ trái sang, bao gồm mọi thứ */}
      <div
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          width: "82vw",
          maxWidth: "320px",
          height: "100vh", /* Fallback to 100vh */
          background: "var(--color-bg)",
          zIndex: 89,
          transform: isMobileMenuOpen ? "translateX(0)" : "translateX(-105%)",
          transition: "transform 0.3s cubic-bezier(0.4,0,0.2,1)",
          display: "flex",
          flexDirection: "column",
          overflowY: "auto",
          boxShadow: isMobileMenuOpen ? "4px 0 20px rgba(0,0,0,0.2)" : "none",
        }}
        aria-hidden={!isMobileMenuOpen}
      >
        {/* Header của menu */}
        <div style={{ padding: "16px 20px", borderBottom: "1px solid var(--color-border)", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <Link href="/" onClick={closeMenu} style={{ display: "flex", alignItems: "center", gap: "10px", textDecoration: "none" }}>
            <img src="/assets/logo.jpg" alt="Logo" style={{ width: "36px", height: "36px", borderRadius: "50%" }} />
            <span style={{ fontWeight: 700, color: "var(--color-text-heading)", fontSize: "15px" }}>Thuồng Luồng Mini</span>
          </Link>
          <button onClick={closeMenu} style={{ background: "none", border: "none", color: "var(--color-text)", cursor: "pointer", padding: "4px" }}>
            <X size={22} />
          </button>
        </div>

        {/* User info hoặc nút đăng nhập */}
        <div style={{ padding: "14px 20px", borderBottom: "1px solid var(--color-border)" }}>
          {user ? (
            <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
              <Link href="/profile" onClick={closeMenu} style={{ display: "flex", alignItems: "center", gap: "10px", textDecoration: "none", color: "var(--color-text)", flex: 1, minWidth: 0 }}>
                {user.photoURL ? (
                  <img src={user.photoURL} alt="Avatar" style={{ width: "42px", height: "42px", borderRadius: "50%", objectFit: "cover", border: "2px solid var(--color-primary)", flexShrink: 0 }} />
                ) : (
                  <div style={{ width: "42px", height: "42px", borderRadius: "50%", background: "var(--gradient-primary)", color: "white", display: "flex", alignItems: "center", justifyContent: "center", fontWeight: "bold", fontSize: "17px", flexShrink: 0 }}>
                    {(user.displayName || user.email || "U")[0].toUpperCase()}
                  </div>
                )}
                <div style={{ minWidth: 0 }}>
                  <div style={{ fontWeight: 700, fontSize: "14px", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>{user.displayName || user.email?.split("@")[0]}</div>
                  <div style={{ fontSize: "11px", color: "var(--color-text-secondary)" }}>Xem hồ sơ →</div>
                </div>
              </Link>
              <button onClick={handleLogout} style={{ background: "none", border: "none", color: "var(--color-danger)", cursor: "pointer", padding: "6px", flexShrink: 0 }} title="Đăng xuất">
                <LogOut size={18} />
              </button>
            </div>
          ) : (
            <button
              onClick={() => { setIsAuthModalOpen(true); closeMenu(); }}
              className="btn btn--primary"
              style={{ width: "100%", justifyContent: "center", gap: "8px" }}
            >
              <User size={16} /> Đăng nhập / Đăng ký
            </button>
          )}
        </div>

        {/* Nav links */}
        <nav style={{ flex: 1, padding: "6px 0" }}>
          {navLinks.map(({ href, icon, label }) => {
            const active = pathname === href || (href !== "/" && pathname.startsWith(href));
            return (
              <Link
                key={href}
                href={href}
                onClick={closeMenu}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "12px",
                  padding: "12px 20px",
                  textDecoration: "none",
                  color: active ? "var(--color-primary)" : "var(--color-text-heading)",
                  fontWeight: active ? 700 : 500,
                  fontSize: "15px",
                  background: active ? "rgba(244,162,97,0.09)" : "transparent",
                  borderLeft: active ? "3px solid var(--color-primary)" : "3px solid transparent",
                  transition: "all 0.15s",
                }}
              >
                <span style={{ color: active ? "var(--color-primary)" : "var(--color-text-secondary)", display: "flex" }}>{icon}</span>
                {label}
              </Link>
            );
          })}
        </nav>

        {/* Settings */}
        <div style={{ borderTop: "1px solid var(--color-border)", padding: "10px 20px 20px" }}>
          <button
            onClick={toggleDarkMode}
            style={{ display: "flex", alignItems: "center", gap: "12px", padding: "11px 0", background: "transparent", border: "none", color: "var(--color-text)", cursor: "pointer", textAlign: "left", fontSize: "14px", fontWeight: 500, width: "100%" }}
          >
            {isDarkMode ? <Sun size={17} style={{ color: "var(--color-text-secondary)" }} /> : <Moon size={17} style={{ color: "var(--color-text-secondary)" }} />}
            {isDarkMode ? "Chế độ sáng" : "Chế độ tối"}
          </button>
          <PushNotificationManager />
        </div>
      </div>

      <AuthModal isOpen={isAuthModalOpen} onClose={() => setIsAuthModalOpen(false)} />
    </>
  );
}
