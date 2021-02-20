import type { NextApiRequest, NextApiResponse } from 'next'

export default (req: NextApiRequest, res: NextApiResponse) => {
  const { file } = req.body.input

  res.status(200).json({ filePath: file })
}
