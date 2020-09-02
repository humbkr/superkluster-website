import React from 'react'
import { ThemeProvider } from 'styled-components'
import { render, screen } from '@testing-library/react'
import * as mockRUAP from 'react-use-audio-player'
import theme from '../theme'
import Time from '../Time'

jest.mock('react-use-audio-player', () => ({
  useAudioPosition: jest.fn(),
}))

describe('Time', () => {
  beforeEach(() => jest.clearAllMocks())

  it('displays time as [elapsed] / [total] by default', () => {
    mockRUAP.useAudioPosition.mockReturnValueOnce({
      position: 45,
      duration: 124,
    })

    render(
      <ThemeProvider theme={theme}>
        <Time />
      </ThemeProvider>
    )

    expect(screen.getByText('00:45 / 02:04')).toBeInTheDocument()
  })

  it('displays hours when necessary', () => {
    mockRUAP.useAudioPosition.mockReturnValueOnce({
      position: 356,
      duration: 3600,
    })

    render(
      <ThemeProvider theme={theme}>
        <Time />
      </ThemeProvider>
    )

    expect(screen.getByText('00:05:56 / 01:00:00')).toBeInTheDocument()
  })

  it('displays time as [remaining] if remaining prop is true', () => {
    mockRUAP.useAudioPosition.mockReturnValueOnce({
      position: 45,
      duration: 124,
    })

    render(
      <ThemeProvider theme={theme}>
        <Time remaining />
      </ThemeProvider>
    )

    expect(screen.getByText('-01:19')).toBeInTheDocument()
  })

  it('displays time as [remaining] with hours when necessary if remaining prop is true', () => {
    mockRUAP.useAudioPosition.mockReturnValueOnce({
      position: 45,
      duration: 3600,
    })

    render(
      <ThemeProvider theme={theme}>
        <Time remaining />
      </ThemeProvider>
    )

    expect(screen.getByText('-00:59:15')).toBeInTheDocument()
  })

  it('does not crash when useAudioPosition sometimes returns an object as the position', () => {
    mockRUAP.useAudioPosition.mockReturnValueOnce({
      position: { thisIsAbug: true },
      duration: 124,
    })

    render(
      <ThemeProvider theme={theme}>
        <Time />
      </ThemeProvider>
    )

    expect(screen.getByText('00:00 / 02:04')).toBeInTheDocument()
  })
})
