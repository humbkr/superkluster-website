import React, { FunctionComponent, useEffect, useState } from 'react'
import styled from 'styled-components'
import useTranslation from '@src/modules/i18n/useTranslation'
import devices from '@src/theme/breakpoints'
import gdpr, { UserPreferences } from './gdpr'

/**
 * @return {null}
 */
const CookiesBanner: FunctionComponent<{
  alwaysDisplay?: boolean
  onAccept: (userPreferences: UserPreferences) => void
  onDeny: (userPreferences: UserPreferences) => void
}> = ({ alwaysDisplay, onAccept, onDeny }) => {
  const { t } = useTranslation()
  const [userPreferences, setUserPreferences] = useState(null)

  useEffect(() => {
    const userPrefs = gdpr.getUserPreferences()
    if (userPrefs.hasSetPreferences) {
      setUserPreferences(userPrefs)
    } else {
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
        <DenyButton type="button" onClick={onDenyPress}>
          {t('gdpr.deny')}
        </DenyButton>
        <AcceptButton type="button" onClick={onAcceptPress}>
          {t('gdpr.allow')}
        </AcceptButton>
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
`
const Actions = styled.div`
  @media ${devices.tablet} {
    display: flex;
    flex-direction: column;
    justify-content: center;
  }
`
const AcceptButton = styled.button`
  padding: 10px;
  border: 0;
  background-color: #3b5dc0;
  cursor: pointer;
  border-radius: 7px;
  color: #fff;
  font-weight: bold;
`
const DenyButton = styled.button`
  padding: 10px;
  border: 0;
  background-color: transparent;
  cursor: pointer;
  color: #fff;
  font-weight: bold;
`
