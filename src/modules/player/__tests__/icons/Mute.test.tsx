import React from 'react'
import { render, screen } from '@testing-library/react'
import { ThemeProvider } from 'styled-components'
import theme from '../../theme'
import Mute from '../../icons/Mute'

describe('Mute icon', () => {
  it('renders correctly with default props', async () => {
    render(
      <ThemeProvider theme={theme}>
        <Mute />
      </ThemeProvider>
    )

    expect(screen.getByTestId('player-mute-icon')).toBeInTheDocument()
  })

  it('changes size depending on the size prop', async () => {
    render(
      <ThemeProvider theme={theme}>
        <Mute size={45} />
      </ThemeProvider>
    )

    expect(screen.getByTestId('player-mute-icon')).toHaveAttribute(
      'width',
      '45px'
    )
    expect(screen.getByTestId('player-mute-icon')).toHaveAttribute(
      'height',
      '45px'
    )
  })

  it('changes color depending on the color value of the theme', async () => {
    const alternativeTheme = { ...theme }
    alternativeTheme.buttons.playback.colorEnabled = '#ffcc00'

    render(
      <ThemeProvider theme={alternativeTheme}>
        <Mute />
      </ThemeProvider>
    )

    expect(screen.getByTestId('player-mute-icon')).toHaveAttribute(
      'stroke',
      '#ffcc00'
    )
    expect(screen.getByTestId('player-mute-icon')).toHaveAttribute(
      'fill',
      '#ffcc00'
    )
  })
})
