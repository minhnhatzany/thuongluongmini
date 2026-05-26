import Link from "next/link";
import { Mail, MapPin, ExternalLink } from "lucide-react";

// TikTok icon SVG
function TikTokIcon({ size = 16 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-2.88 2.5 2.89 2.89 0 0 1-2.89-2.89 2.89 2.89 0 0 1 2.89-2.89c.28 0 .54.04.79.1V9.01a6.32 6.32 0 0 0-.79-.05 6.34 6.34 0 0 0-6.34 6.34 6.34 6.34 0 0 0 6.34 6.34 6.34 6.34 0 0 0 6.33-6.34V8.87a8.17 8.17 0 0 0 4.78 1.52V7a4.85 4.85 0 0 1-1.01-.31z"/>
    </svg>
  );
}

function FacebookIcon({ size = 16 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
    </svg>
  );
}

export default function Footer() {
  return (
    <footer className="footer" id="main-footer" role="contentinfo">
      <div className="footer__inner container">
        <div className="footer__grid">
          {/* Brand */}
          <div className="footer__brand">
            <div className="footer__brand-logo" style={{ marginBottom: "15px" }}>
              <img src="/assets/logo.jpg" alt="Thuồng Luồng Mini - Review Tuyên Quang" width={60} height={60} style={{ borderRadius: "12px", objectFit: "cover" }} />
            </div>
            <h3 className="footer__brand-name">Thuồng Luồng Mini</h3>
            <p className="footer__brand-description">
              Nền tảng khám phá ẩm thực, vui chơi, du lịch tại Tuyên Quang. Review thực tế, chia sẻ trải nghiệm địa phương.
            </p>
            {/* Social Links */}
            <div style={{ display: "flex", gap: "10px", marginTop: "15px" }}>
              <a
                href="https://www.tiktok.com/@thuongluongmini"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="TikTok Thuồng Luồng Mini"
                style={{
                  display: "flex", alignItems: "center", justifyContent: "center",
                  width: "36px", height: "36px", borderRadius: "50%",
                  background: "var(--color-bg-secondary)",
                  color: "var(--color-text)",
                  transition: "all 0.2s",
                  textDecoration: "none",
                }}
              >
                <TikTokIcon size={16} />
              </a>
              <a
                href="https://www.facebook.com/ThuongLuongMini"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Facebook Thuồng Luồng Mini"
                style={{
                  display: "flex", alignItems: "center", justifyContent: "center",
                  width: "36px", height: "36px", borderRadius: "50%",
                  background: "var(--color-bg-secondary)",
                  color: "var(--color-text)",
                  transition: "all 0.2s",
                  textDecoration: "none",
                }}
              >
                <FacebookIcon size={16} />
              </a>
            </div>
          </div>

          {/* Danh mục */}
          <div className="footer__column">
            <h4 className="footer__column-title">Danh mục</h4>
            <Link href="/danh-muc/an-uong" className="footer__link">🍜 Ăn uống</Link>
            <Link href="/danh-muc/vui-choi" className="footer__link">🎯 Vui chơi</Link>
            <Link href="/danh-muc/du-lich" className="footer__link">🏕️ Du lịch</Link>
            <Link href="/danh-muc/luu-tru" className="footer__link">🏨 Lưu trú</Link>
            <Link href="/lo-trinh" className="footer__link">🗺️ Lộ trình</Link>
          </div>

          {/* Liên hệ & Địa chỉ */}
          <div className="footer__column">
            <h4 className="footer__column-title">Liên hệ</h4>
            <a
              href="https://www.facebook.com/ThuongLuongMini"
              target="_blank"
              rel="noopener noreferrer"
              className="footer__link"
              style={{ display: "flex", alignItems: "center", gap: "8px" }}
            >
              <FacebookIcon size={14} /> Fanpage Facebook
            </a>
            <a
              href="https://www.tiktok.com/@thuongluongmini"
              target="_blank"
              rel="noopener noreferrer"
              className="footer__link"
              style={{ display: "flex", alignItems: "center", gap: "8px" }}
            >
              <TikTokIcon size={14} /> TikTok @thuongluongmini
            </a>
            <span className="footer__link" style={{ pointerEvents: "none", display: "flex", alignItems: "center", gap: "8px" }}>
              <Mail size={14} aria-hidden="true" />
              thuongluongmini@gmail.com
            </span>
            <span className="footer__link" style={{ pointerEvents: "none", display: "flex", alignItems: "flex-start", gap: "8px" }}>
              <MapPin size={14} aria-hidden="true" style={{ flexShrink: 0, marginTop: "2px" }} />
              <span>Tuyên Quang, Việt Nam</span>
            </span>
          </div>
        </div>

        <div className="footer__bottom" style={{ display: "flex", flexWrap: "wrap", justifyContent: "space-between", alignItems: "center", gap: "8px" }}>
          <p className="footer__copyright">© 2026 Thuồng Luồng Mini. Tất cả quyền được bảo lưu.</p>
          <p style={{ fontSize: "12px", color: "var(--color-text-secondary)", margin: 0 }}>
            Review ẩm thực & Du lịch Tuyên Quang 🐍
          </p>
        </div>
      </div>
    </footer>
  );
}
