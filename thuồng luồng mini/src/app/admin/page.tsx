"use client";

import { useState, useEffect } from "react";
import { auth, db } from "@/lib/firebase";
import { onAuthStateChanged, User } from "firebase/auth";
import { collection, getDocs, doc, setDoc, deleteDoc } from "firebase/firestore";
import { PLACES, CATEGORIES, SUB_CATEGORIES } from "@/lib/data";
import { useRouter } from "next/navigation";
import { Save, RefreshCw, UploadCloud, Trash2, Plus, ArrowRight } from "lucide-react";

const ADMIN_EMAILS = ["minhnhatzany@gmail.com", "minhnhat@gmail.com", "admin@thuongluongmini.com"];

export default function AdminPage() {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [places, setPlaces] = useState<any[]>([]);
  const [isMigrating, setIsMigrating] = useState(false);
  const [isDeploying, setIsDeploying] = useState(false);
  const [deployHook, setDeployHook] = useState("");
  
  // Form State
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    category: "an-uong",
    subCategory: "Quán ăn",
    description: "",
    address: "",
    phone: "",
    priceText: "",
    priceRange: "$$",
    imageUrl: ""
  });

  const router = useRouter();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      if (currentUser && ADMIN_EMAILS.some(email => currentUser.email?.includes(email.split('@')[0]))) {
        setUser(currentUser);
        fetchPlacesFromCloud();
        
        // Load deploy hook from local storage if exists
        const hook = localStorage.getItem('tlm_deploy_hook');
        if (hook) setDeployHook(hook);
      } else if (currentUser) {
        // Not admin
        router.push("/");
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, [router]);

  const fetchPlacesFromCloud = async () => {
    try {
      const querySnapshot = await getDocs(collection(db, "places"));
      const cloudPlaces: any[] = [];
      querySnapshot.forEach((doc) => {
        cloudPlaces.push({ id: doc.id, ...doc.data() });
      });
      setPlaces(cloudPlaces);
    } catch (error) {
      console.error("Lỗi khi tải dữ liệu:", error);
    }
  };

  const handleMigrate = async () => {
    if (!confirm("Hành động này sẽ đẩy tất cả dữ liệu mẫu từ code lên Firestore. Bạn có chắc chắn?")) return;
    setIsMigrating(true);
    try {
      for (const place of PLACES) {
        const placeRef = doc(db, "places", place.id.toString());
        await setDoc(placeRef, place, { merge: true });
      }
      alert("Đồng bộ dữ liệu thành công!");
      fetchPlacesFromCloud();
    } catch (error) {
      console.error("Lỗi đồng bộ:", error);
      alert("Có lỗi xảy ra: " + (error as Error).message);
    }
    setIsMigrating(false);
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Bạn có chắc chắn muốn xóa địa điểm này?")) return;
    try {
      await deleteDoc(doc(db, "places", id.toString()));
      fetchPlacesFromCloud();
    } catch (error) {
      console.error("Lỗi xóa:", error);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.address) {
      alert("Vui lòng điền Tên và Địa chỉ");
      return;
    }

    try {
      const newId = Date.now().toString();
      const newPlace = {
        id: newId,
        slug: formData.name.toLowerCase().replace(/ /g, '-').normalize("NFD").replace(/[\u0300-\u036f]/g, ""),
        name: formData.name,
        category: formData.category,
        subCategory: formData.subCategory,
        description: formData.description,
        fullDescription: formData.description,
        address: formData.address,
        phone: formData.phone,
        priceRange: formData.priceRange,
        priceText: formData.priceText,
        rating: 0,
        totalReviews: 0,
        images: formData.imageUrl ? [formData.imageUrl] : ['https://images.unsplash.com/photo-1555396273-367ea4eb4db5?auto=format&fit=crop&q=80'],
        imageColors: ['#E76F51', '#F4A261', '#E9C46A'],
        openHours: 'T2-CN: 08:00 - 22:00',
        isOpen: true,
        isFeatured: false,
        isNew: true,
        tags: [formData.category],
        amenities: ['Wifi', 'Bãi đỗ xe'],
        coordinates: { lat: 21.82, lng: 105.21 }, // Default center
        social: { facebook: '', zalo: formData.phone, instagram: '' },
        menu: [],
        reviews: []
      };

      await setDoc(doc(db, "places", newId), newPlace);
      setShowForm(false);
      setFormData({
        name: "", category: "an-uong", subCategory: "Quán ăn", description: "",
        address: "", phone: "", priceText: "", priceRange: "$$", imageUrl: ""
      });
      fetchPlacesFromCloud();
      alert("Thêm địa điểm thành công!");
    } catch (error) {
      console.error("Lỗi thêm địa điểm:", error);
      alert("Có lỗi xảy ra!");
    }
  };

  const handleDeploy = async () => {
    if (!deployHook) {
      alert("Vui lòng nhập Link Cloudflare Deploy Hook trước!");
      return;
    }
    
    setIsDeploying(true);
    localStorage.setItem('tlm_deploy_hook', deployHook);
    
    try {
      await fetch(deployHook, { method: 'POST' });
      alert("Đã gửi yêu cầu Xuất bản lên Cloudflare! Website sẽ được cập nhật sau ~2 phút.");
    } catch (error) {
      // Cloudflare hook via fetch sometimes fails CORS if hit directly from browser, but request still succeeds
      alert("Đã gửi yêu cầu Xuất bản! (Nếu có lỗi CORS, yêu cầu vẫn đã được Cloudflare tiếp nhận).");
    }
    setIsDeploying(false);
  };

  if (loading) {
    return <div style={{ display: "flex", justifyContent: "center", padding: "100px" }}><div className="spinner"></div></div>;
  }

  if (!user) {
    return <div className="container" style={{ padding: "100px 0", textAlign: "center" }}><h2>Bạn không có quyền truy cập trang này</h2></div>;
  }

  return (
    <div className="container" style={{ padding: "var(--space-6) 0" }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "var(--space-6)" }}>
        <h1>Trang Quản Trị (Admin)</h1>
        <div style={{ display: "flex", gap: "10px" }}>
          <button onClick={handleMigrate} disabled={isMigrating} className="btn btn--outline" style={{ background: "var(--color-background)" }}>
            <UploadCloud size={18} /> {isMigrating ? "Đang đồng bộ..." : "Đồng bộ dữ liệu gốc lên Mây"}
          </button>
        </div>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "1fr 3fr", gap: "var(--space-6)" }}>
        
        {/* Sidebar Controls */}
        <div style={{ display: "flex", flexDirection: "column", gap: "var(--space-4)" }}>
          <div className="card" style={{ padding: "var(--space-4)" }}>
            <h3 style={{ marginBottom: "var(--space-2)", fontSize: "1.2rem" }}>Xuất Bản Lên Web</h3>
            <p style={{ fontSize: "0.9rem", color: "var(--color-text-light)", marginBottom: "var(--space-3)" }}>
              Dữ liệu của bạn được lưu trên Mây (Firestore). Để dữ liệu hiển thị lên web cho khách xem, bạn cần Xuất Bản.
            </p>
            <input 
              type="text" 
              placeholder="Nhập Cloudflare Deploy Hook URL..." 
              value={deployHook}
              onChange={(e) => setDeployHook(e.target.value)}
              style={{ width: "100%", padding: "8px", marginBottom: "var(--space-3)", borderRadius: "var(--radius-sm)", border: "1px solid var(--color-border)", background: "var(--color-background)" }}
            />
            <button 
              onClick={handleDeploy} 
              disabled={isDeploying || !deployHook} 
              className="btn btn--primary" 
              style={{ width: "100%", justifyContent: "center" }}
            >
              <RefreshCw size={18} className={isDeploying ? "spin" : ""} /> 
              {isDeploying ? "Đang xuất bản..." : "Cập nhật Web ngay"}
            </button>
            <a href="https://dash.cloudflare.com" target="_blank" rel="noreferrer" style={{ display: "block", textAlign: "center", fontSize: "0.85rem", marginTop: "10px", color: "var(--color-primary)" }}>
              Cách lấy Deploy Hook
            </a>
          </div>

          <div className="card" style={{ padding: "var(--space-4)", background: "var(--color-primary)", color: "white" }}>
            <h3 style={{ marginBottom: "var(--space-2)", fontSize: "1.2rem" }}>Trợ giúp</h3>
            <p style={{ fontSize: "0.9rem", marginBottom: "var(--space-2)", opacity: 0.9 }}>
              <strong>B1:</strong> Bấm "Đồng bộ dữ liệu gốc" (chỉ làm 1 lần đầu).
            </p>
            <p style={{ fontSize: "0.9rem", marginBottom: "var(--space-2)", opacity: 0.9 }}>
              <strong>B2:</strong> Thêm hoặc Xóa địa điểm tùy ý.
            </p>
            <p style={{ fontSize: "0.9rem", opacity: 0.9 }}>
              <strong>B3:</strong> Bấm "Cập nhật Web ngay" để mọi người thấy.
            </p>
          </div>
        </div>

        {/* Main Content */}
        <div className="card" style={{ padding: "var(--space-5)" }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "var(--space-4)" }}>
            <h2 style={{ fontSize: "1.5rem", display: "flex", alignItems: "center", gap: "10px" }}>
              Danh sách địa điểm <span className="badge badge--primary">{places.length}</span>
            </h2>
            <button onClick={() => setShowForm(!showForm)} className="btn btn--primary btn--sm">
              <Plus size={16} /> Thêm địa điểm mới
            </button>
          </div>

          {showForm && (
            <div style={{ background: "var(--color-background-alt)", padding: "var(--space-4)", borderRadius: "var(--radius-md)", marginBottom: "var(--space-6)" }}>
              <h3 style={{ marginBottom: "var(--space-4)" }}>Thêm địa điểm mới</h3>
              <form onSubmit={handleSubmit} style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "var(--space-3)" }}>
                <div style={{ gridColumn: "1 / -1" }}>
                  <label style={{ display: "block", marginBottom: "5px", fontWeight: "bold" }}>Tên địa điểm *</label>
                  <input required type="text" value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})} style={{ width: "100%", padding: "10px", borderRadius: "var(--radius-sm)", border: "1px solid var(--color-border)", background: "var(--color-background)", color: "var(--color-text)" }} />
                </div>
                
                <div>
                  <label style={{ display: "block", marginBottom: "5px", fontWeight: "bold" }}>Danh mục chính</label>
                  <select value={formData.category} onChange={e => setFormData({...formData, category: e.target.value})} style={{ width: "100%", padding: "10px", borderRadius: "var(--radius-sm)", border: "1px solid var(--color-border)", background: "var(--color-background)", color: "var(--color-text)" }}>
                    {CATEGORIES.map(c => <option key={c.id} value={c.id}>{c.name}</option>)}
                  </select>
                </div>

                <div>
                  <label style={{ display: "block", marginBottom: "5px", fontWeight: "bold" }}>Danh mục con</label>
                  <select value={formData.subCategory} onChange={e => setFormData({...formData, subCategory: e.target.value})} style={{ width: "100%", padding: "10px", borderRadius: "var(--radius-sm)", border: "1px solid var(--color-border)", background: "var(--color-background)", color: "var(--color-text)" }}>
                    {(SUB_CATEGORIES[formData.category as keyof typeof SUB_CATEGORIES] || []).map(sc => (
                      <option key={sc} value={sc}>{sc}</option>
                    ))}
                  </select>
                </div>

                <div style={{ gridColumn: "1 / -1" }}>
                  <label style={{ display: "block", marginBottom: "5px", fontWeight: "bold" }}>Địa chỉ *</label>
                  <input required type="text" value={formData.address} onChange={e => setFormData({...formData, address: e.target.value})} style={{ width: "100%", padding: "10px", borderRadius: "var(--radius-sm)", border: "1px solid var(--color-border)", background: "var(--color-background)", color: "var(--color-text)" }} />
                </div>

                <div style={{ gridColumn: "1 / -1" }}>
                  <label style={{ display: "block", marginBottom: "5px", fontWeight: "bold" }}>Mô tả ngắn</label>
                  <textarea value={formData.description} onChange={e => setFormData({...formData, description: e.target.value})} style={{ width: "100%", padding: "10px", borderRadius: "var(--radius-sm)", border: "1px solid var(--color-border)", background: "var(--color-background)", color: "var(--color-text)", minHeight: "80px" }} />
                </div>

                <div>
                  <label style={{ display: "block", marginBottom: "5px", fontWeight: "bold" }}>Số điện thoại</label>
                  <input type="text" value={formData.phone} onChange={e => setFormData({...formData, phone: e.target.value})} style={{ width: "100%", padding: "10px", borderRadius: "var(--radius-sm)", border: "1px solid var(--color-border)", background: "var(--color-background)", color: "var(--color-text)" }} />
                </div>

                <div>
                  <label style={{ display: "block", marginBottom: "5px", fontWeight: "bold" }}>Giá tiền (VD: 50.000đ - 100.000đ)</label>
                  <input type="text" value={formData.priceText} onChange={e => setFormData({...formData, priceText: e.target.value})} style={{ width: "100%", padding: "10px", borderRadius: "var(--radius-sm)", border: "1px solid var(--color-border)", background: "var(--color-background)", color: "var(--color-text)" }} />
                </div>

                <div style={{ gridColumn: "1 / -1" }}>
                  <label style={{ display: "block", marginBottom: "5px", fontWeight: "bold" }}>Link Ảnh (URL hoặc ImgBB URL)</label>
                  <div style={{ display: "flex", gap: "10px" }}>
                    <input type="url" value={formData.imageUrl} onChange={e => setFormData({...formData, imageUrl: e.target.value})} placeholder="https://..." style={{ flex: 1, padding: "10px", borderRadius: "var(--radius-sm)", border: "1px solid var(--color-border)", background: "var(--color-background)", color: "var(--color-text)" }} />
                    <a href="https://imgbb.com" target="_blank" rel="noreferrer" className="btn btn--outline" style={{ background: "var(--color-background)" }}>
                      <UploadCloud size={16} /> Tải ảnh lên ImgBB
                    </a>
                  </div>
                </div>

                <div style={{ gridColumn: "1 / -1", display: "flex", justifyContent: "flex-end", gap: "10px", marginTop: "var(--space-3)" }}>
                  <button type="button" onClick={() => setShowForm(false)} className="btn btn--outline" style={{ background: "var(--color-background)" }}>Hủy</button>
                  <button type="submit" className="btn btn--primary"><Save size={16} /> Lưu địa điểm</button>
                </div>
              </form>
            </div>
          )}

          {/* Table */}
          <div style={{ overflowX: "auto" }}>
            <table style={{ width: "100%", borderCollapse: "collapse" }}>
              <thead>
                <tr style={{ borderBottom: "2px solid var(--color-border)", textAlign: "left" }}>
                  <th style={{ padding: "12px 8px" }}>Tên địa điểm</th>
                  <th style={{ padding: "12px 8px" }}>Danh mục</th>
                  <th style={{ padding: "12px 8px" }}>Trạng thái</th>
                  <th style={{ padding: "12px 8px", textAlign: "right" }}>Thao tác</th>
                </tr>
              </thead>
              <tbody>
                {places.map((place) => (
                  <tr key={place.id} style={{ borderBottom: "1px solid var(--color-border-dark)" }}>
                    <td style={{ padding: "12px 8px", fontWeight: "bold" }}>
                      <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                        <div style={{ width: "40px", height: "40px", borderRadius: "8px", background: "var(--color-border)", overflow: "hidden" }}>
                          {place.images && place.images[0] && (
                            <img src={place.images[0]} alt="" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
                          )}
                        </div>
                        {place.name}
                      </div>
                    </td>
                    <td style={{ padding: "12px 8px" }}>{place.subCategory}</td>
                    <td style={{ padding: "12px 8px" }}>
                      <span className="badge badge--primary" style={{ padding: "2px 8px", fontSize: "0.75rem" }}>Đã đăng</span>
                    </td>
                    <td style={{ padding: "12px 8px", textAlign: "right" }}>
                      <button onClick={() => handleDelete(place.id)} className="btn btn--outline btn--sm" style={{ color: "var(--color-danger)", borderColor: "var(--color-danger)", background: "transparent" }}>
                        <Trash2 size={16} />
                      </button>
                    </td>
                  </tr>
                ))}
                {places.length === 0 && (
                  <tr>
                    <td colSpan={4} style={{ padding: "30px", textAlign: "center", color: "var(--color-text-light)" }}>
                      Chưa có dữ liệu trên Mây. Hãy bấm "Đồng bộ dữ liệu gốc".
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>

      </div>
      
      <style dangerouslySetInnerHTML={{__html: `
        @keyframes spin { 100% { transform: rotate(360deg); } }
        .spin { animation: spin 1s linear infinite; }
      `}} />
    </div>
  );
}
