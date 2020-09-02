import React from 'react'
import { render, screen } from '@testing-library/react'
import { ThemeProvider } from 'styled-components'
import theme from '@src/theme/default'
import Footer from '@src/components/layout/Footer'
import { t } from '@src/modules/i18n/useTranslation'

describe('Footer', () => {
  it('renders correctly with default props', async () => {
    render(
      <ThemeProvider theme={theme}>
        <Footer />
      </ThemeProvider>
    )

    expect(screen.getByTestId('footer-band-logo')).toBeInTheDocument()
    expect(screen.getByTestId('footer-copyright')).toBeInTheDocument()
  })

  it('has a link to legals page', async () => {
    render(
      <ThemeProvider theme={theme}>
        <Footer />
      </ThemeProvider>
    )

    expect(screen.getByText(t('navigation.footer.legals'))).toBeInTheDocument()
    expect(screen.getByTestId('footer-copyright')).toBeInTheDocument()
  })
})
