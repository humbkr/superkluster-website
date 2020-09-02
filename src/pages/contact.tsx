import React, { useState } from 'react'
import styled from 'styled-components'
import Head from '@src/components/common/Head'
import Layout from '@src/components/layout/Layout'
import { isValidEmail } from '@src/utils/strings'
import { paths } from '@src/modules/navigation'
import Button from '@src/components/common/Button'
import notifications from '@src/utils/notifications'
import useTranslation from '@src/modules/i18n/useTranslation'

const Contact: React.FC = () => {
  const [email, setEmail] = useState<string>('')
  const [subject, setSubject] = useState<string>('')
  const [text, setText] = useState<string>('')
  const [isSending, setIsSending] = useState<boolean>(false)

  const { t } = useTranslation()

  const handleFormSubmit = async (event: React.FormEvent) => {
    event.preventDefault()

    if (!email || !subject || !text) {
      notifications.show(t('contact.form.messages.errorRequired'))
      return
    }
    if (!isValidEmail(email)) {
      notifications.show(t('contact.form.messages.errorEmail'))
      return
    }

    // Else send the email request.
    setIsSending(true)

    try {
      const response = await fetch(paths.api.sendMail, {
        method: 'POST',
        cache: 'no-cache',
        credentials: 'same-origin',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, subject, text }),
      })

      if (response.status === 200) {
        notifications.show(t('contact.form.messages.messageSent'))
        setEmail('')
        setSubject('')
        setText('')
      } else {
        notifications.show(t('contact.form.messages.errorAPI'))
      }
      setIsSending(false)
    } catch (e) {
      notifications.show(t('contact.form.messages.errorAPI'))
    }
  }

  return (
    <>
      <Head
        title={t('contact.metadata.title')}
        description={t('contact.metadata.description')}
      />
      <Layout
        headerContent={(
          <TitleSection data-testid="contact-title">
            <H1>{t('contact.pageTitle')}</H1>
          </TitleSection>
        )}
      >
        <FormSection>
          <FormWrapper>
            <form onSubmit={handleFormSubmit} data-testid="contact-form">
              <FormElement>
                <Input
                  type="email"
                  id="email"
                  value={email}
                  onChange={(e) => setEmail(e.currentTarget.value)}
                  placeholder={t('contact.form.fields.email')}
                  data-testid="contact-form-email"
                  required
                />
              </FormElement>
              <FormElement>
                <Select
                  required
                  onChange={(e) => setSubject(e.currentTarget.value)}
                  value={subject}
                  data-testid="contact-form-subject"
                >
                  <option
                    value=""
                    disabled
                    data-testid="contact-form-subject-default"
                  >
                    {t('contact.form.fields.subject.placeholder')}
                  </option>
                  <option value="gig" data-testid="contact-form-subject-gig">
                    {t('contact.form.fields.subject.gig')}
                  </option>
                  <option value="info" data-testid="contact-form-subject-info">
                    {t('contact.form.fields.subject.info')}
                  </option>
                  <option
                    value="other"
                    data-testid="contact-form-subject-other"
                  >
                    {t('contact.form.fields.subject.other')}
                  </option>
                </Select>
              </FormElement>
              <FormElement>
                <Textarea
                  required
                  onChange={(e) => setText(e.currentTarget.value)}
                  value={text}
                  placeholder={t('contact.form.fields.text')}
                  data-testid="contact-form-text"
                />
              </FormElement>
              <FormActions>
                <Button
                  loading={isSending}
                  submitButton
                  data-testid="contact-form-submit"
                >
                  {t('contact.form.actions.send')}
                </Button>
              </FormActions>
            </form>
          </FormWrapper>
        </FormSection>
      </Layout>
    </>
  )
}

export default Contact

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
const FormSection = styled.div`
  overflow: hidden;
  position: relative;
  width: 100%;

  @supports not (-webkit-touch-callout: none) {
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
      background-image: url('/images/grunge-texture.png');
      background-size: cover;
      z-index: -1;
    }
  }

  @supports (-webkit-touch-callout: none) {
    // CSS specific to iOS devices.
    // Parallax effects are broken since ios 13.
    background-color: ${(props) => props.theme.colors.accentTypeOne.background};
    background-image: url('/images/grunge-texture.png');
  }
`
const FormWrapper = styled.div`
  padding: 4rem ${(props) => props.theme.layout.content.minSidePadding};
  max-width: 68rem;
  margin: 0 auto;
  text-align: center;
`
const FormElement = styled.div`
  padding-bottom: 2rem;
`
const Input = styled.input`
  height: 3.5rem;
  border: 0;
  border-radius: 5px;
  padding: 0 1rem;
  width: 100%;
  font-size: 1.6rem;

  ::placeholder {
    color: #969696;
  }
`
const Select = styled.select`
  display: block;
  font-size: 1.6rem;
  padding: 0 1rem;
  width: 100%;
  max-width: 100%;
  height: 3.5rem;
  max-height: 100%;
  box-sizing: border-box;
  margin: 0;
  border: 0;
  border-radius: 5px;
  -moz-appearance: none;
  -webkit-appearance: none;
  appearance: none;
  background-image: url('/images/arrow-down.svg');
  background-repeat: no-repeat, repeat;
  background-position: right 0.7em top 50%, 0 0;
  background-size: 0.65em auto, 100%;

  ::-ms-expand {
    display: none;
  }

  :invalid,
  option[value=''] {
    color: #969696;
  }
`
const Textarea = styled.textarea`
  height: 20rem;
  border: 0;
  border-radius: 5px;
  padding: 1rem;
  width: 100%;
  font-size: 1.6rem;

  ::placeholder {
    color: #969696;
  }
`
const FormActions = styled.div`
  width: 100%;
  max-width: 30rem;
  margin: 0 auto;
`
