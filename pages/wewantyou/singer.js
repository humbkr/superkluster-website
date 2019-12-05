import React from 'react'
import styled from 'styled-components'
import SimpleAudioPlayer from '../../components/player/SimpleAudioPlayer'

const playlist = [
  {
    title: 'Stoned',
    url: '../../static/audio/crappyDemo/01-stoned.mp3',
  },
  {
    title: 'Hard Coarse',
    url: '../../static/audio/crappyDemo/02-hard-coarse.mp3',
  },
  {
    title: 'Toolbox',
    url: '../../static/audio/crappyDemo/03-toolbox.mp3',
  },
]

export default () => (
  <div>
    <PageHeader>
      <div />
      <PageTitle>We want you.</PageTitle>
      <ArrowDown src="/static/images/chevron-down.png" width={40} />
    </PageHeader>
    <Section>
      <Subtitle>
        <h2>SuperKluster cherche son chanteur!</h2>
      </Subtitle>
      <Content>
        <div>
          <ul>
            <li>Tu sais chanter juste et en rythme</li>
            <li>Tu sais aussi beugler quand il faut</li>
            <li>
              Tu veux faire de la scène et jouer avec des gens pas prise de tête
            </li>
            <li>
              Tu aimes boire des bières après les répèts (ou avant / entre /
              pendant)
            </li>
          </ul>
          <p>Alors tu es le type de personne qu&apos;on recherche!</p>
        </div>
        <div>
          <p>
            Nos influences sont variées, pour faire simple tant que c&apos;est
            gras et que ca envoi, on joue.
          </p>
          <p>
            Le style musical du groupe se définira tout seul au fil du temps,
            pour te faire une idée de ce qu&apos;on a pour le moment voici une:
          </p>
          <DemoHeader>
            <FancySeparator src="/static/images/fancy-separator.png" />
            <DemoTitle>
              Démo pourrave enregistrée à l&apos;arrache en répèt
            </DemoTitle>
            <FancySeparator src="/static/images/fancy-separator.png" flipY />
          </DemoHeader>
          <SimpleAudioPlayer playlist={playlist} />
        </div>
        <Contact>
          <ContactTitle>Contact</ContactTitle>
          <ContactItem>
            <h4>Facebook</h4>
            <a href="https://www.facebook.com/julien.dirtygreed">
              https://www.facebook.com/julien.dirtygreed
            </a>
          </ContactItem>
          <div>
            <h4>Mail</h4>
            <a href="mailto:superkluster.band@gmail.com">
              superkluster.band@gmail.com
            </a>
          </div>
        </Contact>
      </Content>
    </Section>
  </div>
)

const PageHeader = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  height: 80vh;
`

const PageTitle = styled.h1`
  font-size: 60px;
  text-align: center;
  max-width: 80%;
`
const ArrowDown = styled.img`
  margin-bottom: 30px;
`

const Subtitle = styled.div`
  background-color: ${(props) => props.theme.colors.background};
  height: 20vh;
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
`

const Section = styled.div`
  background-color: ${(props) => props.theme.colors.background};
  color: ${(props) => props.theme.text.color};
  min-height: 100vh;
  padding: 0 20px 50px;

  a {
    color: lightsteelblue;
  }
`
const Content = styled.div`
  margin: 0 auto;
  max-width: ${(props) => props.theme.layout.content.maxWidth};

  h3 {
    text-align: center;
  }
`
const Contact = styled.div`
  margin-top: 50px;
`

const ContactTitle = styled.h3`
  margin-bottom: 30px;
`

const ContactItem = styled.div`
  margin-bottom: 20px;
`
const DemoHeader = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 50px 0 30px;
`
const DemoTitle = styled.h3`
  margin: 15px 0;
  padding: 0;
`
const FancySeparator = styled.img`
  width: 200px;
  ${(props) => (props.flipY ? 'transform: scaleY(-1) scaleX(-1);' : '')}
`
