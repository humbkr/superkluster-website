import React from 'react'
import styled from 'styled-components'
import SkipPrevIcon from './icons/Previous'
import SkipNextIcon from './icons/Next'

const PlaylistNavControls: React.FC<{
  disablePrev: boolean
  disableNext: boolean
  onPrev: () => void
  onNext: (
    e: React.MouseEvent<HTMLButtonElement>,
    forcePlaying: boolean
  ) => void
}> = ({
  disablePrev, disableNext, onPrev, onNext,
}) => (
  <Container>
    <PlaylistNavButton
      type="button"
      onClick={onPrev}
      disabled={disablePrev}
      aria-label="Previous song"
      data-testid="player-prev-button"
    >
      <SkipPrevIcon enabled={!disablePrev} size={18} />
    </PlaylistNavButton>
    <PlaylistNavButton
      type="button"
      onClick={onNext}
      disabled={disableNext}
      aria-label="Next song"
      data-testid="player-next-button"
    >
      <SkipNextIcon enabled={!disableNext} size={18} />
    </PlaylistNavButton>
  </Container>
)

export default PlaylistNavControls

const Container = styled.div`
  display: flex;
`
const PlaylistNavButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 4px 7px;
  border: 1px solid ${(props) => props.theme.buttons.playback.borderColor};
  background-color: ${(props) => props.theme.buttons.playback.background};
  margin-right: 5px;
  cursor: pointer;
`
