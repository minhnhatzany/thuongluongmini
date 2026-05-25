"use client";

import { useState, useEffect } from "react";
import { auth, db } from "@/lib/firebase";
import { onAuthStateChanged, signOut, User } from "firebase/auth";
import { doc, getDoc } from "firebase/firestore";
import { PLACES, getPlaceById } from "@/lib/data";
import PlaceCard from "@/components/PlaceCard";
import { LogOut, Heart, Star, Award, Settings } from "lucide-react";
import { useRouter } from "next/navigation";

export default function ProfilePage() {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [favorites, setFavorites] = useState<any[]>([]);
  const [xp, setXp] = useState(0);
  const router = useRouter();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      if (currentUser) {
        setUser(currentUser);
        
        // Fetch extended user info (XP, Level)
        const userRef = doc(db, 'users', currentUser.uid);
        const docSnap = await getDoc(userRef);
        if (docSnap.exists()) {
          const data = docSnap.data();
          setXp(data.xp || 0);
        }

        loadFavorites();
      } else {
        router.push("/");
      }
      setLoading(false);
    });

    const loadFavorites = () => {
      const favIds = JSON.parse(localStorage.getItem('tlm_favorites') || '[]');
      const favPlaces = favIds.map((id: string) => getPlaceById(id)).filter(Boolean);
      setFavorites(favPlaces);
    };

    window.addEventListener('tlm_favorites_changed', loadFavorites);

    return () => {
      unsubscribe();
      window.removeEventListener('tlm_favorites_changed', loadFavorites);
    };
  }, [router]);

  const handleLogout = async () => {
    await signOut(auth);
    router.push("/");
  };

  const getLevel = (currentXp: number) => {
    if (currentXp < 100) return { name: "Tân binh Tuyên Quang", color: "var(--color-text-light)" };
    if (currentXp < 500) return { name: "Thổ địa thành phố", color: "var(--color-primary)" };
    return { name: "Chúa tể Tuyên Quang", color: "var(--color-secondary)" };
  };

  if (loading) {
    return (
      <div style={{ display: "flex", justifyContent: "center", alignItems: "center", minHeight: "60vh" }}>
        <div className="spinner"></div>
      </div>
    );
  }

  if (!user) return null;

  const levelInfo = getLevel(xp);
  const displayName = user.displayName || user.email?.split('@')[0] || "Người dùng";

  return (
    <div className="container" style={{ padding: "var(--space-6) 0" }}>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 2fr", gap: "var(--space-6)" }} className="profile-grid">
        
        {/* Profile Sidebar */}
        <div className="card" style={{ padding: "var(--space-6)", textAlign: "center", alignSelf: "start" }}>
          <div style={{ position: "relative", display: "inline-block", marginBottom: "var(--space-4)" }}>
            {user.photoURL ? (
              <img 
                src={user.photoURL} 
                alt={displayName} 
                style={{ width: "120px", height: "120px", borderRadius: "50%", objectFit: "cover", border: `4px solid ${levelInfo.color}` }} 
              />
            ) : (
              <div style={{ 
                width: "120px", height: "120px", borderRadius: "50%", background: "var(--color-primary)", color: "white", 
                display: "flex", alignItems: "center", justifyContent: "center", fontSize: "3rem", fontWeight: "bold",
                border: `4px solid ${levelInfo.color}`
              }}>
                {displayName[0].toUpperCase()}
              </div>
            )}
            {xp >= 500 && (
              <div style={{ position: "absolute", bottom: "-10px", left: "50%", transform: "translateX(-50%)", background: "var(--color-secondary)", color: "white", padding: "4px 12px", borderRadius: "var(--radius-full)", fontSize: "0.8rem", fontWeight: "bold", display: "flex", alignItems: "center", gap: "4px" }}>
                <Award size={14} /> VIP
              </div>
            )}
          </div>
          
          <h1 style={{ fontSize: "1.5rem", marginBottom: "var(--space-1)" }}>{displayName}</h1>
          <p style={{ color: "var(--color-text-light)", fontSize: "0.9rem", marginBottom: "var(--space-4)" }}>{user.email}</p>
          
          <div style={{ background: "var(--color-background-alt)", padding: "var(--space-3)", borderRadius: "var(--radius-md)", marginBottom: "var(--space-6)" }}>
            <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "var(--space-2)" }}>
              <span style={{ fontWeight: 600, color: levelInfo.color }}>{levelInfo.name}</span>
              <span style={{ fontWeight: "bold" }}>{xp} XP</span>
            </div>
            <div style={{ width: "100%", height: "8px", background: "var(--color-border)", borderRadius: "4px", overflow: "hidden" }}>
              <div style={{ width: `${Math.min((xp % 500) / 5, 100)}%`, height: "100%", background: levelInfo.color }}></div>
            </div>
          </div>

          <button onClick={handleLogout} className="btn btn--outline" style={{ width: "100%", justifyContent: "center" }}>
            <LogOut size={18} /> Đăng xuất
          </button>
        </div>

        {/* Profile Content */}
        <div>
          <h2 style={{ fontSize: "1.8rem", marginBottom: "var(--space-4)", display: "flex", alignItems: "center", gap: "10px" }}>
            <Heart className="filled" /> Địa điểm yêu thích của tôi
          </h2>
          
          {favorites.length > 0 ? (
            <div className="grid grid--3">
              {favorites.map(place => (
                <PlaceCard key={place.id} place={place} />
              ))}
            </div>
          ) : (
            <div className="card" style={{ padding: "var(--space-8)", textAlign: "center", background: "var(--color-background-alt)" }}>
              <Heart size={48} style={{ color: "var(--color-border-dark)", margin: "0 auto var(--space-4)" }} />
              <h3 style={{ marginBottom: "var(--space-2)" }}>Chưa có địa điểm nào</h3>
              <p style={{ color: "var(--color-text-light)", marginBottom: "var(--space-4)" }}>Hãy thả tim những nơi bạn muốn đến nhé!</p>
              <button onClick={() => router.push('/danh-muc/an-uong')} className="btn btn--primary" style={{ margin: "0 auto" }}>Khám phá ngay</button>
            </div>
          )}
        </div>
      </div>
      <style dangerouslySetInnerHTML={{__html: `
        @media (max-width: 768px) {
          .profile-grid { grid-template-columns: 1fr !important; }
        }
      `}} />
    </div>
  );
}
