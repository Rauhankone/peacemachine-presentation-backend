/**
 * Watson Tone Analysis
 */
// interface Tones {
//   score: number
//   tone_id: string
//   tone_name: string
// }

// interface DocumentTone {
//   tones: Tones[]
// }

// interface SentencesTone {
//   sentence_id: number
//   text: string
//   tones: Tones[]
// }

// interface ToneAnalysis {
//   document_tone: DocumentTone
//   sentences_tone: SentencesTone[]
// }

type TonesByChannelId = { [key: string]: ToneAnalyzerV3.SentenceAnalysis[] }
