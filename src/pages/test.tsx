import React from 'react'
import styled from 'styled-components'
import Head from 'next/head'
import Layout from '@src/components/layout/Layout'
import { PlaylistItem } from '@src/types/Playlist'
import SimpleAudioPlayer from '@src/components/player/SimpleAudioPlayer'
import devices, { deviceSizes } from '@src/theme/breakpoints'
import Header from '@src/components/layout/Header'
import Footer from '@src/components/layout/Footer'

const playlist: PlaylistItem[] = [
  {
    title: 'Stoned',
    url: '/audio/crappyDemoWithSinger/01-stoned.mp3',
  },
  {
    title: 'Hard Coarse',
    url: '/audio/crappyDemoWithSinger/02-hard-coarse.mp3',
  },
  {
    title: 'Toolbox',
    url: '/audio/crappyDemoWithSinger/03-toolbox.mp3',
  },
]

const Index: React.FC = () => (
  <Container>
    <Header noLogo />
    <BandName>
      <LogoImage src="/images/logo-image.png" alt="Skull octopus"/>
      <H1><LogoText src="/images/logo-text-narrow.png" alt="Superkluster" /></H1>
    </BandName>
    <FatCore>
      <H2>we make FatCore</H2>
    </FatCore>
    <Music>
      <Description>
        Superkluster: quatre musiciens, deux basses, du gros son dans tes oreilles.
      </Description>
      <DemoText>Découvrez <i>Defects</i>, notre première démo</DemoText>
      <PlayerWrapper>
        <SimpleAudioPlayer playlist={playlist} />
      </PlayerWrapper>
    </Music>
    <Footer />
  </Container>
)

export default Index

const Container = styled.section`
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
  ::after {
    /* Display and position the pseudo-element */
    content: " ";
    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    transform: translateZ(-1px) scale(1.5);
    background-size: cover;
    z-index: -1;
  }
`
const BandName = styled(Parallax)`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  height: 90vh;
  
  ::after {
    top: -5rem;
    background-image: url('/images/supercluster-bg-mobile.jpg');
  }
  
  @media ${devices.tablet} {
    flex-direction: initial;
    
    ::after {
      top: -5rem;
      background-image: url('/images/supercluster-bg-desktop.jpg');
    }
  }
`
const H1 = styled.h1`
  text-align: center;
`
const LogoImage = styled.img`
  max-width: 22rem;
  padding-bottom: 2rem;
  
  @media ${devices.tablet} {
    max-width: 30rem;
    padding-bottom: 0;
  }
`
const LogoText = styled.img`
  max-width: 80%;

  @media ${devices.tablet} {
    max-width: 400px;
  }
`
const FatCore = styled(Section)`
  height: 35rem;
  background-color: ${(props) => props.theme.colors.primary.background};
  background-image: url("/images/home/band-small.jpg");
  background-repeat: no-repeat;
  background-size: 100%;
  filter: grayscale(100%);
  display: flex;
  align-items: center;
  justify-content: center;
  
  @media ${devices.tablet} {
    background-image: url("/images/home/band-medium.jpg");
    height: 50rem;
  }
  
  @media ${devices.laptop} {
    background-image: url("/images/home/band-large.jpg");
  }
`
const H2 = styled.h2`
  font-size: 4rem;
  font-weight: bold;
  text-align: center;
  
  @media ${devices.tablet} {
    font-size: 6rem;
  }
`
const Music = styled.section`
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 3rem ${(props) => props.theme.layout.minSidePadding};
  
  ::after {
    /* Display and position the pseudo-element */
    content: " ";
    position: absolute;
    top: 5rem;
    right: 0;
    bottom: 0;
    left: 0;
    transform: translateZ(-1px) scale(2.5);
    background-color: ${(props) => props.theme.colors.accentTypeOne.background};
    background-image: url('/images/grunge-texture.svg');
    background-size: cover;
    z-index: -1;
  }

  @media ${devices.tablet} {
    padding: 9rem ${(props) => props.theme.layout.minSidePadding};
  }
`
const Description = styled.p`
  font-size: 2.5rem;
  font-weight: bold;
  margin-bottom: 3.5rem;
  
  @media ${devices.tablet} {
    text-align: center;
    font-size: 3rem;
    margin-bottom: 5rem;
  }
`
const DemoText = styled.h3`
  font-size: 2.2rem;
  font-weight: normal;
  margin-bottom: 2rem;
  
  @media ${devices.tablet} {
    font-size: 2.6rem;
  }
`
const PlayerWrapper = styled.div`
  width: 100%;
  max-width: 600px;
  margin: 0 auto;
  
  @media ${devices.tablet} {
    width: 90%;
  }
`
