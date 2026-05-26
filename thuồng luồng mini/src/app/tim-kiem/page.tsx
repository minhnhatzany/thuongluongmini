"use client";

import { useState, useEffect } from "react";
import { Search, Filter, SlidersHorizontal, MapPin } from "lucide-react";
import { PLACES, CATEGORIES } from "@/lib/data";
import PlaceCard from "@/components/PlaceCard";

export const metadata = {
  title: "Tìm Kiếm Địa Điểm Tuyên Quang",
  description: "Tìm quán ăn ngon, điểm vui chơi, du lịch Tuyên Quang. Lọc theo danh mục, giá cả. Review từ Thuồng Luồng Mini.",
};

export default function SearchPage() {
  const [query, setQuery] = useState("");
  const [filteredPlaces, setFilteredPlaces] = useState(PLACES);
  const [activeCategory, setActiveCategory] = useState("all");
  const [activePrice, setActivePrice] = useState("all");

  useEffect(() => {
    // Basic Client-side search and filtering
    let result = PLACES;

    if (query.trim() !== "" && query.trim().toLowerCase() !== "tất cả") {
      const q = query.toLowerCase();
      result = result.filter(
        (p) =>
          p.name.toLowerCase().includes(q) ||
          p.description.toLowerCase().includes(q) ||
          (p.tags && p.tags.some((t: string) => t.toLowerCase().includes(q)))
      );
    }

    if (activeCategory !== "all") {
      result = result.filter((p) => p.category === activeCategory);
    }

    if (activePrice !== "all") {
      if (activePrice === "$") {
        result = result.filter((p) => p.priceRange === "$");
      } else if (activePrice === "$$") {
        result = result.filter((p) => p.priceRange === "$$");
      } else if (activePrice === "$$$") {
        result = result.filter((p) => p.priceRange === "$$$");
      }
    }

    setFilteredPlaces(result);
  }, [query, activeCategory, activePrice]);

  return (
    <div className="page-container" style={{paddingTop: "var(--space-4)"}}>
      <div className="container">
        <div style={{marginBottom: "var(--space-6)"}}>
          <h1 style={{fontSize: "2rem", marginBottom: "var(--space-4)"}}>Tìm kiếm địa điểm</h1>
          
          {/* Search Input */}
          <div className="search-bar search-bar--lg" style={{maxWidth: "100%", marginBottom: "var(--space-4)"}}>
            <Search className="search-bar__icon" size={18} />
            <input 
              type="text" 
              className="search-bar__input" 
              placeholder="Thử tìm 'Bún cá', 'Na Hang' hay 'Quán nhậu'..." 
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              style={{paddingLeft: "3.5rem"}}
            />
          </div>

          {/* Filters */}
          <div style={{display: "flex", gap: "10px", flexWrap: "wrap", marginBottom: "var(--space-6)"}}>
            <select 
              className="btn btn--outline" 
              value={activeCategory} 
              onChange={(e) => setActiveCategory(e.target.value)}
              style={{padding: "8px 16px", borderRadius: "var(--radius-full)"}}
            >
              <option value="all">Tất cả danh mục</option>
              {CATEGORIES.map((c: any) => (
                <option key={c.id} value={c.id}>{c.name}</option>
              ))}
            </select>

            <select 
              className="btn btn--outline" 
              value={activePrice} 
              onChange={(e) => setActivePrice(e.target.value)}
              style={{padding: "8px 16px", borderRadius: "var(--radius-full)"}}
            >
              <option value="all">Mọi mức giá</option>
              <option value="$">Giá rẻ ($)</option>
              <option value="$$">Trung bình ($$)</option>
              <option value="$$$">Cao cấp ($$$)</option>
            </select>
          </div>
        </div>

        <div>
          <h2 style={{fontSize: "1.2rem", marginBottom: "var(--space-4)", color: "var(--color-text-secondary)"}}>
            Tìm thấy {filteredPlaces.length} kết quả
          </h2>
          
          <div className="places-grid">
            {filteredPlaces.length > 0 ? (
              filteredPlaces.map((place: any) => <PlaceCard key={place.id} place={place} />)
            ) : (
              <div className="empty-state" style={{gridColumn: "1 / -1"}}>
                <div className="empty-state__icon">🔍</div>
                <h2>Không tìm thấy địa điểm nào</h2>
                <p>Thử thay đổi từ khóa hoặc bộ lọc xem sao nhé!</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
