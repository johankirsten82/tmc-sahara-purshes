/* Moved: replaces the old TMC Purchases service worker at /tmc-sahara-purshes/.
   It deletes the old pa-* caches, takes over open old pages, removes itself and reloads them,
   so they show the Moved page from the network. It never touches saved phone data (local storage) (unsynced work stays for the new app). */
self.addEventListener("install",function(e){self.skipWaiting()});
self.addEventListener("activate",function(e){e.waitUntil(
  caches.keys().then(function(k){return Promise.all(k.filter(function(x){return /^pa-/.test(x)}).map(function(x){return caches.delete(x)}))})
  .then(function(){return self.clients.claim()})
  .then(function(){return self.clients.matchAll({type:"window",includeUncontrolled:true})})
  .then(function(cs){return self.registration.unregister().then(function(){cs.forEach(function(c){try{c.navigate(c.url).catch(function(){})}catch(err){}})})})
  .catch(function(){return self.registration.unregister()})
)});
