const C='bb-v2';
self.addEventListener('install',e=>{self.skipWaiting()});
self.addEventListener('activate',e=>{e.waitUntil(caches.keys().then(k=>Promise.all(k.filter(x=>x!==C).map(x=>caches.delete(x)))).then(()=>self.clients.claim()))});
const OK=/^(https:\/\/(cdn\.tailwindcss\.com|cdnjs\.cloudflare\.com|www\.gstatic\.com|tile\.openstreetmap\.org|server\.arcgisonline\.com|unpkg\.com|tiles\.openfreemap\.org))/;
self.addEventListener('fetch',e=>{const r=e.request;if(r.method!=='GET')return;const u=r.url,own=u.startsWith(self.location.origin);if(!(own||OK.test(u)))return;
 e.respondWith(caches.open(C).then(async c=>{
  if(own){const t=new Promise(ok=>setTimeout(()=>ok(null),3000)),net=fetch(r,{cache:'no-cache'}).then(x=>{if(x&&x.ok)c.put(r,x.clone());return x}).catch(()=>null);const x=await Promise.race([net,t]);if(x)return x;const hit=await c.match(r,{ignoreSearch:true});return hit||await net||new Response('',{status:504})}
  const hit=await c.match(r),net=fetch(r).then(x=>{if(x&&(x.ok||x.type==='opaque'))c.put(r,x.clone());return x}).catch(()=>null);return hit||await net||new Response('',{status:504})}))});
