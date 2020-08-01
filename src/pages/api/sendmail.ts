import { NextApiRequest, NextApiResponse } from 'next'
import Joi from 'joi'
import SendGrid from '@sendgrid/mail'

SendGrid.setApiKey(process.env.SENDGRID_API_KEY)

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  console.log(req)

  // Validate request.
  const schema = Joi.object({
    email: Joi.string().email().required(),
    subject: Joi.string().required(),
    text: Joi.string().required(),
  })

  const { error, value } = schema.validate(req.body)

  if (error) {
    res.status(400).json({
      error: {
        message: error.details[0].message,
      },
    })
    return
  }

  let subject: string
  switch (value.subject) {
    case 'gig':
      subject = 'Gig inquiry'
      break
    case 'info':
      subject = 'Gig inquiry'
      break
    default:
      subject = 'Other'
  }

  // Else call sendGrid.
  const msg = {
    to: process.env.EMAILS_RECIPIENT,
    from: value.email,
    subject: `Superkluster.com contact form: ${subject}`,
    text: value.text,
  }

  try {
    await SendGrid.send(msg)
    res.status(200).end()
  } catch (e) {
    console.error(error)
    res.status(500).json({
      error: {
        message: 'An error occurred while sending the mail.',
      },
    })
  }

  res.status(200)
}

export default handler
