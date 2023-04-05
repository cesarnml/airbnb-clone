import type { NextApiRequest, NextApiResponse } from 'next'

// eslint-disable-next-line import/no-anonymous-default-export
export default (req: NextApiRequest, res: NextApiResponse) => {
  throw new Error('API throw error test')
  res.status(200).json({ name: 'John Doe' })
}
