import React from 'react'
import styled from 'styled-components'
import useTranslation from '@src/modules/i18n/useTranslation'
import Head from '@src/components/common/Head'
import Layout from '@src/components/layout/Layout'

const Pro: React.FC = () => {
  const { t } = useTranslation()

  return (
    <>
      <Head
        title={t('pro.metadata.title')}
        description={t('pro.metadata.description')}
      />
      <Layout
        headerContent={(
          <TitleSection data-testid="pro-title">
            <H1>{t('pro.pageTitle')}</H1>
          </TitleSection>
        )}
      >
        <Content>
          <Section>
            <H2>{t('pro.rider')}</H2>
            <ExternalLink
              href="https://static.superkluster.com/documents/superkluster-rider-fr-20201020.pdf"
              target="_blank"
              rel="noreferrer"
            >
              superkluster-rider-20201020.pdf
            </ExternalLink>
          </Section>
          <Section>
            <H2>{t('pro.demo.title')}</H2>
            <ExternalLink
              href="https://static.superkluster.com/audio/demo2020/superkluster-demo-2020.zip"
              target="_blank"
              rel="noreferrer"
            >
              {t('pro.demo.download')}
            </ExternalLink>
          </Section>
        </Content>
      </Layout>
    </>
  )
}

export default Pro

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
const Content = styled.div`
  background-color: ${(props) => props.theme.colors.primary.background};
  padding: 5rem 2rem;
`
const Section = styled.section`
  max-width: 70rem;
  margin: 0 auto 5rem;
`
const H2 = styled.h2`
  font-size: 2.4rem;
  margin-bottom: 0.5rem;
`
const ExternalLink = styled.a`
  color: ${(props) => props.theme.colors.links};
  font-size: 2rem;
  text-decoration: none;
  cursor: pointer;

  :hover {
    text-decoration: underline;
  }
`
