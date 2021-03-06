import db from './db'

const defaultState: ApplicationGlobalState = {
  channels: [],
  currentStage: 'uninitalized',
  recording: false,
  mess: [],
  topWords: [],
  slides: {
    allSlides: [
      {
        name: 'title',
        child: false
      },
      {
        name: 'live text',
        child: false
      },
      {
        name: 'confidence',
        child: false
      },
      {
        name: 'intensity',
        child: false
      },
      {
        name: 'topword 1',
        child: true
      },
      {
        name: 'topword 2',
        child: true
      },
      {
        name: 'topword 3',
        child: true
      },
      {
        name: 'topword 4',
        child: true
      },
      {
        name: 'topword 5',
        child: true
      },
      {
        name: 'topword 6',
        child: true
      },
      {
        name: 'topword 7',
        child: true
      },
      {
        name: 'topword 8',
        child: true
      },
      {
        name: 'topword 9',
        child: true
      },
      {
        name: 'topword 10',
        child: true
      },
      {
        name: 'loop',
        child: false
      }
    ],
    activeSlide: null
  }
}

// writes a default object shape if no file exist yet.
export const initStore = () => db.defaults(defaultState).write()

export const flushStore = () => {
  const flushedState = defaultState
  flushedState.slides.activeSlide = (db.get('slides') as any).activeSlide
    ? (db.get('slides') as any).activeSlide
    : 'live text'
  db.setState(defaultState).write()
}

export * from './channels'
export * from './mess'
export * from './topwords'
