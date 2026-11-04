const C='bb-v1';
self.addEventListener('install',e=>{self.skipWaiting()});
self.addEventListener('activate',e=>{e.waitUntil(caches.keys().then(k=>Promise.all(k.filter(x=>x!==C).map(x=>caches.delete(x)))).then(()=>self.clients.claim()))});
const OK=/^(https:\/\/(cdn\.tailwindcss\.com|cdnjs\.cloudflare\.com|www\.gstatic\.com|tile\.openstreetmap\.org))/;
self.addEventListener('fetch',e=>{const r=e.request;if(r.method!=='GET')return;const u=r.url;if(!(u.startsWith(self.location.origin)||OK.test(u)))return;
 e.respondWith(caches.open(C).then(async c=>{const hit=await c.match(r,{ignoreSearch:u.startsWith(self.location.origin)});const net=fetch(r).then(x=>{if(x&&(x.ok||x.type==='opaque'))c.put(r,x.clone());return x}).catch(()=>null);return hit||await net||new Response('',{status:504})}))});
