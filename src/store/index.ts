import db from './db'
import nanoid from 'nanoid' // generates IDs

const defaultState: ApplicationGlobalState = {
  discussions: [],
  currentStage: 'uninitalized',
  recording: false,
  presentationSlide: 'livetext'
}

// writes a default object shape if no file exist yet.
export const initStore = () => db.defaults(defaultState).write()

export * from './discussions'
