/* istanbul ignore file */
// Nothing to test here.

import React from 'react'
import { AudioPlayerProvider } from 'react-use-audio-player'
import { PlaylistItem } from './types'
import PlayerWithOptions from './PlayerWithOptions'

const Player: React.FC<{
  playlist: PlaylistItem[]
  canShuffle?: boolean
  canRepeat?: boolean
  canChangeVolume?: boolean
}> = ({
  playlist, canShuffle, canRepeat, canChangeVolume,
}) => (
  <AudioPlayerProvider>
    <PlayerWithOptions
      playlist={playlist}
      canShuffle={canShuffle}
      canRepeat={canRepeat}
      canChangeVolume={canChangeVolume}
    />
  </AudioPlayerProvider>
)

export default Player
