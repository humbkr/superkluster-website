import React, { useState } from 'react'
import styled from 'styled-components'
import { Link, paths } from '@src/modules/navigation'
import devices, { deviceSizes } from '@src/theme/breakpoints'
import useTranslation from '@src/modules/i18n/useTranslation'
import NavMenuOverlay from '@src/components/layout/NavMenuOverlay'

const Header: React.FC<{
  noLogo: boolean
}> = ({ noLogo = false }) => {
  const [menuIsOpen, setMenuIsOpen] = useState<boolean>(false)

  const { t } = useTranslation()

  return (
    <Container>
      <div>
        {!noLogo && (
          <picture>
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
      >
        <i className="icon-menu" />
      </NavButton>
      <NavMenuOverlay
        isOpen={menuIsOpen}
        closeMenu={() => setMenuIsOpen(false)}
      />
      <NavDesktop>
        <Link href={paths.homepage}>
          <NavElement>{t('navigation.main.home')}</NavElement>
        </Link>
        <Link href={paths.concerts}>
          <NavElement>{t('navigation.main.live')}</NavElement>
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

const NavOverlay = styled.div`
  height: 100vh;
  width: 100%;
  position: fixed;
  z-index: ${(props) => (props.open ? '1' : '-10')};
  top: 0;
  left: 0;
  background: rgba(0, 0, 0, ${(props) => (props.open ? '0.5' : '0')});
  overflow-x: hidden;
  transition: background 0.1s ease-out;

  a {
    color: ${(props) => props.theme.colors.primary.text};
    cursor: pointer;
    text-decoration: none;
  }
`
const NavContent = styled.div`
  height: 100vh;
  width: 80%;
  position: fixed;
  z-index: 2;
  top: 0;
  left: ${(props) => (props.open ? '20%' : '100%')};
  background-color: ${(props) => props.theme.colors.primary.background};
  overflow-x: hidden;
  padding-top: 6rem;
  transition: left 0.1s ease-out;
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
