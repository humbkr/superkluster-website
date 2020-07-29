import React from 'react'
import styled from 'styled-components'
import Head from 'next/head'
import Layout from '@src/components/layout/Layout'
import { PlaylistItem } from '@src/types/Playlist'
import SimpleAudioPlayer from '@src/components/player/SimpleAudioPlayer'
import devices from '@src/theme/breakpoints'

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
  <article>
    <Head>
      <title>SuperKluster - we make FatCore</title>
    </Head>
    <Layout noLogo>
      <BandName>
        <LogoImage src="/images/logo-image.png" alt="Skull octopus"/>
        <H1><LogoText src="/images/logo-text-narrow.png" alt="Superkluster" /></H1>
      </BandName>
      <FatCore>
        <H2>we make FatCore</H2>
      </FatCore>
      <MusicWrapper>
        <Music>
          <Description>
            Superkluster: quatre musiciens, deux basses, du gros son dans tes oreilles.
          </Description>
          <DemoText>Découvrez <i>Defects</i>, notre première démo</DemoText>
          <PlayerWrapper>
            <SimpleAudioPlayer playlist={playlist} />
          </PlayerWrapper>
        </Music>
      </MusicWrapper>
    </Layout>
  </article>
)

export default Index

const BandName = styled.section`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  height: 90vh;
  
  @media ${devices.tablet} {
    flex-direction: initial;
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
const FatCore = styled.section`
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
const MusicWrapper = styled.section`
  perspective: 2px;
`
const Music = styled.div`
  z-index: 1;
  -webkit-z-index: inherit;
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  //overflow: hidden;
  padding: 3rem ${(props) => props.theme.layout.minSidePadding};
  
  ::after {
    /* Display and position the pseudo-element */
    content: " ";
    position: absolute;
    top: -5rem;
    right: 0;
    bottom: -15rem;
    left: 0;
    transform: translateZ(-1px) scale(2.5);
    transform-style: preserve-3d;
    z-index: -1;
    
    background-color: ${(props) => props.theme.colors.accentTypeOne.background};
    background-repeat: repeat-x;
    background-size: cover;
    background-position: 100% 50%;
    background-image: url("/images/grunge-texture.svg");
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
