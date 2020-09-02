import React from 'react'
import { render, screen } from '@testing-library/react'
import { ThemeProvider } from 'styled-components'
import theme from '@src/theme/default'
import Button from '@src/components/common/Button'

describe('Button', () => {
  it('renders correctly with default props', async () => {
    render(
      <ThemeProvider theme={theme}>
        <Button>This is a button</Button>
      </ThemeProvider>
    )

    expect(screen.getByRole('button')).toBeInTheDocument()
    expect(screen.getByRole('button')).toHaveAttribute('type', 'button')
    expect(screen.getByRole('button')).not.toBeDisabled()
    expect(screen.getByText('This is a button')).toBeInTheDocument()
    expect(screen.queryByTestId('loader')).not.toBeInTheDocument()
  })

  it('has a type submit if submit prop is true', async () => {
    render(
      <ThemeProvider theme={theme}>
        <Button submitButton>This is submit button</Button>
      </ThemeProvider>
    )

    expect(screen.getByRole('button')).toHaveAttribute('type', 'submit')
  })

  it('is disabled during loading state', async () => {
    render(
      <ThemeProvider theme={theme}>
        <Button loading>This is a button</Button>
      </ThemeProvider>
    )

    expect(screen.getByRole('button')).toBeDisabled()
  })

  it('is disabled during loading state', async () => {
    render(
      <ThemeProvider theme={theme}>
        <Button loading>This is a button</Button>
      </ThemeProvider>
    )

    expect(screen.getByRole('button')).toBeDisabled()
  })

  it('displays a loader icon during loading state', async () => {
    render(
      <ThemeProvider theme={theme}>
        <Button loading>This is a button</Button>
      </ThemeProvider>
    )

    expect(screen.getByTestId('loader')).toBeInTheDocument()
  })
})
