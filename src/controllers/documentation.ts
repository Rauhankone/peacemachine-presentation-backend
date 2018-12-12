import { Response, Request, NextFunction } from 'express'
import { readFile } from 'fs'

export const getUserDocumentation = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  readFile('./USERMANUAL.md', 'utf8', (err: Error, data: Buffer) => {
    if (err) {
      return res.send({ error: err })
    }
    res.send(data)
  })
}
