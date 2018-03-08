import { transform } from 'is-stream'

type ChannelProps = keyof Channel

interface Channel {
  transcript: string
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
  mess: Mess[]
}

interface Mess {
  id: string
  timestamp: number
  transcript: string
  confidence: number
}
