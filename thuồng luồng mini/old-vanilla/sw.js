const CACHE = 'tlm-v4';
const SHELL = [
    '/',
    '/index.html',
    '/css/variables.css',
    '/css/base.css',
    '/css/components.css',
    '/assets/logo.jpg',
    '/manifest.json',
    '/js/app.js',
    '/robots.txt',
    '/sitemap.xml'
];

// Install: cache app shell
self.addEventListener('install', (event) => {
    event.waitUntil(
        caches.open(CACHE)
            .then(cache => cache.addAll(SHELL))
            .then(() => self.skipWaiting())
    );
});

// Activate: clean old caches
self.addEventListener('activate', (event) => {
    event.waitUntil(
        caches.keys().then(keys =>
            Promise.all(keys.filter(k => k !== CACHE).map(k => caches.delete(k)))
        ).then(() => self.clients.claim())
    );
});

// Fetch: network-first for HTML, cache-first for assets
self.addEventListener('fetch', (event) => {
    const { request } = event;
    if (request.method !== 'GET') return;

    const url = new URL(request.url);
    if (url.origin !== self.location.origin) return;

    // For HTML documents (including SPA), use network-first
    if (request.mode === 'navigate' || url.pathname === '/' || url.pathname.endsWith('.html')) {
        event.respondWith(
            fetch(request)
                .then(response => {
                    const clone = response.clone();
                    caches.open(CACHE).then(cache => cache.put(request, clone));
                    return response;
                })
                .catch(() => 
                    caches.match(request).then(cached => 
                        cached || caches.match('/').then(homePage => 
                            homePage || new Response(`
<!DOCTYPE html><html lang="vi"><head><meta charset="UTF-8"><meta name="viewport" content="width=device-width,initial-scale=1.0"><title>Thuồng Luồng Mini - Offline</title><style>body{font-family:Nunito,sans-serif;display:flex;align-items:center;justify-content:center;min-height:100vh;margin:0;background:#FFFAF5;color:#2D2D2D;text-align:center;padding:20px}.offline{max-width:400px}h1{font-size:2rem;color:#F4A261}.emoji{font-size:4rem;margin-bottom:20px}p{color:#6B7280;line-height:1.6}.btn{display:inline-block;padding:12px 24px;background:linear-gradient(135deg,#F4A261,#E76F51);color:#fff;border-radius:12px;text-decoration:none;font-weight:700;margin-top:20px}</style></head><body><div class="offline"><div class="emoji">🐉</div><h1>Bé Thuồng Luồng đang offline</h1><p>Mạng yếu quá sếp ơi! Kết nối lại để khám phá Tuyên Quang nhé.</p><button class="btn" onclick="location.reload()">Thử lại</button></div></body></html>`, { headers: { 'Content-Type': 'text/html;charset=UTF-8' } })
                        )
                    )
                )
        );
        return;
    }

    // For static assets (CSS, JS, images), use cache-first
    event.respondWith(
        caches.match(request).then(cached => {
            if (cached) return cached;
            
            return fetch(request).then(response => {
                if (response && response.status === 200) {
                    const clone = response.clone();
                    caches.open(CACHE).then(cache => cache.put(request, clone));
                }
                return response;
            }).catch(() => {
                // Return a fallback for images
                if (request.url.match(/\.(jpg|jpeg|png|gif|webp|svg)$/)) {
                    return caches.match('/assets/logo.jpg');
                }
                return new Response('Offline', { status: 503 });
            });
        })
    );
});
