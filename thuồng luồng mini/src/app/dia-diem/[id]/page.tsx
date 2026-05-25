import { getPlaceById, PLACES } from "@/lib/data";
import { MapPin, Phone, Clock, CreditCard, Wifi, Coffee, Wind, Car, Users, Music } from "lucide-react";
import Link from "next/link";
import ReviewSection from "@/components/ReviewSection";
import type { Metadata } from "next";

export async function generateStaticParams() {
  return PLACES.map((p: any) => ({
    id: p.id.toString(),
  }));
}

export async function generateMetadata(props: any): Promise<Metadata> {
  const params = await props.params;
  const place = getPlaceById(parseInt(params.id, 10));

  if (!place) return { title: "Không tìm thấy địa điểm" };

  return {
    title: `${place.name} | Thuồng Luồng Mini`,
    description: place.description,
    openGraph: {
      title: place.name,
      description: place.description,
      images: place.images && place.images.length > 0 ? [place.images[0]] : [],
    },
  };
}

export default async function PlaceDetail(props: any) {
  const params = await props.params;
  const placeId = parseInt(params.id, 10);
  const place = getPlaceById(placeId);

  if (!place) {
    return <div className="container" style={{paddingTop: "40px"}}><h2>Địa điểm không tồn tại</h2></div>;
  }

  const gradientColors = place.imageColors || ['#F4A261', '#E76F51'];
  
  return (
    <div className="page-container detail-page">
      <div className="detail-hero">
        <div className="detail-hero__image-container" style={{background: `linear-gradient(135deg, ${gradientColors[0]}, ${gradientColors[1] || gradientColors[0]})`}}>
          {place.images && place.images.length > 0 && (
            <img src={place.images[0]} alt={place.name} className="detail-hero__image" />
          )}
        </div>
      </div>

      <div className="container" style={{marginTop: "-40px", position: "relative", zIndex: 10, paddingBottom: "var(--space-8)"}}>
        <div className="detail-header card" style={{padding: "var(--space-6)"}}>
          <div style={{display: "flex", justifyContent: "space-between", alignItems: "flex-start"}}>
            <div>
              <div className="card__badges" style={{position: "static", marginBottom: "var(--space-2)"}}>
                <span className="badge badge--price">{place.priceRange}</span>
                {place.isFeatured && <span className="badge badge--primary">🔥 Đang hot</span>}
              </div>
              <h1 className="detail-title" style={{fontSize: "1.8rem", fontWeight: 800, marginBottom: "var(--space-2)"}}>{place.name}</h1>
              <div style={{display: "flex", alignItems: "center", gap: "var(--space-2)", color: "var(--color-text-secondary)", flexWrap: "wrap"}}>
                <span style={{fontWeight: 600, color: "var(--color-warning)"}}>★ {place.rating}</span>
                <span>({place.totalReviews} đánh giá)</span>
                <span>•</span>
                <span>{place.subCategory}</span>
              </div>
            </div>
          </div>
          
          <div className="detail-info-grid" style={{marginTop: "var(--space-4)", display: "grid", gap: "var(--space-3)"}}>
            <div className="info-item" style={{display: "flex", gap: "var(--space-3)"}}>
              <MapPin size={18} style={{color: "var(--color-primary)", flexShrink: 0}} />
              <span>{place.address}</span>
            </div>
            {place.openHours && (
              <div className="info-item" style={{display: "flex", gap: "var(--space-3)"}}>
                <Clock size={18} style={{color: "var(--color-primary)", flexShrink: 0}} />
                <span>{place.openHours}</span>
              </div>
            )}
            {place.phone && (
              <div className="info-item" style={{display: "flex", gap: "var(--space-3)"}}>
                <Phone size={18} style={{color: "var(--color-primary)", flexShrink: 0}} />
                <span>{place.phone}</span>
              </div>
            )}
          </div>
        </div>

        <div className="section" style={{marginTop: "var(--space-6)"}}>
          <h2 className="section__title">Giới thiệu</h2>
          <p style={{lineHeight: 1.6, color: "var(--color-text-secondary)"}}>
            {(place as any).fullDescription || place.description}
          </p>
        </div>
        
        {place.amenities && place.amenities.length > 0 && (
          <div className="section" style={{marginTop: "var(--space-6)"}}>
            <h2 className="section__title">Tiện ích</h2>
            <div style={{display: "flex", flexWrap: "wrap", gap: "var(--space-2)"}}>
              {place.amenities.map((am: string, i: number) => (
                <span key={i} className="badge" style={{background: "var(--color-bg-secondary)", color: "var(--color-text-heading)"}}>{am}</span>
              ))}
            </div>
          </div>
        )}

        <ReviewSection placeId={place.id} />

      </div>
    </div>
  );
}
