import React from 'react'
import { ThemeProvider } from 'styled-components'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import PlaylistNavControls from '../PlaylistNavControls'
import theme from '../theme'

jest.mock('react-use-audio-player', () => ({
  useAudioPosition: jest.fn(),
}))

const mockOnPrev = jest.fn()
const mockOnNext = jest.fn()

describe('PlaylistNavControls', () => {
  beforeEach(() => jest.clearAllMocks())

  it('renders correctly', () => {
    render(
      <ThemeProvider theme={theme}>
        <PlaylistNavControls
          disablePrev={false}
          disableNext={false}
          onPrev={mockOnPrev}
          onNext={mockOnNext}
        />
      </ThemeProvider>
    )

    expect(screen.getByTestId('player-prev-button')).toBeInTheDocument()
    expect(screen.getByTestId('player-next-button')).toBeInTheDocument()
  })

  it('disables previous button when disablePrev prop is true', () => {
    render(
      <ThemeProvider theme={theme}>
        <PlaylistNavControls
          disablePrev
          disableNext={false}
          onPrev={mockOnPrev}
          onNext={mockOnNext}
        />
      </ThemeProvider>
    )

    expect(screen.getByTestId('player-prev-button')).toBeDisabled()
    expect(screen.getByTestId('player-next-button')).toBeEnabled()
  })
  it('disables next button when disableNext prop is true', () => {
    render(
      <ThemeProvider theme={theme}>
        <PlaylistNavControls
          disablePrev={false}
          disableNext
          onPrev={mockOnPrev}
          onNext={mockOnNext}
        />
      </ThemeProvider>
    )

    expect(screen.getByTestId('player-prev-button')).toBeEnabled()
    expect(screen.getByTestId('player-next-button')).toBeDisabled()
  })

  it('calls onPrev user function when previous button is pressed', () => {
    render(
      <ThemeProvider theme={theme}>
        <PlaylistNavControls
          disablePrev={false}
          disableNext={false}
          onPrev={mockOnPrev}
          onNext={mockOnNext}
        />
      </ThemeProvider>
    )

    userEvent.click(screen.getByTestId('player-prev-button'))
    expect(mockOnPrev).toHaveBeenCalledTimes(1)
  })

  it('calls onNext user function when next button is pressed', () => {
    render(
      <ThemeProvider theme={theme}>
        <PlaylistNavControls
          disablePrev={false}
          disableNext={false}
          onPrev={mockOnPrev}
          onNext={mockOnNext}
        />
      </ThemeProvider>
    )

    userEvent.click(screen.getByTestId('player-next-button'))
    expect(mockOnNext).toHaveBeenCalledTimes(1)
  })
})
