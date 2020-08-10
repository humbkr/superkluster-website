import React from 'react'
import ThemeContext from '../theme-context'

const Previous: React.FC<{ size: number; enabled: boolean }> = ({
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
          <polygon points="19 20 9 12 19 4 19 20" />
          <rect x="5" y="5" width="2" height="14" />
        </svg>
      )}
    </ThemeContext.Consumer>
  )
}

export default Previous
