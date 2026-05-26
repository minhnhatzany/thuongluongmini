"use client";

import { useEffect, useState } from "react";
import { app } from "@/lib/firebase";
import { getMessaging, getToken, onMessage } from "firebase/messaging";
import { Bell } from "lucide-react";

export default function PushNotificationManager() {
  const [permission, setPermission] = useState<NotificationPermission>("default");

  useEffect(() => {
    if (typeof window !== "undefined" && "Notification" in window) {
      setPermission(Notification.permission);
      
      if (Notification.permission === "granted") {
        setupMessaging();
      }
    }
  }, []);

  const setupMessaging = async () => {
    try {
      const messaging = getMessaging(app);
      
      // Khóa công khai VAPID từ Firebase Console
      const vapidKey = "BCvPQOpyU5z9aZYFftk009J3b9uc_D5Q4In7zJ6igDqXyF4z-fmGXI-35Q_lGjYWZQJRDIYhztDwNSv5RS4Nzj8"; 
      
      // Ở đây chỉ giả lập vì cần vapidKey thật từ Cloud Messaging
      const currentToken = await getToken(messaging, { vapidKey: vapidKey }).catch(e => {
        console.log("Firebase Messaging Vapid key required for real tokens", e);
      });
      
      if (currentToken) {
        console.log("FCM Token:", currentToken);
        // Có thể lưu token vào DB để gửi thông báo sau
      }
      
      onMessage(messaging, (payload) => {
        console.log("Message received. ", payload);
        // Hiển thị toast nội bộ khi app đang mở
        alert(`Thông báo mới: ${payload.notification?.title} - ${payload.notification?.body}`);
      });
    } catch (error) {
      console.error("Lỗi setup messaging:", error);
    }
  };

  const requestPermission = async () => {
    try {
      const p = await Notification.requestPermission();
      setPermission(p);
      if (p === "granted") {
        setupMessaging();
        alert("Đã cấp quyền nhận thông báo thành công!");
      } else {
        alert("Bạn đã từ chối nhận thông báo.");
      }
    } catch (error) {
      console.error("Lỗi xin quyền:", error);
    }
  };

  if (permission === "granted" || permission === "denied") return null;

  return (
    <div className="push-prompt" style={{ position: "fixed", bottom: "80px", left: "20px", right: "20px", background: "var(--color-bg)", padding: "15px", borderRadius: "12px", boxShadow: "0 10px 30px rgba(0,0,0,0.1)", zIndex: 100, display: "flex", alignItems: "center", justifyContent: "space-between", border: "1px solid var(--color-border)", transition: "bottom 0.3s" }}>
      <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
        <div style={{ background: "var(--color-primary-light)", padding: "10px", borderRadius: "50%", color: "var(--color-primary)" }}>
          <Bell size={20} />
        </div>
        <div>
          <div style={{ fontWeight: "bold" }}>Bật thông báo</div>
          <div style={{ fontSize: "0.85rem", color: "var(--color-text-secondary)" }}>Nhận tin mới nhất về địa điểm</div>
        </div>
      </div>
      <button onClick={requestPermission} className="btn btn--primary btn--sm" style={{ padding: "8px 15px" }}>Bật</button>
    </div>
  );
}
