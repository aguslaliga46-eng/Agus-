// sw.js - Gabungan Service Worker valid PWA + Notifikasi Latar Belakang

// 1. Event fetch agar PWA tetap valid dan berfungsi offline
self.addEventListener('fetch', (event) => {
  // Service worker dasar agar PWA valid
  // Anda bisa menambahkan logika caching di sini jika diperlukan nanti
});

self.addEventListener('install', (event) => {
  self.skipWaiting();
});

self.addEventListener('activate', (event) => {
  event.waitUntil(self.clients.claim());
});

// 2. Mendengarkan pesan dari aplikasi utama untuk memunculkan notifikasi
self.addEventListener('message', (event) => {
  if (event.data && event.data.type === 'SHOW_NOTIFICATION') {
    const { title, body } = event.data;
    
    const options = {
      body: body || 'Ada panggilan masuk!',
      icon: '/i/icon.png', // Sesuaikan dengan ikon aplikasi Anda
      badge: '/i/badge.png',
      vibrate: [200, 100, 200], // Efek getar pada HP
      tag: 'incoming-call'
    };

    event.waitUntil(
      self.registration.showNotification(title, options)
    );
  }
});
