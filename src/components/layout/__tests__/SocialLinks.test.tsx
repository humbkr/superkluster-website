import React from 'react'
import { render, screen } from '@testing-library/react'
import { ThemeProvider } from 'styled-components'
import theme from '@src/theme/default'
import Layout from '@src/components/layout/Layout'

describe('SocialLinks', () => {
  it('renders correctly with all the required social links', async () => {
    render(
      <ThemeProvider theme={theme}>
        <Layout headerContent={null} />
      </ThemeProvider>
    )

    expect(screen.getByTestId('social-link-bandcamp')).toBeInTheDocument()
    expect(screen.getByTestId('social-link-facebook')).toBeInTheDocument()
    expect(screen.getByTestId('social-link-instagram')).toBeInTheDocument()
  })
})
