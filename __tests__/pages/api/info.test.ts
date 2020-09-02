import http from 'http'
import listen from 'test-listen'
import { apiResolver } from 'next/dist/next-server/server/api-utils'
import fetch from 'isomorphic-fetch'
import handler from '@src/pages/api/info'
import info from '../../../package.json'

describe('/api/info handler', () => {
  it('responds 200 to a GET request and returns info from package.json', async () => {
    const requestHandler = (req, res) => {
      return apiResolver(req, res, undefined, handler, undefined)
    }

    const server = http.createServer(requestHandler)
    const url = await listen(server)
    const response = await fetch(url)

    expect(response.status).toBe(200)
    expect(await response.json()).toStrictEqual({ version: info.version })

    return server.close()
  })
})
