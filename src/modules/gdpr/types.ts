export interface CookieOptions {
  expires?: Date
  maxAge?: number
  path?: string
}

export interface UserPreferences {
  hasSetPreferences: boolean
  necessary: boolean
  preferences: boolean
  statistics: boolean
  marketing: boolean
}
