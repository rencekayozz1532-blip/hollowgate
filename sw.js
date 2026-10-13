/* Hollowgate offline cache. First visit online stores the game, the 3D engine and fonts; after that it runs with no internet. */
const V='hollowgate-v13',CORE=['./','./index.html','./manifest.json','./icon-192.png','./icon-512.png',
'https://cdnjs.cloudflare.com/ajax/libs/three.js/0.152.2/three.min.js',
'https://cdn.jsdelivr.net/npm/peerjs@1.5.4/dist/peerjs.min.js',
'https://fonts.googleapis.com/css2?family=Saira+Stencil+One&family=Barlow+Condensed:wght@500;600;700&display=swap'];
const OK=['cdnjs.cloudflare.com','cdn.jsdelivr.net','fonts.googleapis.com','fonts.gstatic.com'];
self.addEventListener('install',e=>{e.waitUntil(caches.open(V).then(c=>Promise.allSettled(CORE.map(u=>c.add(new Request(u,u.startsWith('http')&&!u.startsWith(self.location.origin)?{mode:'no-cors'}:{}))))).then(()=>self.skipWaiting()))});
self.addEventListener('activate',e=>{e.waitUntil(caches.keys().then(k=>Promise.all(k.filter(x=>x!==V).map(x=>caches.delete(x)))).then(()=>self.clients.claim()))});
self.addEventListener('fetch',e=>{
  const r=e.request;if(r.method!=='GET')return;const u=new URL(r.url);
  const same=u.origin===self.location.origin;if(!same&&!OK.includes(u.hostname))return;
  e.respondWith(caches.open(V).then(async c=>{
    const hit=await c.match(r,{ignoreSearch:same});
    const net=fetch(r).then(res=>{if(res&&(res.ok||res.type==='opaque'))c.put(r,res.clone());return res}).catch(()=>null);
    if(hit){e.waitUntil(net);return hit}
    const res=await net;if(res)return res;
    if(r.mode==='navigate'){const i=await c.match('./index.html');if(i)return i}
    return new Response('Offline',{status:503})}));
});
