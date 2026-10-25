// Build replaces these placeholders using the complete exported app shell.
const BASE_PATH = '/english-trainer-pwa/';
const CACHE_PREFIX = 'language-trainer-recovered-' + encodeURIComponent(BASE_PATH) + '-';
const CACHE = CACHE_PREFIX + 'bf497fc845e67784dbe7';
const PRECACHE = ["/english-trainer-pwa/APPLICATION_RIGHTS.txt","/english-trainer-pwa/THIRD_PARTY_LICENSES.txt","/english-trainer-pwa/_expo/static/js/web/index-b6c05b456d663be239dd9afe1c6b01b3.js","/english-trainer-pwa/assets/node_modules/@expo/vector-icons/build/vendor/react-native-vector-icons/Fonts/AntDesign.3f78af31cca60105799838a1a7a59fbd.ttf","/english-trainer-pwa/assets/node_modules/@expo/vector-icons/build/vendor/react-native-vector-icons/Fonts/Entypo.31b5ffea3daddc69dd01a1f3d6cf63c5.ttf","/english-trainer-pwa/assets/node_modules/@expo/vector-icons/build/vendor/react-native-vector-icons/Fonts/EvilIcons.140c53a7643ea949007aa9a282153849.ttf","/english-trainer-pwa/assets/node_modules/@expo/vector-icons/build/vendor/react-native-vector-icons/Fonts/Feather.ca4b48e04dc1ce10bfbddb262c8b835f.ttf","/english-trainer-pwa/assets/node_modules/@expo/vector-icons/build/vendor/react-native-vector-icons/Fonts/FontAwesome.b06871f281fee6b241d60582ae9369b9.ttf","/english-trainer-pwa/assets/node_modules/@expo/vector-icons/build/vendor/react-native-vector-icons/Fonts/FontAwesome5_Brands.3b89dd103490708d19a95adcae52210e.ttf","/english-trainer-pwa/assets/node_modules/@expo/vector-icons/build/vendor/react-native-vector-icons/Fonts/FontAwesome5_Regular.1f77739ca9ff2188b539c36f30ffa2be.ttf","/english-trainer-pwa/assets/node_modules/@expo/vector-icons/build/vendor/react-native-vector-icons/Fonts/FontAwesome5_Solid.605ed7926cf39a2ad5ec2d1f9d391d3d.ttf","/english-trainer-pwa/assets/node_modules/@expo/vector-icons/build/vendor/react-native-vector-icons/Fonts/FontAwesome6_Brands.56c8d80832e37783f12c05db7c8849e2.ttf","/english-trainer-pwa/assets/node_modules/@expo/vector-icons/build/vendor/react-native-vector-icons/Fonts/FontAwesome6_Regular.370dd5af19f8364907b6e2c41f45dbbf.ttf","/english-trainer-pwa/assets/node_modules/@expo/vector-icons/build/vendor/react-native-vector-icons/Fonts/FontAwesome6_Solid.adec7d6f310bc577f05e8fe06a5daccf.ttf","/english-trainer-pwa/assets/node_modules/@expo/vector-icons/build/vendor/react-native-vector-icons/Fonts/Fontisto.b49ae8ab2dbccb02c4d11caaacf09eab.ttf","/english-trainer-pwa/assets/node_modules/@expo/vector-icons/build/vendor/react-native-vector-icons/Fonts/Foundation.e20945d7c929279ef7a6f1db184a4470.ttf","/english-trainer-pwa/assets/node_modules/@expo/vector-icons/build/vendor/react-native-vector-icons/Fonts/Ionicons.b4eb097d35f44ed943676fd56f6bdc51.ttf","/english-trainer-pwa/assets/node_modules/@expo/vector-icons/build/vendor/react-native-vector-icons/Fonts/MaterialCommunityIcons.6e435534bd35da5fef04168860a9b8fa.ttf","/english-trainer-pwa/assets/node_modules/@expo/vector-icons/build/vendor/react-native-vector-icons/Fonts/MaterialIcons.4e85bc9ebe07e0340c9c4fc2f6c38908.ttf","/english-trainer-pwa/assets/node_modules/@expo/vector-icons/build/vendor/react-native-vector-icons/Fonts/Octicons.871378c6eab492a3e689a9385dc45a12.ttf","/english-trainer-pwa/assets/node_modules/@expo/vector-icons/build/vendor/react-native-vector-icons/Fonts/SimpleLineIcons.d2285965fe34b05465047401b8595dd0.ttf","/english-trainer-pwa/assets/node_modules/@expo/vector-icons/build/vendor/react-native-vector-icons/Fonts/Zocial.1681f34aaca71b8dfb70756bca331eb2.ttf","/english-trainer-pwa/icon-192.png","/english-trainer-pwa/icon-512.png","/english-trainer-pwa/index.html","/english-trainer-pwa/manifest.webmanifest"];

self.addEventListener('install', event => {
  // Atomic installation: no new worker activates with an incomplete app shell.
  event.waitUntil(caches.open(CACHE).then(cache => cache.addAll(PRECACHE)));
  // No skipWaiting: an update must not interrupt an active exercise or form.
});

self.addEventListener('activate', event => {
  event.waitUntil(caches.keys().then(keys => Promise.all(
    keys.filter(key => key.startsWith(CACHE_PREFIX) && key !== CACHE)
      .map(key => caches.delete(key))
  )).then(() => self.clients.claim()));
  // Cache Storage is independent of AsyncStorage/localStorage learning records.
});

self.addEventListener('fetch', event => {
  const url = new URL(event.request.url);
  if (event.request.method !== 'GET' || url.origin !== self.location.origin || !url.pathname.startsWith(BASE_PATH)) return;
  const navigation = event.request.mode === 'navigate';
  if (!navigation && !PRECACHE.includes(url.pathname)) return;
  event.respondWith((async () => {
    const cache = await caches.open(CACHE);
    // An installed worker serves one consistent HTML + hashed-asset revision.
    const cached = await cache.match(navigation ? BASE_PATH + 'index.html' : url.pathname);
    if (cached) return cached;
    try { return await fetch(event.request); }
    catch { return new Response('App resources unavailable. Reconnect and reload.', {
      status: 503, headers: { 'Content-Type': 'text/plain; charset=utf-8' }
    }); }
  })());
});
