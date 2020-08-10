import React from 'react'
import ThemeContext from '../theme-context'

const Play: React.FC<{ size: number }> = ({ size = 30 }) => {
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
          <polygon points="5 3 19 12 5 21 5 3" />
        </svg>
      )}
    </ThemeContext.Consumer>
  )
}

export default Play
