"use client";

import { useState, useEffect } from "react";
import { doc, getDoc, collection, query, where, getDocs, orderBy } from "firebase/firestore";
import { db } from "@/lib/firebase";
import { Trophy, Star, MapPin, Award, User } from "lucide-react";

export default function UserProfilePage({ params }: { params: any }) {
  const [user, setUser] = useState<any>(null);
  const [reviews, setReviews] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadData() {
      // Vì params trong Client Component của Next.js 15+ là một Promise, 
      // ta có thể sử dụng trực tiếp nếu Next.js < 15, nhưng an toàn nhất là dùng React.use() hoặc await.
      // Tuy nhiên đây là trang đơn giản, ta truy cập params.id
      const id = typeof params.then === 'function' ? (await params).id : params.id;
      
      try {
        const userRef = doc(db, "users", id);
        const userSnap = await getDoc(userRef);
        
        if (userSnap.exists()) {
          const uData = userSnap.data();
          setUser({
            id: userSnap.id,
            displayName: uData.displayName || "Thổ Địa Ẩn Danh",
            photoURL: uData.photoURL || "",
            xp: uData.xp || 0,
            level: Math.floor((uData.xp || 0) / 100) + 1
          });
        }

        const q = query(
          collection(db, "reviews"),
          where("authorId", "==", id),
          orderBy("createdAt", "desc")
        );
        const revSnap = await getDocs(q);
        const revs: any[] = [];
        revSnap.forEach(doc => {
          revs.push({ id: doc.id, ...doc.data() });
        });
        setReviews(revs);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    }
    loadData();
  }, [params]);

  if (loading) {
    return <div className="page-container" style={{padding: "100px", textAlign: "center"}}><span className="spinner"></span></div>;
  }

  if (!user) {
    return <div className="page-container" style={{padding: "100px", textAlign: "center"}}><h2>Không tìm thấy Hồ sơ này</h2></div>;
  }

  return (
    <div className="page-container" style={{ paddingBottom: "var(--space-12)" }}>
      <div className="detail-hero" style={{ height: "200px" }}>
        <div className="detail-hero__image-container" style={{ background: "linear-gradient(135deg, var(--color-primary), var(--color-secondary))" }}>
        </div>
      </div>

      <div className="container" style={{ marginTop: "-80px", position: "relative", zIndex: 10 }}>
        <div className="card" style={{ padding: "var(--space-6)", textAlign: "center" }}>
          {user.photoURL ? (
            <img src={user.photoURL} alt={user.displayName} style={{ width: "120px", height: "120px", borderRadius: "50%", objectFit: "cover", border: "4px solid var(--color-bg)", margin: "0 auto 15px", display: "block", background: "white" }} />
          ) : (
            <div style={{ width: "120px", height: "120px", borderRadius: "50%", background: "var(--color-primary)", color: "white", display: "flex", alignItems: "center", justifyContent: "center", fontWeight: "bold", fontSize: "3rem", margin: "0 auto 15px", border: "4px solid var(--color-bg)" }}>
              <User size={60} />
            </div>
          )}
          
          <h1 style={{ fontSize: "1.8rem", marginBottom: "5px" }}>{user.displayName}</h1>
          <p style={{ color: "var(--color-primary)", fontWeight: "bold", fontSize: "1.2rem", marginBottom: "15px" }}>
            Cấp {user.level} Thổ Địa ({user.xp} XP)
          </p>

          <div style={{ display: "flex", justifyContent: "center", gap: "20px", flexWrap: "wrap", marginTop: "20px" }}>
            <div style={{ background: "var(--color-bg-secondary)", padding: "15px 25px", borderRadius: "12px" }}>
              <div style={{ display: "flex", alignItems: "center", gap: "10px", color: "var(--color-text-secondary)", marginBottom: "5px" }}><Star size={18} /> Đánh giá</div>
              <div style={{ fontSize: "1.5rem", fontWeight: "bold" }}>{reviews.length}</div>
            </div>
            <div style={{ background: "var(--color-bg-secondary)", padding: "15px 25px", borderRadius: "12px" }}>
              <div style={{ display: "flex", alignItems: "center", gap: "10px", color: "var(--color-text-secondary)", marginBottom: "5px" }}><Trophy size={18} color="#FFD700" /> Huy hiệu</div>
              <div style={{ fontSize: "1.5rem", fontWeight: "bold" }}>{Math.floor(user.level / 5)}</div>
            </div>
          </div>
        </div>

        <h2 style={{ marginTop: "var(--space-8)", marginBottom: "var(--space-4)" }}>Hoạt động gần đây</h2>
        {reviews.length === 0 ? (
          <div className="card" style={{ padding: "var(--space-6)", textAlign: "center", color: "var(--color-text-secondary)" }}>
            Người dùng này chưa có đánh giá nào.
          </div>
        ) : (
          <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
            {reviews.map(rev => (
              <div key={rev.id} className="card" style={{ padding: "var(--space-5)" }}>
                <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "10px" }}>
                  <div style={{ fontWeight: "bold", color: "var(--color-primary)" }}>{rev.placeName || "Một địa điểm"}</div>
                  <div style={{ color: "var(--color-text-tertiary)", fontSize: "0.85rem" }}>{new Date(rev.createdAt).toLocaleDateString('vi-VN')}</div>
                </div>
                <div style={{ display: "flex", gap: "2px", color: "var(--color-warning)", marginBottom: "10px" }}>
                  {[1,2,3,4,5].map(star => <Star key={star} size={14} fill={star <= rev.rating ? "currentColor" : "none"} />)}
                </div>
                <p style={{ lineHeight: 1.6 }}>{rev.content}</p>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
