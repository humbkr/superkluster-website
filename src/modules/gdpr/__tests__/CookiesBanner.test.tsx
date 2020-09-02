import React from 'react'
import { render, screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { ThemeProvider } from 'styled-components'
import theme from '@src/theme/default'
import CookiesBanner from '@src/modules/gdpr/CookiesBanner'
import { t } from '@src/modules/i18n/useTranslation'
import gdpr from '../gdpr'

jest.mock('../gdpr', () => ({
  getUserPreferences: jest.fn(),
  setUserPreferences: jest.fn(),
}))

describe('CookiesBanner', () => {
  beforeEach(() => {
    jest.resetAllMocks()
  })

  it('renders correctly if user has not set his preferences already', async () => {
    gdpr.getUserPreferences.mockReturnValueOnce({
      hasSetPreferences: false,
      necessary: true,
      preferences: false,
      statistics: false,
      marketing: false,
    })

    render(
      <ThemeProvider theme={theme}>
        <CookiesBanner />
      </ThemeProvider>
    )

    await waitFor(() => {
      expect(screen.getByText(t('gdpr.text'))).toBeInTheDocument()
      expect(screen.getByTestId('gdpr-banner-deny-button')).toBeInTheDocument()
      expect(
        screen.getByTestId('gdpr-banner-accept-button')
      ).toBeInTheDocument()
    })
  })

  it('does not display anything if user has already set his preferences', async () => {
    gdpr.getUserPreferences.mockReturnValueOnce({
      hasSetPreferences: true,
      necessary: true,
      preferences: true,
      statistics: false,
      marketing: true,
    })

    render(
      <ThemeProvider theme={theme}>
        <CookiesBanner />
      </ThemeProvider>
    )

    await waitFor(() => {
      expect(screen.queryByText(t('gdpr.text'))).not.toBeInTheDocument()
      expect(
        screen.queryByTestId('gdpr-banner-deny-button')
      ).not.toBeInTheDocument()
      expect(
        screen.queryByTestId('gdpr-banner-accept-button')
      ).not.toBeInTheDocument()
    })
  })

  it('display the banner if user has already set his preferences but alwaysDisplay prop is true', async () => {
    gdpr.getUserPreferences.mockReturnValueOnce({
      hasSetPreferences: true,
      necessary: true,
      preferences: false,
      statistics: true,
      marketing: false,
    })

    render(
      <ThemeProvider theme={theme}>
        <CookiesBanner alwaysDisplay />
      </ThemeProvider>
    )

    await waitFor(() => {
      expect(screen.getByText(t('gdpr.text'))).toBeInTheDocument()
      expect(screen.getByTestId('gdpr-banner-deny-button')).toBeInTheDocument()
      expect(
        screen.getByTestId('gdpr-banner-accept-button')
      ).toBeInTheDocument()
    })
  })

  it('sets user gdpr preferences when deny button is pressed', async () => {
    render(
      <ThemeProvider theme={theme}>
        <CookiesBanner />
      </ThemeProvider>
    )

    userEvent.click(screen.getByTestId('gdpr-banner-deny-button'))
    expect(gdpr.setUserPreferences).toHaveBeenCalledWith({
      hasSetPreferences: true,
      necessary: true,
      preferences: false,
      statistics: false,
      marketing: false,
    })
  })

  it('sets user gdpr preferences when accept button is pressed', async () => {
    render(
      <ThemeProvider theme={theme}>
        <CookiesBanner />
      </ThemeProvider>
    )

    userEvent.click(screen.getByTestId('gdpr-banner-accept-button'))
    expect(gdpr.setUserPreferences).toHaveBeenCalledWith({
      hasSetPreferences: true,
      necessary: true,
      preferences: false,
      statistics: true,
      marketing: false,
    })
  })

  it('executes user-provided function when deny button is pressed', async () => {
    const onDenyPress = jest.fn()

    render(
      <ThemeProvider theme={theme}>
        <CookiesBanner onDeny={onDenyPress} />
      </ThemeProvider>
    )

    userEvent.click(screen.getByTestId('gdpr-banner-deny-button'))
    expect(onDenyPress).toHaveBeenCalledTimes(1)
  })

  it('executes user-provided function when accept button is pressed', async () => {
    const onAllowPress = jest.fn()

    render(
      <ThemeProvider theme={theme}>
        <CookiesBanner onAccept={onAllowPress} />
      </ThemeProvider>
    )

    userEvent.click(screen.getByTestId('gdpr-banner-accept-button'))
    expect(onAllowPress).toHaveBeenCalledTimes(1)
  })
})
