import React, { useContext } from 'react'
import { ThemeContext } from 'styled-components'
import { PlayerTheme } from '../types'

const Next: React.FC<{ size?: number; enabled?: boolean }> = ({
  size = 30,
  enabled = true,
}) => {
  const sizePx = `${size}px`
  const theme = useContext<PlayerTheme>(ThemeContext)

  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={sizePx}
      height={sizePx}
      viewBox="0 0 24 24"
      fill={
        enabled
          ? theme.buttons.playback.colorEnabled
          : theme.buttons.playback.colorDisabled
      }
      stroke={
        enabled
          ? theme.buttons.playback.colorEnabled
          : theme.buttons.playback.colorDisabled
      }
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      data-testid="player-next-icon"
    >
      <polygon points="5 4 15 12 5 20 5 4" />
      <rect x="17" y="5" width="2" height="14" />
    </svg>
  )
}

export default Next
