import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import useTranslation from '@src/modules/i18n/useTranslation'
import devices from '@src/theme/breakpoints'
import Button from '@src/components/common/Button'
import gdpr from './gdpr'
import { UserPreferences } from './types'

/**
 * @return {null}
 */
const CookiesBanner: React.FC<{
  alwaysDisplay?: boolean
  onAccept?: (userPreferences: UserPreferences) => void
  onDeny?: (userPreferences: UserPreferences) => void
}> = ({
  alwaysDisplay = false,
  onAccept = () => null,
  onDeny = () => null,
}) => {
  const { t } = useTranslation()
  const [userPreferences, setUserPreferences] = useState(null)

  useEffect(() => {
    const userPrefs = gdpr.getUserPreferences()

    if (userPrefs?.hasSetPreferences) {
      setUserPreferences(userPrefs)
    } else {
      // Set values to display to be all checked.
      setUserPreferences({
        hasSetPreferences: false,
        necessary: true,
        preferences: true,
        statistics: true,
        marketing: true,
      })
    }
  }, [])

  const onAcceptPress = () => {
    const value = {
      hasSetPreferences: true,
      necessary: true,
      preferences: false,
      statistics: true,
      marketing: false,
    }

    gdpr.setUserPreferences(value)
    setUserPreferences(value)
    onAccept(value)
  }

  const onDenyPress = () => {
    const value = {
      hasSetPreferences: true,
      necessary: true,
      preferences: false,
      statistics: false,
      marketing: false,
    }

    gdpr.setUserPreferences(value)
    setUserPreferences(value)
    onDeny(value)
  }

  if (
    !userPreferences
    || (userPreferences.hasSetPreferences && !alwaysDisplay)
  ) {
    return null
  }
  return (
    <Container>
      <p>{t('gdpr.text')}</p>
      <Actions>
        <DenyButton
          type="button"
          onClick={onDenyPress}
          data-testid="gdpr-banner-deny-button"
        >
          {t('gdpr.deny')}
        </DenyButton>
        <Button onClick={onAcceptPress} data-testid="gdpr-banner-accept-button">
          {t('gdpr.allow')}
        </Button>
      </Actions>
    </Container>
  )
}

export default CookiesBanner

const Container = styled.div`
  min-height: 60px;
  width: 100%;
  position: fixed;
  bottom: 0;
  display: flex;
  align-items: center;
  justify-content: space-between;
  background-color: #363636;
  padding: 10px 15px;
  color: #fff;
  z-index: 500;
  font-size: 1.6rem;
`
const Actions = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;

  @media ${devices.tablet} {
    flex-direction: row;
  }
`
const DenyButton = styled.button`
  padding: 10px;
  border: 0;
  background-color: transparent;
  cursor: pointer;
  color: #fff;
  font-weight: bold;
`
