const C='beiti-v2';
const ASSETS=['./','./index.html','./manifest.json','./icon.svg','./icon-192.png','./icon-512.png'];
self.addEventListener('install',function(e){e.waitUntil(caches.open(C).then(function(c){return c.addAll(ASSETS);}).then(function(){return self.skipWaiting();}));});
self.addEventListener('activate',function(e){e.waitUntil(caches.keys().then(function(keys){return Promise.all(keys.filter(function(k){return k!==C;}).map(function(k){return caches.delete(k);}));}).then(function(){return self.clients.claim();}));});
self.addEventListener('fetch',function(e){e.respondWith(fetch(e.request).then(function(resp){var cp=resp.clone();caches.open(C).then(function(c){c.put(e.request,cp);});return resp;}).catch(function(){return caches.match(e.request);}));});
