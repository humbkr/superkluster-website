import React from 'react'
import styled from 'styled-components'
import devices from '../theme/breakpoints'

export default () => (
  <div>
    <Teaser>
      <Logo src="/static/images/logo.png" />
    </Teaser>
  </div>
)

const Teaser = styled.div`
  width: 100%;
  margin: 0 auto;
  text-align: center;
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
`
const Logo = styled.img`
  margin-bottom: 20px;
  max-width: 80%;

  @media ${devices.tablet} {
    max-width: 500px;
  }
`
