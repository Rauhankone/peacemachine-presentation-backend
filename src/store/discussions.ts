import db from './db'

const CHANNELS_KEY = 'channels'

export const createDiscussion = (id: Channel['id']) => {
  console.log('creating a discussion')
  const initDiscussion: Channel = {
    transcript: '',
    wordCloud: null,
    tones: null,
    recording: false,
    candidate: false,
    id
  }

  db
    .get(CHANNELS_KEY)
    .push(initDiscussion)
    .write()
}

export const updateDiscussion = (
  id: Channel['id'],
  propName: keyof Channel,
  value: any
) => {
  console.log('updated discussion')
  db
    .get(CHANNELS_KEY)
    .find({ id })
    .set(propName, value)
    .write()
}

export const removeDiscussions = (criteria: any) => {
  console.log('remove discussions')
  db
    .get(CHANNELS_KEY)
    .remove(criteria)
    .write()
}

export const getDiscussion = (id: Channel['id']): Channel =>
  db
    .get(CHANNELS_KEY)
    .find({ id })
    .value()

export const getAllDiscussions = (): Channel[] => db.get(CHANNELS_KEY).value()
