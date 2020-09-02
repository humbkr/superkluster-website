import React from 'react'
import { ThemeProvider } from 'styled-components'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import useDimensions from 'react-use-dimensions'
import * as mockRUAP from 'react-use-audio-player'
import theme from '../theme'
import { PlaylistItem } from '../types'
import AudioPlayer, { widthTimeFormatSwitch } from '../AudioPlayer'

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

const mockTogglePlayPause = jest.fn()
const mockLoad = jest.fn()

jest.mock('react-use-audio-player', () => ({
  useAudioPosition: jest.fn().mockImplementation(() => ({
    position: 45,
    duration: 100,
    seek: jest.fn(),
  })),
  useAudioPlayer: jest.fn().mockImplementation(() => ({
    ready: false,
    playing: false,
    togglePlayPause: mockTogglePlayPause,
    ended: false,
    load: mockLoad,
  })),
}))

jest.mock('react-use-dimensions', () => ({
  __esModule: true,
  default: jest.fn().mockImplementation(() => [null, { width: 600 }, null]),
}))

describe('AudioPlayer', () => {
  beforeEach(() => jest.clearAllMocks())

  it('renders correctly at first render', () => {
    render(
      <ThemeProvider theme={theme}>
        <AudioPlayer playlist={mockPlaylist} />
      </ThemeProvider>
    )

    expect(screen.getByTestId('player-play-button-loading')).toBeInTheDocument()
    expect(screen.queryByTestId('player-play-button')).not.toBeInTheDocument()
    expect(screen.getByTestId('player-prev-button')).toBeInTheDocument()
    expect(screen.getByTestId('player-next-button')).toBeInTheDocument()
    expect(screen.getByText(mockPlaylist[0].title)).toBeInTheDocument()
  })

  it('displays a Play button when player is ready and not already playing', () => {
    mockRUAP.useAudioPlayer.mockReturnValue({
      ready: true,
      playing: false,
      togglePlayPause: mockTogglePlayPause,
      ended: false,
      load: mockLoad,
    })

    render(
      <ThemeProvider theme={theme}>
        <AudioPlayer playlist={mockPlaylist} />
      </ThemeProvider>
    )

    expect(
      screen.queryByTestId('player-play-button-loading')
    ).not.toBeInTheDocument()
    expect(screen.getByTestId('player-play-button')).toBeInTheDocument()
    expect(screen.getByTestId('player-play-button')).toBeEnabled()
    expect(screen.getByTestId('player-play-icon')).toBeInTheDocument()
    expect(screen.queryByTestId('player-pause-icon')).not.toBeInTheDocument()
    expect(screen.getByText(mockPlaylist[0].title)).toBeInTheDocument()
  })

  it('displays a Pause button when player is ready and already playing', () => {
    mockRUAP.useAudioPlayer.mockReturnValue({
      ready: true,
      playing: true,
      togglePlayPause: mockTogglePlayPause,
      ended: false,
      load: mockLoad,
    })

    render(
      <ThemeProvider theme={theme}>
        <AudioPlayer playlist={mockPlaylist} />
      </ThemeProvider>
    )

    expect(
      screen.queryByTestId('player-play-button-loading')
    ).not.toBeInTheDocument()
    expect(screen.getByTestId('player-play-button')).toBeInTheDocument()
    expect(screen.getByTestId('player-play-button')).toBeEnabled()
    expect(screen.getByTestId('player-pause-icon')).toBeInTheDocument()
    expect(screen.queryByTestId('player-play-icon')).not.toBeInTheDocument()
    expect(screen.getByText(mockPlaylist[0].title)).toBeInTheDocument()
  })

  it('switches to next track when next button is pressed', () => {
    render(
      <ThemeProvider theme={theme}>
        <AudioPlayer playlist={mockPlaylist} />
      </ThemeProvider>
    )

    expect(screen.getByText(mockPlaylist[0].title)).toBeInTheDocument()

    userEvent.click(screen.getByTestId('player-next-button'))
    expect(screen.getByText(mockPlaylist[1].title)).toBeInTheDocument()

    userEvent.click(screen.getByTestId('player-next-button'))
    expect(screen.getByText(mockPlaylist[2].title)).toBeInTheDocument()
  })

  it('switches to previous track when prev button is pressed', () => {
    render(
      <ThemeProvider theme={theme}>
        <AudioPlayer playlist={mockPlaylist} />
      </ThemeProvider>
    )

    // Go to last track.
    userEvent.click(screen.getByTestId('player-next-button'))
    userEvent.click(screen.getByTestId('player-next-button'))
    expect(screen.getByText(mockPlaylist[2].title)).toBeInTheDocument()

    userEvent.click(screen.getByTestId('player-prev-button'))
    expect(screen.getByText(mockPlaylist[1].title)).toBeInTheDocument()

    userEvent.click(screen.getByTestId('player-prev-button'))
    expect(screen.getByText(mockPlaylist[0].title)).toBeInTheDocument()
  })

  it('toggles between an enabled / disabled state for the shuffle button when the shuffle button is pressed', () => {
    render(
      <ThemeProvider theme={theme}>
        <AudioPlayer playlist={mockPlaylist} />
      </ThemeProvider>
    )

    expect(
      screen.getByTestId('player-shuffle-button-disabled')
    ).toBeInTheDocument()

    userEvent.click(screen.getByTestId('player-shuffle-button-disabled'))

    expect(
      screen.getByTestId('player-shuffle-button-enabled')
    ).toBeInTheDocument()
  })

  it('does not display prev / next button if there is only one track in the playlist', () => {
    render(
      <ThemeProvider theme={theme}>
        <AudioPlayer playlist={[mockPlaylist[0]]} />
      </ThemeProvider>
    )

    expect(screen.queryByTestId('player-prev-button')).not.toBeInTheDocument()
    expect(screen.queryByTestId('player-next-button')).not.toBeInTheDocument()
  })

  it('disables prev button if the first track of the playlist is playing and repeat all is not active', () => {
    render(
      <ThemeProvider theme={theme}>
        <AudioPlayer playlist={mockPlaylist} />
      </ThemeProvider>
    )

    expect(screen.getByTestId('player-prev-button')).toBeDisabled()
    expect(screen.getByTestId('player-next-button')).toBeEnabled()
  })

  it('does not disable prev button if the first track of the playlist is playing but repeat all is active', () => {
    render(
      <ThemeProvider theme={theme}>
        <AudioPlayer playlist={mockPlaylist} />
      </ThemeProvider>
    )

    // Enable repeat all.
    userEvent.click(screen.getByTestId('player-repeat-button'))

    expect(screen.getByTestId('player-prev-button')).toBeEnabled()
    expect(screen.getByTestId('player-next-button')).toBeEnabled()
  })

  it('disables next button if the last track of the playlist is playing and repeat all is not active', () => {
    render(
      <ThemeProvider theme={theme}>
        <AudioPlayer playlist={mockPlaylist} />
      </ThemeProvider>
    )

    // Go to last track.
    userEvent.click(screen.getByTestId('player-next-button'))
    userEvent.click(screen.getByTestId('player-next-button'))

    expect(screen.getByTestId('player-next-button')).toBeDisabled()
    expect(screen.getByTestId('player-prev-button')).toBeEnabled()
  })

  it('does not disable next button if the last track of the playlist is playing but repeat all is active', () => {
    render(
      <ThemeProvider theme={theme}>
        <AudioPlayer playlist={mockPlaylist} />
      </ThemeProvider>
    )

    // Enable repeat all.
    userEvent.click(screen.getByTestId('player-repeat-button'))

    // Go to last track.
    userEvent.click(screen.getByTestId('player-next-button'))
    userEvent.click(screen.getByTestId('player-next-button'))

    expect(screen.getByTestId('player-prev-button')).toBeEnabled()
    expect(screen.getByTestId('player-next-button')).toBeEnabled()
  })

  it('loops between repeat none, repeat all, repeat one when repeat button is pressed and there are at least 2 tracks in the playlist', () => {
    render(
      <ThemeProvider theme={theme}>
        <AudioPlayer playlist={mockPlaylist} />
      </ThemeProvider>
    )

    expect(screen.getByTestId('player-repeat-none')).toBeInTheDocument()

    // Enable repeat all.
    userEvent.click(screen.getByTestId('player-repeat-button'))
    expect(screen.getByTestId('player-repeat-all')).toBeInTheDocument()

    // Enable repeat one.
    userEvent.click(screen.getByTestId('player-repeat-button'))
    expect(screen.getByTestId('player-repeat-one')).toBeInTheDocument()

    // Disable repeat.
    userEvent.click(screen.getByTestId('player-repeat-button'))
    expect(screen.getByTestId('player-repeat-none')).toBeInTheDocument()
  })

  it('toggles between repeat none and repeat one when repeat button is pressed and there are at least 2 tracks in the playlist', () => {
    render(
      <ThemeProvider theme={theme}>
        <AudioPlayer playlist={[mockPlaylist[0]]} />
      </ThemeProvider>
    )

    expect(screen.getByTestId('player-repeat-none')).toBeInTheDocument()

    // Enable repeat one.
    userEvent.click(screen.getByTestId('player-repeat-button'))
    expect(screen.getByTestId('player-repeat-one')).toBeInTheDocument()

    // Disable repeat.
    userEvent.click(screen.getByTestId('player-repeat-button'))
    expect(screen.getByTestId('player-repeat-none')).toBeInTheDocument()
  })

  it('loops to the first track when next button is pressed while the last track is playing and repeat all is active', () => {
    render(
      <ThemeProvider theme={theme}>
        <AudioPlayer playlist={mockPlaylist} />
      </ThemeProvider>
    )

    // Enable repeat all.
    userEvent.click(screen.getByTestId('player-repeat-button'))
    expect(screen.getByTestId('player-repeat-all')).toBeInTheDocument()

    // Go to last track.
    userEvent.click(screen.getByTestId('player-next-button'))
    userEvent.click(screen.getByTestId('player-next-button'))
    expect(screen.getByText(mockPlaylist[2].title)).toBeInTheDocument()

    // Actual test.
    userEvent.click(screen.getByTestId('player-next-button'))
    expect(screen.getByText(mockPlaylist[0].title)).toBeInTheDocument()
  })

  it('loops to the last track when prev button is pressed while the first track is playing and repeat all is active', () => {
    render(
      <ThemeProvider theme={theme}>
        <AudioPlayer playlist={mockPlaylist} />
      </ThemeProvider>
    )

    // Enable repeat all.
    userEvent.click(screen.getByTestId('player-repeat-button'))
    expect(screen.getByTestId('player-repeat-all')).toBeInTheDocument()

    userEvent.click(screen.getByTestId('player-prev-button'))
    expect(screen.getByText(mockPlaylist[2].title)).toBeInTheDocument()
  })

  it('displays remaining time instead of elapsed / total when player width is under a certain threshold', () => {
    const { rerender } = render(
      <ThemeProvider theme={theme}>
        <AudioPlayer playlist={mockPlaylist} />
      </ThemeProvider>
    )

    expect(screen.getByText('00:45 / 01:40')).toBeInTheDocument()

    useDimensions.mockReturnValueOnce([
      null,
      { width: widthTimeFormatSwitch },
      null,
    ])

    rerender(
      <ThemeProvider theme={theme}>
        <AudioPlayer playlist={mockPlaylist} />
      </ThemeProvider>
    )

    expect(screen.getByText('-00:55')).toBeInTheDocument()
  })

  it('plays next track if playing one of the tracks of the playlist end', () => {
    mockRUAP.useAudioPlayer.mockReturnValue({
      ready: false,
      playing: true,
      togglePlayPause: mockTogglePlayPause,
      ended: true,
      load: mockLoad,
    })

    render(
      <ThemeProvider theme={theme}>
        <AudioPlayer playlist={mockPlaylist} />
      </ThemeProvider>
    )

    expect(screen.getByText(mockPlaylist[1].title)).toBeInTheDocument()
  })

  it('does not play next track if playing one of the tracks of the playlist end and there is no next track', () => {
    mockRUAP.useAudioPlayer.mockReturnValue({
      ready: false,
      playing: true,
      togglePlayPause: mockTogglePlayPause,
      ended: true,
      load: mockLoad,
    })

    render(
      <ThemeProvider theme={theme}>
        <AudioPlayer playlist={[mockPlaylist[0]]} />
      </ThemeProvider>
    )

    expect(screen.getByText(mockPlaylist[0].title)).toBeInTheDocument()
  })
})
