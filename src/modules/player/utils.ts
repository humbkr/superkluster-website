/**
 * Computes the next / previous position in an list of consecutive integers
 * when looping.
 *
 * @param currentValue integer
 *   The current value in the list.
 * @param change integer
 *   The number of positions you want to switch from. Negative value to go
 *   backward.
 * @param length integer
 *   The length of the list of integers.
 *
 */
// eslint-disable-next-line import/prefer-default-export
export const cycleNumPos = (
  currentValue: number,
  change: number,
  length: number
) => {
  let newPos = currentValue + change
  if (newPos >= length) {
    newPos -= length
  }
  if (newPos < 0) {
    newPos += length
  }
  return newPos
}

/**
 * Format duration to 'HH:mm:SS'. Will display hours only when necessary.
 *
 * @param duration number
 *   Duration in seconds.
 * @param forceHours boolean
 *   If true will force hours display. Defaults to false.
 */
export const formatDuration = (
  duration: number,
  forceHours: boolean = false
) => {
  let remainingSeconds = duration

  const hours = Math.floor(remainingSeconds / 3600)
  remainingSeconds -= hours * 3600

  const minutes = Math.floor(remainingSeconds / 60) % 60
  remainingSeconds -= minutes * 60

  const seconds = Math.round(remainingSeconds) % 60

  // eslint-disable-next-line max-len
  const formatted = `${String(hours).padStart(2, '0')}:${String(
    minutes
  ).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`

  return duration >= 3600 || forceHours ? formatted : formatted.substr(3, 5)
}
