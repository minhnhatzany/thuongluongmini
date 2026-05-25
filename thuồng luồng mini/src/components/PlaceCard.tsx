"use client";

import Link from "next/link";
import { Heart, MapPin, Map } from "lucide-react";
import { CATEGORIES } from "@/lib/data";
import { useState, useEffect } from "react";

function renderStars(rating: number) {
  rating = rating || 0;
  let html = [];
  for (let i = 1; i <= 5; i++) {
    if (i <= Math.floor(rating)) {
      html.push(<span key={i} className="star filled">★</span>);
    } else if (i - 0.5 <= rating) {
      html.push(<span key={i} className="star half">★</span>);
    } else {
      html.push(<span key={i} className="star empty">★</span>);
    }
  }
  return html;
}

export default function PlaceCard({ place }: { place: any }) {
  const [isFav, setIsFav] = useState(false);

  useEffect(() => {
    try {
      const favIds = JSON.parse(localStorage.getItem('tlm_favorites') || '[]');
      setIsFav(favIds.includes(place.id.toString()) || favIds.includes(place.id));
    } catch (e) {}
  }, [place.id]);

  const toggleFavorite = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    try {
      const favIds = JSON.parse(localStorage.getItem('tlm_favorites') || '[]');
      let newFavs;
      if (isFav) {
        newFavs = favIds.filter((id: any) => id.toString() !== place.id.toString());
      } else {
        newFavs = [...favIds, place.id.toString()];
      }
      localStorage.setItem('tlm_favorites', JSON.stringify(newFavs));
      setIsFav(!isFav);
      
      // Dispatch custom event to notify other components (like Favorites page)
      window.dispatchEvent(new Event('tlm_favorites_changed'));
    } catch (e) {}
  };

  const category = CATEGORIES.find(c => c.id === place.category);
  const stars = renderStars(place.rating);
  
  const addressShort = (place.address || '').length > 35
    ? (place.address || '').substring(0, 35) + '...'
    : place.address;

  const gradientColors = place.imageColors || ['#F4A261', '#E76F51'];
  const placeholderStyle = {
    background: `linear-gradient(135deg, ${gradientColors[0]}, ${gradientColors[1] || gradientColors[0]})`
  };

  const hasImage = place.images && place.images.length > 0 && !place.images[0].includes('placeholder');

  return (
    <article className="card animate-on-scroll" data-place-id={place.id}>
      <Link href={`/dia-diem/${place.id}`} className="card__link">
        <div className="card__image-wrapper" style={placeholderStyle}>
          {hasImage ? (
            <img src={place.images[0]} alt={place.name} loading="lazy" decoding="async" />
          ) : (
            <div className="card__image-overlay" style={{opacity: 1, display: "flex", alignItems: "center", justifyContent: "center"}}>
              <span style={{fontSize: "2.5rem"}}>{category ? category.icon : '📍'}</span>
            </div>
          )}
          <div className="card__badges">
            {place.rating >= 4.8 && <span className="badge badge--featured">🏆 Đánh giá cao nhất</span>}
            {place.isFeatured && <span className="badge badge--primary">🔥 Đang hot</span>}
            {place.isNew && <span className="badge badge--new">✨ Mới</span>}
          </div>
          <button className={`card__fav-btn ${isFav ? 'active' : ''}`} 
                  onClick={toggleFavorite} 
                  aria-label={isFav ? 'Bỏ yêu thích' : 'Yêu thích'}>
            <Heart className={isFav ? 'filled' : ''} size={18} />
          </button>
          <div className="card__badges" style={{top: "auto", bottom: "var(--space-3)", left: "var(--space-3)"}}>
            <span className="badge badge--price">{place.priceRange}</span>
          </div>
        </div>
        
        <div className="card__content">
          <div style={{display: "flex", justifyContent: "space-between", alignItems: "flex-start"}}>
            <div>
              <h3 className="card__title">{place.name}</h3>
              {place.rating > 0 && (
                <div className="card__rating" style={{display: "flex", alignItems: "center", gap: "var(--space-1)", marginTop: "4px"}}>
                  <div style={{display: "flex", gap: "2px"}}>
                    {stars}
                  </div>
                  <span className="card__rating-score" style={{marginLeft: "4px", fontSize: "0.85rem"}}>{place.rating.toFixed(1)}/5</span>
                  <span className="card__rating-count">({place.totalReviews})</span>
                </div>
              )}
            </div>
          </div>
          <div className="card__category" style={{marginTop: "var(--space-2)"}}>
            {place.subCategory}
          </div>
          <div className="card__footer">
            <div className="card__location">
              <MapPin style={{width: 14, height: 14}} />
              <span>{addressShort}</span>
            </div>
            <button className="btn btn--primary btn--sm" 
               style={{padding: "0.35rem 0.75rem", borderRadius: "var(--radius-full)", fontSize: "0.75rem", fontWeight: 800, flexShrink: 0}}
               onClick={(e) => {
                 e.preventDefault(); e.stopPropagation();
                 window.open(`https://www.google.com/maps/dir/?api=1&destination=${place.coordinates?.lat || ''},${place.coordinates?.lng || ''}`, '_blank');
               }}>
              Chỉ đường
            </button>
          </div>
        </div>
      </Link>
    </article>
  );
}
