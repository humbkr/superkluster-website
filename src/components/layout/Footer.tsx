import React from 'react'
import styled from 'styled-components'
import SocialLinks from '@src/components/layout/SocialLinks'
import { Link, paths } from '@src/modules/navigation'
import OutboundLink from '@src/modules/analytics/OutboundLink'
import devices from '@src/theme/breakpoints'
import useTranslation from '@src/modules/i18n/useTranslation'

const Footer: React.FC = () => {
  const { t } = useTranslation()

  return (
    <Container>
      <Content>
        <First>
          <picture>
            <source
              srcSet={require('@public/images/logo-text-wide.png?webp')}
              type="image/webp"
            />
            <source
              srcSet={require('@public/images/logo-text-wide.png')}
              type="image/png"
            />
            <Logo
              src={require('@public/images/logo-text-wide.png')}
              alt="SuperKluster"
            />
          </picture>
          <SocialLinks />
        </First>
        <Second>
          <nav>
            <Title>{t('footer.navTitle')}</Title>
            <Ul>
              <li>
                <Link href={paths.homepage}>{t('navigation.main.home')}</Link>
              </li>
              <li>
                <Link href={paths.concerts}>{t('navigation.main.live')}</Link>
              </li>
              <li>
                <Link href={paths.contact}>{t('navigation.main.contact')}</Link>
              </li>
              <li>
                <Link href={paths.legals}>{t('navigation.footer.legals')}</Link>
              </li>
            </Ul>
          </nav>
          <Friends>
            <Title>{t('footer.friends')}</Title>
            <FriendsList>
              <Ul>
                <li>
                  <OutboundLink
                    to={paths.friendsMCustom}
                    label="friends_mcustom"
                    target="_blank"
                    rel="noopener nofollow"
                  >
                    M Custom guitars
                  </OutboundLink>
                </li>
                <li>
                  <OutboundLink
                    to={paths.friendsSPCustom}
                    label="friends_muffdiver"
                    target="_blank"
                    rel="noopener nofollow"
                  >
                    SP Custom pickups
                  </OutboundLink>
                </li>
                <li>
                  <OutboundLink
                    to={paths.friendsStudioCerisier}
                    label="friends_studiocerisier"
                    target="_blank"
                    rel="noopener nofollow"
                  >
                    Le studio du cerisier
                  </OutboundLink>
                </li>
                <li>
                  <OutboundLink
                    to={paths.friendsRavenWhiteTattoo}
                    label="friends_ravenwhitetattoo"
                    target="_blank"
                    rel="noopener nofollow"
                  >
                    Raven White Tatoo
                  </OutboundLink>
                </li>
              </Ul>
              <Ul>
                <li>
                  <OutboundLink
                    to={paths.friendsDirtyGreed}
                    label="friends_dirtygreed"
                    target="_blank"
                    rel="noopener nofollow"
                  >
                    Dirty Greed
                  </OutboundLink>
                </li>
                <li>
                  <OutboundLink
                    to={paths.friendsMuffDiver}
                    label="friends_muffdiver"
                    target="_blank"
                    rel="noopener nofollow"
                  >
                    Muffdiver
                  </OutboundLink>
                </li>
              </Ul>
            </FriendsList>
          </Friends>
        </Second>
        <Third>Copyright © {new Date().getFullYear()} SuperKluster</Third>
      </Content>
    </Container>
  )
}

export default Footer

const Container = styled.footer`
  padding-bottom: 3rem;
  background-color: ${(props) => props.theme.colors.primary.background};
`
const Content = styled.div`
  max-width: ${(props) => props.theme.layout.content.maxWidth};
  margin: 0 auto;
`
const First = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  border-bottom: 1px solid #575757;
  padding: 2.5rem 0 2.2rem;

  @media ${devices.tablet} {
    flex-direction: initial;
    padding: 0 ${(props) => props.theme.layout.content.minSidePadding};
    min-height: 8rem;
  }

  @media ${devices.laptop} {
    padding: 0;
  }
`
const Logo = styled.img`
  height: 2.5rem;
  margin-bottom: 2rem;

  @media ${devices.tablet} {
    height: 3rem;
    margin-bottom: 0;
  }
`
const Second = styled.div`
  padding: 3rem ${(props) => props.theme.layout.content.minSidePadding};
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  font-size: 2rem;

  a {
    color: ${(props) => props.theme.colors.primary.text};
    opacity: 0.6;
    cursor: pointer;
    text-decoration: none;

    :hover {
      opacity: 1;
    }
  }

  @media ${devices.tablet} {
    flex-direction: initial;
    font-size: 1.6rem;
  }
`
const Ul = styled.ul`
  list-style-type: none;

  li {
    margin-bottom: 1.2rem;
  }

  @media ${devices.tablet} {
    li {
      margin-bottom: 1rem;
    }
  }
`
const Title = styled.p`
  margin-bottom: 1.5rem;
  font-size: 2.2rem;
  font-weight: bold;

  @media ${devices.tablet} {
    font-size: 1.8rem;
  }
`
const Friends = styled.div`
  margin-top: 3rem;

  @media ${devices.tablet} {
    margin-left: 20rem;
    margin-top: 0;
  }
`
const FriendsList = styled.div`
  ul {
    margin-right: 3rem;
  }

  @media ${devices.tablet} {
    display: flex;
  }
`
const Third = styled.p`
  text-align: center;
  font-size: 1.2rem;
`
