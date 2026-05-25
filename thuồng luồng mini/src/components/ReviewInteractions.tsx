"use client";

import { useState, useEffect } from "react";
import { Heart, MessageCircle, Send } from "lucide-react";
import { db, auth } from "@/lib/firebase";
import { doc, updateDoc, arrayUnion, arrayRemove, collection, addDoc, query, orderBy, onSnapshot, getDoc } from "firebase/firestore";

interface ReviewInteractionsProps {
  reviewId: string;
  initialLikes?: string[]; // mảng uid
}

export default function ReviewInteractions({ reviewId, initialLikes = [] }: ReviewInteractionsProps) {
  const [likes, setLikes] = useState<string[]>(initialLikes);
  const [isLiked, setIsLiked] = useState(false);
  const [showComments, setShowComments] = useState(false);
  const [comments, setComments] = useState<any[]>([]);
  const [commentText, setCommentText] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (auth.currentUser) {
      setIsLiked(likes.includes(auth.currentUser.uid));
    }
  }, [likes, auth.currentUser]);

  useEffect(() => {
    if (!showComments) return;
    
    // Lắng nghe realtime comment
    const q = query(collection(db, `reviews/${reviewId}/comments`), orderBy("createdAt", "asc"));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const comms: any[] = [];
      snapshot.forEach(doc => {
        comms.push({ id: doc.id, ...doc.data() });
      });
      setComments(comms);
    });

    return () => unsubscribe();
  }, [showComments, reviewId]);

  const handleLike = async () => {
    if (!auth.currentUser) {
      alert("Bạn cần đăng nhập để thả tim!");
      return;
    }
    const uid = auth.currentUser.uid;
    const ref = doc(db, "reviews", reviewId);
    
    try {
      if (isLiked) {
        setLikes(prev => prev.filter(id => id !== uid));
        setIsLiked(false);
        await updateDoc(ref, { likes: arrayRemove(uid) });
      } else {
        setLikes(prev => [...prev, uid]);
        setIsLiked(true);
        await updateDoc(ref, { likes: arrayUnion(uid) });
      }
    } catch (e) {
      console.error(e);
      // rollback
      setIsLiked(!isLiked);
    }
  };

  const handlePostComment = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!auth.currentUser) {
      alert("Bạn cần đăng nhập để bình luận!");
      return;
    }
    if (!commentText.trim()) return;

    setIsSubmitting(true);
    try {
      await addDoc(collection(db, `reviews/${reviewId}/comments`), {
        text: commentText.trim(),
        authorId: auth.currentUser.uid,
        authorName: auth.currentUser.displayName || "Thổ Địa Ẩn Danh",
        authorPhoto: auth.currentUser.photoURL || "",
        createdAt: new Date().toISOString()
      });
      setCommentText("");
    } catch (e) {
      console.error(e);
      alert("Lỗi khi gửi bình luận");
    }
    setIsSubmitting(false);
  };

  return (
    <div style={{ marginTop: "15px", borderTop: "1px solid var(--color-border-light)", paddingTop: "10px" }}>
      <div style={{ display: "flex", gap: "20px" }}>
        <button 
          onClick={handleLike} 
          style={{ display: "flex", alignItems: "center", gap: "5px", background: "none", border: "none", cursor: "pointer", color: isLiked ? "var(--color-danger)" : "var(--color-text-secondary)", fontSize: "0.9rem", padding: "5px 0" }}
        >
          <Heart size={18} fill={isLiked ? "currentColor" : "none"} /> 
          <span style={{ fontWeight: isLiked ? "bold" : "normal" }}>{likes.length} Thích</span>
        </button>
        
        <button 
          onClick={() => setShowComments(!showComments)}
          style={{ display: "flex", alignItems: "center", gap: "5px", background: "none", border: "none", cursor: "pointer", color: "var(--color-text-secondary)", fontSize: "0.9rem", padding: "5px 0" }}
        >
          <MessageCircle size={18} /> 
          <span>Bình luận</span>
        </button>
      </div>

      {showComments && (
        <div style={{ marginTop: "15px", background: "var(--color-bg-secondary)", padding: "15px", borderRadius: "8px" }}>
          <div style={{ display: "flex", flexDirection: "column", gap: "15px", marginBottom: "15px", maxHeight: "200px", overflowY: "auto" }}>
            {comments.length === 0 ? (
              <p style={{ fontSize: "0.85rem", color: "var(--color-text-tertiary)", textAlign: "center" }}>Chưa có bình luận nào.</p>
            ) : (
              comments.map(c => (
                <div key={c.id} style={{ display: "flex", gap: "10px" }}>
                  <img src={c.authorPhoto || "/assets/logo.jpg"} alt={c.authorName} style={{ width: "24px", height: "24px", borderRadius: "50%", objectFit: "cover" }} />
                  <div style={{ background: "var(--color-bg)", padding: "8px 12px", borderRadius: "12px", flex: 1 }}>
                    <div style={{ fontWeight: "bold", fontSize: "0.85rem", marginBottom: "3px" }}>{c.authorName}</div>
                    <div style={{ fontSize: "0.9rem" }}>{c.text}</div>
                  </div>
                </div>
              ))
            )}
          </div>
          
          <form onSubmit={handlePostComment} style={{ display: "flex", gap: "10px" }}>
            <input 
              type="text" 
              value={commentText}
              onChange={e => setCommentText(e.target.value)}
              placeholder="Viết bình luận..." 
              className="search-bar__input" 
              style={{ flex: 1, padding: "8px 15px", fontSize: "0.9rem" }}
            />
            <button disabled={isSubmitting || !commentText.trim()} type="submit" className="btn btn--primary" style={{ padding: "8px 12px" }}>
              <Send size={16} />
            </button>
          </form>
        </div>
      )}
    </div>
  );
}
