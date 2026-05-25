"use client";

import Link from "next/link";
import { Home, Compass, Search, Heart } from "lucide-react";
import { usePathname } from "next/navigation";

export default function MobileNav() {
  const pathname = usePathname();
  const isActive = (path: string) => pathname === path ? "active" : "";

  return (
    <nav className="mobile-nav" id="mobile-bottom-nav" aria-label="Điều hướng di động">
      <ul className="mobile-nav__list">
        <li className={`mobile-nav__item ${isActive("/")}`}>
          <Link href="/" style={{ display: "flex", flexDirection: "column", alignItems: "center", color: "inherit", textDecoration: "none" }} aria-label="Trang chủ">
            <Home className="mobile-nav__icon" aria-hidden="true" />
            <span className="mobile-nav__label">Trang chủ</span>
          </Link>
        </li>
        <li className={`mobile-nav__item ${isActive("/danh-muc/an-uong")}`}>
          <Link href="/danh-muc/an-uong" style={{ display: "flex", flexDirection: "column", alignItems: "center", color: "inherit", textDecoration: "none" }} aria-label="Khám phá">
            <Compass className="mobile-nav__icon" aria-hidden="true" />
            <span className="mobile-nav__label">Khám phá</span>
          </Link>
        </li>
        <li className={`mobile-nav__item ${isActive("/tim-kiem")}`}>
          <Link href="/tim-kiem" style={{ display: "flex", flexDirection: "column", alignItems: "center", color: "inherit", textDecoration: "none" }} aria-label="Tìm kiếm">
            <Search className="mobile-nav__icon" aria-hidden="true" />
            <span className="mobile-nav__label">Tìm kiếm</span>
          </Link>
        </li>
        <li className={`mobile-nav__item ${isActive("/yeu-thich")}`}>
          <Link href="/yeu-thich" style={{ display: "flex", flexDirection: "column", alignItems: "center", color: "inherit", textDecoration: "none" }} aria-label="Yêu thích">
            <Heart className="mobile-nav__icon" aria-hidden="true" />
            <span className="mobile-nav__label">Yêu thích</span>
          </Link>
        </li>
      </ul>
    </nav>
  );
}
