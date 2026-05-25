"use client";

import { useState } from "react";
import { X, Mail, Lock } from "lucide-react";
import { auth } from "@/lib/firebase";
import { 
  signInWithPopup, 
  GoogleAuthProvider, 
  FacebookAuthProvider, 
  signInWithEmailAndPassword, 
  createUserWithEmailAndPassword 
} from "firebase/auth";

export default function AuthModal({ isOpen, onClose }: { isOpen: boolean, onClose: () => void }) {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  if (!isOpen) return null;

  const handleGoogleSignIn = async () => {
    try {
      setError("");
      const provider = new GoogleAuthProvider();
      await signInWithPopup(auth, provider);
      onClose();
    } catch (err: any) {
      console.error(err);
      setError("Đăng nhập Google thất bại hoặc bạn chưa cấu hình API Key.");
    }
  };

  const handleFacebookSignIn = async () => {
    try {
      setError("");
      const provider = new FacebookAuthProvider();
      await signInWithPopup(auth, provider);
      onClose();
    } catch (err: any) {
      console.error(err);
      setError("Đăng nhập Facebook thất bại hoặc bạn chưa cấu hình API Key.");
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      if (isLogin) {
        await signInWithEmailAndPassword(auth, email, password);
      } else {
        await createUserWithEmailAndPassword(auth, email, password);
      }
      onClose();
    } catch (err: any) {
      console.error(err);
      if (err.code === 'auth/email-already-in-use') {
        setError("Email này đã được sử dụng. Vui lòng đăng nhập.");
      } else if (err.code === 'auth/wrong-password' || err.code === 'auth/user-not-found' || err.code === 'auth/invalid-credential') {
        setError("Email hoặc mật khẩu không đúng.");
      } else if (err.code === 'auth/weak-password') {
        setError("Mật khẩu quá yếu, vui lòng chọn mật khẩu từ 6 ký tự trở lên.");
      } else {
        setError(`Lỗi: ${err.message || "Không thể xác thực, bạn đã điền đúng Config chưa?"}`);
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="modal-overlay active" style={{display: "flex", alignItems: "center", justifyContent: "center", zIndex: 1000}}>
      <div className="modal auth-modal" style={{background: "var(--color-bg-card)", padding: "var(--space-6)", borderRadius: "var(--radius-xl)", width: "90%", maxWidth: "400px", position: "relative", boxShadow: "var(--shadow-2xl)"}}>
        <button onClick={onClose} style={{position: "absolute", top: "15px", right: "15px", background: "none", border: "none", cursor: "pointer", color: "var(--color-text-secondary)"}}>
          <X size={24} />
        </button>
        
        <div style={{textAlign: "center", marginBottom: "var(--space-6)"}}>
          <img src="/assets/logo.jpg" alt="Logo" style={{width: "60px", height: "60px", borderRadius: "12px", margin: "0 auto 15px"}} />
          <h2 style={{fontSize: "1.5rem", fontWeight: "bold"}}>{isLogin ? "Đăng nhập" : "Đăng ký"}</h2>
          <p style={{color: "var(--color-text-secondary)", fontSize: "0.9rem", marginTop: "5px"}}>
            Tham gia cộng đồng Thuồng Luồng Mini
          </p>
        </div>

        {error && (
          <div style={{background: "var(--color-danger-light)", color: "var(--color-danger-dark)", padding: "10px", borderRadius: "8px", fontSize: "0.85rem", marginBottom: "15px", textAlign: "center"}}>
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} style={{display: "flex", flexDirection: "column", gap: "15px", marginBottom: "20px"}}>
          <div className="search-bar search-bar--lg" style={{width: "100%"}}>
            <Mail className="search-bar__icon" size={18} />
            <input 
              type="email" 
              className="search-bar__input" 
              placeholder="Email của bạn" 
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              style={{paddingLeft: "3.5rem"}}
            />
          </div>
          <div className="search-bar search-bar--lg" style={{width: "100%"}}>
            <Lock className="search-bar__icon" size={18} />
            <input 
              type="password" 
              className="search-bar__input" 
              placeholder="Mật khẩu" 
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              minLength={6}
              style={{paddingLeft: "3.5rem"}}
            />
          </div>
          <button type="submit" disabled={loading} className="btn btn--primary" style={{width: "100%", borderRadius: "var(--radius-full)", padding: "12px", fontSize: "1rem"}}>
            {loading ? "Đang xử lý..." : (isLogin ? "Đăng nhập" : "Đăng ký")}
          </button>
        </form>

        <div style={{textAlign: "center", margin: "20px 0", color: "var(--color-text-tertiary)", fontSize: "0.85rem", position: "relative"}}>
          <span style={{background: "var(--color-bg-card)", padding: "0 10px", position: "relative", zIndex: 1}}>HOẶC</span>
          <div style={{position: "absolute", top: "50%", left: 0, right: 0, height: "1px", background: "var(--color-border-light)", zIndex: 0}}></div>
        </div>

        <div style={{display: "flex", flexDirection: "column", gap: "10px"}}>
          <button onClick={handleGoogleSignIn} className="btn btn--outline" style={{width: "100%", borderRadius: "var(--radius-full)", display: "flex", justifyContent: "center", gap: "10px", padding: "10px"}}>
            <img src="https://www.gstatic.com/firebasejs/ui/2.0.0/images/auth/google.svg" alt="Google" width="20" height="20" />
            Tiếp tục với Google
          </button>
          <button onClick={handleFacebookSignIn} className="btn btn--outline" style={{width: "100%", borderRadius: "var(--radius-full)", display: "flex", justifyContent: "center", gap: "10px", padding: "10px", background: "#1877F2", color: "white", borderColor: "#1877F2"}}>
            <img src="https://www.gstatic.com/firebasejs/ui/2.0.0/images/auth/facebook.svg" alt="Facebook" width="20" height="20" style={{filter: "brightness(0) invert(1)"}} />
            Tiếp tục với Facebook
          </button>
        </div>

        <div style={{textAlign: "center", marginTop: "20px", fontSize: "0.9rem"}}>
          {isLogin ? "Chưa có tài khoản? " : "Đã có tài khoản? "}
          <button onClick={() => {setIsLogin(!isLogin); setError("");}} style={{background: "none", border: "none", color: "var(--color-primary)", fontWeight: "bold", cursor: "pointer"}}>
            {isLogin ? "Đăng ký ngay" : "Đăng nhập"}
          </button>
        </div>
      </div>
    </div>
  );
}
