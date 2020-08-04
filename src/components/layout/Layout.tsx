import React from 'react'
import styled from 'styled-components'
import devices, { deviceSizes } from '@src/theme/breakpoints'
import Header from './Header'
import Footer from './Footer'

export enum HeaderSize {
  Wide,
  Normal,
}

const Layout: React.FC<{
  noLogo?: boolean
  headerContent: JSX.Element
  headerSize?: HeaderSize
}> = ({
  noLogo = false,
  headerContent,
  headerSize = HeaderSize.Normal,
  children,
}) => (
  <Container>
    <Header noLogo={noLogo} />
    <ContentHeader>{headerContent}</ContentHeader>
    <Content size={headerSize}>{children}</Content>
    <Footer />
  </Container>
)

export default Layout

const Container = styled.article`
  max-width: ${deviceSizes.desktop};
  height: 100vh;
  margin: 0 auto;
  overflow-x: hidden;
  overflow-y: auto;
  perspective: 2px;
`
const Section = styled.section`
  position: relative;
`
const Parallax = styled(Section)`
  height: 90vh;
  max-height: 100rem;

  ::after {
    /* Display and position the pseudo-element */
    content: ' ';
    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    transform: translateZ(-1px) scale(1.5);
    background-size: cover;
    background-position: top;
    z-index: -1;

    @supports (-webkit-touch-callout: none) {
      // CSS specific to iOS devices.
      // Parallax effects are broken since ios 13.
      transform: none;
      position: fixed;
    }
  }
`
const ContentHeader = styled(Parallax)`
  ::after {
    top: -5rem;
    background-image: url('${require('@public/images/supercluster-bg-mobile.jpg?webp')}');
  }
  
  // Safari only.
  @media not all and (min-resolution:.001dpcm) { @supports (-webkit-appearance:none) {
    ::after {
      background-image: url('${require('@public/images/supercluster-bg-mobile.jpg')}');
    }
  }}

  @media ${devices.tablet} {
    ::after {
      background-image: url('${require('@public/images/supercluster-bg-desktop.jpg?webp')}');
    }
    
    // Safari only.
    @media not all and (min-resolution:.001dpcm) { @supports (-webkit-appearance:none) {
      ::after {
        background-image: url('${require('@public/images/supercluster-bg-desktop.jpg')}');
      }
    }}

  @media ${devices.desktop} {
    ::after {
      top: -9rem;
    }
  }

  @media ${devices.wide} {
    ::after {
      top: -25rem;
    }
  }
`
const Content = styled.div`
  margin-top: ${(props) => (props.size === HeaderSize.Wide ? '0' : '-30vh')};

  @media ${devices.tablet} {
    margin-top: ${(props) => (props.size === HeaderSize.Wide ? '0' : '-40vh')};
  }
`
