import React from 'react'
import AudioPlayer from './AudioPlayer'
import { PlaylistItem } from './types'
import { PlayerOptionsContext } from './context'

const PlayerWithOptions: React.FC<{
  playlist: PlaylistItem[]
  canShuffle?: boolean
  canRepeat?: boolean
  canChangeVolume?: boolean
}> = ({
  playlist,
  canShuffle = true,
  canRepeat = true,
  canChangeVolume = true,
}) => (
  <PlayerOptionsContext.Provider
    value={{
      canShuffle,
      canRepeat,
      canChangeVolume,
    }}
  >
    <AudioPlayer playlist={playlist} />
  </PlayerOptionsContext.Provider>
)

export default PlayerWithOptions
