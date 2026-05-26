import { ITINERARIES } from "@/lib/itinerary-data";
import Link from "next/link";
import { Clock, Map, Wallet, ArrowRight } from "lucide-react";
import AIItineraryForm from "@/components/AIItineraryForm";

export const metadata = {
  title: "Lộ Trình Du Lịch Tuyên Quang - Na Hang, Thác Bà, Lâm Bình",
  description: "Gợi ý lộ trình du lịch Tuyên Quang 1 ngày, 2 ngày, 3 ngày. Khám phá Na Hang, Hồ Thác Bà, Lâm Bình, Núi Dùm. Lập lịch thông minh với AI.",
  alternates: { canonical: "https://thuongluongmini-v2.pages.dev/lo-trinh" },
  openGraph: {
    title: "Lộ Trình Du Lịch Tuyên Quang - Thuồng Luồng Mini",
    description: "Gợi ý lộ trình du lịch Tuyên Quang 1-3 ngày. Lập kế hoạch thông minh với AI Thuồng Luồng Mini.",
  },
};

export default function ItineraryListPage() {
  return (
    <div className="page-container" style={{paddingTop: "var(--space-4)"}}>
      <div className="container">
        <h1 style={{fontSize: "2rem", marginBottom: "var(--space-2)"}}>Gợi ý Lộ trình</h1>
        <p style={{color: "var(--color-text-secondary)", marginBottom: "var(--space-6)"}}>
          Không biết đi đâu? Hãy để Thuồng Luồng lên lịch trình giúp bạn!
        </p>

        <AIItineraryForm />

        <h2 style={{fontSize: "1.5rem", marginBottom: "var(--space-4)", marginTop: "var(--space-6)"}}>Lộ trình phổ biến</h2>

        <div className="places-grid">
          {ITINERARIES.map((it: any) => (
            <Link href={`/lo-trinh/${it.id}`} key={it.id} className="card animate-on-scroll" style={{textDecoration: "none"}}>
              <div className="card__image-wrapper" style={{paddingBottom: "56.25%"}}>
                <img src={it.image} alt={it.title} loading="lazy" className="card__image" style={{objectFit: "cover", width: "100%", height: "100%", position: "absolute", top: 0, left: 0}} />
                <div className="card__badges" style={{position: "absolute", top: "10px", left: "10px"}}>
                  <span className="badge" style={{background: "var(--color-primary)", color: "white"}}>{it.duration}</span>
                </div>
              </div>
              <div className="card__content" style={{padding: "var(--space-4)"}}>
                <h3 className="card__title" style={{fontSize: "1.2rem", marginBottom: "var(--space-2)", color: "var(--color-text-heading)"}}>{it.title}</h3>
                <p style={{color: "var(--color-text-secondary)", fontSize: "0.95rem", marginBottom: "var(--space-4)", lineHeight: "1.5"}}>{it.shortDesc}</p>
                <div style={{display: "flex", justifyContent: "space-between", alignItems: "center", borderTop: "1px solid var(--color-border-light)", paddingTop: "var(--space-3)", fontSize: "0.9rem", color: "var(--color-text)"}}>
                  <div style={{display: "flex", gap: "10px"}}>
                    <span style={{display: "flex", alignItems: "center", gap: "4px"}}><Map size={14} /> {it.distance}</span>
                    <span style={{display: "flex", alignItems: "center", gap: "4px"}}><Wallet size={14} /> {it.costEstimate.split('/')[0]}</span>
                  </div>
                  <ArrowRight size={16} style={{color: "var(--color-primary)"}} />
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
