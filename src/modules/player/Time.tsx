import React from 'react'
import styled from 'styled-components'
import { useAudioPosition } from 'react-use-audio-player'

/**
 * Format time to '00:00'.
 *
 * @param seconds number
 *   Duration in seconds.
 */
const formatTime = (seconds: number) => {
  const floored = Math.floor(seconds)
  let from = 14
  let length = 5
  if (floored >= 3600) {
    from = 11
    length = 8
  }

  return new Date(floored * 1000).toISOString().substr(from, length)
}

const Time: React.FC<{
  remaining: boolean
}> = ({ remaining = false }) => {
  const { position, duration } = useAudioPosition({ highRefreshRate: true })

  // Position sometimes return a Howl object instead of a number,
  // @see https://github.com/E-Kuerschner/useAudioPlayer/issues/28
  const elapsed = typeof position === 'number' ? position : 0

  const remainingSeconds = duration - elapsed

  return (
    <Container>
      {remaining && `-${formatTime(remainingSeconds)}`}
      {!remaining && `${formatTime(elapsed)} / ${formatTime(duration)}`}
    </Container>
  )
}

export default Time

const Container = styled.div`
  font-size: 14px;
  line-height: 18px;
  color: #686868;
  flex-shrink: 0;
`
