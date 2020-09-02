import React from 'react'
import styled from 'styled-components'
import { useAudioPosition } from 'react-use-audio-player'
import { formatDuration } from './utils'

const Time: React.FC<{
  remaining?: boolean
}> = ({ remaining = false }) => {
  const { position, duration } = useAudioPosition({ highRefreshRate: true })

  // Position sometimes return a Howl object instead of a number,
  // @see https://github.com/E-Kuerschner/useAudioPlayer/issues/28
  const elapsed = typeof position === 'number' ? position : 0

  const remainingSeconds = duration - elapsed

  return (
    <Container>
      {remaining && `-${formatDuration(remainingSeconds, duration >= 3600)}`}
      {!remaining
        && `${formatDuration(elapsed, duration >= 3600)} / ${formatDuration(
          duration
        )}`}
    </Container>
  )
}

export default Time
export { formatDuration }

const Container = styled.div`
  font-size: 14px;
  line-height: 18px;
  color: ${(props) => props.theme.timer.color};
  flex-shrink: 0;
`
