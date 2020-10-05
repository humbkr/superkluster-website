import React from 'react'
import { ThemeProvider } from 'styled-components'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import PlaybackOptionsControls from '../PlaybackOptionsControls'
import theme from '../theme'
import { RepeatState } from '../types'

jest.mock('react-use-audio-player', () => ({
  useAudioPosition: jest.fn(),
}))

const mockOnRepeat = jest.fn()
const mockOnShuffle = jest.fn()

describe('PlaybackOptionsControls', () => {
  beforeEach(() => jest.clearAllMocks())

  it('renders correctly', () => {
    render(
      <ThemeProvider theme={theme}>
        <PlaybackOptionsControls
          repeatState={RepeatState.norepeat}
          onRepeat={mockOnRepeat}
          shuffleState={false}
          onShuffle={mockOnShuffle}
          displayShuffle
        />
      </ThemeProvider>
    )

    expect(screen.getByTestId('player-repeat-button-none')).toBeInTheDocument()
    expect(
      screen.getByTestId('player-shuffle-button-disabled')
    ).toBeInTheDocument()
  })

  it('displays no shuffle button if displayShuffle prop is false', () => {
    render(
      <ThemeProvider theme={theme}>
        <PlaybackOptionsControls
          repeatState={RepeatState.norepeat}
          onRepeat={mockOnRepeat}
          shuffleState={false}
          onShuffle={mockOnShuffle}
          displayShuffle={false}
        />
      </ThemeProvider>
    )

    expect(screen.getByTestId('player-repeat-button-none')).toBeInTheDocument()
    expect(
      screen.queryByTestId('player-shuffle-button-enabled')
    ).not.toBeInTheDocument()
    expect(
      screen.queryByTestId('player-shuffle-button-disabled')
    ).not.toBeInTheDocument()
  })

  it('calls onRepeat user function when repeat button is pressed', () => {
    render(
      <ThemeProvider theme={theme}>
        <PlaybackOptionsControls
          repeatState={RepeatState.norepeat}
          onRepeat={mockOnRepeat}
          shuffleState={false}
          onShuffle={mockOnShuffle}
          displayShuffle
        />
      </ThemeProvider>
    )

    userEvent.click(screen.getByTestId('player-repeat-button-none'))
    expect(mockOnRepeat).toHaveBeenCalledTimes(1)
  })

  it('calls onShuffle user function when shuffle button is pressed', () => {
    render(
      <ThemeProvider theme={theme}>
        <PlaybackOptionsControls
          repeatState={RepeatState.norepeat}
          onRepeat={mockOnRepeat}
          shuffleState={false}
          onShuffle={mockOnShuffle}
          displayShuffle
        />
      </ThemeProvider>
    )

    userEvent.click(screen.getByTestId('player-shuffle-button-disabled'))
    expect(mockOnShuffle).toHaveBeenCalledTimes(1)
  })
})
