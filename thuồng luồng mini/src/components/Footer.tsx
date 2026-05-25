import Link from "next/link";
import { MessageCircle, Mail } from "lucide-react";

export default function Footer() {
  return (
    <footer className="footer" id="main-footer" role="contentinfo">
      <div className="footer__inner container">
        <div className="footer__grid">
          <div className="footer__brand">
            <div className="footer__brand-logo" style={{ marginBottom: "15px" }}>
              <img src="/assets/logo.jpg" alt="Thuồng Luồng Mini" width={60} height={60} style={{ borderRadius: "12px", objectFit: "cover" }} />
            </div>
            <h3 className="footer__brand-name">Thuồng Luồng Mini</h3>
            <p className="footer__brand-description">Nền tảng khám phá ẩm thực, vui chơi, du lịch và thời trang tại Tuyên Quang.</p>
          </div>
          
          <div className="footer__column">
            <h4 className="footer__column-title">Danh mục</h4>
            <Link href="/danh-muc/an-uong" className="footer__link">Ăn uống</Link>
            <Link href="/danh-muc/vui-choi" className="footer__link">Vui chơi</Link>
            <Link href="/danh-muc/du-lich" className="footer__link">Du lịch</Link>
            <Link href="/danh-muc/trang-phuc" className="footer__link">Trang phục</Link>
          </div>
          
          <div className="footer__column">
            <h4 className="footer__column-title">Liên hệ</h4>
            <a href="https://www.facebook.com/ThuongLuongMini" target="_blank" className="footer__link" rel="noopener">
              <MessageCircle style={{ width: 16, marginRight: 8 }} aria-hidden="true" />
              Nhắn tin qua Fanpage
            </a>
            <span className="footer__link" style={{ pointerEvents: "none" }}>
              <Mail style={{ width: 16, marginRight: 8 }} aria-hidden="true" />
              thuongluongmini@gmail.com
            </span>
          </div>
        </div>
        
        <div className="footer__bottom">
          <p className="footer__copyright">© 2026 Thuồng Luồng Mini. Tất cả quyền được bảo lưu.</p>
        </div>
      </div>
    </footer>
  );
}
