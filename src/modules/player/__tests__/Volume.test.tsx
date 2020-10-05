import React from 'react'
import { ThemeProvider } from 'styled-components'
import { render, screen, fireEvent } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import * as mockRUAP from 'react-use-audio-player'
import theme from '../theme'
import Volume from '../Volume'

const mockVolume = jest.fn()
jest.mock('react-use-audio-player', () => ({
  useAudioPlayer: jest.fn().mockImplementation(() => ({ volume: mockVolume })),
}))

describe('Volume', () => {
  beforeEach(() => jest.clearAllMocks())

  afterEach(() => {
    mockRUAP.useAudioPlayer.mockReturnValue({
      volume: mockVolume.mockReturnValue(1),
    })
  })

  it('renders correctly at first render', () => {
    render(
      <ThemeProvider theme={theme}>
        <Volume />
      </ThemeProvider>
    )

    expect(
      screen.getByTestId('volume-main-button-VolumeHigh')
    ).toBeInTheDocument()
    expect(screen.getByTestId('volume-full-controls')).toHaveStyleRule(
      'display',
      'none'
    )
    expect(
      screen.getByTestId('volume-mute-button-VolumeLow')
    ).toBeInTheDocument()
  })

  it('displays full volume controls when mouse enters the main button', () => {
    render(
      <ThemeProvider theme={theme}>
        <Volume />
      </ThemeProvider>
    )

    fireEvent.mouseEnter(screen.getByTestId('volume-main-button-VolumeHigh'))
    expect(screen.getByTestId('volume-full-controls')).not.toHaveStyleRule(
      'display',
      'none'
    )

    fireEvent.mouseLeave(screen.getByTestId('volume-main-button-VolumeHigh'))
    expect(screen.getByTestId('volume-full-controls')).toHaveStyleRule(
      'display',
      'none'
    )
  })

  it('displays a mute icon if volume is muted', () => {
    mockRUAP.useAudioPlayer.mockReturnValue({
      volume: mockVolume.mockReturnValue(0),
    })

    render(
      <ThemeProvider theme={theme}>
        <Volume />
      </ThemeProvider>
    )

    expect(screen.getByTestId('volume-main-button-Mute')).toBeInTheDocument()
    expect(screen.getByTestId('volume-mute-button-Mute')).toBeInTheDocument()
  })

  it('displays a low volume icon if volume is low', () => {
    mockRUAP.useAudioPlayer.mockReturnValue({
      volume: mockVolume.mockReturnValue(0.49),
    })

    render(
      <ThemeProvider theme={theme}>
        <Volume />
      </ThemeProvider>
    )

    expect(
      screen.getByTestId('volume-main-button-VolumeLow')
    ).toBeInTheDocument()
  })

  it('toggles between current volume and mute when pressing the mute button', () => {
    mockRUAP.useAudioPlayer.mockReturnValue({
      volume: mockVolume.mockReturnValue(0.7),
    })

    const { rerender } = render(
      <ThemeProvider theme={theme}>
        <Volume />
      </ThemeProvider>
    )

    fireEvent.mouseEnter(screen.getByTestId('volume-main-button-VolumeHigh'))

    userEvent.click(screen.getByTestId('volume-mute-button-VolumeLow'))
    expect(mockVolume).toHaveBeenCalledWith(0)

    mockRUAP.useAudioPlayer.mockReturnValue({
      volume: mockVolume.mockReturnValue(0),
    })

    rerender(
      <ThemeProvider theme={theme}>
        <Volume />
      </ThemeProvider>
    )

    fireEvent.mouseEnter(screen.getByTestId('volume-main-button-VolumeHigh'))
    userEvent.click(screen.getByTestId('volume-mute-button-Mute'))
    expect(mockVolume).toHaveBeenCalledWith(0.7)
  })

  it('sets new volume when clicking on the slider track', () => {
    render(
      <ThemeProvider theme={theme}>
        <Volume />
      </ThemeProvider>
    )

    fireEvent.mouseEnter(screen.getByTestId('volume-main-button-VolumeHigh'))
    const tracks = screen.getAllByTestId('volume-slider-track')
    userEvent.click(tracks[0])
    expect(mockVolume).toHaveBeenCalled()
  })
})
