"use client";

import { useState, useEffect } from "react";
import { Heart } from "lucide-react";
import { PLACES } from "@/lib/data";
import PlaceCard from "@/components/PlaceCard";
import Link from "next/link";

export default function FavoritesPage() {
  const [favorites, setFavorites] = useState<any[]>([]);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    // Load favorites from local storage
    try {
      const favIds = JSON.parse(localStorage.getItem('tlm_favorites') || '[]');
      const favPlaces = PLACES.filter(p => favIds.includes(p.id.toString()) || favIds.includes(p.id));
      setFavorites(favPlaces);
    } catch (e) {
      console.error("Failed to load favorites", e);
    }
  }, []);

  if (!mounted) return null;

  return (
    <div className="page-container" style={{paddingTop: "var(--space-4)"}}>
      <div className="container">
        <div style={{display: "flex", alignItems: "center", gap: "10px", marginBottom: "var(--space-6)"}}>
          <div style={{width: "48px", height: "48px", background: "rgba(231, 76, 60, 0.1)", borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center", color: "#e74c3c"}}>
            <Heart fill="currentColor" size={24} />
          </div>
          <div>
            <h1 style={{fontSize: "2rem", margin: 0}}>Bộ sưu tập</h1>
            <p style={{color: "var(--color-text-secondary)", margin: 0}}>Những địa điểm bạn đã yêu thích ({favorites.length})</p>
          </div>
        </div>

        <div className="places-grid">
          {favorites.length > 0 ? (
            favorites.map((place: any) => <PlaceCard key={place.id} place={place} />)
          ) : (
            <div className="empty-state" style={{gridColumn: "1 / -1", padding: "60px 20px", background: "var(--color-bg-secondary)", borderRadius: "16px"}}>
              <div className="empty-state__icon" style={{fontSize: "3rem", marginBottom: "20px"}}>💔</div>
              <h2 style={{fontSize: "1.5rem", marginBottom: "10px"}}>Bạn chưa lưu địa điểm nào</h2>
              <p style={{color: "var(--color-text-secondary)", marginBottom: "20px"}}>Hãy khám phá và lưu lại những nơi bạn muốn đến nhé!</p>
              <Link href="/tim-kiem" className="btn btn--primary" style={{borderRadius: "var(--radius-full)"}}>
                Khám phá ngay
              </Link>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
