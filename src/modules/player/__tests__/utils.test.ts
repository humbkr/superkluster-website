import { cycleNumPos, formatDuration } from '../utils'

describe('player utils', () => {
  describe('cycleNumPos', () => {
    it('should return the next integer of the list', () => {
      const test = cycleNumPos(3, 1, 5)
      expect(test).toBe(4)
    })

    it('should cycle when reaching the end of the list', () => {
      const test = cycleNumPos(3, 4, 5)
      expect(test).toBe(2)
    })

    it('should cycle when reaching the beginning of the list (reverse cycle)', () => {
      const test = cycleNumPos(3, -4, 5)
      expect(test).toBe(4)
    })
  })

  describe('formatTime', () => {
    it('formats duration between 1 seconds and 1 hour like this: "00:00"', () => {
      const formattedValue = formatDuration(59)
      expect(formattedValue).toBe('00:59')

      const formattedValue2 = formatDuration(60)
      expect(formattedValue2).toBe('01:00')

      const formattedValue3 = formatDuration(3599)
      expect(formattedValue3).toBe('59:59')
    })

    it('formats duration >= 1 hour like this: "0:00:00"', () => {
      // Note: We don't manage durations >= 24 hours.

      const formattedValue = formatDuration(3600)
      expect(formattedValue).toBe('01:00:00')

      const formattedValue2 = formatDuration(112320)
      expect(formattedValue2).toBe('31:12:00')
    })
  })
})
