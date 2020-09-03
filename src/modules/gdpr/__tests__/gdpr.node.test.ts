/**
 * @jest-environment node
 */

import gdpr from '../gdpr'

describe('gdpr utils', () => {
  describe('getUserPreferences', () => {
    it('does not crash on server side rendering', () => {
      expect(gdpr.getUserPreferences()).toStrictEqual({
        hasSetPreferences: false,
        necessary: true,
        preferences: false,
        statistics: false,
        marketing: false,
      })
    })
  })

  describe('setUserPreferences', () => {
    it('does not crash on server side rendering', () => {
      gdpr.setUserPreferences({
        hasSetPreferences: true,
        necessary: true,
        preferences: true,
        statistics: true,
        marketing: true,
      })
    })
  })
})
