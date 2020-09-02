import React, { useContext } from 'react'
import { ThemeContext } from 'styled-components'
import { PlayerTheme } from '../types'

const Pause: React.FC<{ size?: number }> = ({ size = 30 }) => {
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
      data-testid="player-pause-icon"
    >
      <rect x="5" y="3" width="5" height="18" />
      <rect x="14" y="3" width="5" height="18" />
    </svg>
  )
}

export default Pause
