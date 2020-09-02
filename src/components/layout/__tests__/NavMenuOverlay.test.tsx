import React from 'react'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { ThemeProvider } from 'styled-components'
import theme from '@src/theme/default'
import NavMenuOverlay from '@src/components/layout/NavMenuOverlay'

const handleOnClose = jest.fn()

describe('NavMenuOverlay', () => {
  it('renders correctly when opened', async () => {
    render(
      <ThemeProvider theme={theme}>
        <NavMenuOverlay isOpen closeMenu={() => {}} />
      </ThemeProvider>
    )

    expect(screen.getByTestId('nav-overlay-opened')).toBeInTheDocument()
    expect(screen.queryByTestId('nav-overlay-closed')).not.toBeInTheDocument()
  })

  it('renders correctly when closed', async () => {
    render(
      <ThemeProvider theme={theme}>
        <NavMenuOverlay isOpen={false} closeMenu={() => {}} />
      </ThemeProvider>
    )

    expect(screen.queryByTestId('nav-overlay-opened')).not.toBeInTheDocument()
    expect(screen.getByTestId('nav-overlay-closed')).toBeInTheDocument()
  })

  it('executes the closeMenu function when close button is pressed', async () => {
    render(
      <ThemeProvider theme={theme}>
        <NavMenuOverlay isOpen={false} closeMenu={handleOnClose} />
      </ThemeProvider>
    )

    userEvent.click(screen.getByTestId('nav-overlay-close-button'))

    expect(handleOnClose).toHaveBeenCalledTimes(1)
  })
})
