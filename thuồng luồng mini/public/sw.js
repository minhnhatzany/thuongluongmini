const CACHE_NAME = 'tlm-cache-v1';
const urlsToCache = [
  '/',
  '/assets/logo.jpg',
  '/manifest.json'
];

self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => {
        return cache.addAll(urlsToCache);
      })
  );
});

self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request)
      .then(response => {
        if (response) {
          return response;
        }
        return fetch(event.request);
      })
  );
});

// Lắng nghe sự kiện Push từ Firebase Cloud Messaging
self.addEventListener('push', function(event) {
  let data = {};
  if (event.data) {
    try {
      data = event.data.json();
    } catch(e) {
      data = {
        notification: {
          title: "Thông báo từ Thuồng Luồng Mini",
          body: event.data.text()
        }
      };
    }
  }

  const title = data.notification?.title || 'Thông báo mới';
  const options = {
    body: data.notification?.body || 'Có cập nhật mới từ Thuồng Luồng Mini.',
    icon: '/icons/icon-192x192.png',
    badge: '/icons/icon-192x192.png',
    data: data.data?.url || '/'
  };

  event.waitUntil(self.registration.showNotification(title, options));
});

// Xử lý khi người dùng click vào thông báo
self.addEventListener('notificationclick', function(event) {
  event.notification.close();
  const targetUrl = event.notification.data || '/';
  
  event.waitUntil(
    clients.matchAll({ type: 'window', includeUncontrolled: true }).then(function(clientList) {
      for (let i = 0; i < clientList.length; i++) {
        const client = clientList[i];
        if (client.url === targetUrl && 'focus' in client) {
          return client.focus();
        }
      }
      if (clients.openWindow) {
        return clients.openWindow(targetUrl);
      }
    })
  );
});
