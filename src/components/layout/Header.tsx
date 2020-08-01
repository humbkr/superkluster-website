import React, { useState } from 'react'
import styled from 'styled-components'
import { Link, paths } from '@src/modules/navigation'
import devices, { deviceSizes } from '@src/theme/breakpoints'
import useTranslation from '@src/modules/i18n/useTranslation'

const Header: React.FC<{
  noLogo: boolean
}> = ({ noLogo = false }) => {
  const [menuIsOpen, setMenuIsOpen] = useState<boolean>(false)

  const { t } = useTranslation()

  return (
    <Container>
      <div>
        {!noLogo && (
          <Logo src="/images/logo-text-narrow.png" alt="Superkluster" />
        )}
      </div>
      <NavButton onClick={() => setMenuIsOpen(true)}>
        <i className="icon-menu" />
      </NavButton>
      <Nav open={menuIsOpen}>
        <NavCloseButton onClick={() => setMenuIsOpen(false)}>
          <i className="icon-cancel" />
        </NavCloseButton>
        <NavMenu>
          <Link href={paths.homepage}>
            <NavElement>{t('navigation.main.home')}</NavElement>
          </Link>
          <Link href={paths.concerts}>
            <NavElement>{t('navigation.main.live')}</NavElement>
          </Link>
          <Link href={paths.contact}>
            <NavElement>{t('navigation.main.contact')}</NavElement>
          </Link>
        </NavMenu>
      </Nav>
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
  height: 80px;
  padding-left: 20px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  z-index: 100;

  @media ${devices.tablet} {
    height: 150px;
    padding: 0 50px;
  }
`

const Logo = styled.img`
  height: 40px;

  @media ${devices.tablet} {
    height: 50px;
  }
`

const NavButton = styled.button`
  border: none;
  background-color: transparent;
  padding: 20px 15px 20px 20px;
  font-size: 24px;
  margin-top: -5px;
  color: ${(props) => props.theme.colors.primary.text};

  @media ${devices.tablet} {
    display: none;
  }
`

const Nav = styled.div`
  height: 100%;
  width: 80%;
  position: fixed;
  z-index: 1;
  top: 0;
  left: ${(props) => (props.open ? '20%' : '100%')};
  background-color: #000;
  overflow-x: hidden;
  padding-top: 60px;
  transition: left 0.1s ease-out;

  a {
    color: ${(props) => props.theme.colors.primary.text};
    cursor: pointer;
    text-decoration: none;
  }
`
const NavCloseButton = styled.button`
  position: absolute;
  top: 0;
  right: 0;
  padding: 20px 15px 20px 20px;
  font-size: 26px;
  color: ${(props) => props.theme.colors.primary.text};
`
const NavMenu = styled.div`
  display: flex;
  flex-direction: column;
  padding: 20px 0 20px 20px;
`
const NavElement = styled.span`
  font-size: 20px;
  font-weight: bold;
  margin: 7px 0;
  padding: 5px 0;
  border-bottom: 1px solid ${(props) => props.theme.layout.separator.color};

  @media ${devices.tablet} {
    border-bottom: none;
    margin: 0 16px;
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
