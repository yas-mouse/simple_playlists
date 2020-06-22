importScripts('https://cdn.jsdelivr.net/npm/workbox-cdn@4.3.1/workbox/workbox-sw.js')

// --------------------------------------------------
// Configure
// --------------------------------------------------

// Set workbox config
workbox.setConfig({
  "debug": true
})

// Start controlling any existing clients as soon as it activates
workbox.core.clientsClaim()

// Skip over the SW waiting lifecycle stage
workbox.core.skipWaiting()

workbox.precaching.cleanupOutdatedCaches()

// --------------------------------------------------
// Precaches
// --------------------------------------------------

// Precache assets

// --------------------------------------------------
// Runtime Caching
// --------------------------------------------------

// Register route handlers for runtimeCaching
workbox.routing.registerRoute(new RegExp('https://tools.applemusic.com/ja-jp/artwork/.*'), new workbox.strategies.CacheFirst ({"cacheExpiration":{"maxAgeSeconds":604800},"cacheableResponse":{"statuses":[200]}}), 'GET')
workbox.routing.registerRoute(new RegExp('/simple_playlists/_nuxt/'), new workbox.strategies.CacheFirst ({}), 'GET')
