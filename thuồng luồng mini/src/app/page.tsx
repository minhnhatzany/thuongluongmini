import Link from "next/link";
import { Search, Globe, Utensils, Music, Camera, Bed, ArrowRight, Wand2 } from "lucide-react";
import { CATEGORIES, getFeaturedPlaces, getTopRatedPlaces, getNewPlaces, getPlacesByTimeOfDay } from "@/lib/data";
import { ITINERARIES } from "@/lib/itinerary-data";
import PlaceCard from "@/components/PlaceCard";

export default function Home() {
  const featured = getFeaturedPlaces();
  const topRated = getTopRatedPlaces(8);
  const newPlaces = getNewPlaces(4);
  const timeSuggested = getPlacesByTimeOfDay(6);

  // Helper function to adjust color (from old utils)
  const adjustColor = (hex: string, amount: number) => {
    if (!hex || typeof hex !== 'string') return '#888888';
    const num = parseInt(hex.replace('#', ''), 16);
    if (isNaN(num)) return '#888888';
    const r = Math.min(255, Math.max(0, (num >> 16) + amount));
    const g = Math.min(255, Math.max(0, ((num >> 8) & 0x00FF) + amount));
    const b = Math.min(255, Math.max(0, (num & 0x0000FF) + amount));
    return `#${(r << 16 | g << 8 | b).toString(16).padStart(6, '0')}`;
  };

  return (
    <>
      {/* Hero Section */}
      <section className="hero" id="hero-section">
        <div className="hero__bg"></div>
        <div className="hero__content container">
          <div className="hero__text animate-on-scroll">
            <h1 className="hero__title">
              Tuyên Quang, <br/> bạn muốn đi đâu?
            </h1>
            
            <div className="hero__search">
              <div className="hero__tags">
                <Link href="/tim-kiem?q=Tất cả" className="hero__tag active"><Globe size={16}/> Khám phá</Link>
                <Link href="/danh-muc/an-uong" className="hero__tag"><Utensils size={16}/> Ăn uống</Link>
                <Link href="/danh-muc/vui-choi" className="hero__tag"><Music size={16}/> Vui chơi</Link>
                <Link href="/danh-muc/du-lich" className="hero__tag"><Camera size={16}/> Du lịch</Link>
                <Link href="/danh-muc/luu-tru" className="hero__tag"><Bed size={16}/> Lưu trú</Link>
              </div>
              
              <div className="search-bar search-bar--lg" style={{marginTop: "16px"}}>
                <Search className="search-bar__icon" size={18} />
                <input type="text" className="search-bar__input" placeholder="Thử tìm 'Bún cá', 'Na Hang' hay 'Quán nhậu'..." style={{paddingLeft: "3.5rem"}} />
                <button className="btn btn--primary" style={{position: "absolute", right: "6px", top: "6px", bottom: "6px", borderRadius: "var(--radius-full)", padding: "0 var(--space-6)", fontWeight: "var(--weight-bold)"}}>
                  Tìm kiếm
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Categories */}
      <section className="section section--categories" id="categories-section" style={{paddingTop: "var(--space-4)"}}>
        <div className="container">
          <div className="categories-grid categories-grid--compact scroller">
            {CATEGORIES.map((cat: any, index: number) => (
              <Link href={`/danh-muc/${cat.id}`} key={cat.id} className="category-card animate-on-scroll" style={{ "--delay": `${index * 0.1}s`, minWidth: "140px" } as any}>
                <div className="category-card__icon" style={{ background: `linear-gradient(135deg, ${cat.color}, ${adjustColor(cat.color, -20)})` }}>
                  <span>{cat.icon}</span>
                </div>
                <h3 className="category-card__name">{cat.name}</h3>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Time Suggestion */}
      {timeSuggested.places && timeSuggested.places.length > 0 && (
        <section className="section" id="time-suggest-section" style={{background: "var(--color-bg-secondary)"}}>
          <div className="container">
            <div className="section__header animate-on-scroll">
              <div>
                <h2 className="section__title">{timeSuggested.timeOfDay === 'day' ? '☀️' : '🌙'} {timeSuggested.greeting}</h2>
                <p className="section__subtitle">Gợi ý hoàn hảo cho thời điểm này trong ngày</p>
              </div>
            </div>
            <div className="scroller">
              {timeSuggested.places.map((place: any) => (
                <PlaceCard key={place.id} place={place} />
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Top Rated */}
      <section className="section section--top-rated" id="top-rated-section">
        <div className="container">
          <div className="section__header animate-on-scroll">
            <div>
              <h2 className="section__title">🏆 Đánh giá cao nhất</h2>
              <p className="section__subtitle">Được cộng đồng Thuồng Luồng tin tưởng</p>
            </div>
            <Link href="/danh-muc/an-uong" className="section__see-all">
              Xem tất cả <ArrowRight size={16} />
            </Link>
          </div>
          <div className="scroller">
            {topRated.map((place: any) => (
              <PlaceCard key={place.id} place={place} />
            ))}
          </div>
        </div>
      </section>

      {/* Itineraries */}
      <section className="section section--itineraries" id="itineraries-section" style={{background: "var(--color-bg-tertiary)"}}>
        <div className="container">
          <div className="section__header animate-on-scroll">
            <div>
              <h2 className="section__title">🗺️ Gợi ý lộ trình</h2>
              <p className="section__subtitle">Không biết đi đâu? Để chúng mình lo!</p>
            </div>
            <Link href="/lo-trinh" className="section__see-all">
              Xem tất cả lộ trình <ArrowRight size={16} />
            </Link>
          </div>
          <div className="scroller" style={{marginBottom: "var(--space-6)"}}>
            {ITINERARIES.slice(0, 3).map((it: any) => (
              <Link href={`/lo-trinh/${it.id}`} key={it.id} className="card animate-on-scroll" style={{textDecoration: "none", minWidth: "280px"}}>
                <div className="card__image-wrapper" style={{paddingBottom: "56.25%"}}>
                  <img src={it.image} alt={it.title} loading="lazy" className="card__image" style={{objectFit: "cover", width: "100%", height: "100%", position: "absolute", top: 0, left: 0}} />
                  <div className="card__badges" style={{position: "absolute", top: "10px", left: "10px"}}>
                    <span className="badge" style={{background: "var(--color-primary)", color: "white"}}>{it.duration}</span>
                  </div>
                </div>
                <div className="card__content" style={{padding: "var(--space-4)"}}>
                  <h3 className="card__title" style={{fontSize: "1.1rem", marginBottom: "var(--space-2)", color: "var(--color-text-heading)"}}>{it.title}</h3>
                  <p style={{color: "var(--color-text-secondary)", fontSize: "0.9rem", marginBottom: "var(--space-3)", lineHeight: "1.4"}}>{it.shortDesc}</p>
                </div>
              </Link>
            ))}
          </div>
          <div style={{textAlign: "center"}}>
            <Link href="/tao-lo-trinh" className="btn btn--primary btn--lg animate-on-scroll" style={{borderRadius: "var(--radius-full)", boxShadow: "var(--shadow-md)"}}>
              <Wand2 size={18} style={{marginRight: 8}} /> Trải nghiệm Tạo Lịch Trình Tự Động
            </Link>
          </div>
        </div>
      </section>

      {/* New Places */}
      {newPlaces.length > 0 && (
        <section className="section section--new" id="new-section">
          <div className="container">
            <div className="section__header animate-on-scroll">
              <div>
                <h2 className="section__title">🆕 Địa điểm mới tinh</h2>
                <p className="section__subtitle">Khám phá những nơi vừa được cộng đồng khai phá</p>
              </div>
            </div>
            <div className="scroller">
              {newPlaces.map((place: any) => (
                <PlaceCard key={place.id} place={place} />
              ))}
            </div>
          </div>
        </section>
      )}

      {/* CTA Section */}
      <section className="section section--cta" id="cta-section" style={{background: "var(--color-bg-secondary)"}}>
        <div className="container">
          <div className="cta-card animate-on-scroll" style={{background: "linear-gradient(135deg, #FDDCB5 0%, #F4A261 100%)", padding: "var(--space-8)", borderRadius: "var(--radius-2xl)", textAlign: "center", boxShadow: "var(--shadow-lg)"}}>
            <div className="cta-card__content">
              <h2 className="cta-card__title" style={{color: "#1F2937", marginBottom: "var(--space-2)", fontSize: "var(--text-3xl)", fontWeight: "var(--weight-black)"}}>Bạn là chủ quán? 🐉</h2>
              <p className="cta-card__text" style={{color: "#374151", marginBottom: "var(--space-6)", fontSize: "var(--text-lg)", maxWidth: "600px", marginLeft: "auto", marginRight: "auto"}}>Đăng ký địa điểm của bạn trên Thuồng Luồng Mini để tiếp cận hàng nghìn khách hàng tiềm năng tại Tuyên Quang!</p>
              <a href="https://www.facebook.com/ThuongLuongMini" target="_blank" rel="noopener noreferrer" className="btn btn--primary btn--lg" style={{background: "#1F2937", color: "#FFF", boxShadow: "0 4px 12px rgba(0,0,0,0.1)", display: "inline-flex", alignItems: "center", gap: "8px", textDecoration: "none"}}>
                Liên hệ thêm quán miễn phí
                <ArrowRight size={18} />
              </a>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
