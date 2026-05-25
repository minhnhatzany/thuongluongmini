"use client";

import { useState, useEffect, useRef } from "react";
import { auth, db, storage } from "@/lib/firebase";
import { onAuthStateChanged, signOut, User, updateProfile } from "firebase/auth";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
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
      
      // Upload file to Firebase Storage
      const storageRef = ref(storage, `avatars/${user.uid}_${Date.now()}`);
      const uploadTask = uploadBytesResumable(storageRef, file);

      uploadTask.on(
        "state_changed",
        (snapshot) => {
          // Can add progress bar here if needed
        },
        (error) => {
          console.error("Error uploading avatar:", error);
          alert("Lỗi khi tải ảnh lên. Vui lòng thử lại!");
          setUploading(false);
        },
        async () => {
          const downloadURL = await getDownloadURL(uploadTask.snapshot.ref);
          
          // Update Auth Profile
          await updateProfile(user, {
            photoURL: downloadURL
          });
          
          // Update Firestore Document
          const userRef = doc(db, 'users', user.uid);
          await updateDoc(userRef, { photoURL: downloadURL });
          
          // Update local state by forcing a reload of the user object
          setUser({ ...user, photoURL: downloadURL } as User);
          setUploading(false);
        }
      );
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
