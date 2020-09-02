import React from 'react'
import { render, screen } from '@testing-library/react'
import { ThemeProvider } from 'styled-components'
import theme from '../../theme'
import Shuffle from '../../icons/Shuffle'

describe('Shuffle icon', () => {
  it('renders correctly with default props', async () => {
    render(
      <ThemeProvider theme={theme}>
        <Shuffle />
      </ThemeProvider>
    )

    expect(screen.getByTestId('player-shuffle-icon')).toBeInTheDocument()
  })

  it('changes size depending on the size prop', async () => {
    render(
      <ThemeProvider theme={theme}>
        <Shuffle size={45} />
      </ThemeProvider>
    )

    expect(screen.getByTestId('player-shuffle-icon')).toHaveAttribute(
      'width',
      '45px'
    )
    expect(screen.getByTestId('player-shuffle-icon')).toHaveAttribute(
      'height',
      '45px'
    )
  })

  it('changes color depending on the active prop', async () => {
    const { rerender } = render(
      <ThemeProvider theme={theme}>
        <Shuffle active />
      </ThemeProvider>
    )

    // Store enabled state color value.
    const colorEnabledStroke = screen
      .getByTestId('player-shuffle-icon')
      .getAttribute('stroke')

    rerender(
      <ThemeProvider theme={theme}>
        <Shuffle active={false} />
      </ThemeProvider>
    )

    expect(
      screen.getByTestId('player-shuffle-icon').getAttribute('stroke')
    ).not.toBe(colorEnabledStroke)
  })

  it('changes active state color depending on the color value of the theme', async () => {
    const alternativeTheme = { ...theme }
    alternativeTheme.buttons.options.colorEnabled = '#ffcc00'

    render(
      <ThemeProvider theme={alternativeTheme}>
        <Shuffle active />
      </ThemeProvider>
    )

    expect(screen.getByTestId('player-shuffle-icon')).toHaveAttribute(
      'stroke',
      '#ffcc00'
    )
  })

  it('changes non-active state color depending on the color value of the theme', async () => {
    const alternativeTheme = { ...theme }
    alternativeTheme.buttons.options.colorDisabled = '#ff0000'

    render(
      <ThemeProvider theme={alternativeTheme}>
        <Shuffle active={false} />
      </ThemeProvider>
    )

    expect(screen.getByTestId('player-shuffle-icon')).toHaveAttribute(
      'stroke',
      '#ff0000'
    )
  })
})
