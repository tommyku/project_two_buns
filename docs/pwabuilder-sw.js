//This is the service worker with the Cache-first network

var CACHE = 'spring2018-1525417390707';
var precacheFiles = [
  '/index.html',
  '/room.png',
  '/app.es2015.js',
  '/0/0.json',
  '/0/1.json',
  '/0/2.json',
  '/0/3.json',
  '/0/4.json',
  '/0/5.json',
  '/0/6.json',
  '/0/7.json',
  '/0/8.json',
  '/0/9.json',
  '/0/10.json',
  '/0/11.json',
  '/0/12.json',
  '/0/13.json',
  '/0/14.json',
  '/0/15.json',
  '/0/16.json',
  '/0/17.json',
  '/0/18.json',
  '/0/19.json',
  '/0/20.json',
  '/0/21.json',
  '/0/22.json',
  '/0/23.json',
  '/0/24.json',
  '/0/25.json',
  '/0/26.json',
  '/0/27.json',
  '/0/28.json',
  '/0/29.json',
  '/0/30.json',
  '/0/31.json',
  '/1/0.json',
  '/1/1.json',
  '/1/2.json',
  '/1/3.json',
  '/1/4.json',
  '/1/5.json',
  '/1/6.json',
  '/1/7.json',
  '/1/8.json',
  '/1/9.json',
  '/1/10.json',
  '/1/11.json',
  '/1/12.json',
  '/1/13.json',
  '/1/14.json',
  '/1/15.json',
  '/1/16.json',
  '/1/17.json',
  '/1/18.json',
  '/1/19.json',
  '/1/20.json',
  '/1/21.json',
  '/1/22.json',
  '/1/23.json',
  '/1/24.json',
  '/1/25.json',
  '/1/26.json',
  '/1/27.json',
  '/1/28.json',
  '/1/29.json',
  '/1/30.json',
  '/1/31.json',
  '/2/0.json',
  '/2/1.json',
  '/2/2.json',
  '/2/3.json',
  '/2/4.json',
  '/2/5.json',
  '/2/6.json',
  '/2/7.json',
  '/2/8.json',
  '/2/9.json',
  '/2/10.json',
  '/2/11.json',
  '/2/12.json',
  '/2/13.json',
  '/2/14.json',
  '/2/15.json',
  '/2/16.json',
  '/2/17.json',
  '/2/18.json',
  '/2/19.json',
  '/2/20.json',
  '/2/21.json',
  '/2/22.json',
  '/2/23.json',
  '/2/24.json',
  '/2/25.json',
  '/2/26.json',
  '/2/27.json',
  '/2/28.json',
  '/2/29.json',
  '/2/30.json',
  '/2/31.json',
  '/3/0.json',
  '/3/1.json',
  '/3/2.json',
  '/3/3.json',
  '/3/4.json',
  '/3/5.json',
  '/3/6.json',
  '/3/7.json',
  '/3/8.json',
  '/3/9.json',
  '/3/10.json',
  '/3/11.json',
  '/3/12.json',
  '/3/13.json',
  '/3/14.json',
  '/3/15.json',
  '/3/16.json',
  '/3/17.json',
  '/3/18.json',
  '/3/19.json',
  '/3/20.json',
  '/3/21.json',
  '/3/22.json',
  '/3/23.json',
  '/3/24.json',
  '/3/25.json',
  '/3/26.json',
  '/3/27.json',
  '/3/28.json',
  '/3/29.json',
  '/3/30.json',
  '/3/31.json',
  '/4/0.json',
  '/4/1.json',
  '/4/2.json',
  '/4/3.json',
  '/4/4.json',
  '/4/5.json',
  '/4/6.json',
  '/4/7.json',
  '/4/8.json',
  '/4/9.json',
  '/4/10.json',
  '/4/11.json',
  '/4/12.json',
  '/4/13.json',
  '/4/14.json',
  '/4/15.json',
  '/4/16.json',
  '/4/17.json',
  '/4/18.json',
  '/4/19.json',
  '/4/20.json',
  '/4/21.json',
  '/4/22.json',
  '/4/23.json',
  '/4/24.json',
  '/4/25.json',
  '/4/26.json',
  '/4/27.json',
  '/4/28.json',
  '/4/29.json',
  '/4/30.json',
  '/4/31.json',
  '/5/0.json',
  '/5/1.json',
  '/5/2.json',
  '/5/3.json',
  '/5/4.json',
  '/5/5.json',
  '/5/6.json',
  '/5/7.json',
  '/5/8.json',
  '/5/9.json',
  '/5/10.json',
  '/5/11.json',
  '/5/12.json',
  '/5/13.json',
  '/5/14.json',
  '/5/15.json',
  '/5/16.json',
  '/5/17.json',
  '/5/18.json',
  '/5/19.json',
  '/5/20.json',
  '/5/21.json',
  '/5/22.json',
  '/5/23.json',
  '/5/24.json',
  '/5/25.json',
  '/5/26.json',
  '/5/27.json',
  '/5/28.json',
  '/5/29.json',
  '/5/30.json',
  '/5/31.json',
  '/6/0.json',
  '/6/1.json',
  '/6/2.json',
  '/6/3.json',
  '/6/4.json',
  '/6/5.json',
  '/6/6.json',
  '/6/7.json',
  '/6/8.json',
  '/6/9.json',
  '/6/10.json',
  '/6/11.json',
  '/6/12.json',
  '/6/13.json',
  '/6/14.json',
  '/6/15.json',
  '/6/16.json',
  '/6/17.json',
  '/6/18.json',
  '/6/19.json',
  '/6/20.json',
  '/6/21.json',
  '/6/22.json',
  '/6/23.json',
  '/6/24.json',
  '/6/25.json',
  '/6/26.json',
  '/6/27.json',
  '/6/28.json',
  '/6/29.json',
  '/6/30.json',
  '/6/31.json',
];

//Install stage sets up the cache-array to configure pre-cache content
self.addEventListener('install', function(evt) {
  console.log('The service worker is being installed.');
  evt.waitUntil(precache().then(function() {
    console.log('[ServiceWorker] Skip waiting on install');
      return self.skipWaiting();

  })
  );
});


//allow sw to control of current page
self.addEventListener('activate', function(event) {
console.log('[ServiceWorker] Claiming clients for current page');
      return self.clients.claim();

});

self.addEventListener('fetch', function(evt) {
  console.log('The service worker is serving the asset.'+ evt.request.url);
  evt.respondWith(fromCache(evt.request));
  evt.waitUntil(update(evt.request));
});


function precache() {
  return caches.open(CACHE).then(function (cache) {
    return cache.addAll(precacheFiles);
  });
}


function fromCache(request) {
  //we pull files from the cache first thing so we can show them fast
  return caches.open(CACHE).then(function (cache) {
    return cache.match(request).then(function (matching) {
      return matching || fetch(request).then(function(response){ return response} ); // returning a Promise.reject doesn't work
    });
  });
}


function update(request) {
  //this is where we call the server to get the newest version of the 
  //file to use the next time we show view
  return caches.open(CACHE).then(function (cache) {
    return fetch(request).then(function (response) {
      return cache.put(request, response);
    });
  });
}
