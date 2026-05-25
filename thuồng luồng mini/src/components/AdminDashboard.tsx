"use client";

import { useState, useEffect } from "react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "@/lib/firebase";
import { Users, Star, MapPin } from "lucide-react";

export default function AdminDashboard({ placesCount }: { placesCount: number }) {
  const [stats, setStats] = useState({ users: 0, reviews: 0 });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadStats() {
      try {
        const usersSnap = await getDocs(collection(db, "users"));
        const reviewsSnap = await getDocs(collection(db, "reviews"));
        setStats({
          users: usersSnap.size,
          reviews: reviewsSnap.size
        });
      } catch (err) {
        console.error("Lỗi lấy thống kê", err);
      } finally {
        setLoading(false);
      }
    }
    loadStats();
  }, []);

  if (loading) return <div style={{ padding: "50px", textAlign: "center" }}><span className="spinner"></span></div>;

  return (
    <div>
      <h2 style={{ fontSize: "1.5rem", marginBottom: "var(--space-4)" }}>Tổng quan Hệ thống</h2>
      
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: "var(--space-4)", marginBottom: "var(--space-6)" }}>
        <div style={{ background: "linear-gradient(135deg, #FF6B6B, #FF8E53)", color: "white", padding: "var(--space-5)", borderRadius: "12px", display: "flex", alignItems: "center", gap: "20px" }}>
          <MapPin size={40} opacity={0.8} />
          <div>
            <div style={{ fontSize: "2rem", fontWeight: "bold", lineHeight: 1 }}>{placesCount}</div>
            <div style={{ opacity: 0.9 }}>Địa điểm</div>
          </div>
        </div>
        
        <div style={{ background: "linear-gradient(135deg, #4facfe, #00f2fe)", color: "white", padding: "var(--space-5)", borderRadius: "12px", display: "flex", alignItems: "center", gap: "20px" }}>
          <Users size={40} opacity={0.8} />
          <div>
            <div style={{ fontSize: "2rem", fontWeight: "bold", lineHeight: 1 }}>{stats.users}</div>
            <div style={{ opacity: 0.9 }}>Người dùng</div>
          </div>
        </div>

        <div style={{ background: "linear-gradient(135deg, #43e97b, #38f9d7)", color: "white", padding: "var(--space-5)", borderRadius: "12px", display: "flex", alignItems: "center", gap: "20px" }}>
          <Star size={40} opacity={0.8} />
          <div>
            <div style={{ fontSize: "2rem", fontWeight: "bold", lineHeight: 1 }}>{stats.reviews}</div>
            <div style={{ opacity: 0.9 }}>Lượt đánh giá</div>
          </div>
        </div>
      </div>

      <div style={{ background: "var(--color-bg-secondary)", padding: "var(--space-5)", borderRadius: "12px" }}>
        <h3 style={{ marginBottom: "var(--space-3)" }}>Biểu đồ tăng trưởng (Minh họa)</h3>
        {/* Do giới hạn cài đặt thư viện, ta sử dụng biểu đồ CSS đơn giản */}
        <div style={{ display: "flex", alignItems: "flex-end", gap: "10px", height: "200px", paddingTop: "20px", borderBottom: "1px solid var(--color-border)", borderLeft: "1px solid var(--color-border)", paddingLeft: "10px" }}>
          {[30, 45, 60, 40, 80, 100, Math.max(10, stats.users * 10)].map((val, i) => (
            <div key={i} style={{ flex: 1, background: "var(--color-primary)", height: `${Math.min(100, val)}%`, borderRadius: "4px 4px 0 0", position: "relative", transition: "height 0.5s ease" }}>
              <span style={{ position: "absolute", top: "-20px", left: "50%", transform: "translateX(-50%)", fontSize: "0.8rem", color: "var(--color-text-secondary)" }}>{val}</span>
            </div>
          ))}
        </div>
        <div style={{ display: "flex", justifyContent: "space-between", marginTop: "10px", color: "var(--color-text-secondary)", fontSize: "0.8rem" }}>
          <span>T2</span><span>T3</span><span>T4</span><span>T5</span><span>T6</span><span>T7</span><span>CN</span>
        </div>
      </div>
    </div>
  );
}
