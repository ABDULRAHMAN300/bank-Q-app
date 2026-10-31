// عامل الخدمة: يحفظ التطبيق للعمل بدون إنترنت. الإصدار يتغير مع كل بناء.
const V='bank-56f0cd27b8';
const ASSETS=["./", "./index.html", "./manifest.webmanifest", "./icons/icon-192.png", "./icons/icon-512.png", "./icons/maskable-512.png", "./icons/apple-touch-icon.png", "./icons/favicon-64.png"];
self.addEventListener('install',e=>{e.waitUntil(caches.open(V).then(c=>c.addAll(ASSETS.map(u=>new Request(u,{cache:'reload'})))))});
self.addEventListener('activate',e=>{e.waitUntil(caches.keys().then(ks=>Promise.all(ks.filter(k=>k!==V).map(k=>caches.delete(k)))).then(()=>self.clients.claim()))});
self.addEventListener('message',e=>{if(e.data==='skip')self.skipWaiting()});
self.addEventListener('fetch',e=>{const r=e.request;if(r.method!=='GET')return;const u=new URL(r.url);if(u.origin!==location.origin)return;
  if(r.mode==='navigate'){e.respondWith(caches.match('./index.html').then(c=>c||fetch(r)));return}
  e.respondWith(caches.match(r,{ignoreSearch:true}).then(c=>c||fetch(r).then(res=>{if(res.ok){const cp=res.clone();caches.open(V).then(ca=>ca.put(r,cp))}return res})))});
