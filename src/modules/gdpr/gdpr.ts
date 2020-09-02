import { serialize, parse } from 'cookie'
import { CookieOptions, UserPreferences } from '@src/modules/gdpr/types'

const COOKIE_NAME_PREFIX = 'gdpr-'
// In seconds.
const LEGAL_MAX_AGE = 31536000

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

/**
 * Returns a string usable in a cookie.
 *
 * @param name
 *   The cookie name.
 * @param value
 *   The cookie value.
 * @param options
 *   The cookie options.
 */
const serializeForCookie = (
  name: string,
  value: any,
  options: CookieOptions = {}
) => {
  const stringValue = typeof value === 'object' ? `${JSON.stringify(value)}` : String(value)
  const cookieOptions = { ...options }

  if (cookieOptions.maxAge && !cookieOptions.expires) {
    // For compatibility.
    const now = new Date()
    cookieOptions.expires = new Date(now.getTime() + 1000 * options.maxAge)
  }

  return serialize(name, String(stringValue), cookieOptions)
}

/**
 * Returns a string usable in a cookie that removes its value and mark it as expired
 *
 * @param name Name of the cookie to reset.
 */
const resetCookie = (name: string) => serializeForCookie(name, '', {
  expires: new Date(1970),
  maxAge: 0,
})

const getUserPreferences = (): UserPreferences => {
  // Default values
  let preferences: UserPreferences = { ...DEFAULT_VALUES }

  // Read cookies and get values.
  if (document) {
    const cookies = parse(document.cookie)
    if (cookies[`${COOKIE_NAME_PREFIX}consent`]) {
      preferences = {
        hasSetPreferences: !!cookies[`${COOKIE_NAME_PREFIX}consent`],
        necessary: !!cookies[`${COOKIE_NAME_PREFIX}necessary`],
        preferences: !!cookies[`${COOKIE_NAME_PREFIX}preferences`],
        statistics: !!cookies[`${COOKIE_NAME_PREFIX}statistics`],
        marketing: !!cookies[`${COOKIE_NAME_PREFIX}marketing`],
      }
    }
  }

  return preferences
}

const setUserPreferences = (preferences: UserPreferences) => {
  // Set cookies that will expire in one year, per legal requirements.
  // One global cookie for use on client side.
  // One cookie per preference so they can be easily used in GTM.
  if (document) {
    document.cookie = serializeForCookie(
      `${COOKIE_NAME_PREFIX}consent`,
      preferences,
      {
        maxAge: LEGAL_MAX_AGE,
        path: '/',
      }
    )
    document.cookie = serializeForCookie(
      `${COOKIE_NAME_PREFIX}necessary`,
      preferences.necessary,
      {
        maxAge: LEGAL_MAX_AGE,
        path: '/',
      }
    )
    document.cookie = serializeForCookie(
      `${COOKIE_NAME_PREFIX}preferences`,
      preferences.preferences,
      {
        maxAge: LEGAL_MAX_AGE,
        path: '/',
      }
    )
    document.cookie = serializeForCookie(
      `${COOKIE_NAME_PREFIX}statistics`,
      preferences.statistics,
      {
        maxAge: LEGAL_MAX_AGE,
        path: '/',
      }
    )
    document.cookie = serializeForCookie(
      `${COOKIE_NAME_PREFIX}marketing`,
      preferences.marketing,
      {
        maxAge: LEGAL_MAX_AGE,
        path: '/',
      }
    )
  }
}

export default {
  serializeForCookie,
  resetCookie,
  COOKIE_NAME_PREFIX,
  DEFAULT_VALUES,
  getUserPreferences,
  setUserPreferences,
}
