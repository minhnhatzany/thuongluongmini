"use client";

import { useState } from "react";
import { Camera, Send, Star, User } from "lucide-react";
import { db, storage } from "@/lib/firebase";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";
import { ref, uploadString, getDownloadURL } from "firebase/storage";

export default function ReviewSection({ placeId }: { placeId: number }) {
  const [rating, setRating] = useState(5);
  const [content, setContent] = useState("");
  const [images, setImages] = useState<string[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [reviews, setReviews] = useState<any[]>([]); // Mock state, normally fetch from Firestore

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      if (images.length >= 3) {
        alert("Chỉ được tải lên tối đa 3 ảnh.");
        return;
      }
      const file = e.target.files[0];
      const reader = new FileReader();
      reader.onloadend = () => {
        setImages((prev) => [...prev, reader.result as string]);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!content.trim()) return;

    setIsSubmitting(true);
    try {
      // In a real app, upload base64 images to Firebase Storage first
      // const imageUrls = await Promise.all(images.map(async (img, idx) => {
      //   const storageRef = ref(storage, `reviews/${placeId}_${Date.now()}_${idx}`);
      //   await uploadString(storageRef, img, 'data_url');
      //   return await getDownloadURL(storageRef);
      // }));

      const newReview = {
        placeId,
        rating,
        content,
        images, // Storing base64 directly for demo
        createdAt: new Date().toISOString(),
        author: "Người dùng ẩn danh"
      };

      // Real Firebase call:
      // await addDoc(collection(db, "reviews"), newReview);

      setReviews((prev) => [newReview, ...prev]);
      setContent("");
      setImages([]);
      setRating(5);
      alert("Cảm ơn bạn đã đánh giá!");
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

      {/* Review List */}
      <div>
        {reviews.length === 0 ? (
          <p style={{color: "var(--color-text-secondary)", textAlign: "center", padding: "20px 0"}}>Chưa có đánh giá nào. Hãy là người đầu tiên chia sẻ trải nghiệm!</p>
        ) : (
          reviews.map((rev, idx) => (
            <div key={idx} className="card" style={{padding: "var(--space-4)", marginBottom: "var(--space-4)"}}>
              <div style={{display: "flex", justifyContent: "space-between", marginBottom: "10px"}}>
                <div style={{display: "flex", alignItems: "center", gap: "10px"}}>
                  <div style={{width: "36px", height: "36px", background: "var(--color-bg-secondary)", borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center"}}>
                    <User size={20} color="var(--color-text-secondary)" />
                  </div>
                  <div>
                    <h4 style={{margin: 0, fontSize: "0.95rem"}}>{rev.author}</h4>
                    <div style={{display: "flex", gap: "2px", color: "var(--color-warning)"}}>
                      {[1,2,3,4,5].map((star) => <Star key={star} size={12} fill={star <= rev.rating ? "currentColor" : "none"} />)}
                    </div>
                  </div>
                </div>
                <span style={{fontSize: "0.8rem", color: "var(--color-text-tertiary)"}}>
                  {new Date(rev.createdAt).toLocaleDateString('vi-VN')}
                </span>
              </div>
              <p style={{fontSize: "0.95rem", lineHeight: 1.5, marginBottom: rev.images.length > 0 ? "10px" : "0"}}>{rev.content}</p>
              {rev.images && rev.images.length > 0 && (
                <div style={{display: "flex", gap: "10px", overflowX: "auto"}}>
                  {rev.images.map((img: string, i: number) => (
                    <img key={i} src={img} alt="review" style={{width: "100px", height: "100px", objectFit: "cover", borderRadius: "8px"}} />
                  ))}
                </div>
              )}
            </div>
          ))
        )}
      </div>
    </div>
  );
}
