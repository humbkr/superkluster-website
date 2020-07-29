import React from 'react'
import 'normalize.css'
import { createGlobalStyle, ThemeProvider } from 'styled-components'
import theme from '@src/theme/default'

function Superkluster({ Component, pageProps }) {
  return (
    <>
      <ThemeProvider theme={theme}>
        <GlobalStyle />
        {/* eslint-disable-next-line react/jsx-props-no-spreading */}
        <Component {...pageProps} />
      </ThemeProvider>
    </>
  )
}

export default Superkluster

const GlobalStyle = createGlobalStyle`
  @font-face {
    font-family: 'sprklstr';
    src: url('/fonts/sprklstr.eot?59206454');
    src: url('/fonts/sprklstr.eot?59206454#iefix') format('embedded-opentype'),
         url('/fonts/sprklstr.woff2?59206454') format('woff2'),
         url('/fonts/sprklstr.woff?59206454') format('woff'),
         url('/fonts/sprklstr.ttf?59206454') format('truetype'),
         url('/fonts/sprklstr.svg?59206454#sprklstr') format('svg');
    font-weight: normal;
    font-style: normal;
  }
  
  [class^="icon-"]:before, [class*=" icon-"]:before {
    font-family: "sprklstr";
    font-style: normal;
    font-weight: normal;
    speak: none;
  
    display: inline-block;
    text-decoration: inherit;
    width: 1em;
    margin-right: .2em;
    text-align: center;
    /* opacity: .8; */
  
    /* For safety - reset parent styles, that can break glyph codes*/
    font-variant: normal;
    text-transform: none;
  
    /* fix buttons height, for twitter bootstrap */
    line-height: 1em;
  
    /* Animation center compensation - margins should be symmetric */
    /* remove if not needed */
    margin-left: .2em;
  
    /* you can be more comfortable with increased icons size */
    /* font-size: 120%; */
  
    /* Font smoothing. That was taken from TWBS */
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
  
    /* Uncomment for 3D effect */
    /* text-shadow: 1px 1px 1px rgba(127, 127, 127, 0.3); */
  }
  
  .icon-play:before { content: '\\e801'; } /* '' */
  .icon-pause:before { content: '\\e802'; } /* '' */
  .icon-to-end:before { content: '\\e804'; } /* '' */
  .icon-to-start:before { content: '\\e805'; } /* '' */
  .icon-loop:before { content: '\\e806'; } /* '' */
  .icon-cancel:before { content: '\\e809'; } /* '' */
  .icon-menu:before { content: '\\f008'; } /* '' */
  .icon-twitter:before { content: '\\f099'; } /* '' */
  .icon-instagram:before { content: '\\f16d'; } /* '' */
  .icon-bandcamp:before { content: '\\f2d5'; } /* '' */
  .icon-facebook-squared:before { content: '\\f308'; } /* '' */

  * {
    box-sizing: border-box;
    margin: 0;
    padding: 0;
  }
  
  *:focus {
    outline: 0;
  }
  
  body {
    font-family: sans-serif;
  }
  
  html {
    background-color: ${theme.colors.primary.background};
    color: ${theme.colors.primary.text};
    font-size: 10px;
  }
`
