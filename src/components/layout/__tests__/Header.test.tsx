import React from 'react'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { ThemeProvider } from 'styled-components'
import theme from '@src/theme/default'
import Header from '@src/components/layout/Header'
import breakpoints from '@src/theme/breakpoints'

describe('Header', () => {
  it('renders correctly with default props', async () => {
    render(
      <ThemeProvider theme={theme}>
        <Header />
      </ThemeProvider>
    )

    expect(screen.getByTestId('header-band-logo')).toBeInTheDocument()
  })

  it('does not display a logo if noLogo prop is true', async () => {
    render(
      <ThemeProvider theme={theme}>
        <Header noLogo />
      </ThemeProvider>
    )

    expect(screen.queryByTestId('header-band-logo')).not.toBeInTheDocument()
  })

  describe('desktop menu', () => {
    it('has a dedicated menu on desktop', async () => {
      render(
        <ThemeProvider theme={theme}>
          <Header />
        </ThemeProvider>
      )

      expect(screen.getByTestId('header-main-menu-button')).toHaveStyleRule(
        'display',
        'none',
        {
          media: breakpoints.tablet,
        }
      )
      expect(screen.getByTestId('header-menu-desktop')).not.toHaveStyleRule(
        'display',
        'none',
        {
          media: breakpoints.tablet,
        }
      )
    })
  })

  describe('mobile menu', () => {
    it('has a dedicated menu on mobile', async () => {
      render(
        <ThemeProvider theme={theme}>
          <Header />
        </ThemeProvider>
      )

      expect(screen.getByTestId('header-main-menu-button')).not.toHaveStyleRule(
        'display',
        'none'
      )
      expect(screen.getByTestId('header-menu-desktop')).toHaveStyleRule(
        'display',
        'none'
      )
    })

    it('displays a menu when the menu button is pressed', async () => {
      render(
        <ThemeProvider theme={theme}>
          <Header />
        </ThemeProvider>
      )

      expect(screen.getByTestId('nav-overlay-closed')).toBeInTheDocument()
      expect(screen.queryByTestId('nav-overlay-opened')).not.toBeInTheDocument()

      userEvent.click(screen.getByTestId('header-main-menu-button'))
      expect(screen.queryByTestId('nav-overlay-closed')).not.toBeInTheDocument()
      expect(screen.getByTestId('nav-overlay-opened')).toBeInTheDocument()
    })

    it('close the menu when the close button is pressed', async () => {
      render(
        <ThemeProvider theme={theme}>
          <Header />
        </ThemeProvider>
      )

      expect(screen.getByTestId('nav-overlay-closed')).toBeInTheDocument()
      expect(screen.queryByTestId('nav-overlay-opened')).not.toBeInTheDocument()

      userEvent.click(screen.getByTestId('header-main-menu-button'))
      expect(screen.queryByTestId('nav-overlay-closed')).not.toBeInTheDocument()
      expect(screen.getByTestId('nav-overlay-opened')).toBeInTheDocument()

      userEvent.click(screen.getByTestId('nav-overlay-close-button'))
      expect(screen.getByTestId('nav-overlay-closed')).toBeInTheDocument()
      expect(screen.queryByTestId('nav-overlay-opened')).not.toBeInTheDocument()
    })
  })
})
