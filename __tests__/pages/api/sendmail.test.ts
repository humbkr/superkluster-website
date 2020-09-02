import http from 'http'
import listen from 'test-listen'
import { apiResolver } from 'next/dist/next-server/server/api-utils'
import fetch from 'isomorphic-fetch'
import SendGrid from '@sendgrid/mail'
import handler from '@src/pages/api/sendmail'

jest.mock('@sendgrid/mail', () => ({
  setApiKey: jest.fn(),
  send: jest.fn(),
}))

async function callApi(body: any) {
  const requestHandler = (req, res) => {
    return apiResolver(req, res, undefined, handler, undefined)
  }

  const server = http.createServer(requestHandler)
  const url = await listen(server)
  const response = await fetch(url, {
    method: 'POST',
    cache: 'no-cache',
    credentials: 'same-origin',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(body),
  })

  server.close()

  return response
}

describe('/api/sendmail handler', () => {
  beforeEach(() => jest.resetAllMocks())

  it('returns an http 400 error when one of the parameters is missing', async () => {
    const response = await callApi({
      email: 'test@test.com',
      subject: 'gig',
    })

    expect(response.status).toBe(400)

    const response2 = await callApi({
      email: 'test@test.com',
      text: 'Test',
    })

    expect(response2.status).toBe(400)

    const response3 = await callApi({
      subject: 'gig',
      text: 'Test',
    })

    expect(response3.status).toBe(400)
  })

  it('calls Sendgrid API if parameters are valid', async () => {
    const response = await callApi({
      email: 'test@test.com',
      subject: 'gig',
      text: 'Test',
    })

    expect(response.status).toBe(200)
    expect(SendGrid.send).toHaveBeenCalledTimes(1)

    const response2 = await callApi({
      email: 'test@test.com',
      subject: 'info',
      text: 'Test',
    })

    expect(response2.status).toBe(200)
    expect(SendGrid.send).toHaveBeenCalledTimes(2)

    const response3 = await callApi({
      email: 'test@test.com',
      subject: 'other',
      text: 'Test',
    })

    expect(response3.status).toBe(200)
    expect(SendGrid.send).toHaveBeenCalledTimes(3)
  })

  it('returns an http 500 error if a problem occurs during sending the info to SendGrid', async () => {
    SendGrid.send.mockImplementationOnce(() => {
      // eslint-disable-next-line no-throw-literal
      throw 'Sendgrid error'
    })

    const response = await callApi({
      email: 'test@test.com',
      subject: 'gig',
      text: 'Test',
    })

    expect(response.status).toBe(500)
    expect(SendGrid.send).toHaveBeenCalledTimes(1)
  })
})
