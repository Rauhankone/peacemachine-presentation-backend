import db from './db'

const CHANNELS_KEY: keyof ApplicationGlobalState = 'channels'

export const createChannel = (id: Channel['id']) => {
  console.log('creating a discussion')
  const initChannel: Channel = {
    transcript: '',
    wordCloud: null,
    tones: null,
    recording: false,
    candidate: false,
    id
  }

  db
    .get(CHANNELS_KEY)
    .push(initChannel)
    .write()
}

export const updateChannel = (
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

export const removeChannels = (criteria: any) => {
  console.log('remove discussions')
  db
    .get(CHANNELS_KEY)
    .remove(criteria)
    .write()
}

export const getChannel = (id: Channel['id']): Channel =>
  db
    .get(CHANNELS_KEY)
    .find({ id })
    .value()

export const getAllChannels = (): Channel[] => db.get(CHANNELS_KEY).value()
