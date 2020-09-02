import React from 'react'
import styled from 'styled-components'
import { Link, paths } from '@src/modules/navigation'
import devices from '@src/theme/breakpoints'
import useTranslation from '@src/modules/i18n/useTranslation'

const NavMenuOverlay: React.FC<{
  isOpen: boolean
  closeMenu: () => void
}> = ({ isOpen, closeMenu }) => {
  const { t } = useTranslation()

  return (
    <NavOverlay
      open={isOpen}
      data-testid={`nav-overlay-${isOpen ? 'opened' : 'closed'}`}
    >
      <NavCloseButton
        onClick={closeMenu}
        aria-label={t('navigation.main.closeButton')}
        data-testid="nav-overlay-close-button"
      >
        <i className="icon-cancel" />
      </NavCloseButton>
      <NavMenu>
        <Link href={paths.homepage} onClick={closeMenu}>
          <NavElement>{t('navigation.main.home')}</NavElement>
        </Link>
        <Link href={paths.concerts} onClick={closeMenu}>
          <NavElement>{t('navigation.main.live')}</NavElement>
        </Link>
        <Link href={paths.contact} onClick={closeMenu}>
          <NavElement>{t('navigation.main.contact')}</NavElement>
        </Link>
      </NavMenu>
    </NavOverlay>
  )
}

export default NavMenuOverlay

const NavOverlay = styled.div`
  position: fixed;
  top: ${(props) => (props.open ? '0' : '-26rem')};
  left: 0;
  height: 26rem;
  width: 100%;
  z-index: 100;
  background: rgba(0, 0, 0, 0.8);
  transition: top 0.1s ease-out;
  overflow-x: hidden;
  padding-top: 4rem;

  a {
    color: ${(props) => props.theme.colors.primary.text};
    cursor: pointer;
    text-decoration: none;
  }
`
const NavCloseButton = styled.button`
  border: none;
  background-color: transparent;
  position: absolute;
  top: 0.2rem;
  right: -0.2rem;
  padding: 2rem;
  font-size: 2.6rem;
  color: ${(props) => props.theme.colors.primary.text};
`
const NavMenu = styled.div`
  display: flex;
  flex-direction: column;
  padding: 2rem 0 2rem 2rem;
`
const NavElement = styled.div`
  font-size: 2.2rem;
  font-weight: bold;
  margin: 0.7rem;
  padding: 0.5rem 0;
  border-bottom: 1px solid ${(props) => props.theme.layout.separator.color};

  @media ${devices.tablet} {
    border-bottom: none;
    margin: 0 1.6rem;
    text-shadow: 1px 1px 2px rgba(0, 0, 0, 0.75);
    display: inline-block;
  }
`
