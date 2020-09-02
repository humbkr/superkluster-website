import React, {
  useRef, useState, useEffect, useCallback,
} from 'react'
import styled from 'styled-components'
import { useAudioPosition } from 'react-use-audio-player'

const ProgressBar: React.FC = () => {
  const { position, duration, seek } = useAudioPosition({
    highRefreshRate: true,
  })
  const [percent, setPercent] = useState(0)

  useEffect(() => {
    setPercent((position / duration) * 100 || 0)
  }, [position, duration])

  const container = useRef<HTMLButtonElement>()

  const handleOnClick = useCallback(
    (e) => {
      // Get clicked position from the button point of view.
      const percentToSeekTo = (e.clientX - container.current.getBoundingClientRect().left)
        / container.current.offsetWidth
      seek(percentToSeekTo * duration)
    },
    [duration, seek]
  )

  return (
    <Container
      ref={container}
      onClick={handleOnClick}
      aria-label="Progress bar"
      data-testid="player-progress-bar"
    >
      <Progress
        style={{ width: `${percent}%` }}
        data-testid="player-progress-bar-status"
      />
    </Container>
  )
}

export default ProgressBar

const Container = styled.button`
  width: 100%;
  height: 5px;
  background-color: ${(props) => props.theme.progressBar.background};
  border: 0;
  cursor: pointer;
`
const Progress = styled.div`
  height: 100%;
  background-color: ${(props) => props.theme.progressBar.progress};
  width: 0;
`
