import React from 'react'
import { render, screen } from '@testing-library/react'
// Import userEvent from '@testing-library/user-event'
import Link from '../Link'

// Const mockOnClick = jest.fn()

describe('AudioPlayer', () => {
  beforeEach(() => jest.resetAllMocks())

  it('generates a link html tag with all the required attributes', () => {
    render(<Link href="/link/to/somewhere">This is a link</Link>)

    expect(screen.getByText('This is a link')).toBeInTheDocument()
    expect(screen.getByTestId('link')).toHaveAttribute(
      'href',
      '/link/to/somewhere'
    )
  })

  // Could not find a wy to test that because:
  // No router instance found.
  // You should only use "next/router" inside the client side of your app.
  // it('executes user function when link is pressed', () => {
  //   render(
  //     <Link href="/link/to/somewhere" onClick={mockOnClick}>This is a link</Link>
  //   )
  //
  //   userEvent.click(screen.getByTestId('link'))
  //   expect(mockOnClick).toHaveBeenCalledTimes(1)
  // })
})
