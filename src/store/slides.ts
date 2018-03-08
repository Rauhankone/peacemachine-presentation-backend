import db from './db'

const SLIDES_KEY: keyof ApplicationGlobalState = 'slides'

export const getSlides = (): any[] => db.get(SLIDES_KEY).value()

export const updateActiveSlide = (activeSlide: string) => {
  db
    .get(SLIDES_KEY)
    .assign({ activeSlide })
    .write()
}
