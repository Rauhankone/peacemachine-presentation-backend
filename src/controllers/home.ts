import { Response, Request, NextFunction } from 'express'

export const index = (req: Request, res: Response, next: NextFunction) => {
  res.send(`It's working!!!`)
}
