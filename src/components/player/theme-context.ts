import React from 'react'

export const themeDefaultValues = {
  buttons: {
    colorEnabled: '#000',
    colorDisabled: '#6e6e6e',
  },
}

export default React.createContext(themeDefaultValues)
