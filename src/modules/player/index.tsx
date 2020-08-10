import React from 'react'
import { AudioPlayerProvider } from 'react-use-audio-player'
import AudioPlayer from './AudioPlayer'
import { PlaylistItem } from './types'

const Player: React.FC<{
  playlist: PlaylistItem[]
}> = ({ playlist }) => (
  <AudioPlayerProvider>
    <AudioPlayer playlist={playlist} />
  </AudioPlayerProvider>
)

export default Player
