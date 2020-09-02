import React, { useContext } from 'react'
import { ThemeContext } from 'styled-components'
import { PlayerTheme } from '../types'

const Repeat: React.FC<{
  size?: number
  active?: boolean
  repeatOne?: boolean
}> = ({ size = 30, active = false, repeatOne = false }) => {
  const sizePx = `${size}px`
  const theme = useContext<PlayerTheme>(ThemeContext)

  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={sizePx}
      height={sizePx}
      viewBox="0 0 24 24"
      fill="none"
      stroke={
        active
          ? theme.buttons.options.colorEnabled
          : theme.buttons.options.colorDisabled
      }
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      data-testid="player-repeat-icon"
    >
      <polyline points="17 1 21 5 17 9" />
      <path d="M3 11V9a4 4 0 0 1 4-4h14" />
      <polyline points="7 23 3 19 7 15" />
      <path d="M21 13v2a4 4 0 0 1-4 4H3" />
      {repeatOne && (
        <text
          x={9}
          y={15}
          fontFamily="monospace"
          fontSize="0.8em"
          data-testid="player-repeat-icon-one"
        >
          1
        </text>
      )}
    </svg>
  )
}

export default Repeat
