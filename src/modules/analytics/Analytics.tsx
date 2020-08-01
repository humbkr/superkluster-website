import React, { useEffect } from 'react'
import { UserPreferences } from '@src/modules/gdpr/types'
import { CookiesBanner } from '@src/modules/gdpr'
import tracking from './tracking'

const Analytics: React.FC = () => {
  useEffect(() => {
    tracking.initialize()
  })

  const onSetCookiesPreferences = (userPreferences: UserPreferences) => {
    // Statistics cookies.
    if (userPreferences.statistics) {
      tracking.enableTracking()
    } else {
      tracking.disableTracking()
    }
  }

  return (
    <CookiesBanner
      onAccept={onSetCookiesPreferences}
      onDeny={onSetCookiesPreferences}
    />
  )
}

export default Analytics
