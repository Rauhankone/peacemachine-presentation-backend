import db from './db'

const DISCUSSIONS_KEY = 'discussions'

export const createDiscussion = (id: Discussion['id']) => {
  console.log('creating a discussion')
  const initDiscussion: Discussion = {
    text: '',
    wordCloud: null,
    tones: null,
    active: false,
    id
  }

  db
    .get(DISCUSSIONS_KEY)
    .push(initDiscussion)
    .write()
}

export const updateDiscussion = (
  id: Discussion['id'],
  propName: keyof Discussion,
  value: any
) => {
  console.log('updated discussion')
  db
    .get(DISCUSSIONS_KEY)
    .find({ id })
    .set(propName, value)
    .write()
}

export const removeDiscussions = (criteria: any) => {
  console.log('remove discussions')
  db
    .get(DISCUSSIONS_KEY)
    .remove(criteria)
    .write()
}

export const getDiscussion = (id: Discussion['id']) =>
  db
    .get(DISCUSSIONS_KEY)
    .find({ id })
    .value()

export const getAllDiscussions = () => db.get(DISCUSSIONS_KEY).value()
