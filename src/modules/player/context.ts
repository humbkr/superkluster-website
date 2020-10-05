import React from 'react'
import { AudioPlayerOptionsContext } from './types'

// eslint-disable-next-line import/prefer-default-export
export const PlayerOptionsContext = React.createContext<
  AudioPlayerOptionsContext
>({
  canShuffle: true,
  canRepeat: true,
  canChangeVolume: true,
})
