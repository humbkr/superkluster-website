import { NextApiRequest, NextApiResponse } from 'next'
import info from '../../../package.json'

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  res.status(200).json({
    version: info.version,
  })
}

export default handler
