import React from 'react'
import { render, screen } from '@testing-library/react'
import { ThemeProvider } from 'styled-components'
import theme from '@src/theme/default'
import Loader from '@src/components/common/Loader'

describe('Loader', () => {
  it('renders correctly with default props', async () => {
    render(
      <ThemeProvider theme={theme}>
        <Loader />
      </ThemeProvider>
    )

    expect(screen.getByTestId('loader')).toBeInTheDocument()
  })

  it('changes size depending on the size prop', async () => {
    render(
      <ThemeProvider theme={theme}>
        <Loader size={45} />
      </ThemeProvider>
    )

    expect(screen.getByTestId('loader')).toHaveAttribute('width', '45px')
    expect(screen.getByTestId('loader')).toHaveAttribute('height', '45px')
  })
})
