import React from 'react'
import { render, screen } from '@testing-library/react'
import { ThemeProvider } from 'styled-components'
import theme from '../../theme'
import Play from '../../icons/Play'

describe('Play icon', () => {
  it('renders correctly with default props', async () => {
    render(
      <ThemeProvider theme={theme}>
        <Play />
      </ThemeProvider>
    )

    expect(screen.getByTestId('player-play-icon')).toBeInTheDocument()
  })

  it('changes size depending on the size prop', async () => {
    render(
      <ThemeProvider theme={theme}>
        <Play size={45} />
      </ThemeProvider>
    )

    expect(screen.getByTestId('player-play-icon')).toHaveAttribute(
      'width',
      '45px'
    )
    expect(screen.getByTestId('player-play-icon')).toHaveAttribute(
      'height',
      '45px'
    )
  })

  it('changes color depending on the color value of the theme', async () => {
    const alternativeTheme = { ...theme }
    alternativeTheme.buttons.playback.colorEnabled = '#ffcc00'

    render(
      <ThemeProvider theme={alternativeTheme}>
        <Play />
      </ThemeProvider>
    )

    expect(screen.getByTestId('player-play-icon')).toHaveAttribute(
      'stroke',
      '#ffcc00'
    )
    expect(screen.getByTestId('player-play-icon')).toHaveAttribute(
      'fill',
      '#ffcc00'
    )
  })
})
