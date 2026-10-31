// عامل الخدمة: يحفظ التطبيق للعمل بدون إنترنت. الإصدار يتغير مع كل بناء.
const V='bank-50a35abdd9';
const ASSETS=["./", "./index.html", "./manifest.webmanifest", "./icons/icon-192.png", "./icons/icon-512.png", "./icons/maskable-512.png", "./icons/apple-touch-icon.png", "./icons/favicon-64.png"];
const DATA={"c11": "data/c11.bin", "c10": "data/c10.bin", "p10": "data/p10.bin", "s10": "data/s10.bin", "p11": "data/p11.bin", "c12": "data/c12.bin", "p12": "data/p12.bin"};
self.addEventListener('install',e=>{e.waitUntil((async()=>{const c=await caches.open(V);await c.addAll(ASSETS.map(u=>new Request(u,{cache:'reload'})));
  // البنوك التي حمّلها الطالب سابقاً تُحمَّل نسختها الجديدة مسبقاً ليبقى التطبيق يعمل بدون إنترنت
  const had=new Set();for(const k of await caches.keys()){if(k===V)continue;const o=await caches.open(k);for(const q of await o.keys()){const m=q.url.match(/\/data\/([a-z]\d+)\./);if(m)had.add(m[1])}}
  for(const b of had){if(DATA[b]){try{await c.add(new Request('./'+DATA[b],{cache:'reload'}))}catch(x){}}}
})())});
self.addEventListener('activate',e=>{e.waitUntil(caches.keys().then(ks=>Promise.all(ks.filter(k=>k!==V).map(k=>caches.delete(k)))).then(()=>self.clients.claim()))});
self.addEventListener('message',e=>{if(e.data==='skip')self.skipWaiting()});
self.addEventListener('fetch',e=>{const r=e.request;if(r.method!=='GET')return;const u=new URL(r.url);if(u.origin!==location.origin)return;
  if(r.mode==='navigate'){e.respondWith(caches.match('./index.html').then(c=>c||fetch(r)));return}
  e.respondWith(caches.match(r,{ignoreSearch:true}).then(c=>c||fetch(r).then(res=>{if(res.ok){const cp=res.clone();caches.open(V).then(ca=>ca.put(r,cp))}return res})))});
