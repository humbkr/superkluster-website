import { useEffect, useRef } from 'react'

// eslint-disable-next-line import/prefer-default-export
const useInterval = (callback: any, delay: number) => {
  const savedCallback = useRef<typeof callback>()

  // Remember the latest callback.
  useEffect(() => {
    savedCallback.current = callback
  }, [callback])

  // Set up the interval.
  useEffect(() => {
    const tick = () => {
      savedCallback.current()
    }
    if (delay !== null) {
      const id = setInterval(tick, delay)
      return () => clearInterval(id)
    }

    return null
  }, [delay])
}

export default useInterval
