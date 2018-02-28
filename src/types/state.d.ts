type DiscussionProps = keyof Discussion

interface Discussion {
  active: boolean
  id: string
}

interface ApplicationGlobalState {
  discussions: Discussion[]
  currentStage: string
  recording: boolean
}
