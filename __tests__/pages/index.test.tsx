import React from 'react'
import { ThemeProvider } from 'styled-components'
import { render, screen } from '@testing-library/react'
import theme from '@src/theme/default'
import Index from '@src/pages/index'

jest.mock('react-use-audio-player', () => ({
  // eslint-disable-next-line react/display-name
  AudioPlayerProvider: () => <div />,
  useAudioplayer: jest.fn(),
  useAudioPosition: jest.fn(),
}))

describe('Homepage', () => {
  beforeEach(() => jest.clearAllMocks())

  it('renders correctly', () => {
    render(
      <ThemeProvider theme={theme}>
        <Index />
      </ThemeProvider>
    )

    expect(screen.getByTestId('home-bandname')).toBeInTheDocument()
    expect(screen.getByTestId('home-fatcore')).toBeInTheDocument()
    expect(screen.getByTestId('home-music')).toBeInTheDocument()
  })
})
