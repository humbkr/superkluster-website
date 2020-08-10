import React from 'react'
import ThemeContext from '../theme-context'

const VolumeLow: React.FC<{ size: number }> = ({ size = 30 }) => {
  const sizePx = `${size}px`

  return (
    <ThemeContext.Consumer>
      {(context) => (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width={sizePx}
          height={sizePx}
          viewBox="0 0 24 24"
          fill="none"
          stroke={`${context.buttons.colorEnabled}`}
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <polygon
            points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"
            fill={`${context.buttons.colorEnabled}`}
          />
          <path d="M15.54 8.46a5 5 0 0 1 0 7.07" />
        </svg>
      )}
    </ThemeContext.Consumer>
  )
}

export default VolumeLow
