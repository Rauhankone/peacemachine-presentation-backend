import { Response, Request, NextFunction } from 'express'

import * as watson from 'watson-developer-cloud'

const auth: any = new watson.AuthorizationV1({
  username: process.env.W_USERNAME,
  password: process.env.W_PASSWORD,
  url: watson.SpeechToTextV1.URL
})

const getAuthToken = () => {
  return new Promise((resolve, reject) => {
    auth.getToken((err: any, token: string) => {
      if (!token) return reject(err)

      return resolve(token)
    })
  })
}

export const getToken = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const token = await getAuthToken()
    res.send({ token })
  } catch (error) {
    res.send({ error })
  }
}
