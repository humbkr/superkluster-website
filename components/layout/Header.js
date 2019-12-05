import React, { useState } from 'react'
import styled from 'styled-components'
import Link from 'next/link'
import devices, { deviceSizes } from '../../theme/breakpoints'

const Header = () => {
  const [menuIsOpen, setMenuIsOpen] = useState(false)

  return (
    <Container>
      <div>
        <Logo src="/static/images/logo.png" />
      </div>
      <NavButton onClick={() => setMenuIsOpen(true)}>
        <i className="icon-menu" />
      </NavButton>
      <Nav open={menuIsOpen}>
        <NavCloseButton onClick={() => setMenuIsOpen(false)}>
          <i className="icon-cancel" />
        </NavCloseButton>
        <NavMenu>
          <Link href="/">
            <NavElement onClick={() => setMenuIsOpen(false)}>Home</NavElement>
          </Link>
          <Link href="/wewantyou/singer">
            <NavElement onClick={() => setMenuIsOpen(false)}>We want you.</NavElement>
          </Link>
        </NavMenu>
      </Nav>
      <NavDesktop>
        <Link href="/">
          <NavElement>Home</NavElement>
        </Link>
        <Link href="/wewantyou/singer">
          <NavElement>We want you.</NavElement>
        </Link>
      </NavDesktop>
    </Container>
  )
}

export default Header

const Container = styled.div`
  position: absolute;
  top: 0;
  width: 100%;
  max-width: ${deviceSizes.laptopL};
  height: 80px;
  padding-left: 20px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  
  @media ${devices.tablet} {
    height: 150px;
    padding: 0 50px;
  }
`

const Logo = styled.img`
  height: 50px;
`

const NavButton = styled.button`
  border: none;
  background-color: transparent;
  padding: 20px 15px 20px 20px;
  font-size: 24px;
  margin-top: -5px;
  color: ${(props) => props.theme.text.color};
  
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
  left: ${(props) => props.open ? '20%' : '100%'};
  background-color: #000;
  overflow-x: hidden;
  padding-top: 60px;
  transition: left .1s ease-out;
`
const NavCloseButton = styled.button`
  position: absolute;
  top: 0;
  right: 0;
  padding: 20px 15px 20px 20px;
  font-size: 26px;
  color: ${(props) => props.theme.text.color};
`
const NavMenu = styled.div`
  display: flex;
  flex-direction: column;
  padding: 20px 0 20px 20px;
`
const NavElement = styled.a`
  font-size: 20px;
  font-weight: bold;
  cursor: pointer;
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
  
  @media ${devices.tablet} {
    display: block;
  }
`
