"use client";

import { useState, useEffect, useRef } from "react";
import { auth, db } from "@/lib/firebase";
import { onAuthStateChanged, signOut, User, updateProfile } from "firebase/auth";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import { PLACES, getPlaceById } from "@/lib/data";
import PlaceCard from "@/components/PlaceCard";
import { LogOut, Heart, Star, Award, Settings, Camera, Upload } from "lucide-react";
import { useRouter } from "next/navigation";

export default function ProfilePage() {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [favorites, setFavorites] = useState<any[]>([]);
  const [xp, setXp] = useState(0);
  const [uploading, setUploading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
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

  const handleAvatarClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const handleAvatarChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file || !user) return;

    try {
      setUploading(true);
      
      // Convert image to Base64 (Resize and Compress to bypass Storage billing requirements)
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = (event) => {
        const img = new Image();
        img.src = event.target?.result as string;
        img.onload = async () => {
          const canvas = document.createElement('canvas');
          const MAX_WIDTH = 150;
          const MAX_HEIGHT = 150;
          let width = img.width;
          let height = img.height;

          if (width > height) {
            if (width > MAX_WIDTH) {
              height *= MAX_WIDTH / width;
              width = MAX_WIDTH;
            }
          } else {
            if (height > MAX_HEIGHT) {
              width *= MAX_HEIGHT / height;
              height = MAX_HEIGHT;
            }
          }
          canvas.width = width;
          canvas.height = height;
          const ctx = canvas.getContext('2d');
          ctx?.drawImage(img, 0, 0, width, height);
          
          // Compress as JPEG 70% quality
          const base64String = canvas.toDataURL('image/jpeg', 0.7);

          try {
            // Update Auth Profile
            await updateProfile(user, { photoURL: base64String });
            
            // Update Firestore Document
            const userRef = doc(db, 'users', user.uid);
            await updateDoc(userRef, { photoURL: base64String });
            
            // Update local state
            setUser({ ...user, photoURL: base64String } as User);
          } catch (err) {
            console.error("Error updating avatar to Firestore:", err);
            alert("Lỗi khi cập nhật ảnh đại diện. Vui lòng thử lại!");
          } finally {
            setUploading(false);
          }
        };
      };
    } catch (error) {
      console.error("Error updating avatar:", error);
      alert("Đã xảy ra lỗi. Vui lòng thử lại!");
      setUploading(false);
    }
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
        <div className="card" style={{ textAlign: "center", alignSelf: "start", overflow: "hidden" }}>
          {/* Cover Image */}
          <div style={{ height: "120px", background: "var(--gradient-premium)", width: "100%" }}></div>

          <div style={{ padding: "0 var(--space-6) var(--space-6)" }}>
            <div style={{ position: "relative", display: "inline-block", marginTop: "-60px", marginBottom: "var(--space-4)" }}>
              <div 
                onClick={handleAvatarClick}
                style={{ 
                  position: "relative", 
                  width: "120px", 
                  height: "120px", 
                  borderRadius: "50%", 
                  cursor: "pointer",
                  overflow: "hidden",
                  border: `4px solid white`,
                  backgroundColor: "white",
                  boxShadow: "var(--shadow-md)"
                }}
                className="avatar-container"
              >
                {user.photoURL ? (
                  <img 
                    src={user.photoURL} 
                    alt={displayName} 
                    style={{ width: "100%", height: "100%", objectFit: "cover" }} 
                  />
                ) : (
                  <div style={{ 
                    width: "100%", height: "100%", background: "var(--color-primary)", color: "white", 
                    display: "flex", alignItems: "center", justifyContent: "center", fontSize: "3rem", fontWeight: "bold",
                  }}>
                    {displayName[0].toUpperCase()}
                  </div>
                )}
                
                {/* Upload Overlay */}
                <div style={{
                  position: "absolute", inset: 0, background: "rgba(0,0,0,0.5)", 
                  display: "flex", alignItems: "center", justifyContent: "center",
                  opacity: uploading ? 1 : 0, transition: "opacity 0.2s",
                }} className="avatar-overlay">
                  {uploading ? (
                    <div className="spinner spinner--sm" style={{ borderColor: "white", borderTopColor: "transparent" }}></div>
                  ) : (
                    <Camera color="white" size={24} />
                  )}
                </div>
              </div>
              
              <input 
                type="file" 
                ref={fileInputRef} 
                onChange={handleAvatarChange} 
                accept="image/*" 
                style={{ display: "none" }} 
              />

              {xp >= 500 && (
                <div style={{ position: "absolute", bottom: "0", right: "0", background: "var(--color-secondary)", color: "white", padding: "4px 8px", borderRadius: "var(--radius-full)", fontSize: "0.7rem", fontWeight: "bold", display: "flex", alignItems: "center", gap: "2px", border: "2px solid white", boxShadow: "var(--shadow-sm)" }}>
                  <Award size={12} /> VIP
                </div>
              )}
            </div>
            
            <h1 style={{ fontSize: "1.5rem", marginBottom: "var(--space-1)" }}>{displayName}</h1>
            <p style={{ color: "var(--color-text-secondary)", fontSize: "0.9rem", marginBottom: "var(--space-6)" }}>{user.email}</p>
          
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
        .avatar-container:hover .avatar-overlay {
          opacity: 1 !important;
        }
      `}} />
    </div>
  );
}
