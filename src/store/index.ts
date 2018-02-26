import db from './db'
import nanoid from 'nanoid' // generates IDs

const defaultState: ApplicationGlobalState = {
  discussions: [],
  currentStage: 'uninitalized',
  recording: false
}

export const initStore = () => db.defaults(defaultState).write()

export * from './discussions'
