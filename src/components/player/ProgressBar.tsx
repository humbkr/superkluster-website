import React, { useRef } from 'react'
import styled from 'styled-components'

const ProgressBar: React.FC<{
  current: number
  max: number
  onSeek: (position: number) => void
}> = ({ current = 0, max = 0, onSeek }) => {
  const processedCurrent = (current / max) * 100
  const container = useRef<HTMLButtonElement>()

  const handleOnClick = (e) => {
    // Get clicked position from the button point of view.
    const percent = (e.clientX - container.current.getBoundingClientRect().left)
      / container.current.offsetWidth
    onSeek(percent * max)
  }

  return (
    <Container
      ref={container}
      onClick={handleOnClick}
      aria-label="Progress bar"
    >
      <Progress style={{ width: `${processedCurrent}%` }} />
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
