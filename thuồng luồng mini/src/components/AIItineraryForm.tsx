"use client";

import { useState } from "react";
import { Sparkles, Map, Calendar, Wallet, Users, ArrowRight } from "lucide-react";
import Link from "next/link";

export default function AIItineraryForm() {
  const [days, setDays] = useState(2);
  const [budget, setBudget] = useState("Vừa phải (1 - 2 triệu)");
  const [interests, setInterests] = useState("Thiên nhiên, ăn uống");
  const [groupSize, setGroupSize] = useState("Cặp đôi");
  
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<any>(null);
  const [error, setError] = useState("");

  const handleGenerate = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setResult(null);

    try {
      const res = await fetch("/api/itinerary", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ days, budget, interests, groupSize })
      });
      
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Có lỗi xảy ra");
      
      setResult(data);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="card" style={{ marginBottom: "var(--space-8)", overflow: "hidden", border: "2px solid var(--color-primary-light)" }}>
      <div style={{ background: "linear-gradient(135deg, var(--color-primary-light), var(--color-primary))", color: "white", padding: "var(--space-5)" }}>
        <h2 style={{ display: "flex", alignItems: "center", gap: "10px", fontSize: "1.5rem", marginBottom: "5px" }}>
          <Sparkles /> Trợ lý Lịch trình AI
        </h2>
        <p style={{ opacity: 0.9 }}>Bé Na sẽ thiết kế riêng cho bạn một chuyến đi Tuyên Quang hoàn hảo!</p>
      </div>
      
      <div style={{ padding: "var(--space-5)" }}>
        {!result ? (
          <form onSubmit={handleGenerate} style={{ display: "grid", gap: "var(--space-4)" }}>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: "var(--space-4)" }}>
              <div>
                <label style={{ display: "block", marginBottom: "5px", fontWeight: "bold", color: "var(--color-text-secondary)" }}>Thời gian (ngày)</label>
                <div className="search-bar" style={{ padding: 0 }}>
                  <Calendar size={18} style={{ marginLeft: "15px", color: "var(--color-primary)" }} />
                  <input type="number" min={1} max={7} value={days} onChange={e => setDays(Number(e.target.value))} className="search-bar__input" style={{ background: "transparent", paddingLeft: "10px" }} />
                </div>
              </div>
              
              <div>
                <label style={{ display: "block", marginBottom: "5px", fontWeight: "bold", color: "var(--color-text-secondary)" }}>Ngân sách</label>
                <div className="search-bar" style={{ padding: 0 }}>
                  <Wallet size={18} style={{ marginLeft: "15px", color: "var(--color-primary)" }} />
                  <select value={budget} onChange={e => setBudget(e.target.value)} className="search-bar__input" style={{ background: "transparent", paddingLeft: "10px", cursor: "pointer", appearance: "none" }}>
                    <option>Tiết kiệm (&lt; 1 triệu)</option>
                    <option>Vừa phải (1 - 2 triệu)</option>
                    <option>Dư dả (&gt; 2 triệu)</option>
                  </select>
                </div>
              </div>

              <div>
                <label style={{ display: "block", marginBottom: "5px", fontWeight: "bold", color: "var(--color-text-secondary)" }}>Đi cùng ai</label>
                <div className="search-bar" style={{ padding: 0 }}>
                  <Users size={18} style={{ marginLeft: "15px", color: "var(--color-primary)" }} />
                  <select value={groupSize} onChange={e => setGroupSize(e.target.value)} className="search-bar__input" style={{ background: "transparent", paddingLeft: "10px", cursor: "pointer", appearance: "none" }}>
                    <option>Đi một mình</option>
                    <option>Cặp đôi</option>
                    <option>Gia đình</option>
                    <option>Nhóm bạn</option>
                  </select>
                </div>
              </div>
            </div>

            <div>
              <label style={{ display: "block", marginBottom: "5px", fontWeight: "bold", color: "var(--color-text-secondary)" }}>Bạn thích trải nghiệm gì?</label>
              <textarea 
                value={interests} 
                onChange={e => setInterests(e.target.value)} 
                className="search-bar__input" 
                style={{ width: "100%", minHeight: "80px", padding: "15px", borderRadius: "12px", border: "1px solid var(--color-border)", resize: "none" }}
                placeholder="VD: Thích không gian yên tĩnh, ăn đặc sản cá sông, thích check-in sống ảo..."
              />
            </div>

            {error && <div style={{ color: "var(--color-danger)", background: "var(--color-danger-light)", padding: "10px", borderRadius: "8px" }}>{error}</div>}

            <button type="submit" disabled={loading} className="btn btn--primary" style={{ width: "100%", justifyContent: "center", padding: "15px", fontSize: "1.1rem" }}>
              {loading ? <><span className="spinner"></span> Đang nặn lịch trình...</> : <><Sparkles size={20} /> Tạo Lịch Trình Ngay</>}
            </button>
          </form>
        ) : (
          <div className="ai-result animate-on-scroll">
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "20px" }}>
              <h3 style={{ fontSize: "1.4rem", color: "var(--color-primary)" }}>{result.title}</h3>
              <button onClick={() => setResult(null)} className="btn btn--outline btn--sm">Tạo lại</button>
            </div>
            
            <p style={{ color: "var(--color-text-secondary)", marginBottom: "20px" }}>{result.description}</p>
            
            <div style={{ display: "flex", gap: "10px", marginBottom: "20px", flexWrap: "wrap" }}>
              {result.tags?.map((tag: string, i: number) => (
                <span key={i} className="badge" style={{ background: "var(--color-bg-secondary)", color: "var(--color-text-heading)" }}>{tag}</span>
              ))}
              <span className="badge badge--price">{result.budget}</span>
            </div>

            <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
              {result.days?.map((day: any, dIndex: number) => (
                <div key={dIndex} style={{ borderLeft: "3px solid var(--color-primary)", paddingLeft: "15px" }}>
                  <h4 style={{ fontSize: "1.1rem", marginBottom: "10px" }}>Ngày {day.day}: {day.title}</h4>
                  <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
                    {day.activities?.map((act: any, aIndex: number) => (
                      <div key={aIndex} style={{ background: "var(--color-bg-hover)", padding: "15px", borderRadius: "10px" }}>
                        <div style={{ fontWeight: "bold", color: "var(--color-text-heading)", marginBottom: "5px" }}>{act.time} - {act.title}</div>
                        <div style={{ color: "var(--color-text-secondary)", fontSize: "0.95rem", marginBottom: "8px" }}>{act.description}</div>
                        <div style={{ display: "flex", alignItems: "center", gap: "5px", fontSize: "0.85rem", color: "var(--color-primary)" }}>
                          <Map size={14} /> {act.location}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
