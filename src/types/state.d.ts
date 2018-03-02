type DiscussionProps = keyof Discussion

interface Discussion {
  text: string
  wordCloud: any
  tones: any
  active: boolean
  candidate: boolean
  id: string
}

interface Slide {
  name: string
}

interface Slides {
  allSlides: Slide[]
  activeSlide: string
}

interface ApplicationGlobalState {
  discussions: Discussion[]
  currentStage: string
  recording: boolean
  presentationSlide: string
  slides: Slides
}
