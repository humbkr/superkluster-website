import React from 'react'
import styled from 'styled-components'
import SimpleAudioPlayer from '../components/player/SimpleAudioPlayer'

const playlist = [
  {
    title: 'Stoned',
    url: '../../static/audio/crappyDemoWithSinger/01-stoned.mp3',
  },
  {
    title: 'Hard Coarse',
    url: '../../static/audio/crappyDemoWithSinger/02-hard-coarse.mp3',
  },
  {
    title: 'Toolbox',
    url: '../../static/audio/crappyDemoWithSinger/03-toolbox.mp3',
  },
]

export default () => (
  <div>
    <PageHeader>
      <div />
      <PageTitle>We make FatCore</PageTitle>
      <ArrowDown src="/static/images/chevron-down.png" width={40} />
    </PageHeader>
    <Section>
      <DemoHeader>
        <FancySeparator src="/static/images/fancy-separator.png" />
        <DemoTitle>
          Démo pourrave enregistrée à l&apos;arrache en répèt
        </DemoTitle>
        <FancySeparator src="/static/images/fancy-separator.png" flipY />
      </DemoHeader>
      <PlayerWrapper>
        <SimpleAudioPlayer playlist={playlist} />
      </PlayerWrapper>
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

const Section = styled.div`
  background-color: ${(props) => props.theme.colors.background};
  color: ${(props) => props.theme.text.color};
  min-height: 100vh;
  padding: 1px 20px 50px;

  a {
    color: lightsteelblue;
  }
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
const PlayerWrapper = styled.div`
  width: 90%;
  max-width: 600px;
  margin: 0 auto;
`
