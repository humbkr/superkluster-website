import React from 'react'
import styled from 'styled-components'
import Head from '@src/components/common/Head'
import Layout, { HeaderSize } from '@src/components/layout/Layout'
import { PlaylistItem } from '@src/types/Playlist'
import AudioPlayer from '@src/modules/player'
import devices from '@src/theme/breakpoints'
import useTranslation from '@src/modules/i18n/useTranslation'
import { paths } from '@src/modules/navigation'

const playlist: PlaylistItem[] = [
  {
    title: 'Defects',
    url:
      'https://static.superkluster.com/audio/demo2020/superkluster-01-defects.mp3',
  },
  {
    title: 'Exploiters',
    url:
      'https://static.superkluster.com/audio/demo2020/superkluster-02-exploiters.mp3',
  },
  {
    title: 'My Mindfield',
    url:
      'https://static.superkluster.com/audio/demo2020/superkluster-03-my-mindfield.mp3',
  },
]

const Index: React.FC = () => {
  const { t } = useTranslation()

  return (
    <>
      <Head
        title={t('home.metadata.title')}
        description={t('home.metadata.description')}
      />
      <Layout
        noLogo
        headerContent={(
          <BandName data-testid="home-bandname">
            <picture>
              <source
                srcSet={require('@public/images/logo-image.png?webp')}
                type="image/webp"
              />
              <source
                srcSet={require('@public/images/logo-image.png')}
                type="image/png"
              />
              <LogoImage
                src={require('@public/images/logo-image.png')}
                alt={t('home.logoImageAlt')}
              />
            </picture>
            <H1>
              <picture>
                <source
                  srcSet={require('@public/images/logo-text-narrow.png?webp')}
                  type="image/webp"
                />
                <source
                  srcSet={require('@public/images/logo-text-narrow.png')}
                  type="image/png"
                />
                <LogoText
                  src={require('@public/images/logo-text-narrow.png')}
                  alt="SuperKluster"
                />
              </picture>
            </H1>
          </BandName>
        )}
        headerSize={HeaderSize.Wide}
      >
        <FatCore data-testid="home-fatcore">
          <H2>{t('home.tagline')}</H2>
        </FatCore>
        <Music data-testid="home-music">
          <Description>{t('home.bandDescription')}</Description>
          <DemoText>{t('home.playerText')}</DemoText>
          <PlayerWrapper>
            <AudioPlayer playlist={playlist} canChangeVolume={false} />
          </PlayerWrapper>
          <DemoDescription>
            Made with love in Toulouse, France / Mixed & mastered by Frederic
            Badia / Produced by Superkluster
          </DemoDescription>
          <Licence href={paths.licence} target="_blank" rel="noreferrer">
            <CCAtribution />
            <CCNonCommercial />
            <CCNoDerivatives />
            <LicenceLink>CC BY-NC-ND</LicenceLink>
          </Licence>
        </Music>
      </Layout>
    </>
  )
}

export default Index

const Section = styled.section`
  position: relative;
`
const BandName = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  height: 100%;

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
const FatCore = styled(Section)`
  height: 35rem;
  background-color: ${(props) => props.theme.colors.primary.background};
  background-image: url('${require('@public/images/home/basses-small.jpg?webp')}');
  background-repeat: no-repeat;
  background-size: 100%;
  background-position: center center;
  filter: grayscale(100%);
  display: flex;
  align-items: center;
  justify-content: center;
  text-shadow: 1px 1px 4px rgba(150, 150, 150, 1);
  
  // Safari only.
  @media not all and (min-resolution:.001dpcm) { @supports (-webkit-appearance:none) {
    background-image: url('${require('@public/images/home/basses-small.jpg')}');
  }}

  @media ${devices.tablet} {
    background-image: url('${require('@public/images/home/basses-medium.jpg?webp')}');
    height: 50rem;
    
    // Safari only.
    @media not all and (min-resolution:.001dpcm) { @supports (-webkit-appearance:none) {
      background-image: url('${require('@public/images/home/basses-medium.jpg')}');
    }}
  }

  @media ${devices.laptop} {
    background-image: url('${require('@public/images/home/basses-large.jpg?webp')}');
    
    // Safari only.
    @media not all and (min-resolution:.001dpcm) { @supports (-webkit-appearance:none) {
      background-image: url('${require('@public/images/home/basses-large.jpg')}');
    }}
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

  @supports not (-webkit-touch-callout: none) {
    // CSS for all browser except Safari IOS.
    ::after {
      /* Display and position the pseudo-element */
      content: ' ';
      position: absolute;
      top: 5rem;
      right: 0;
      bottom: 0;
      left: 0;
      transform: translateZ(-1px) scale(2.5);
      background-color: ${(props) => props.theme.colors.accentTypeOne.background};
      background-image: url('${require('@public/images/grunge-texture.png?webp')}');
      background-size: cover;
      z-index: -1;
    }
    
    // Safari only.
    @media not all and (min-resolution:.001dpcm) { @supports (-webkit-appearance:none) {
      ::after {
        background-image: url('${require('@public/images/grunge-texture.png')}');
      }
    }}
  }

  @supports (-webkit-touch-callout: none) {
    // CSS specific to iOS devices.
    // Parallax effects are broken since ios 13.
    background-color: ${(props) => props.theme.colors.accentTypeOne.background};
    background-image: url('${require('@public/images/grunge-texture.png')}');
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
const DemoDescription = styled.p`
  font-size: 1.3rem;
  margin-top: 2rem;
  color: #8d888c;
`
const Licence = styled.a`
  color: #8d888c;
  margin-top: 1rem;
  text-decoration: none;
  
  > span {
    display: inline-block;
    width: 13px;
    height: 13px;
    background-image: url('${require('@public/images/CC-strip.png')}');
    background-repeat: no-repeat;
    background-size: 65px 13px;
    margin: 0 1px -3px;
  }
`
const CCAtribution = styled.span`
  background-position: 0 0;
`
const CCNonCommercial = styled.span`
  background-position: -13px 0;
`
const CCNoDerivatives = styled.span`
  background-position: -26px 0;
`
const LicenceLink = styled.div`
  margin-left: 0.5rem;
  display: inline;
`
