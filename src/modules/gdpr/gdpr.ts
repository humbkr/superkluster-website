import { serialize, parse } from 'cookie'
import { CookieOptions, UserPreferences } from '@src/modules/gdpr/types'

const COOKIE_NAME_PREFIX = 'gdpr-'

// By default no cookies except the required ones must be set.
const DEFAULT_VALUES: UserPreferences = {
  // User has given his consent by clicking on the button.
  hasSetPreferences: false,
  // Cookies required for basic site functionalities like login.
  necessary: true,
  // Cookies used to store user preferences like dark mode, display units, ...
  preferences: false,
  // Analytics and website statistics.
  statistics: false,
  // Ads, Facebook campaigns, ...
  marketing: false,
}

const serializeCookie = (
  name: string,
  value: any,
  options: CookieOptions = {}
) => {
  const stringValue = typeof value === 'object' ? `${JSON.stringify(value)}` : String(value)
  const cookieOptions = { ...options }

  if ('maxAge' in cookieOptions) {
    cookieOptions.expires = new Date(Date.now() + options.maxAge)
    cookieOptions.maxAge /= 1000
  }

  return serialize(name, String(stringValue), options)
}

const removeCookie = (name: string) => {
  serializeCookie(name, '', {
    expires: new Date(1970, 1, 1, 0, 0, 1),
    maxAge: 0,
  })
}

const getUserPreferences = () => {
  // Default values
  let preferences: UserPreferences = { ...DEFAULT_VALUES }

  // Read cookies and get values.
  if (document) {
    const cookies = parse(document.cookie)
    if (cookies[`${COOKIE_NAME_PREFIX}consent`]) {
      preferences = JSON.parse(cookies[`${COOKIE_NAME_PREFIX}consent`])
    }
  }

  return preferences
}

const setUserPreferences = (preferences: UserPreferences) => {
  // Set cookies that will expire in one year, per legal requirements.
  // One global cookie for use on client side.
  // One cookie per preference so they can be easily used in GTM.
  if (document) {
    document.cookie = serializeCookie(
      `${COOKIE_NAME_PREFIX}consent`,
      preferences,
      {
        maxAge: 31536000,
        path: '/',
      }
    )
    document.cookie = serializeCookie(
      `${COOKIE_NAME_PREFIX}necessary`,
      preferences.necessary,
      {
        maxAge: 31536000,
        path: '/',
      }
    )
    document.cookie = serializeCookie(
      `${COOKIE_NAME_PREFIX}preferences`,
      preferences.preferences,
      {
        maxAge: 31536000,
        path: '/',
      }
    )
    document.cookie = serializeCookie(
      `${COOKIE_NAME_PREFIX}statistics`,
      preferences.statistics,
      {
        maxAge: 31536000,
        path: '/',
      }
    )
    document.cookie = serializeCookie(
      `${COOKIE_NAME_PREFIX}marketing`,
      preferences.marketing,
      {
        maxAge: 31536000,
        path: '/',
      }
    )
  }
}

export default {
  removeCookie,
  COOKIE_NAME_PREFIX,
  DEFAULT_VALUES,
  getUserPreferences,
  setUserPreferences,
}
