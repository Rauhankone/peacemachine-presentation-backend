import nanoid from 'nanoid'
import KeywordExtractor from 'keyword-extractor'
import _ from 'lodash'

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

export function genTopWords(mess: Mess[]) {
  const sentenceTranscripts = _.map(mess, sentence => sentence.transcript)
  const fullText = _.join(sentenceTranscripts, ' ').toLowerCase()
  const words = _.words(fullText, /[^,. ]+/g)
  const keywords = KeywordExtractor.extract(fullText, {
    language: 'english',
    remove_digits: true,
    return_changed_case: true,
    remove_duplicates: true
  })
  const freqs = _.map(keywords, kw =>
    _.reduce(words, (freq, w) => (w === kw ? freq + 1 : freq), 0)
  )
  const topWords: TopWord[] = _.reverse(
    _.slice(
      _.sortBy(
        _.map(keywords, (w, i) => ({
          word: w,
          freq: freqs[i]
        })),
        'freq'
      ),
      -10
    )
  )
  return topWords
}
