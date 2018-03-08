import db from './db'
import nanoid from 'nanoid' // generates IDs
import { Z_DEFAULT_COMPRESSION } from 'zlib'

const defaultState: ApplicationGlobalState = {
  channels: [],
  currentStage: 'uninitalized',
  recording: false,
  mess: [],
  slides: {
    allSlides: [
      {
        name: 'live text'
      },
      {
        name: 'sentiment analysis'
      },
      {
        name: 'word cloud'
      },
      {
        name: 'zoom tool'
      },
      {
        name: 'loop'
      }
    ],
    activeSlide: null
  }
}

// writes a default object shape if no file exist yet.
export const initStore = () => db.defaults(defaultState).write()

export const flushStore = () => {
  let flushedState = defaultState
  flushedState.slides.activeSlide = (db.get('slides') as any).activeSlide
    ? (db.get('slides') as any).activeSlide
    : 'live text'
  db.setState(defaultState).write()
}

export * from './channels'
export * from './mess'
