import React from 'react'
import ThemeContext from '../theme-context'

const Pause: React.FC<{ size: number }> = ({ size = 30 }) => {
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
          <rect x="5" y="3" width="5" height="18" />
          <rect x="14" y="3" width="5" height="18" />
        </svg>
      )}
    </ThemeContext.Consumer>
  )
}

export default Pause
