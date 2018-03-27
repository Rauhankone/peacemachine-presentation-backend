import db from './db'

const TOPWORDS_KEY: keyof ApplicationGlobalState = 'topWords'

/**
 * @desc concats provided topWords array to the database
 */
export const createTopWords = (topWords: TopWord[]) => {
  db
    .get(TOPWORDS_KEY)
    .push(...topWords)
    .write()
}

export const getAllTopWords = (): TopWord[] => {
  return db.get(TOPWORDS_KEY).value()
}
