type DiscussionProps = keyof Discussion

interface Discussion {
  text: string
  wordCloud: any
  tones: any
  active: boolean
  candidate: boolean
  id: string
}

interface ApplicationGlobalState {
  discussions: Discussion[]
  currentStage: string
  recording: boolean
  presentationSlide: string
}
