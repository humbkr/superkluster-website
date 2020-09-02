import React from 'react'
import { ThemeProvider } from 'styled-components'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import * as mockRUAP from 'react-use-audio-player'
import theme from '../theme'
import ProgressBar from '../ProgressBar'

const mockSeek = jest.fn()

jest.mock('react-use-audio-player', () => ({
  useAudioPosition: jest.fn().mockImplementation(() => ({
    position: 45,
    duration: 100,
    seek: mockSeek,
  })),
}))

describe('ProgressBar', () => {
  beforeEach(() => jest.clearAllMocks())

  it('displays a progression of the right percentage base on time elapsed / total duration', () => {
    render(
      <ThemeProvider theme={theme}>
        <ProgressBar />
      </ThemeProvider>
    )

    expect(screen.getByTestId('player-progress-bar-status')).toHaveStyle({
      width: '45%',
    })
  })

  it('calls the seek function when clicked', () => {
    render(
      <ThemeProvider theme={theme}>
        <ProgressBar />
      </ThemeProvider>
    )

    userEvent.click(screen.getByTestId('player-progress-bar'))
    expect(mockSeek).toHaveBeenCalledTimes(1)
  })

  it('does not crash when useAudioPosition sometimes returns an object as the position', () => {
    mockRUAP.useAudioPosition.mockReturnValueOnce({
      position: { thisIsABug: true },
      duration: 100,
      seek: mockSeek,
    })

    render(
      <ThemeProvider theme={theme}>
        <ProgressBar />
      </ThemeProvider>
    )

    expect(screen.getByTestId('player-progress-bar')).toBeInTheDocument()
  })
})
