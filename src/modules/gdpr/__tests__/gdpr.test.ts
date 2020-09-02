import gdpr from '../gdpr'

describe('gdpr utils', () => {
  describe('serializeCookie', () => {
    it('returns a string usable in a cookie when value is a string', () => {
      const serialized = gdpr.serializeForCookie('test', 'testValue')

      expect(serialized).toBe('test=testValue')
    })

    it('returns a string usable in a cookie when value is an integer', () => {
      const serialized = gdpr.serializeForCookie('test', 1234)

      expect(serialized).toBe('test=1234')
    })

    it('returns a string usable in a cookie when value is an object', () => {
      const serialized = gdpr.serializeForCookie('test', {
        var1: 'value1',
        var2: 0,
      })

      expect(serialized).toBe(
        'test=%7B%22var1%22%3A%22value1%22%2C%22var2%22%3A0%7D'
      )
    })

    it('returns a serialized value including maxAge and expires values when passing a maxAge option without an expires option', () => {
      const now = new Date()
      const serialized = gdpr.serializeForCookie('test', 'testValue', {
        maxAge: 3000,
      })

      const expectedDate = new Date(now.getTime() + 1000 * 3000)
      expect(serialized).toBe(
        `test=testValue; Max-Age=3000; Expires=${expectedDate.toUTCString()}`
      )
    })

    it('returns a serialized value including maxAge and expires values when passing these 2 options', () => {
      const serialized = gdpr.serializeForCookie('test', 'testValue', {
        maxAge: 3000,
        expires: new Date(1985, 7, 5),
      })

      expect(serialized).toBe(
        `test=testValue; Max-Age=3000; Expires=${new Date(
          1985,
          7,
          5
        ).toUTCString()}`
      )
    })
  })

  describe('resetCookie', () => {
    it('returns a string usable in a cookie that removes its value and mark it as expired', () => {
      const serialized = gdpr.resetCookie('test')

      expect(serialized).toBe(
        'test=; Max-Age=0; Expires=Thu, 01 Jan 1970 00:00:01 GMT'
      )
    })
  })

  describe('getUserPreferences', () => {
    it('returns default values if no gdpr cookies are set', () => {
      Object.defineProperty(document, 'cookie', {
        get: jest.fn().mockImplementation(() => ''),
        set: jest.fn().mockImplementation(() => {}),
        configurable: true,
      })

      expect(gdpr.getUserPreferences()).toStrictEqual(gdpr.DEFAULT_VALUES)
    })

    it('returns cookies values if gdpr cookies are set', () => {
      Object.defineProperty(document, 'cookie', {
        get: jest
          .fn()
          .mockImplementation(
            () => 'gdpr-consent=true; gdpr-necessary=true; gdpr-preferences=true; gdpr-statistics=true; gdpr-marketing=true'
          ),
        set: jest.fn().mockImplementation(() => {}),
        configurable: true,
      })

      expect(gdpr.getUserPreferences()).toStrictEqual({
        hasSetPreferences: true,
        necessary: true,
        preferences: true,
        statistics: true,
        marketing: true,
      })
    })
  })

  describe('setUserPreferences', () => {
    it('sets cookies without error', () => {
      const setCookie = jest.fn().mockImplementation(() => {})
      Object.defineProperty(document, 'cookie', {
        get: jest.fn().mockImplementation(() => ''),
        set: setCookie,
        configurable: true,
      })

      gdpr.setUserPreferences({
        hasSetPreferences: true,
        necessary: true,
        preferences: true,
        statistics: true,
        marketing: true,
      })

      expect(setCookie).toHaveBeenCalledTimes(5)
    })
  })
})
