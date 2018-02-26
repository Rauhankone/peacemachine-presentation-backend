import db from './db'
const DISCUSSIONS_KEY = 'discussions'

export const createDiscussion = (id: Discussion['id']) => {
  const initDiscussion: Discussion = {
    text: '',
    wordCloud: null,
    tones: null,
    active: false,
    id
  }

  db.get(DISCUSSIONS_KEY).push(initDiscussion)
}

export const updateDiscussion = (
  id: Discussion['id'],
  propName: DiscussionProps,
  value: string
) => {
  db
    .get(DISCUSSIONS_KEY)
    .find({ id })
    .set(propName, value)
    .write()
}

export const getDiscussion = (id: Discussion['id']) =>
  db
    .get(DISCUSSIONS_KEY)
    .find({ id })
    .value()
