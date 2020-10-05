import React, { useState } from 'react'
import styled from 'styled-components'
import { Link, paths } from '@src/modules/navigation'
import devices, { deviceSizes } from '@src/theme/breakpoints'
import useTranslation from '@src/modules/i18n/useTranslation'
import NavMenuOverlay from '@src/components/layout/NavMenuOverlay'

const Header: React.FC<{
  noLogo?: boolean
}> = ({ noLogo = false }) => {
  const [menuIsOpen, setMenuIsOpen] = useState<boolean>(false)

  const { t } = useTranslation()

  return (
    <Container>
      <div>
        {!noLogo && (
          <picture data-testid="header-band-logo">
            <source
              srcSet={require('@public/images/logo-text-narrow.png?webp')}
              type="image/webp"
            />
            <source
              srcSet={require('@public/images/logo-text-narrow.png')}
              type="image/png"
            />
            <Logo
              src={require('@public/images/logo-text-narrow.png')}
              alt="SuperKluster"
            />
          </picture>
        )}
      </div>
      <NavButton
        onClick={() => setMenuIsOpen(true)}
        aria-label={t('navigation.main.openButton')}
        data-testid="header-main-menu-button"
      >
        <i className="icon-menu" />
      </NavButton>
      <NavMenuOverlay
        isOpen={menuIsOpen}
        closeMenu={() => setMenuIsOpen(false)}
      />
      <NavDesktop data-testid="header-menu-desktop">
        <Link href={paths.homepage}>
          <NavElement>{t('navigation.main.home')}</NavElement>
        </Link>
        <Link href={paths.contact}>
          <NavElement>{t('navigation.main.contact')}</NavElement>
        </Link>
      </NavDesktop>
    </Container>
  )
}

export default Header

const Container = styled.header`
  position: absolute;
  top: 0;
  width: 100%;
  max-width: ${deviceSizes.desktop};
  height: 8rem;
  padding-left: 2rem;
  display: flex;
  align-items: center;
  justify-content: space-between;
  z-index: 100;

  @media ${devices.tablet} {
    height: 15rem;
    padding: 0 5rem;
  }
`
const Logo = styled.img`
  height: 4rem;

  @media ${devices.tablet} {
    height: 5rem;
  }
`
const NavButton = styled.button`
  border: none;
  background-color: transparent;
  padding: 2rem;
  font-size: 2.4rem;
  margin-top: -0.5rem;
  color: ${(props) => props.theme.colors.primary.text};
  text-shadow: 1px 1px 2px rgba(0, 0, 0, 0.75);

  @media ${devices.tablet} {
    display: none;
  }
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
const NavDesktop = styled.div`
  display: none;

  a {
    color: ${(props) => props.theme.colors.primary.text};
    cursor: pointer;
    text-decoration: none;
  }

  @media ${devices.tablet} {
    display: block;
  }
`
