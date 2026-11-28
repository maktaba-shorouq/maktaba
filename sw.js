const C='maktaba-v1';
const ASSETS=['./','./index.html','./manifest.json','./icon.svg','./files/maktaba-offline-guide.html','./lessons/rajaal-fil-shams.html','./lessons/rajaal-fil-shams-old.html','./lessons/sanaoud.html','./lessons/sanaoud-v2.html','./lessons/sanaoud-shamil.html'];
self.addEventListener('install',function(e){e.waitUntil(caches.open(C).then(function(c){return c.addAll(ASSETS);}).then(function(){return self.skipWaiting();}));});
self.addEventListener('activate',function(e){e.waitUntil(caches.keys().then(function(keys){return Promise.all(keys.filter(function(k){return k!==C;}).map(function(k){return caches.delete(k);}));}).then(function(){return self.clients.claim();}));});
self.addEventListener('fetch',function(e){
 if(e.request.method!=='GET')return;
 var url=new URL(e.request.url);
 if(/\.(mp4|webm|mov)(\?|$)/i.test(url.pathname))return;
 e.respondWith(fetch(e.request).then(function(resp){
  if(resp&&(resp.status===200||resp.type==='opaque')){var cp=resp.clone();caches.open(C).then(function(c){c.put(e.request,cp);});}
  return resp;
 }).catch(function(){return caches.match(e.request);}));
});
