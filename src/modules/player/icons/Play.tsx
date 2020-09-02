import React, { useContext } from 'react'
import { ThemeContext } from 'styled-components'
import { PlayerTheme } from '../types'

const Play: React.FC<{ size?: number }> = ({ size = 30 }) => {
  const sizePx = `${size}px`
  const theme = useContext<PlayerTheme>(ThemeContext)

  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={sizePx}
      height={sizePx}
      viewBox="0 0 24 24"
      fill={`${theme.buttons.playback.colorEnabled}`}
      stroke={`${theme.buttons.playback.colorEnabled}`}
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      data-testid="player-play-icon"
    >
      <polygon points="5 3 19 12 5 21 5 3" />
    </svg>
  )
}

export default Play
