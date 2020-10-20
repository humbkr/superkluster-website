import React from 'react'
import styled from 'styled-components'
import Head from '@src/components/common/Head'
import Layout from '@src/components/layout/Layout'
import useTranslation from '@src/modules/i18n/useTranslation'

const Legals: React.FC = () => {
  const { t } = useTranslation()

  return (
    <>
      <Head
        title={t('legals.metadata.title')}
        description={t('legals.metadata.description')}
      />
      <Layout
        headerContent={(
          <TitleSection data-testid="legals-title">
            <H1>{t('legals.pageTitle')}</H1>
          </TitleSection>
        )}
      >
        <Section>
          <Content>
            <P>
              Conformément aux dispositions de la loi n° 2004-575 du 21 juin
              2004 pour la confiance en l’économie numérique, il est précisé aux
              utilisateurs du site superkluster.com l’identité des différents
              intervenants dans le cadre de sa réalisation et de son suivi.
            </P>

            <H2>Edition du site</H2>
            <P>
              Le site superkluster.com est édité par le groupe Superkluster.
            </P>

            <H2>Responsable de publication</H2>
            <P>Superkluster</P>

            <H2>Hébergeur</H2>
            <P>
              Le Site est hébergé par Vercel dont le siège social est Walnut HQ,
              340 S Lemon Ave #4133 - USA.
              <br />
              <a href="https://vercel.com/">https://vercel.com/</a>
            </P>

            <H2>Cookies</H2>
            <P>
              Superkluster.com utilise des cookies. Ce faisant, le site est
              susceptible d’accéder à des informations déjà stockées dans votre
              équipement terminal de communications électroniques et d’y
              inscrire des informations.
            </P>
            <P>
              Les cookies utilisés par le site relèvent de deux catégories :
            </P>
            <ul>
              <li>
                cookies dits strictement nécessaires, qui ne nécessitent pas
                votre consentement préalable
              </li>
              <li>autres cookies soumis à votre consentement préalable</li>
            </ul>

            <H3>1 - Cookies exemptés de consentement préalable</H3>
            <P>
              Nous utilisons ces cookies pour permettre et faciliter la
              navigation sur le site notamment en mémorisant vos préférences de
              navigation définies au cours de votre session.
            </P>
            <P>
              Ces cookies ne peuvent pas, techniquement, être désactivés depuis
              le site. Vous pouvez néanmoins vous opposer à l’utilisation de ces
              cookies, exclusivement en paramétrant votre navigateur. Ce
              paramétrage dépend du navigateur que vous utilisez, mais il est en
              général simple à réaliser : en principe, vous pouvez soit activer
              une fonction de navigation privée soit uniquement interdire ou
              restreindre les cookies (cookies). Attention, il se peut que des
              cookies aient été enregistrés sur votre périphérique avant le
              paramétrage de votre navigateur : dans ce cas, effacez votre
              historique de navigation, toujours en utilisant le paramétrage de
              votre navigateur.
            </P>

            <H3>2 - Cookies soumis à votre consentement préalable</H3>
            <P>
              Le site utilise des cookies sous notre contrôle et d’autres placés
              sous le contrôle de tiers, qui sont soumis à votre consentement
              préalable.
            </P>

            <H4>2.1 - Cookies sous notre contrôle</H4>
            <P>
              Nous utilisons ces cookies dans le but de récolter des données
              statistiques (nombre de visites, pages vues, ...) Nous n’utilisons
              pas vos données à des fins marketing.
              <br />
              Vous pouvez vous opposer à l’utilisation de ces traceurs en
              paramétrant votre navigateur ou en utilisant les fonctions
              proposées par le site (bandeau cookies).
            </P>

            <H4>2.2 - Traceurs sous le contrôle de tiers</H4>
            <P>
              Ces traceurs sont utilisés pas des services externes (Youtube,
              ...) et ne sont pas sous notre contrôle.
              <br />
              Vous pouvez vous opposer à l’utilisation de ces traceurs en
              paramétrant votre navigateur ou en vous rapprochant du tiers
              concerné.
            </P>

            <P>
              L’utilisation des traceurs est régie par l’article 32 II de la loi
              n° 78-17 du 6 janvier 1978, transposant l’article 5.3 de la
              directive 2002/58/CE du parlement européen et du conseil du 12
              juillet 2002 modifiée par la directive 2009/136/CE.
            </P>
            <P>
              Pour en savoir plus sur les cookies et traceurs, nous vous
              invitons à consulter le site de la CNIL :{' '}
              <a href="https://www.cnil.fr">https://www.cnil.fr</a>.
            </P>
          </Content>
        </Section>
      </Layout>
    </>
  )
}

export default Legals

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
const H2 = styled.h2`
  font-size: 2.3rem;
  font-weight: bold;
  margin: 1.5rem 0 2rem;
`
const H3 = styled.h3`
  font-size: 2.2rem;
  font-weight: bold;
  margin: 1rem 0 2rem;
`
const H4 = styled.h3`
  font-size: 2rem;
  font-weight: bold;
  margin: 1rem 0 2rem;
`
const Section = styled.section`
  background-color: ${(props) => props.theme.colors.primary.background};

  ul {
    margin: 2rem 2rem 2rem 6rem;
  }

  li {
    font-size: 1.5rem;
  }
`
const Content = styled.div`
  max-width: 70rem;
  margin: 0 auto;
  padding: 5rem 2rem;
`
const P = styled.p`
  font-size: 1.6rem;
  margin-bottom: 3rem;
  line-height: 2.5rem;

  a {
    color: #fff;
  }
`
