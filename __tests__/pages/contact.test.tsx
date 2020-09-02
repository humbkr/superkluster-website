import React from 'react'
import { ThemeProvider } from 'styled-components'
import { render, screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import theme from '@src/theme/default'
import Contact from '@src/pages/contact'
import notifications from '@src/utils/notifications'

jest.mock('react-use-audio-player', () => ({
  useAudioplayer: jest.fn(),
  useAudioPosition: jest.fn(),
}))

jest.mock('@src/utils/notifications', () => ({
  show: jest.fn(),
}))

// @ts-ignore
global.fetch = jest.fn(() => Promise.resolve({
  status: 200,
  json: () => Promise.resolve(),
}))

describe('Contact', () => {
  beforeEach(() => jest.clearAllMocks())

  it('renders correctly', () => {
    render(
      <ThemeProvider theme={theme}>
        <Contact />
      </ThemeProvider>
    )

    expect(screen.getByTestId('contact-title')).toBeInTheDocument()
    expect(screen.getByTestId('contact-form')).toBeInTheDocument()
  })

  it('displays an error if user submits the form without filling any field', () => {
    render(
      <ThemeProvider theme={theme}>
        <Contact />
      </ThemeProvider>
    )

    userEvent.click(screen.getByTestId('contact-form-submit'))
    expect(notifications.show).toHaveBeenCalledTimes(1)
    expect(fetch).not.toHaveBeenCalled()
  })

  it('displays an error if user submits the form without filling the email field', () => {
    render(
      <ThemeProvider theme={theme}>
        <Contact />
      </ThemeProvider>
    )

    userEvent.selectOptions(screen.getByTestId('contact-form-subject'), screen.getByTestId('contact-form-subject-info'))
    userEvent.type(screen.getByTestId('contact-form-text'), 'This is a test')

    userEvent.click(screen.getByTestId('contact-form-submit'))
    expect(notifications.show).toHaveBeenCalledTimes(1)
    expect(fetch).not.toHaveBeenCalled()
  })

  it('displays an error if user submits the form without filling the subject field', () => {
    render(
      <ThemeProvider theme={theme}>
        <Contact />
      </ThemeProvider>
    )

    userEvent.type(screen.getByTestId('contact-form-email'), 'test@test.com')
    userEvent.type(screen.getByTestId('contact-form-text'), 'This is a test')

    userEvent.click(screen.getByTestId('contact-form-submit'))
    expect(notifications.show).toHaveBeenCalledTimes(1)
    expect(fetch).not.toHaveBeenCalled()
  })

  it('displays an error if user submits the form without filling the text field', () => {
    render(
      <ThemeProvider theme={theme}>
        <Contact />
      </ThemeProvider>
    )

    userEvent.type(screen.getByTestId('contact-form-email'), 'test@test.com')
    userEvent.selectOptions(screen.getByTestId('contact-form-subject'), screen.getByTestId('contact-form-subject-info'))

    userEvent.click(screen.getByTestId('contact-form-submit'))
    expect(notifications.show).toHaveBeenCalledTimes(1)
    expect(fetch).not.toHaveBeenCalled()
  })

  it('displays an error if user submits the form with an invalid email address', () => {
    render(
      <ThemeProvider theme={theme}>
        <Contact />
      </ThemeProvider>
    )

    userEvent.type(screen.getByTestId('contact-form-email'), 'test.com')
    userEvent.selectOptions(screen.getByTestId('contact-form-subject'), screen.getByTestId('contact-form-subject-gig'))
    userEvent.type(screen.getByTestId('contact-form-text'), 'This is a test')

    userEvent.click(screen.getByTestId('contact-form-submit'))
    expect(notifications.show).toHaveBeenCalledTimes(1)
    expect(fetch).not.toHaveBeenCalled()
  })

  it('calls the api to send a mail if the form is valid', () => {
    render(
      <ThemeProvider theme={theme}>
        <Contact />
      </ThemeProvider>
    )

    userEvent.type(screen.getByTestId('contact-form-email'), 'test@test.com')
    userEvent.selectOptions(screen.getByTestId('contact-form-subject'), screen.getByTestId('contact-form-subject-gig'))
    userEvent.type(screen.getByTestId('contact-form-text'), 'This is a test')

    userEvent.click(screen.getByTestId('contact-form-submit'))

    // We need to wait for the mocked fetch call to resolve.
    waitFor(() => {
      expect(notifications.show).toHaveBeenCalledTimes(1)
      expect(fetch).toHaveBeenCalledTimes(1)
    })
  })

  it('displays an error message if API call returns an error', () => {
    global.fetch.mockImplementationOnce(() => Promise.resolve({
      status: 500,
      json: () => Promise.resolve(),
    }))

    render(
      <ThemeProvider theme={theme}>
        <Contact />
      </ThemeProvider>
    )

    userEvent.type(screen.getByTestId('contact-form-email'), 'test@test.com')
    userEvent.selectOptions(screen.getByTestId('contact-form-subject'), screen.getByTestId('contact-form-subject-gig'))
    userEvent.type(screen.getByTestId('contact-form-text'), 'This is a test')

    userEvent.click(screen.getByTestId('contact-form-submit'))

    // We need to wait for the mocked fetch call to resolve.
    waitFor(() => {
      expect(notifications.show).toHaveBeenCalledTimes(1)
      expect(fetch).toHaveBeenCalledTimes(1)
    })
  })

  it('displays an error message if API call fails', () => {
    global.fetch.mockImplementationOnce(() => Promise.reject())

    render(
      <ThemeProvider theme={theme}>
        <Contact />
      </ThemeProvider>
    )

    userEvent.type(screen.getByTestId('contact-form-email'), 'test@test.com')
    userEvent.selectOptions(screen.getByTestId('contact-form-subject'), screen.getByTestId('contact-form-subject-gig'))
    userEvent.type(screen.getByTestId('contact-form-text'), 'This is a test')

    userEvent.click(screen.getByTestId('contact-form-submit'))

    // We need to wait for the mocked fetch call to resolve.
    waitFor(() => {
      expect(notifications.show).toHaveBeenCalledTimes(1)
      expect(fetch).toHaveBeenCalledTimes(1)
    })
  })
})
