import React from 'react'
import ThemeContext from '../theme-context'

const Next: React.FC<{ size: number; enabled: boolean }> = ({
  size,
  enabled,
}) => {
  const sizePx = `${size}px`

  return (
    <ThemeContext.Consumer>
      {(context) => (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width={sizePx}
          height={sizePx}
          viewBox="0 0 24 24"
          fill={
            enabled
              ? context.buttons.colorEnabled
              : context.buttons.colorDisabled
          }
          stroke={
            enabled
              ? context.buttons.colorEnabled
              : context.buttons.colorDisabled
          }
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <polygon points="5 4 15 12 5 20 5 4" />
          <rect x="17" y="5" width="2" height="14" />
        </svg>
      )}
    </ThemeContext.Consumer>
  )
}

export default Next
