import React from 'react'
import { render, screen } from '@testing-library/react'
import { ThemeProvider } from 'styled-components'
import theme from '../../theme'
import VolumeHigh from '../../icons/VolumeHigh'

describe('VolumeHigh icon', () => {
  it('renders correctly with default props', async () => {
    render(
      <ThemeProvider theme={theme}>
        <VolumeHigh />
      </ThemeProvider>
    )

    expect(screen.getByTestId('player-volume-high-icon')).toBeInTheDocument()
  })

  it('changes size depending on the size prop', async () => {
    render(
      <ThemeProvider theme={theme}>
        <VolumeHigh size={45} />
      </ThemeProvider>
    )

    expect(screen.getByTestId('player-volume-high-icon')).toHaveAttribute(
      'width',
      '45px'
    )
    expect(screen.getByTestId('player-volume-high-icon')).toHaveAttribute(
      'height',
      '45px'
    )
  })

  it('changes color depending on the color value of the theme', async () => {
    const alternativeTheme = { ...theme }
    alternativeTheme.buttons.playback.colorEnabled = '#ffcc00'

    render(
      <ThemeProvider theme={alternativeTheme}>
        <VolumeHigh />
      </ThemeProvider>
    )

    const element = screen.getByTestId('player-volume-high-icon')
    expect(element).toHaveAttribute('stroke', '#ffcc00')
    expect(element.firstChild).toHaveAttribute('fill', '#ffcc00')
  })
})
