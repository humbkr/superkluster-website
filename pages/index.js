import React from 'react'
import styled from 'styled-components'

export default () => (
  <Teaser>
    <Title>superKluster</Title>
    <Subtitle>coming soon...</Subtitle>
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
const Title = styled.h1`
  font-size: 45px;
  margin-bottom: 20px;
  color: ${({ theme }) => theme.colors.primary};
  text-shadow: 0px 0px 9px #000;
`
const Subtitle = styled.h2`
  font-size: 16px;
  font-family: Arial;
  color: ${({ theme }) => theme.colors.primary};
  text-shadow: 0px 0px 9px #000;
`
