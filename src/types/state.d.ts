type ChannelProps = keyof Channel

interface Channel {
  transcript: string
  wordCloud: any
  tones: object
  recording: string
  candidate: boolean
  id: string
}

interface Slide {
  name: string
}

interface Slides {
  allSlides: Slide[]
  activeSlide: Slide['name']
}

interface Mess {
  id: string
  timestamp: number
  transcript: string
  confidence: number
}

interface ApplicationGlobalState {
  channels: Channel[]
  currentStage: string
  recording: boolean
  slides: Slides
  mess: Mess[]
}
