import React from 'react'
import styled from 'styled-components'
import Header from './Header'
import Footer from './Footer'
import devices from '@src/theme/breakpoints'

const Layout: React.FC<{
  noLogo: boolean
}> = ({
  noLogo = false,
  children,
}) => {
  return (
    <ParallaxWrapper>
      <Parallax>
        <Header noLogo={noLogo} />
        {children}
        <Footer />
      </Parallax>
    </ParallaxWrapper>
  )
}

export default Layout

const ParallaxWrapper = styled.div`
  height: 100vh;
  overflow-x: hidden;
  overflow-y: auto;
  perspective: 2px;
`

const Parallax = styled.div`
  height: 100vh;

  ::after {
    background-image: url(/images/supercluster-bg-mobile.jpg);

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
    background-size: cover;
    /* Keep the image from overlapping sibling elements. */
    z-index: -1;
  }
  
  @media ${devices.tablet} {
    ::after {
      background-image: url(/images/supercluster-bg-desktop.jpg);
    }
  }
`
