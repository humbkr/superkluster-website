import App from 'next/app'
import React from 'react'
import { createGlobalStyle, ThemeProvider } from 'styled-components'
import theme from '../theme/default'

export default class SuperKluster extends App {
  render () {
    const { Component, pageProps } = this.props
    return (
      <ThemeProvider theme={theme}>
        <GlobalStyle />
        <Component {...pageProps} />
      </ThemeProvider>
    )
  }
}

const GlobalStyle = createGlobalStyle`
  * {
    box-sizing: border-box;
    margin: 0;
    padding: 0;
  }
  
  html {
    min-height: 100vh;
    background-color: #000;
  }

  body {
    min-height: 100vh;
    background: url(/static/images/supercluster.jpg) no-repeat center center fixed;
    background-color: #000;
    background-size: cover;
    font-family: Verdana;
  }
`
