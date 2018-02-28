import { Response, Request, NextFunction } from 'express'
import { getDiscussion as discussion } from '../store/discussions'

export const getDiscussion = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const discussionQuery = discussion(req.query.id)

  if (discussionQuery) {
    res.send(discussionQuery)
  } else {
    res.status(404).send({
      error: `Discussion with id of ${req.query.id} could not be found`
    })
  }
}

export const getAllDiscussion = (
  req: Request,
  res: Response,
  next: NextFunction
) => {}
