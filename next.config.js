const withPlugins = require('next-compose-plugins')
const optimizedImages = require('next-optimized-images')

module.exports = withPlugins([
  [optimizedImages, {
    optimizeImagesInDev: !!process.env.NEXT_PUBLIC_DEBUG_MODE,
    mozjpeg: {
      quality: 90,
    },
    webp: {
      preset: 'default',
      quality: 90,
    },
  }],

  // Other plugins here.
])
