type ChannelProps = keyof Channel

interface Channel {
  text: string
  wordCloud: any
  tones: any
  recording: boolean
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
  channels: Channel[]
  currentStage: string
  recording: boolean
  presentationSlide: string
  slides: Slides
}
