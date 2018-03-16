import { Response, Request, NextFunction } from 'express'

import * as watson from 'watson-developer-cloud'

const auth: any = new watson.AuthorizationV1({
  username: process.env.W_STT_USERNAME,
  password: process.env.W_STT_PASSWORD,
  url: 'https://stream.watsonplatform.net/speech-to-text/api'
})

const getAuthToken = () => {
  return new Promise((resolve, reject) => {
    auth.getToken((err: any, token: any) => {
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
    res.status(401).send({ error })
  }
}
