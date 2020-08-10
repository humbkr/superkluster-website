import React, { useRef } from 'react'
import styled from 'styled-components'
import { useAudioPosition } from 'react-use-audio-player'

const ProgressBar: React.FC = () => {
  const { position, duration, seek } = useAudioPosition({
    highRefreshRate: true,
  })
  const [percent, setPercent] = React.useState(0)

  React.useEffect(() => {
    setPercent((position / duration) * 100 || 0)
  }, [position, duration])

  const container = useRef<HTMLButtonElement>()

  const handleOnClick = (e) => {
    // Get clicked position from the button point of view.
    const percentToSeekTo = (e.clientX - container.current.getBoundingClientRect().left)
      / container.current.offsetWidth
    seek(percentToSeekTo * duration)
  }

  return (
    <Container
      ref={container}
      onClick={handleOnClick}
      aria-label="Progress bar"
    >
      <Progress style={{ width: `${percent}%` }} />
    </Container>
  )
}

export default ProgressBar

const Container = styled.button`
  width: 100%;
  height: 5px;
  background-color: #aaaaaa;
  border: 0;
  cursor: pointer;
`
const Progress = styled.div`
  height: 100%;
  background-color: darkred;
  width: 0;
`
