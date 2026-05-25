import { ITINERARIES } from "@/lib/itinerary-data";
import { getPlaceById } from "@/lib/data";
import { MapPin, Clock, Wallet, Map, Calendar, Navigation } from "lucide-react";
import Link from "next/link";

export async function generateStaticParams() {
  return ITINERARIES.map((it: any) => ({
    id: it.id,
  }));
}

export default async function ItineraryDetail(props: any) {
  const params = await props.params;
  const it = ITINERARIES.find((i: any) => i.id === params.id);

  if (!it) {
    return <div className="container" style={{paddingTop: "40px"}}><h2>Lộ trình không tồn tại</h2></div>;
  }

  return (
    <div className="page-container detail-page">
      <div className="detail-hero">
        <div className="detail-hero__image-container">
          <img src={it.image} alt={it.title} className="detail-hero__image" style={{filter: "brightness(0.7)"}} />
          <div style={{position: "absolute", bottom: "40px", left: "0", right: "0", padding: "0 20px", color: "white"}}>
            <div className="container">
              <span className="badge" style={{background: "var(--color-primary)", marginBottom: "10px"}}>{it.duration}</span>
              <h1 style={{fontSize: "2.5rem", fontWeight: 800, textShadow: "0 2px 4px rgba(0,0,0,0.5)"}}>{it.title}</h1>
              <p style={{fontSize: "1.1rem", maxWidth: "600px", textShadow: "0 1px 2px rgba(0,0,0,0.5)", marginTop: "10px"}}>{it.shortDesc}</p>
            </div>
          </div>
        </div>
      </div>

      <div className="container" style={{paddingTop: "var(--space-6)", paddingBottom: "var(--space-8)"}}>
        <div style={{display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(150px, 1fr))", gap: "15px", marginBottom: "30px"}}>
          <div className="card" style={{padding: "15px", display: "flex", flexDirection: "column", alignItems: "center", textAlign: "center"}}>
            <Wallet style={{color: "var(--color-primary)", marginBottom: "5px"}} />
            <span style={{fontWeight: "bold"}}>{it.costEstimate}</span>
            <span style={{fontSize: "0.85rem", color: "var(--color-text-secondary)"}}>Chi phí dự kiến</span>
          </div>
          <div className="card" style={{padding: "15px", display: "flex", flexDirection: "column", alignItems: "center", textAlign: "center"}}>
            <Map style={{color: "var(--color-primary)", marginBottom: "5px"}} />
            <span style={{fontWeight: "bold"}}>{it.distance}</span>
            <span style={{fontSize: "0.85rem", color: "var(--color-text-secondary)"}}>Tổng quãng đường</span>
          </div>
          <div className="card" style={{padding: "15px", display: "flex", flexDirection: "column", alignItems: "center", textAlign: "center"}}>
            <Calendar style={{color: "var(--color-primary)", marginBottom: "5px"}} />
            <span style={{fontWeight: "bold"}}>{it.duration}</span>
            <span style={{fontSize: "0.85rem", color: "var(--color-text-secondary)"}}>Thời gian</span>
          </div>
        </div>

        <h2 style={{fontSize: "1.5rem", marginBottom: "20px"}}>Lịch trình chi tiết</h2>
        
        <div className="itinerary-timeline" style={{position: "relative", paddingLeft: "30px"}}>
          <div style={{position: "absolute", left: "14px", top: "0", bottom: "0", width: "2px", background: "var(--color-border)"}}></div>
          
          {it.days.map((day: any, dIndex: number) => (
            <div key={dIndex} style={{marginBottom: "30px"}}>
              <h3 style={{position: "relative", fontSize: "1.2rem", color: "var(--color-primary)", marginBottom: "15px"}}>
                <div style={{position: "absolute", left: "-36px", top: "50%", transform: "translateY(-50%)", width: "14px", height: "14px", background: "var(--color-primary)", borderRadius: "50%", border: "3px solid white"}}></div>
                {day.day}
              </h3>
              
              {day.activities.map((act: any, aIndex: number) => {
                const place = act.placeId ? getPlaceById(act.placeId) : null;
                
                return (
                  <div key={aIndex} className="card" style={{padding: "15px", marginBottom: "15px", position: "relative"}}>
                    <div style={{display: "flex", alignItems: "flex-start", gap: "15px"}}>
                      <div style={{minWidth: "60px", fontWeight: "bold", color: "var(--color-text-secondary)"}}>
                        {act.time}
                      </div>
                      <div style={{flex: 1}}>
                        <h4 style={{fontSize: "1.1rem", marginBottom: "5px"}}>{act.title}</h4>
                        <p style={{fontSize: "0.95rem", color: "var(--color-text-secondary)", marginBottom: "10px"}}>{act.description}</p>
                        
                        {place && (
                          <div style={{background: "var(--color-bg-secondary)", padding: "10px", borderRadius: "10px", display: "flex", gap: "10px", alignItems: "center", marginTop: "10px"}}>
                            {place.images && <img src={place.images[0]} alt={place.name} style={{width: "50px", height: "50px", objectFit: "cover", borderRadius: "8px"}} />}
                            <div style={{flex: 1}}>
                              <h5 style={{margin: 0, fontSize: "0.95rem"}}>{place.name}</h5>
                              <span style={{fontSize: "0.8rem", color: "var(--color-text-tertiary)"}}><MapPin size={12}/> {place.address}</span>
                            </div>
                            <Link href={`/dia-diem/${place.id}`} className="btn btn--outline btn--sm" style={{padding: "5px 10px", fontSize: "0.8rem"}}>
                              Chi tiết
                            </Link>
                          </div>
                        )}
                        
                        {act.transitToNext && (
                          <div style={{display: "flex", alignItems: "center", gap: "5px", color: "var(--color-warning)", fontSize: "0.85rem", marginTop: "10px", fontWeight: 600}}>
                            <Navigation size={14} />
                            Di chuyển: {act.transitToNext}
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
