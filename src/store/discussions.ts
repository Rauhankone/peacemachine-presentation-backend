import db from './db'

const DISCUSSIONS_KEY = 'discussions'

export const createDiscussion = (id: Discussion['id']) => {
  console.log('creating a discussion')
  const initDiscussion: Discussion = {
    text: '',
    wordCloud: null,
    tones: null,
    active: true,
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
  value: string
) => {
  console.log('updated discussion')
  db
    .get(DISCUSSIONS_KEY)
    .find({ id })
    .set(propName, value)
    .write()
}

export const updateDiscussionText = (id: Discussion['id'], text: string) => {
  console.log('updateDiscussionText')

  db
    .get(DISCUSSIONS_KEY)
    .find({ id })
    .findKey('text')

    .write()
}

export const getDiscussion = (id: Discussion['id']) =>
  db
    .get(DISCUSSIONS_KEY)
    .find({ id })
    .value()

export const getAllDiscussions = () => db.get(DISCUSSIONS_KEY).value()
