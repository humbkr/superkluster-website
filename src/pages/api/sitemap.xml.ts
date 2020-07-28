import { NextApiRequest, NextApiResponse } from 'next'
import { SitemapStream, streamToPromise, EnumChangefreq } from 'sitemap'
import { createGzip } from 'zlib'

// eslint-disable-next-line consistent-return
export default async (req: NextApiRequest, res: NextApiResponse) => {
  if (!res) return {}

  try {
    // Set response header
    res.setHeader('content-type', 'application/xml')
    res.setHeader('Content-Encoding', 'gzip')

    // A Transform for turning a Readable stream of either SitemapItemOptions or url strings
    // into a Sitemap. The readable stream it transforms must be in object mode.
    const smStream = new SitemapStream({
      hostname: process.env.NEXT_PUBLIC_BASE_URL,
    })

    const pipeline = smStream.pipe(createGzip())
    // Add any static entries here.
    smStream.write({ url: '/', changefreq: EnumChangefreq.WEEKLY, priority: 1 })

    // Generate entries for other pages here.

    smStream.end()

    streamToPromise(pipeline)
    pipeline.pipe(res).on('error', (e) => {
      throw e
    })
  } catch (e) {
    res.status(500).end()
  }
}
