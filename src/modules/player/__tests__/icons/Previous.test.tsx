import React from 'react'
import { render, screen } from '@testing-library/react'
import { ThemeProvider } from 'styled-components'
import theme from '../../theme'
import Previous from '../../icons/Previous'

describe('Previous icon', () => {
  it('renders correctly with default props', async () => {
    render(
      <ThemeProvider theme={theme}>
        <Previous />
      </ThemeProvider>
    )

    expect(screen.getByTestId('player-previous-icon')).toBeInTheDocument()
  })

  it('changes size depending on the size prop', async () => {
    render(
      <ThemeProvider theme={theme}>
        <Previous size={45} />
      </ThemeProvider>
    )

    expect(screen.getByTestId('player-previous-icon')).toHaveAttribute(
      'width',
      '45px'
    )
    expect(screen.getByTestId('player-previous-icon')).toHaveAttribute(
      'height',
      '45px'
    )
  })

  it('changes color depending on the enabled prop', async () => {
    const { rerender } = render(
      <ThemeProvider theme={theme}>
        <Previous enabled />
      </ThemeProvider>
    )

    // Store enabled state color value.
    const colorEnabledStroke = screen
      .getByTestId('player-previous-icon')
      .getAttribute('stroke')
    const colorEnabledFill = screen
      .getByTestId('player-previous-icon')
      .getAttribute('fill')

    rerender(
      <ThemeProvider theme={theme}>
        <Previous enabled={false} />
      </ThemeProvider>
    )

    expect(
      screen.getByTestId('player-previous-icon').getAttribute('stroke')
    ).not.toBe(colorEnabledStroke)
    expect(
      screen.getByTestId('player-previous-icon').getAttribute('fill')
    ).not.toBe(colorEnabledFill)
  })

  it('changes enabled state color depending on the color value of the theme', async () => {
    const alternativeTheme = { ...theme }
    alternativeTheme.buttons.playback.colorEnabled = '#ffcc00'

    render(
      <ThemeProvider theme={alternativeTheme}>
        <Previous enabled />
      </ThemeProvider>
    )

    expect(screen.getByTestId('player-previous-icon')).toHaveAttribute(
      'stroke',
      '#ffcc00'
    )
    expect(screen.getByTestId('player-previous-icon')).toHaveAttribute(
      'fill',
      '#ffcc00'
    )
  })

  it('changes disabled state color depending on the color value of the theme', async () => {
    const alternativeTheme = { ...theme }
    alternativeTheme.buttons.playback.colorDisabled = '#ff0000'

    render(
      <ThemeProvider theme={alternativeTheme}>
        <Previous enabled={false} />
      </ThemeProvider>
    )

    expect(screen.getByTestId('player-previous-icon')).toHaveAttribute(
      'stroke',
      '#ff0000'
    )
    expect(screen.getByTestId('player-previous-icon')).toHaveAttribute(
      'fill',
      '#ff0000'
    )
  })
})
