"use client";

import { useState, useEffect } from "react";
import { MapPin, CheckCircle, Navigation } from "lucide-react";
import { auth, db } from "@/lib/firebase";
import { onAuthStateChanged, User } from "firebase/auth";
import { doc, getDoc, updateDoc, increment, setDoc } from "firebase/firestore";

interface CheckInProps {
  placeId: number;
  placeName: string;
  lat?: number;
  lng?: number;
}

// Hàm tính khoảng cách giữa 2 toạ độ GPS (m)
function getDistanceFromLatLonInM(lat1: number, lon1: number, lat2: number, lon2: number) {
  const R = 6371000; // Bán kính trái đất (m)
  const dLat = (lat2 - lat1) * (Math.PI / 180);
  const dLon = (lon2 - lon1) * (Math.PI / 180);
  const a = 
    Math.sin(dLat/2) * Math.sin(dLat/2) +
    Math.cos(lat1 * (Math.PI / 180)) * Math.cos(lat2 * (Math.PI / 180)) * 
    Math.sin(dLon/2) * Math.sin(dLon/2)
    ; 
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a)); 
  const d = R * c; 
  return d;
}

export default function CheckInButton({ placeId, placeName, lat, lng }: CheckInProps) {
  const [user, setUser] = useState<User | null>(null);
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error" | "checked_in">("idle");
  const [message, setMessage] = useState("");

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      setUser(currentUser);
      if (currentUser) {
        // Kiểm tra xem đã check-in chưa
        const checkinRef = doc(db, "checkins", `${currentUser.uid}_${placeId}`);
        const checkinSnap = await getDoc(checkinRef);
        if (checkinSnap.exists()) {
          setStatus("checked_in");
        }
      }
    });
    return () => unsubscribe();
  }, [placeId]);

  const handleCheckIn = () => {
    if (!user) {
      alert("Vui lòng đăng nhập để Check-in!");
      const headerBtn = document.querySelector('header .btn--outline') as HTMLButtonElement;
      if (headerBtn) headerBtn.click();
      return;
    }

    if (!lat || !lng) {
      alert("Địa điểm này chưa có toạ độ GPS!");
      return;
    }

    setStatus("loading");
    setMessage("Đang định vị vị trí của bạn...");

    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(
        async (position) => {
          const userLat = position.coords.latitude;
          const userLng = position.coords.longitude;
          const distance = getDistanceFromLatLonInM(lat, lng, userLat, userLng);

          if (distance <= 500) { // Trong vòng bán kính 500m
            try {
              // Lưu log check-in
              const checkinRef = doc(db, "checkins", `${user.uid}_${placeId}`);
              await setDoc(checkinRef, {
                userId: user.uid,
                placeId,
                placeName,
                timestamp: new Date().toISOString(),
                distance
              });

              // Cộng 100 XP
              const userRef = doc(db, 'users', user.uid);
              await updateDoc(userRef, {
                xp: increment(100)
              });

              setStatus("success");
              setMessage("Check-in thành công! Bạn nhận được 100 XP.");
            } catch (error) {
              console.error(error);
              setStatus("error");
              setMessage("Lỗi kết nối máy chủ. Vui lòng thử lại.");
            }
          } else {
            setStatus("error");
            setMessage(`Bạn đang ở quá xa quán (${Math.round(distance)}m). Phải đến tận nơi mới Check-in được nhé!`);
          }
        },
        (error) => {
          setStatus("error");
          setMessage("Lỗi định vị. Vui lòng cấp quyền truy cập vị trí cho trình duyệt!");
        },
        { enableHighAccuracy: true, timeout: 10000, maximumAge: 0 }
      );
    } else {
      setStatus("error");
      setMessage("Trình duyệt của bạn không hỗ trợ định vị GPS.");
    }
  };

  if (status === "checked_in") {
    return (
      <div style={{ background: "var(--color-success-light)", color: "var(--color-success-dark)", padding: "10px 15px", borderRadius: "8px", display: "flex", alignItems: "center", gap: "10px", fontSize: "0.9rem", marginTop: "15px", width: "100%", justifyContent: "center" }}>
        <CheckCircle size={18} /> Bạn đã Check-in tại đây!
      </div>
    );
  }

  return (
    <div style={{ marginTop: "15px", width: "100%" }}>
      <button 
        onClick={handleCheckIn} 
        disabled={status === "loading"}
        className="btn btn--outline" 
        style={{ width: "100%", justifyContent: "center", gap: "8px", borderColor: "var(--color-primary)", color: "var(--color-primary)" }}
      >
        {status === "loading" ? <span className="spinner"></span> : <MapPin size={18} />}
        {status === "loading" ? "Đang định vị..." : "Check-in nhận 100 XP"}
      </button>
      
      {(status === "success" || status === "error") && (
        <div style={{ 
          marginTop: "10px", 
          padding: "8px 12px", 
          borderRadius: "8px", 
          fontSize: "0.85rem",
          background: status === "success" ? "var(--color-success-light)" : "var(--color-danger-light)",
          color: status === "success" ? "var(--color-success-dark)" : "var(--color-danger-dark)",
          textAlign: "center"
        }}>
          {message}
        </div>
      )}
    </div>
  );
}
