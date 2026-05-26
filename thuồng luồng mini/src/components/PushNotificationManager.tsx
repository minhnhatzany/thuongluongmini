"use client";

import { useEffect, useState } from "react";
import { app } from "@/lib/firebase";
import { getMessaging, getToken, onMessage } from "firebase/messaging";
import { Bell, BellOff } from "lucide-react";

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
      const vapidKey = "BCvPQOpyU5z9aZYFftk009J3b9uc_D5Q4In7zJ6igDqXyF4z-fmGXI-35Q_lGjYWZQJRDIYhztDwNSv5RS4Nzj8"; 
      
      const currentToken = await getToken(messaging, { vapidKey: vapidKey }).catch(e => {
        console.log("Firebase Messaging Vapid key required for real tokens", e);
      });
      
      if (currentToken) {
        console.log("FCM Token:", currentToken);
      }
      
      onMessage(messaging, (payload) => {
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
      }
    } catch (error) {
      console.error("Lỗi xin quyền:", error);
    }
  };

  if (permission === "granted") {
    return (
      <div style={{ display: "flex", alignItems: "center", gap: "10px", padding: "10px", color: "var(--color-success)" }}>
        <Bell size={20} />
        <span>Đã bật thông báo</span>
      </div>
    );
  }

  return (
    <button onClick={requestPermission} style={{ display: "flex", alignItems: "center", gap: "10px", padding: "10px", width: "100%", background: "transparent", border: "none", color: "var(--color-text)", cursor: "pointer", textAlign: "left" }}>
      <BellOff size={20} />
      <span>Nhận thông báo địa điểm mới</span>
    </button>
  );
}
