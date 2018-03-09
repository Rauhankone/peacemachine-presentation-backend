import db from './db'

const CHANNELS_KEY: keyof ApplicationGlobalState = 'channels'

/**
 * @desc Creates a channel object with initial props in place.
 * Channel ID should be the socket's handshake ID.
 */
export const createChannel = (id: Channel['id']) => {
  console.log('creating a discussion')
  const initChannel: Channel = {
    transcript: '',
    wordCloud: null,
    tones: null,
    recording: null,
    candidate: false,
    id
  }

  db
    .get(CHANNELS_KEY)
    .push(initChannel)
    .write()
}

/**
 * @desc Updates the channel's prop.
 */
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

/**
 * @desc Removes channel based on criteria. If no criteria provied,
 * removes everything
 */
export const removeChannels = (criteria: any) => {
  console.log('remove discussions')
  db
    .get(CHANNELS_KEY)
    .remove(criteria)
    .write()
}

/**
 * @desc Gets a channel based on provided channel id.
 * Returns null if nothing found.
 */
export const getChannel = (id: Channel['id']): Channel =>
  db
    .get(CHANNELS_KEY)
    .find({ id })
    .value()

/**
 * @desc Gets all channel objects based on criteria.
 * If no criteria provided, the function returns all the channels on the store
 */
export const getAllChannels = (criteria?: object): Channel[] =>
  db
    .get(CHANNELS_KEY)
    .find(criteria)
    .value()
