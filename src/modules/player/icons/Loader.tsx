import React, { useContext } from 'react'
import { ThemeContext } from 'styled-components'
import { PlayerTheme } from '../types'

const Loader: React.FC<{ size?: number }> = ({ size = 30 }) => {
  const sizePx = `${size}px`
  const theme = useContext<PlayerTheme>(ThemeContext)

  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={sizePx}
      height={sizePx}
      viewBox="0 0 100 100"
      preserveAspectRatio="xMidYMid"
      data-testid="player-loader-icon"
    >
      <circle
        cx="50"
        cy="50"
        fill="none"
        stroke={`${theme.buttons.playback.colorEnabled}`}
        strokeWidth="6"
        r="35"
        strokeDasharray="164.93361431346415 56.97787143782138"
        transform="rotate(148.259 50 50)"
      >
        <animateTransform
          attributeName="transform"
          type="rotate"
          repeatCount="indefinite"
          dur="1s"
          values="0 50 50;360 50 50"
          keyTimes="0;1"
        />
      </circle>
    </svg>
  )
}

export default Loader
