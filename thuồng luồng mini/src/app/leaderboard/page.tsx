"use client";

import { useState, useEffect } from "react";
import { collection, query, orderBy, limit, getDocs } from "firebase/firestore";
import { db } from "@/lib/firebase";
import { Trophy, Medal, Star, Flame } from "lucide-react";
import Link from "next/link";

interface LeaderboardUser {
  id: string;
  displayName: string;
  photoURL: string;
  xp: number;
  level: number;
}

export default function LeaderboardPage() {
  const [users, setUsers] = useState<LeaderboardUser[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchLeaderboard() {
      try {
        const usersRef = collection(db, "users");
        const q = query(usersRef, orderBy("xp", "desc"), limit(50));
        const snapshot = await getDocs(q);
        
        const data: LeaderboardUser[] = [];
        snapshot.forEach((doc) => {
          const d = doc.data();
          data.push({
            id: doc.id,
            displayName: d.displayName || "Thổ Địa Ẩn Danh",
            photoURL: d.photoURL || "",
            xp: d.xp || 0,
            level: Math.floor((d.xp || 0) / 100) + 1
          });
        });
        
        setUsers(data);
      } catch (error) {
        console.error("Error fetching leaderboard:", error);
      } finally {
        setLoading(false);
      }
    }

    fetchLeaderboard();
  }, []);

  const getRankIcon = (index: number) => {
    if (index === 0) return <Trophy size={24} color="#FFD700" />;
    if (index === 1) return <Medal size={24} color="#C0C0C0" />;
    if (index === 2) return <Medal size={24} color="#CD7F32" />;
    return <span style={{ fontWeight: "bold", color: "var(--color-text-secondary)", width: "24px", textAlign: "center" }}>{index + 1}</span>;
  };

  return (
    <div className="page-container" style={{ paddingBottom: "var(--space-12)" }}>
      <div className="container">
        <div style={{ textAlign: "center", marginBottom: "var(--space-8)", paddingTop: "var(--space-6)" }}>
          <div style={{ display: "inline-flex", alignItems: "center", justifyContent: "center", background: "var(--color-primary-light)", color: "var(--color-primary-dark)", padding: "10px 20px", borderRadius: "30px", marginBottom: "var(--space-4)" }}>
            <Flame size={20} style={{ marginRight: "8px" }} />
            <span style={{ fontWeight: "bold" }}>Bảng Phong Thần</span>
          </div>
          <h1 style={{ fontSize: "2.5rem", fontWeight: 800, marginBottom: "var(--space-2)" }}>Top Thổ Địa Tuyên Quang</h1>
          <p style={{ color: "var(--color-text-secondary)" }}>Những người đóng góp review và check-in tích cực nhất</p>
        </div>

        <div className="card" style={{ maxWidth: "600px", margin: "0 auto", overflow: "hidden" }}>
          {loading ? (
            <div style={{ padding: "40px", textAlign: "center" }}>
              <span className="spinner" style={{ width: "40px", height: "40px", borderWidth: "4px" }}></span>
              <p style={{ marginTop: "15px", color: "var(--color-text-secondary)" }}>Đang tải bảng xếp hạng...</p>
            </div>
          ) : users.length === 0 ? (
            <div style={{ padding: "40px", textAlign: "center", color: "var(--color-text-secondary)" }}>
              Chưa có dữ liệu xếp hạng. Hãy là người đầu tiên review!
            </div>
          ) : (
            <div style={{ display: "flex", flexDirection: "column" }}>
              {users.map((user, index) => (
                <div 
                  key={user.id} 
                  style={{ 
                    display: "flex", 
                    alignItems: "center", 
                    padding: "var(--space-4) var(--space-5)",
                    borderBottom: index < users.length - 1 ? "1px solid var(--color-border)" : "none",
                    background: index < 3 ? "var(--color-bg-hover)" : "transparent",
                    transition: "var(--transition-fast)"
                  }}
                  className="leaderboard-item"
                >
                  <div style={{ width: "40px", display: "flex", justifyContent: "center", marginRight: "10px" }}>
                    {getRankIcon(index)}
                  </div>
                  
                  <div style={{ marginRight: "15px" }}>
                    {user.photoURL ? (
                      <img src={user.photoURL} alt={user.displayName} style={{ width: "48px", height: "48px", borderRadius: "50%", objectFit: "cover", border: index < 3 ? "2px solid var(--color-primary)" : "none" }} />
                    ) : (
                      <div style={{ width: "48px", height: "48px", borderRadius: "50%", background: "var(--color-primary)", color: "white", display: "flex", alignItems: "center", justifyContent: "center", fontWeight: "bold", fontSize: "1.2rem" }}>
                        {user.displayName.charAt(0).toUpperCase()}
                      </div>
                    )}
                  </div>
                  
                  <div style={{ flex: 1 }}>
                    <div style={{ fontWeight: "bold", fontSize: "1.1rem", display: "flex", alignItems: "center", gap: "5px" }}>
                      {user.displayName}
                      {index === 0 && <span title="Quán Quân" style={{ fontSize: "1rem" }}>👑</span>}
                    </div>
                    <div style={{ fontSize: "0.85rem", color: "var(--color-text-secondary)" }}>
                      Cấp {user.level} Thổ Địa
                    </div>
                  </div>
                  
                  <div style={{ display: "flex", alignItems: "center", gap: "5px", color: "var(--color-primary-dark)", fontWeight: 800, fontSize: "1.2rem" }}>
                    {user.xp} <span style={{ fontSize: "0.8rem" }}>XP</span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
        
        <div style={{ textAlign: "center", marginTop: "var(--space-6)" }}>
          <p style={{ color: "var(--color-text-secondary)", marginBottom: "var(--space-4)" }}>
            Muốn thăng hạng? Khám phá thêm địa điểm và bấm Check-in!
          </p>
          <Link href="/" className="btn btn--primary">
            Khám phá ngay
          </Link>
        </div>
      </div>
    </div>
  );
}
