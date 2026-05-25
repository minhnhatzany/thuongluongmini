# Hướng dẫn Gửi Thông Báo Đẩy (Push Notifications) qua Firebase Console

Tính năng này cho phép bạn (với vai trò Admin) có thể gửi các thông báo trực tiếp đến điện thoại/máy tính của những người dùng đã bật quyền nhận thông báo. 

## Bước 1: Chuẩn bị chứng chỉ Web Push
1. Mở **Firebase Console** (https://console.firebase.google.com).
2. Chọn dự án `thuongluongmini`.
3. Bấm vào biểu tượng **Bánh răng (Cài đặt)** ở góc trái > **Project settings**.
4. Chuyển sang tab **Cloud Messaging**.
5. Cuộn xuống phần **Web configuration** > **Web Push certificates**.
6. Bấm **Generate key pair**. Bạn sẽ nhận được một chuỗi ký tự (VAPID Key).
7. Copy chuỗi VAPID Key này và dán vào file `src/components/PushNotificationManager.tsx` tại dòng:
   ```javascript
   const vapidKey = "DÁN-CHUỖI-VAPID-KEY-CỦA-BẠN-VÀO-ĐÂY";
   ```

## Bước 2: Gửi thông báo
1. Mở lại **Firebase Console**.
2. Ở thanh menu bên trái, cuộn xuống phần **Engage** (Tương tác) > Chọn **Messaging** (Thông báo).
3. Bấm nút **New campaign** (Chiến dịch mới) > Chọn **Notifications** (Thông báo).
4. Điền nội dung thông báo:
   - **Notification title**: Tiêu đề (VD: *Quán ăn mới cực HOT tại Tuyên Quang!*)
   - **Notification text**: Nội dung (VD: *Bún chả Cô Hoa vừa khai trương, giảm giá 50% hôm nay.*)
   - Bấm **Next**.
5. Mục **Target**: Chọn ứng dụng web của bạn `thuongluongmini`. Bấm **Next**.
6. Mục **Scheduling**: Chọn `Now` (Gửi ngay). Bấm **Next**.
7. Bấm **Review** và cuối cùng là **Publish**.

Trong vòng vài giây, những người dùng đã bấm nút **"Bật"** thông báo trên trình duyệt sẽ nhận được pop-up hiển thị nội dung bạn vừa soạn!
