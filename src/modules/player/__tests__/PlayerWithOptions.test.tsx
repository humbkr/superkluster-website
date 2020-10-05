import React from 'react'
import { ThemeProvider } from 'styled-components'
import { render, screen } from '@testing-library/react'
import theme from '../theme'
import { PlaylistItem } from '../types'
import Player from '../PlayerWithOptions'

const mockTogglePlayPause = jest.fn()
const mockLoad = jest.fn()
const mockVolume = jest.fn()

const mockPlaylist: PlaylistItem[] = [
  {
    title: 'Track 1',
    url: 'https://whatever.com/track1.mp3',
  },
  {
    title: 'Track 2',
    url: 'https://whatever.com/track2.mp3',
  },
  {
    title: 'Track 3',
    url: 'https://whatever.com/track3',
    format: 'mp3',
  },
]

const mockUseAudioPlayerDefaultValue = {
  ready: false,
  playing: false,
  togglePlayPause: mockTogglePlayPause,
  ended: false,
  load: mockLoad,
  volume: mockVolume,
}

jest.mock('react-use-audio-player', () => ({
  useAudioPosition: jest.fn().mockImplementation(() => ({
    position: 45,
    duration: 100,
    seek: jest.fn(),
  })),
  useAudioPlayer: jest
    .fn()
    .mockImplementation(() => mockUseAudioPlayerDefaultValue),
}))

describe('Player options (index)', () => {
  it('renders correctly at first render', () => {
    render(
      <ThemeProvider theme={theme}>
        <Player playlist={mockPlaylist} />
      </ThemeProvider>
    )

    expect(screen.getByTestId('player-repeat-button-none')).toBeInTheDocument()
    expect(
      screen.getByTestId('player-shuffle-button-disabled')
    ).toBeInTheDocument()
    expect(
      screen.getByTestId('volume-main-button-VolumeHigh')
    ).toBeInTheDocument()
  })

  it('does not display a repeat button if canRepeat is false', () => {
    render(
      <ThemeProvider theme={theme}>
        <Player playlist={mockPlaylist} canRepeat={false} />
      </ThemeProvider>
    )

    expect(
      screen.queryByTestId('player-repeat-button-none')
    ).not.toBeInTheDocument()
    expect(
      screen.getByTestId('player-shuffle-button-disabled')
    ).toBeInTheDocument()
    expect(
      screen.getByTestId('volume-main-button-VolumeHigh')
    ).toBeInTheDocument()
  })

  it('does not display a shuffle button if canShuffle is false', () => {
    render(
      <ThemeProvider theme={theme}>
        <Player playlist={mockPlaylist} canShuffle={false} />
      </ThemeProvider>
    )

    expect(screen.getByTestId('player-repeat-button-none')).toBeInTheDocument()
    expect(
      screen.queryByTestId('player-shuffle-button-disabled')
    ).not.toBeInTheDocument()
    expect(
      screen.getByTestId('volume-main-button-VolumeHigh')
    ).toBeInTheDocument()
  })

  it('does not display a volume bar if canChangeVolume is false', () => {
    render(
      <ThemeProvider theme={theme}>
        <Player playlist={mockPlaylist} canChangeVolume={false} />
      </ThemeProvider>
    )

    expect(screen.getByTestId('player-repeat-button-none')).toBeInTheDocument()
    expect(
      screen.getByTestId('player-shuffle-button-disabled')
    ).toBeInTheDocument()
    expect(
      screen.queryByTestId('volume-main-button-VolumeHigh')
    ).not.toBeInTheDocument()
  })
})
