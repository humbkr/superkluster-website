import ReactGA from 'react-ga'
import ReactPixel from 'react-facebook-pixel'
import Router from 'next/router'
import gdpr from '@src/modules/gdpr/gdpr'

const GA_TOKEN = process.env.NEXT_PUBLIC_GA_ID
const FB_PIXEL_CODE = process.env.NEXT_PUBLIC_GA_ID

const initialize = () => {
  // @ts-ignore
  ReactGA.initialize(GA_TOKEN, {
    gaOptions: {
      // GDPR defaults.
      cookieExpires: 86400,
      anonymizeIp: true,
      // Other options.
      forceSSL: true,
    },
    debug: false,
  })

  ReactPixel.init(FB_PIXEL_CODE)
  ReactPixel.revokeConsent()

  Router.events.on('routeChangeComplete', (url) => {
    // We have to use a timeout because of this bug:
    // https://github.com/zeit/next.js/issues/6025
    // Once resolved ReactGA.pageview(url) without timeout nor document.title will suffice.
    window.setTimeout(() => {
      ReactGA.pageview(url, null, document.title)
      ReactPixel.pageView()
    }, 500)
  })
}

const disableTracking = () => {
  // Disable GA tracking.
  window[`ga-disable-${GA_TOKEN}`] = true

  // Remove GA cookies.
  gdpr.removeCookie('_ga')
  gdpr.removeCookie('_gat')
  gdpr.removeCookie('_gid')

  // Remove userId from GA.
  ReactGA.set({ userId: null })

  // Disable Facebook pixel tracking.
  ReactPixel.revokeConsent()
}

const enableTracking = (userId = null) => {
  // Enable GA tracking.
  window[`ga-disable-${GA_TOKEN}`] = false

  // Enable FB pixel traking.
  ReactPixel.grantConsent()
  // Trigger a pageView after user clicked on accept.
  ReactPixel.pageView()

  const userPreferences = gdpr.getUserPreferences()
  if (userPreferences.marketing && userId) {
    ReactGA.set({ userId })
    ReactPixel.fbq('init', FB_PIXEL_CODE, { uid: userId })
  }
}

const setUserId = (userId) => {
  const userPreferences = gdpr.getUserPreferences()
  if (userPreferences.marketing) {
    ReactGA.set({ userId })
  }
}

export default {
  initialize,
  disableTracking,
  enableTracking,
  setUserId,
}
