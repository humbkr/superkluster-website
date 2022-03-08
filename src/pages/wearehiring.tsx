import React from 'react'
import styled from 'styled-components'
import Head from '@src/components/common/Head'
import Layout, { HeaderSize } from '@src/components/layout/Layout'
import useTranslation from '@src/modules/i18n/useTranslation'
import { PlaylistItem } from '@src/types/Playlist'
import AudioPlayer from '@src/modules/player'
import devices from '@src/theme/breakpoints'
import { Link, paths } from '@src/modules/navigation'

const playlist: PlaylistItem[] = [
  {
    title: 'Defects',
    url: 'https://static.superkluster.com/audio/hiring/defects.mp3',
  },
  {
    title: 'My Mindfield',
    url: 'https://static.superkluster.com/audio/hiring/my-mind-field.mp3',
  },
  {
    title: 'Compo 7',
    url: 'https://static.superkluster.com/audio/hiring/compo-7.mp3',
  },
  {
    title: 'Compo 5',
    url: 'https://static.superkluster.com/audio/hiring/compo-5.mp3',
  },
  {
    title: 'Exploiters',
    url: 'https://static.superkluster.com/audio/hiring/exploiters.mp3',
  },
]

const WeAreHiring: React.FC = () => {
  const { t } = useTranslation()

  return (
    <>
      <Head
        title={t('hiring.metadata.title')}
        description={t('hiring.metadata.description')}
      />
      <Layout
        headerContent={(
          <TitleSection data-testid="hiring-title">
            <H1>{t('hiring.pageTitle')}</H1>
          </TitleSection>
        )}
      >
        <PageWrapper>
          <Content>
            <P>Superkluster recrute un chanteur !</P>
            <P>
              Nous avons actuellement une douzaine de compos en place niveau
              instrumental, et nous comptons autoproduire un EP avant la fin de
              l&apos;année.
              <br />
              Des concerts sont aussi à prévoir dès que le groupe sera au
              complet.
            </P>
            <P>
              Pas de prise de tête au niveau du style de chant, tu as carte
              blanche pour écrire tes paroles et construire tes lignes comme tu
              le souhaites, y compris sur les compos déjà existantes.
            </P>
            <P>Nous demandons juste que tu te sentes à l&apos;aise pour:</P>
            <ul>
              <li>chanter en anglais</li>
              <li>alterner le growl et le chant</li>
            </ul>
            <P>
              Choisis une ou deux compos et dès que tu es prêt viens poser ton
              chant en répèt, puis viens boire un coup avec nous en suivant :)
            </P>
            <P>Quelques instrus pour t&apos;entrainer:</P>
            <PlayerWrapper>
              <AudioPlayer playlist={playlist} canChangeVolume={false} />
            </PlayerWrapper>
            <P>
              Répèts le mardi ou jeudi coté rive gauche à 5 minutes à pied du
              métro Fontaine l&apos;Estang.
            </P>
            <P>
              Si le projet te plait, tu peux nous contacter{' '}
              <Link href={paths.contact}>ici</Link> ou en écrivant à
              superkluster+hiring@gmail.com !
            </P>
          </Content>
        </PageWrapper>
      </Layout>
    </>
  )
}

export default WeAreHiring

const TitleSection = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  height: 60vh;
`
const H1 = styled.h1`
  text-align: center;
  font-size: 6rem;
`
const PageWrapper = styled.div`
  background-color: black;
`
const Content = styled.div`
  padding: 4rem ${(props) => props.theme.layout.content.minSidePadding};
  max-width: 68rem;
  margin: 0 auto;
  font-size: 1.7rem;
  background-color: black;

  ul {
    margin-bottom: 20px;

    li {
      margin-left: 40px;
    }
  }

  a {
    color: ${(props) => props.theme.colors.links};
  }
`
const P = styled.p`
  margin-bottom: 20px;
`
const PlayerWrapper = styled.div`
  width: 100%;
  max-width: 600px;
  margin: 0 auto 20px;

  @media ${devices.tablet} {
    width: 90%;
  }
`
