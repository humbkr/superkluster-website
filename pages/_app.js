import App from 'next/app'
import React from 'react'
import styled, { createGlobalStyle, ThemeProvider } from 'styled-components'
import theme from '../theme/default'
import Header from '../components/layout/Header'

export default class SuperKluster extends App {
  render() {
    const { Component, pageProps } = this.props
    return (
      <ThemeProvider theme={theme}>
        <GlobalStyle />
        <ParallaxWrapper>
          <Parallax>
            <Header />
            {/* eslint-disable-next-line react/jsx-props-no-spreading */}
            <Component {...pageProps} />
          </Parallax>
        </ParallaxWrapper>
      </ThemeProvider>
    )
  }
}

const ParallaxWrapper = styled.div`
  height: 100vh;
  overflow-x: hidden;
  overflow-y: auto;
  perspective: 2px;
`

const Parallax = styled.div`
  height: 100vh;

  ::after {
    background-image: url(/static/images/supercluster.jpg);

    /* Display and position the pseudo-element */
    content: ' ';
    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;

    /* Move the pseudo-element back away from the camera,
     * then scale it back up to fill the viewport.
     * Because the pseudo-element is further away, it appears to move more slowly, like in real life. */
    transform: translateZ(-1px) scale(1.5);
    /* Force the background image to fill the whole element. */
    background-size: 100%;
    /* Keep the image from overlapping sibling elements. */
    z-index: -1;
  }
`

const GlobalStyle = createGlobalStyle`
  @font-face {
    font-family: 'sprklstr';
    src: url('../static/fonts/sprklstr.eot?59206454');
    src: url('../static/fonts/sprklstr.eot?59206454#iefix') format('embedded-opentype'),
         url('../static/fonts/sprklstr.woff2?59206454') format('woff2'),
         url('../static/fonts/sprklstr.woff?59206454') format('woff'),
         url('../static/fonts/sprklstr.ttf?59206454') format('truetype'),
         url('../static/fonts/sprklstr.svg?59206454#sprklstr') format('svg');
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
  
  html {
    min-height: 100vh;
    background-color: #000;
  }

  body {  
    font-family: Roboto;
    color: #fff;
  }
  
  ul {
    padding-left: 40px;
  }
  
  p {
    margin: 20px 0;
  }
  
  a {
    color: #fff;
  }
`
