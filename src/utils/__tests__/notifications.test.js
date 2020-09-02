import React from 'react'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import notifications from '../notifications'

describe('Notifications abstraction', () => {
  describe('show', () => {
    it('displays a notification when called', () => {
      const Component = () => (
        <button
          type="button"
          aria-label="Notif"
          onClick={notifications.show('This is a notification')}
          data-testid="notif-button"
        />
      )

      render(<Component />)

      userEvent.click(screen.getByTestId('notif-button'))
      expect(screen.getByText('This is a notification')).toBeInTheDocument()
    })
  })
})
