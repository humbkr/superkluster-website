import React from 'react'
import { render, screen } from '@testing-library/react'
import { ThemeProvider } from 'styled-components'
import theme from '@src/theme/default'
import Layout, { HeaderSize } from '@src/components/layout/Layout'

describe('Layout', () => {
  it('renders correctly without errors', async () => {
    render(
      <ThemeProvider theme={theme}>
        <Layout headerContent={null} />
      </ThemeProvider>
    )
  })

  it('displays a wide header when headerSize prop is "Wide"', async () => {
    render(
      <ThemeProvider theme={theme}>
        <Layout headerContent={null} headerSize={HeaderSize.Wide} />
      </ThemeProvider>
    )

    expect(screen.getByTestId('layout-content')).toHaveStyleRule(
      'margin-top',
      '0'
    )
  })
})
