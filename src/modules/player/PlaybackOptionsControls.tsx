import React from 'react'
import styled from 'styled-components'
import Repeat from './icons/Repeat'
import Shuffle from './icons/Shuffle'
import { RepeatState } from './types'

const getRepeatStateLabel = (repeatState: RepeatState): string => {
  switch (repeatState) {
    case RepeatState.all:
      return 'all'
    case RepeatState.one:
      return 'one'
    case RepeatState.norepeat:
    default:
      return 'none'
  }
}

const PlaybackOptionsControls: React.FC<{
  repeatState: RepeatState
  onRepeat: () => void
  shuffleState: boolean
  onShuffle: () => void
  displayShuffle: boolean
}> = ({
  repeatState, onRepeat, shuffleState, onShuffle, displayShuffle,
}) => (
  <Container data-testid={`player-repeat-${getRepeatStateLabel(repeatState)}`}>
    <PlaybackOptionButton
      type="button"
      onClick={onRepeat}
      aria-label="Repeat"
      data-testid="player-repeat-button"
    >
      <Repeat
        size={18}
        active={repeatState !== RepeatState.norepeat}
        repeatOne={repeatState === RepeatState.one}
      />
    </PlaybackOptionButton>
    {displayShuffle && (
      <PlaybackOptionButton
        type="button"
        onClick={onShuffle}
        aria-label="Shuffle"
        data-testid={`player-shuffle-button-${
          shuffleState ? 'enabled' : 'disabled'
        }`}
      >
        <Shuffle size={18} active={shuffleState} />
      </PlaybackOptionButton>
    )}
  </Container>
)

export default PlaybackOptionsControls

const Container = styled.div`
  display: flex;
`
const PlaybackOptionButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 4px 4px;
  background-color: transparent;
  border: 0;
  cursor: pointer;
`
