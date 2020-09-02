import React from 'react'
import { render, screen } from '@testing-library/react'
import { ThemeProvider } from 'styled-components'
import theme from '../../theme'
import Repeat from '../../icons/Repeat'

describe('Repeat icon', () => {
  it('renders correctly with default props', async () => {
    render(
      <ThemeProvider theme={theme}>
        <Repeat />
      </ThemeProvider>
    )

    expect(screen.getByTestId('player-repeat-icon')).toBeInTheDocument()
    expect(
      screen.queryByTestId('player-repeat-icon-one')
    ).not.toBeInTheDocument()
  })

  it('displays an indicator when repeatOne props is true', async () => {
    render(
      <ThemeProvider theme={theme}>
        <Repeat repeatOne />
      </ThemeProvider>
    )

    expect(screen.getByTestId('player-repeat-icon-one')).toBeInTheDocument()
  })

  it('changes size depending on the size prop', async () => {
    render(
      <ThemeProvider theme={theme}>
        <Repeat size={45} />
      </ThemeProvider>
    )

    expect(screen.getByTestId('player-repeat-icon')).toHaveAttribute(
      'width',
      '45px'
    )
    expect(screen.getByTestId('player-repeat-icon')).toHaveAttribute(
      'height',
      '45px'
    )
  })

  it('changes color depending on the active prop', async () => {
    const { rerender } = render(
      <ThemeProvider theme={theme}>
        <Repeat active />
      </ThemeProvider>
    )

    // Store enabled state color value.
    const colorEnabledStroke = screen
      .getByTestId('player-repeat-icon')
      .getAttribute('stroke')

    rerender(
      <ThemeProvider theme={theme}>
        <Repeat active={false} />
      </ThemeProvider>
    )

    expect(
      screen.getByTestId('player-repeat-icon').getAttribute('stroke')
    ).not.toBe(colorEnabledStroke)
  })

  it('changes active state color depending on the color value of the theme', async () => {
    const alternativeTheme = { ...theme }
    alternativeTheme.buttons.options.colorEnabled = '#ffcc00'

    render(
      <ThemeProvider theme={alternativeTheme}>
        <Repeat active />
      </ThemeProvider>
    )

    expect(screen.getByTestId('player-repeat-icon')).toHaveAttribute(
      'stroke',
      '#ffcc00'
    )
  })

  it('changes non-active state color depending on the color value of the theme', async () => {
    const alternativeTheme = { ...theme }
    alternativeTheme.buttons.options.colorDisabled = '#ff0000'

    render(
      <ThemeProvider theme={alternativeTheme}>
        <Repeat active={false} />
      </ThemeProvider>
    )

    expect(screen.getByTestId('player-repeat-icon')).toHaveAttribute(
      'stroke',
      '#ff0000'
    )
  })
})
