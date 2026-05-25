"use client";

import { useState, useEffect } from "react";
import { Camera, Send, Star, User } from "lucide-react";
import { auth, db } from "@/lib/firebase";
import { collection, addDoc, getDocs, query, where, orderBy, serverTimestamp, doc, updateDoc, increment } from "firebase/firestore";
import { onAuthStateChanged, User as FirebaseUser } from "firebase/auth";
import ReviewInteractions from "./ReviewInteractions";
import Link from "next/link";

export default function ReviewSection({ placeId }: { placeId: number }) {
  const [user, setUser] = useState<FirebaseUser | null>(null);
  const [rating, setRating] = useState(5);
  const [content, setContent] = useState("");
  const [images, setImages] = useState<string[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [reviews, setReviews] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });

    fetchReviews();

    return () => unsubscribe();
  }, [placeId]);

  const fetchReviews = async () => {
    try {
      const q = query(
        collection(db, "reviews"), 
        where("placeId", "==", placeId),
        orderBy("createdAt", "desc")
      );
      const querySnapshot = await getDocs(q);
      const fetchedReviews: any[] = [];
      querySnapshot.forEach((doc) => {
        fetchedReviews.push({ id: doc.id, ...doc.data() });
      });
      setReviews(fetchedReviews);
    } catch (error) {
      console.error("Lỗi khi tải đánh giá:", error);
    }
    setLoading(false);
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      if (images.length >= 3) {
        alert("Chỉ được tải lên tối đa 3 ảnh.");
        return;
      }
      const file = e.target.files[0];
      
      // Nén ảnh bằng Canvas để tránh quá 1MB của Firestore
      const reader = new FileReader();
      reader.onload = (event) => {
        const img = new Image();
        img.onload = () => {
          const canvas = document.createElement("canvas");
          const MAX_WIDTH = 800;
          const MAX_HEIGHT = 800;
          let width = img.width;
          let height = img.height;

          if (width > height) {
            if (width > MAX_WIDTH) {
              height *= MAX_WIDTH / width;
              width = MAX_WIDTH;
            }
          } else {
            if (height > MAX_HEIGHT) {
              width *= MAX_HEIGHT / height;
              height = MAX_HEIGHT;
            }
          }

          canvas.width = width;
          canvas.height = height;
          const ctx = canvas.getContext("2d");
          ctx?.drawImage(img, 0, 0, width, height);
          
          const compressedBase64 = canvas.toDataURL("image/jpeg", 0.7);
          setImages((prev) => [...prev, compressedBase64]);
        };
        img.src = event.target?.result as string;
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!content.trim()) return;
    if (!user) {
      alert("Vui lòng đăng nhập để đánh giá!");
      return;
    }

    setIsSubmitting(true);
    try {
      const newReview = {
        placeId,
        rating,
        content,
        images,
        createdAt: new Date().toISOString(),
        author: user.displayName || user.email?.split('@')[0] || "Người dùng",
        authorPhoto: user.photoURL || "",
        authorId: user.uid
      };

      await addDoc(collection(db, "reviews"), newReview);
      
      // Cập nhật XP cho User
      const userRef = doc(db, 'users', user.uid);
      await updateDoc(userRef, {
        xp: increment(50) // Tặng 50 XP mỗi bài review
      });

      setReviews((prev) => [newReview, ...prev]);
      setContent("");
      setImages([]);
      setRating(5);
      alert("Cảm ơn bạn! Bạn vừa nhận được 50 XP.");
    } catch (error) {
      console.error(error);
      alert("Có lỗi xảy ra khi gửi đánh giá.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="section" style={{marginTop: "var(--space-6)"}}>
      <h2 className="section__title">Đánh giá từ cộng đồng</h2>
      
      {/* Review Form */}
      {user ? (
        <form onSubmit={handleSubmit} className="card" style={{padding: "var(--space-4)", marginBottom: "var(--space-6)"}}>
          <h3 style={{fontSize: "1.1rem", marginBottom: "var(--space-3)"}}>Viết đánh giá của bạn</h3>
          
          <div style={{display: "flex", gap: "5px", marginBottom: "var(--space-3)"}}>
            {[1,2,3,4,5].map((star) => (
              <button 
                key={star} 
                type="button" 
                onClick={() => setRating(star)}
                style={{background: "none", border: "none", cursor: "pointer", color: star <= rating ? "var(--color-warning)" : "var(--color-border-dark)"}}
              >
                <Star fill={star <= rating ? "currentColor" : "none"} />
              </button>
            ))}
          </div>

          <textarea 
            className="search-bar__input"
            style={{width: "100%", minHeight: "100px", padding: "10px", borderRadius: "10px", marginBottom: "10px", resize: "vertical"}}
            placeholder="Chia sẻ trải nghiệm của bạn về địa điểm này..."
            value={content}
            onChange={(e) => setContent(e.target.value)}
          />

          <div style={{display: "flex", flexWrap: "wrap", gap: "10px", marginBottom: "10px"}}>
            {images.map((img, idx) => (
              <div key={idx} style={{position: "relative", width: "80px", height: "80px"}}>
                <img src={img} alt="review upload" style={{width: "100%", height: "100%", objectFit: "cover", borderRadius: "8px"}} />
                <button 
                  type="button" 
                  onClick={() => setImages(images.filter((_, i) => i !== idx))}
                  style={{position: "absolute", top: "-5px", right: "-5px", background: "red", color: "white", border: "none", borderRadius: "50%", width: "20px", height: "20px", display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer"}}
                >
                  &times;
                </button>
              </div>
            ))}
            {images.length < 3 && (
              <label style={{width: "80px", height: "80px", border: "2px dashed var(--color-border-dark)", borderRadius: "8px", display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer", color: "var(--color-text-secondary)"}}>
                <Camera size={24} />
                <input type="file" accept="image/*" onChange={handleImageUpload} style={{display: "none"}} />
              </label>
            )}
          </div>

          <div style={{display: "flex", justifyContent: "flex-end"}}>
            <button type="submit" disabled={isSubmitting || !content.trim()} className="btn btn--primary" style={{borderRadius: "var(--radius-full)", opacity: (isSubmitting || !content.trim()) ? 0.5 : 1}}>
              {isSubmitting ? "Đang gửi..." : <><Send size={16} style={{marginRight: "5px"}}/> Gửi đánh giá</>}
            </button>
          </div>
        </form>
      ) : (
        <div className="card" style={{padding: "var(--space-4)", marginBottom: "var(--space-6)", textAlign: "center"}}>
          <p style={{marginBottom: "var(--space-3)"}}>Bạn cần đăng nhập để viết đánh giá</p>
          <button className="btn btn--outline" style={{margin: "0 auto"}} onClick={() => {
            const headerBtn = document.querySelector('header .btn--outline') as HTMLButtonElement;
            if (headerBtn) headerBtn.click();
          }}>Đăng nhập ngay</button>
        </div>
      )}

      {/* Review List */}
      <div>
        {loading ? (
          <div style={{ textAlign: "center", padding: "20px" }}><span className="spinner"></span></div>
        ) : reviews.length === 0 ? (
          <p style={{color: "var(--color-text-secondary)", textAlign: "center", padding: "20px 0"}}>Chưa có đánh giá nào. Hãy là người đầu tiên chia sẻ trải nghiệm!</p>
        ) : (
          reviews.map((rev, idx) => (
            <div key={idx} className="card" style={{padding: "var(--space-4)", marginBottom: "var(--space-4)"}}>
              <div style={{display: "flex", justifyContent: "space-between", marginBottom: "10px"}}>
                {rev.authorId ? (
                  <Link href={`/user?id=${rev.authorId}`} style={{display: "flex", alignItems: "center", gap: "10px", textDecoration: "none", color: "inherit"}}>
                    {rev.authorPhoto ? (
                      <img src={rev.authorPhoto} alt={rev.author} style={{width: "36px", height: "36px", borderRadius: "50%", objectFit: "cover"}} />
                    ) : (
                      <div style={{width: "36px", height: "36px", background: "var(--color-bg-secondary)", borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center"}}>
                        <User size={20} color="var(--color-text-secondary)" />
                      </div>
                    )}
                    <div>
                      <h4 style={{margin: 0, fontSize: "0.95rem"}}>{rev.author}</h4>
                      <div style={{display: "flex", gap: "2px", color: "var(--color-warning)"}}>
                        {[1,2,3,4,5].map((star) => <Star key={star} size={12} fill={star <= rev.rating ? "currentColor" : "none"} />)}
                      </div>
                    </div>
                  </Link>
                ) : (
                  <div style={{display: "flex", alignItems: "center", gap: "10px"}}>
                    {rev.authorPhoto ? (
                      <img src={rev.authorPhoto} alt={rev.author} style={{width: "36px", height: "36px", borderRadius: "50%", objectFit: "cover"}} />
                    ) : (
                      <div style={{width: "36px", height: "36px", background: "var(--color-bg-secondary)", borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center"}}>
                        <User size={20} color="var(--color-text-secondary)" />
                      </div>
                    )}
                    <div>
                      <h4 style={{margin: 0, fontSize: "0.95rem"}}>{rev.author}</h4>
                      <div style={{display: "flex", gap: "2px", color: "var(--color-warning)"}}>
                        {[1,2,3,4,5].map((star) => <Star key={star} size={12} fill={star <= rev.rating ? "currentColor" : "none"} />)}
                      </div>
                    </div>
                  </div>
                )}
                <span style={{fontSize: "0.8rem", color: "var(--color-text-tertiary)"}}>
                  {new Date(rev.createdAt).toLocaleDateString('vi-VN')}
                </span>
              </div>
              <p style={{fontSize: "0.95rem", lineHeight: 1.5, marginBottom: rev.images && rev.images.length > 0 ? "10px" : "0"}}>{rev.content}</p>
              {rev.images && rev.images.length > 0 && (
                <div style={{display: "flex", gap: "10px", overflowX: "auto"}}>
                  {rev.images.map((img: string, i: number) => (
                    <img key={i} src={img} alt="review" style={{width: "100px", height: "100px", objectFit: "cover", borderRadius: "8px", border: "1px solid var(--color-border)"}} />
                  ))}
                </div>
              )}
              
              <ReviewInteractions reviewId={rev.id} initialLikes={rev.likes || []} />
            </div>
          ))
        )}
      </div>
    </div>
  );
}
