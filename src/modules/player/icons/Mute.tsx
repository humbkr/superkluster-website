import React from 'react'
import ThemeContext from '../theme-context'

const Mute: React.FC<{ size: number }> = ({ size = 30 }) => {
  const sizePx = `${size}px`

  return (
    <ThemeContext.Consumer>
      {(context) => (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width={sizePx}
          height={sizePx}
          viewBox="0 0 24 24"
          fill={`${context.buttons.colorEnabled}`}
          stroke={`${context.buttons.colorEnabled}`}
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5" />
          <line x1="23" y1="9" x2="17" y2="15" />
          <line x1="17" y1="9" x2="23" y2="15" />
        </svg>
      )}
    </ThemeContext.Consumer>
  )
}

export default Mute
