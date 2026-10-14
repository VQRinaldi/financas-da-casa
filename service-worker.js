/* Finanças da Casa - service worker
   Guarda todos os arquivos do app para uso offline. Todos os caminhos são relativos
   à pasta onde este arquivo está (funciona em subdiretório, como no GitHub Pages).
   Para forçar a troca de versão, mude o número em VERSION. */
const VERSION = 'v3';
const CACHE = 'financas-casa-' + VERSION;
const ASSETS = [
  './',
  'index.html',
  'manifest.webmanifest',
  'favicon.png',
  'apple-touch-icon.png',
  'icon-192.png',
  'icon-512.png',
  'icon-maskable-192.png',
  'icon-maskable-512.png',
  'pdfjs-lib.js',
  'pdfjs-worker.js',
  'pdf-lib.min.js'
];

self.addEventListener('install', (e) => {
  // Se algum arquivo falhar, a instalação inteira falha e o app não é marcado como offline.
  e.waitUntil(
    caches.open(CACHE)
      .then((c) => c.addAll(ASSETS.map((a) => new Request(a, { cache: 'reload' }))))
      .then(() => self.skipWaiting())
  );
});

self.addEventListener('activate', (e) => {
  e.waitUntil(
    caches.keys()
      .then((ks) => Promise.all(ks.filter((k) => k.startsWith('financas-casa-') && k !== CACHE).map((k) => caches.delete(k))))
      .then(() => self.clients.claim())
  );
});

// Cache primeiro (abre na hora, mesmo sem internet) e atualiza em segundo plano quando houver rede.
self.addEventListener('fetch', (e) => {
  const r = e.request;
  if (r.method !== 'GET') return;
  const u = new URL(r.url);
  if (u.origin !== self.location.origin) return;
  e.respondWith((async () => {
    const cache = await caches.open(CACHE);
    const hit = await cache.match(r, { ignoreSearch: true });
    const net = fetch(r).then((res) => {
      if (res && res.status === 200 && res.type === 'basic') cache.put(r, res.clone());
      return res;
    }).catch(() => null);
    if (hit) { e.waitUntil(net); return hit; }
    const res = await net;
    if (res) return res;
    if (r.mode === 'navigate') {
      const idx = await cache.match('index.html');
      if (idx) return idx;
    }
    return new Response('Sem conexão e este arquivo não está guardado no aparelho.', { status: 503, headers: { 'Content-Type': 'text/plain; charset=utf-8' } });
  })());
});
