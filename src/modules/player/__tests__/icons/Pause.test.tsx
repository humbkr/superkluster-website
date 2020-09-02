import React from 'react'
import { render, screen } from '@testing-library/react'
import { ThemeProvider } from 'styled-components'
import theme from '../../theme'
import Pause from '../../icons/Pause'

describe('Pause icon', () => {
  it('renders correctly with default props', async () => {
    render(
      <ThemeProvider theme={theme}>
        <Pause />
      </ThemeProvider>
    )

    expect(screen.getByTestId('player-pause-icon')).toBeInTheDocument()
  })

  it('changes size depending on the size prop', async () => {
    render(
      <ThemeProvider theme={theme}>
        <Pause size={45} />
      </ThemeProvider>
    )

    expect(screen.getByTestId('player-pause-icon')).toHaveAttribute(
      'width',
      '45px'
    )
    expect(screen.getByTestId('player-pause-icon')).toHaveAttribute(
      'height',
      '45px'
    )
  })

  it('changes color depending on the color value of the theme', async () => {
    const alternativeTheme = { ...theme }
    alternativeTheme.buttons.playback.colorEnabled = '#ffcc00'

    render(
      <ThemeProvider theme={alternativeTheme}>
        <Pause />
      </ThemeProvider>
    )

    expect(screen.getByTestId('player-pause-icon')).toHaveAttribute(
      'stroke',
      '#ffcc00'
    )
    expect(screen.getByTestId('player-pause-icon')).toHaveAttribute(
      'fill',
      '#ffcc00'
    )
  })
})
