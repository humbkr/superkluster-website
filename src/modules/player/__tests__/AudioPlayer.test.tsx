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

const mockPlaylistLong: PlaylistItem[] = [
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
    url: 'https://whatever.com/track3.mp3',
  },
  {
    title: 'Track 4',
    url: 'https://whatever.com/track3.mp3',
  },
  {
    title: 'Track 5',
    url: 'https://whatever.com/track3.mp3',
  },
  {
    title: 'Track 6',
    url: 'https://whatever.com/track3.mp3',
  },
  {
    title: 'Track 7',
    url: 'https://whatever.com/track3.mp3',
  },
  {
    title: 'Track 8',
    url: 'https://whatever.com/track3.mp3',
  },
]

const mockTogglePlayPause = jest.fn()
const mockLoad = jest.fn()
const mockVolume = jest.fn()

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

jest.mock('react-use-dimensions', () => ({
  __esModule: true,
  default: jest.fn().mockImplementation(() => [null, { width: 600 }, null]),
}))

describe('AudioPlayer', () => {
  beforeEach(() => jest.clearAllMocks())

  describe('Playback', () => {
    afterEach(() => {
      mockRUAP.useAudioPlayer.mockReturnValue(mockUseAudioPlayerDefaultValue)
    })

    it('renders correctly at first render', () => {
      render(
        <ThemeProvider theme={theme}>
          <AudioPlayer playlist={mockPlaylist} />
        </ThemeProvider>
      )

      expect(
        screen.getByTestId('player-play-button-loading')
      ).toBeInTheDocument()
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
        volume: mockVolume,
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
        volume: mockVolume,
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

    it('plays next track if playing one of the tracks of the playlist end', () => {
      mockRUAP.useAudioPlayer.mockReturnValue({
        ready: false,
        playing: true,
        togglePlayPause: mockTogglePlayPause,
        ended: true,
        load: mockLoad,
        volume: mockVolume,
      })

      render(
        <ThemeProvider theme={theme}>
          <AudioPlayer playlist={mockPlaylist} />
        </ThemeProvider>
      )

      expect(screen.getByText(mockPlaylist[1].title)).toBeInTheDocument()
    })

    it('does not play next track if playing one of the tracks of the playlist ends and there is no next track', () => {
      mockRUAP.useAudioPlayer.mockReturnValue({
        ready: false,
        playing: true,
        togglePlayPause: mockTogglePlayPause,
        ended: true,
        load: mockLoad,
        volume: mockVolume,
      })

      render(
        <ThemeProvider theme={theme}>
          <AudioPlayer playlist={[mockPlaylist[0]]} />
        </ThemeProvider>
      )

      expect(screen.getByText(mockPlaylist[0].title)).toBeInTheDocument()
    })
  })

  describe('Repeat', () => {
    it('does not disable prev button if the first track of the playlist is playing but repeat all is active', () => {
      render(
        <ThemeProvider theme={theme}>
          <AudioPlayer playlist={mockPlaylist} />
        </ThemeProvider>
      )

      // Enable repeat all.
      userEvent.click(screen.getByTestId('player-repeat-button-none'))

      expect(screen.getByTestId('player-prev-button')).toBeEnabled()
      expect(screen.getByTestId('player-next-button')).toBeEnabled()
    })

    it('does not disable next button if the last track of the playlist is playing but repeat all is active', () => {
      render(
        <ThemeProvider theme={theme}>
          <AudioPlayer playlist={mockPlaylist} />
        </ThemeProvider>
      )

      // Enable repeat all.
      userEvent.click(screen.getByTestId('player-repeat-button-none'))

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

      expect(
        screen.getByTestId('player-repeat-button-none')
      ).toBeInTheDocument()

      // Enable repeat all.
      userEvent.click(screen.getByTestId('player-repeat-button-none'))
      expect(screen.getByTestId('player-repeat-button-all')).toBeInTheDocument()

      // Enable repeat one.
      userEvent.click(screen.getByTestId('player-repeat-button-all'))
      expect(screen.getByTestId('player-repeat-button-one')).toBeInTheDocument()

      // Disable repeat.
      userEvent.click(screen.getByTestId('player-repeat-button-one'))
      expect(
        screen.getByTestId('player-repeat-button-none')
      ).toBeInTheDocument()
    })

    it('toggles between repeat none and repeat one when repeat button is pressed and there is only 1 track in the playlist', () => {
      render(
        <ThemeProvider theme={theme}>
          <AudioPlayer playlist={[mockPlaylist[0]]} />
        </ThemeProvider>
      )

      expect(
        screen.getByTestId('player-repeat-button-none')
      ).toBeInTheDocument()

      // Enable repeat one.
      userEvent.click(screen.getByTestId('player-repeat-button-none'))
      expect(screen.getByTestId('player-repeat-button-one')).toBeInTheDocument()

      // Disable repeat.
      userEvent.click(screen.getByTestId('player-repeat-button-one'))
      expect(
        screen.getByTestId('player-repeat-button-none')
      ).toBeInTheDocument()
    })

    it('loops to the first track when next button is pressed while the last track is playing and repeat all is active', () => {
      render(
        <ThemeProvider theme={theme}>
          <AudioPlayer playlist={mockPlaylist} />
        </ThemeProvider>
      )

      // Enable repeat all.
      userEvent.click(screen.getByTestId('player-repeat-button-none'))
      expect(screen.getByTestId('player-repeat-button-all')).toBeInTheDocument()

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
      userEvent.click(screen.getByTestId('player-repeat-button-none'))
      expect(screen.getByTestId('player-repeat-button-all')).toBeInTheDocument()

      userEvent.click(screen.getByTestId('player-prev-button'))
      expect(screen.getByText(mockPlaylist[2].title)).toBeInTheDocument()
    })
  })

  describe('shuffle', () => {
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

      userEvent.click(screen.getByTestId('player-shuffle-button-enabled'))

      expect(
        screen.getByTestId('player-shuffle-button-disabled')
      ).toBeInTheDocument()
    })

    it('disables prev button when shuffle is enabled and the first track of the shuffled playlist is playing', () => {
      render(
        <ThemeProvider theme={theme}>
          <AudioPlayer playlist={mockPlaylist} />
        </ThemeProvider>
      )

      // Go to second track.
      userEvent.click(screen.getByTestId('player-next-button'))
      expect(screen.getByText(mockPlaylist[1].title)).toBeInTheDocument()

      // Enable shuffle.
      userEvent.click(screen.getByTestId('player-shuffle-button-disabled'))

      expect(screen.getByTestId('player-prev-button')).toBeDisabled()
    })

    it('enables next button when shuffle is enabled and the last track of the playlist is playing and repeat is off but not all tracks have been played yet', () => {
      render(
        <ThemeProvider theme={theme}>
          <AudioPlayer playlist={mockPlaylist} />
        </ThemeProvider>
      )

      // Go to last track.
      userEvent.click(screen.getByTestId('player-next-button'))
      userEvent.click(screen.getByTestId('player-next-button'))
      expect(screen.getByText(mockPlaylist[2].title)).toBeInTheDocument()

      // Enable shuffle.
      userEvent.click(screen.getByTestId('player-shuffle-button-disabled'))

      expect(screen.getByTestId('player-next-button')).toBeEnabled()
    })

    it('disables next button when shuffle is enabled and the last track of the shuffled playlist is playing and repeat is off', () => {
      render(
        <ThemeProvider theme={theme}>
          <AudioPlayer playlist={mockPlaylist} />
        </ThemeProvider>
      )

      // Enable shuffle first.
      userEvent.click(screen.getByTestId('player-shuffle-button-disabled'))

      // Play all the tracks.
      userEvent.click(screen.getByTestId('player-next-button'))
      userEvent.click(screen.getByTestId('player-next-button'))

      expect(screen.getByTestId('player-next-button')).toBeDisabled()
    })

    it('enables next button when shuffle is enabled and the last track of the shuffled playlist is playing and repeat all is ON', () => {
      render(
        <ThemeProvider theme={theme}>
          <AudioPlayer playlist={mockPlaylist} />
        </ThemeProvider>
      )

      // Enable shuffle first.
      userEvent.click(screen.getByTestId('player-shuffle-button-disabled'))

      // Enable repeat all.
      userEvent.click(screen.getByTestId('player-repeat-button-none'))
      expect(screen.getByTestId('player-repeat-button-all')).toBeInTheDocument()

      // Play all the tracks.
      userEvent.click(screen.getByTestId('player-next-button'))
      userEvent.click(screen.getByTestId('player-next-button'))

      expect(screen.getByTestId('player-next-button')).toBeEnabled()
    })

    it('plays tracks in random when shuffle is enabled', () => {
      render(
        <ThemeProvider theme={theme}>
          <AudioPlayer playlist={mockPlaylistLong} />
        </ThemeProvider>
      )

      const trackHistory = []

      // Enable shuffle when playing the first track.
      userEvent.click(screen.getByTestId('player-shuffle-button-disabled'))

      // Play all the tracks.
      userEvent.click(screen.getByTestId('player-next-button'))
      trackHistory.push(screen.getByTestId('player-track-title').textContent)
      userEvent.click(screen.getByTestId('player-next-button'))
      trackHistory.push(screen.getByTestId('player-track-title').textContent)
      userEvent.click(screen.getByTestId('player-next-button'))
      trackHistory.push(screen.getByTestId('player-track-title').textContent)
      userEvent.click(screen.getByTestId('player-next-button'))
      trackHistory.push(screen.getByTestId('player-track-title').textContent)
      userEvent.click(screen.getByTestId('player-next-button'))
      trackHistory.push(screen.getByTestId('player-track-title').textContent)
      userEvent.click(screen.getByTestId('player-next-button'))
      trackHistory.push(screen.getByTestId('player-track-title').textContent)
      userEvent.click(screen.getByTestId('player-next-button'))
      trackHistory.push(screen.getByTestId('player-track-title').textContent)

      // Note: the probability of this happening is extremely low, but not impossible.
      // Note 2: Track 1 is already in the shuffle list because the current track is added
      // when enabling shuffle.
      expect(trackHistory).not.toBe([
        'Track 2',
        'Track 3',
        'Track 4',
        'Track 5',
        'Track 6',
        'Track 7',
        'Track 8',
      ])
    })

    it('follows the history of shuffled tracks when pressing previous / next buttons', () => {
      render(
        <ThemeProvider theme={theme}>
          <AudioPlayer playlist={mockPlaylistLong} />
        </ThemeProvider>
      )

      const trackHistory = []

      // Enable shuffle when playing the first track.
      userEvent.click(screen.getByTestId('player-shuffle-button-disabled'))

      // Play all the tracks.
      userEvent.click(screen.getByTestId('player-next-button'))
      trackHistory.push(screen.getByTestId('player-track-title').textContent)
      userEvent.click(screen.getByTestId('player-next-button'))
      trackHistory.push(screen.getByTestId('player-track-title').textContent)
      userEvent.click(screen.getByTestId('player-next-button'))
      trackHistory.push(screen.getByTestId('player-track-title').textContent)
      userEvent.click(screen.getByTestId('player-next-button'))
      trackHistory.push(screen.getByTestId('player-track-title').textContent)
      userEvent.click(screen.getByTestId('player-next-button'))
      trackHistory.push(screen.getByTestId('player-track-title').textContent)
      userEvent.click(screen.getByTestId('player-next-button'))
      trackHistory.push(screen.getByTestId('player-track-title').textContent)
      userEvent.click(screen.getByTestId('player-next-button'))
      trackHistory.push(screen.getByTestId('player-track-title').textContent)

      // Press prev button 1 time.
      userEvent.click(screen.getByTestId('player-prev-button'))
      expect(
        screen.getByText(trackHistory[trackHistory.length - 2])
      ).toBeInTheDocument()

      // Press it 3 more times.
      userEvent.click(screen.getByTestId('player-prev-button'))
      userEvent.click(screen.getByTestId('player-prev-button'))
      userEvent.click(screen.getByTestId('player-prev-button'))
      expect(
        screen.getByText(trackHistory[trackHistory.length - 5])
      ).toBeInTheDocument()

      // Press next button 1 times.
      userEvent.click(screen.getByTestId('player-next-button'))
      expect(
        screen.getByText(trackHistory[trackHistory.length - 4])
      ).toBeInTheDocument()
    })

    it('enables next button when shuffle is enabled, all the tracks have been played, but the user is navigating in the shuffle history', () => {
      render(
        <ThemeProvider theme={theme}>
          <AudioPlayer playlist={mockPlaylist} />
        </ThemeProvider>
      )

      // Enable shuffle first.
      userEvent.click(screen.getByTestId('player-shuffle-button-disabled'))

      // Play all the tracks.
      userEvent.click(screen.getByTestId('player-next-button'))
      userEvent.click(screen.getByTestId('player-next-button'))

      expect(screen.getByTestId('player-next-button')).toBeDisabled()

      // Press prev button 1 time.
      userEvent.click(screen.getByTestId('player-prev-button'))

      expect(screen.getByTestId('player-next-button')).toBeEnabled()
    })

    it('disables prev button when shuffle is enabled and the first track of the shuffled playlist is playing after navigating in the shuffle history', () => {
      render(
        <ThemeProvider theme={theme}>
          <AudioPlayer playlist={mockPlaylist} />
        </ThemeProvider>
      )

      // Enable shuffle first.
      userEvent.click(screen.getByTestId('player-shuffle-button-disabled'))

      // Play all the tracks.
      userEvent.click(screen.getByTestId('player-next-button'))
      userEvent.click(screen.getByTestId('player-next-button'))

      // Go back to the first track
      userEvent.click(screen.getByTestId('player-prev-button'))
      userEvent.click(screen.getByTestId('player-prev-button'))

      expect(screen.getByTestId('player-prev-button')).toBeDisabled()
    })

    it('disables prev button when shuffle is enabled and the first track of the shuffled playlist is playing after navigating in the shuffle history, even if repeat all is enabled', () => {
      render(
        <ThemeProvider theme={theme}>
          <AudioPlayer playlist={mockPlaylist} />
        </ThemeProvider>
      )

      // Enable shuffle first.
      userEvent.click(screen.getByTestId('player-shuffle-button-disabled'))

      // Enable repeat all.
      userEvent.click(screen.getByTestId('player-repeat-button-none'))
      expect(screen.getByTestId('player-repeat-button-all')).toBeInTheDocument()

      // Play all the tracks.
      userEvent.click(screen.getByTestId('player-next-button'))
      userEvent.click(screen.getByTestId('player-next-button'))

      // Go back to the first track
      userEvent.click(screen.getByTestId('player-prev-button'))
      userEvent.click(screen.getByTestId('player-prev-button'))

      expect(screen.getByTestId('player-prev-button')).toBeDisabled()
    })

    it('plays a new random track when shuffle is on, all the tracks have been played, and repeat all is on,', () => {
      render(
        <ThemeProvider theme={theme}>
          <AudioPlayer playlist={mockPlaylistLong} />
        </ThemeProvider>
      )

      const trackHistory = []

      // Enable shuffle first.
      userEvent.click(screen.getByTestId('player-shuffle-button-disabled'))

      // Enable repeat all.
      userEvent.click(screen.getByTestId('player-repeat-button-none'))
      expect(screen.getByTestId('player-repeat-button-all')).toBeInTheDocument()

      // Play all the tracks.
      userEvent.click(screen.getByTestId('player-next-button'))
      trackHistory.push(screen.getByTestId('player-track-title').textContent)
      userEvent.click(screen.getByTestId('player-next-button'))
      trackHistory.push(screen.getByTestId('player-track-title').textContent)
      userEvent.click(screen.getByTestId('player-next-button'))
      trackHistory.push(screen.getByTestId('player-track-title').textContent)
      userEvent.click(screen.getByTestId('player-next-button'))
      trackHistory.push(screen.getByTestId('player-track-title').textContent)
      userEvent.click(screen.getByTestId('player-next-button'))
      trackHistory.push(screen.getByTestId('player-track-title').textContent)
      userEvent.click(screen.getByTestId('player-next-button'))
      trackHistory.push(screen.getByTestId('player-track-title').textContent)
      userEvent.click(screen.getByTestId('player-next-button'))
      trackHistory.push(screen.getByTestId('player-track-title').textContent)

      // Press next button again.
      userEvent.click(screen.getByTestId('player-next-button'))

      // Cannot really test without tests failing randomly.
    })
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
})
