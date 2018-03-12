import * as _ from 'lodash'
import nanoid from 'nanoid'
import KeywordExtractor from 'keyword-extractor'

export function rando(arr: string[]) {
  return arr[Math.floor(Math.random() * arr.length)]
}

export function getFunName() {
  const adjectives = [
    'adorable',
    'beautiful',
    'clean',
    'drab',
    'elegant',
    'fancy',
    'glamorous',
    'handsome',
    'long',
    'magnificent',
    'old-fashioned',
    'plain',
    'quaint',
    'sparkling',
    'ugliest',
    'unsightly',
    'angry',
    'bewildered',
    'clumsy',
    'defeated',
    'embarrassed',
    'fierce',
    'grumpy',
    'helpless',
    'itchy',
    'jealous',
    'lazy',
    'mysterious',
    'nervous',
    'obnoxious',
    'panicky',
    'repulsive',
    'scary',
    'thoughtless',
    'uptight',
    'worried'
  ]

  const nouns = [
    'women',
    'men',
    'children',
    'teeth',
    'feet',
    'people',
    'leaves',
    'mice',
    'geese',
    'halves',
    'knives',
    'wives',
    'lives',
    'elves',
    'loaves',
    'potatoes',
    'tomatoes',
    'cacti',
    'foci',
    'fungi',
    'nuclei',
    'syllabuses',
    'analyses',
    'diagnoses',
    'oases',
    'theses',
    'crises',
    'phenomena',
    'criteria',
    'data'
  ]

  return `${rando(adjectives)}-${rando(adjectives)}-${rando(nouns)}`
}

export const fakeChannelData = () => {
  // const id = nanoid()

  // console.log(id)
  return {
    id: nanoid(),
    transcript: nanoid(),
    confidence: Math.random()
  }
}

// return a sorted list of keywords with frequencies
// from given text.
// eg.
// [{"word":"surprised","freq":1,"relFreq":0.001254},
//  {"word":"speaking","freq":4,"relFreq":0.003543},
//  {"word":"adduce","freq":6,"relFreq":0.008123}, ...]
export function extractKeywords(transcript: string) {
  transcript = _.lowerCase(transcript)
  const words = _.words(transcript)
  const keywords: string[] = KeywordExtractor.extract(transcript, {
    language: 'english',
    remove_digits: true,
    return_changed_case: true,
    remove_duplicates: true
  })
  const freqs = _.map(keywords, kw =>
    _.reduce(words, (freq, w) => (w === kw ? freq + 1 : freq), 0)
  )
  const totalEvents = _.reduce(freqs, (total, freq) => total + freq, 0)
  const relFreqs = _.map(freqs, f => f / totalEvents)
  return _.sortBy(
    _.map(keywords, (w, i) => ({
      word: w,
      freq: freqs[i],
      relFreq: relFreqs[i]
    })),
    'freq'
  )
}
