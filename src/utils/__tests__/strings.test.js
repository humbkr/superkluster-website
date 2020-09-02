import { isValidEmail } from '../strings'

describe('Utility functions', () => {
  describe('isValidEmail', () => {
    it('returns true if email is valid', () => {
      expect(isValidEmail('test@test.com')).toBe(true)
      expect(isValidEmail('test+test@test.com')).toBe(true)
      expect(isValidEmail('TESTtest@Test.com')).toBe(true)
    })

    it('returns false if email is not valid', () => {
      expect(isValidEmail('test@test')).toBe(false)
      expect(isValidEmail('test.com')).toBe(false)
      expect(isValidEmail('@Test.com')).toBe(false)
    })
  })
})
