import React from 'react'
import styled from 'styled-components'

export default () => (
  <Teaser>
    <Logo src="/static/images/logo.png" />
  </Teaser>
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
  width: 100%;
  max-width: 600px;
`
