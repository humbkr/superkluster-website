import React from 'react'
import { render, screen } from '@testing-library/react'
import { ThemeProvider } from 'styled-components'
import theme from '../../theme'
import Loader from '../../icons/Loader'

describe('Loader icon', () => {
  it('renders correctly with default props', async () => {
    render(
      <ThemeProvider theme={theme}>
        <Loader />
      </ThemeProvider>
    )

    expect(screen.getByTestId('player-loader-icon')).toBeInTheDocument()
  })

  it('changes size depending on the size prop', async () => {
    render(
      <ThemeProvider theme={theme}>
        <Loader size={45} />
      </ThemeProvider>
    )

    expect(screen.getByTestId('player-loader-icon')).toHaveAttribute(
      'width',
      '45px'
    )
    expect(screen.getByTestId('player-loader-icon')).toHaveAttribute(
      'height',
      '45px'
    )
  })

  it('changes color depending on the color value of the theme', async () => {
    const alternativeTheme = { ...theme }
    alternativeTheme.buttons.playback.colorEnabled = '#ffcc00'

    render(
      <ThemeProvider theme={alternativeTheme}>
        <Loader />
      </ThemeProvider>
    )

    const element = screen.getByTestId('player-loader-icon')
    expect(element.firstChild).toHaveAttribute('stroke', '#ffcc00')
  })
})
