import {
  createChannel,
  updateChannel,
  getChannel,
  getBulkChannels
} from '../store/channels'
import { createMess, getMess, populateMessWithTones } from '../store/mess'
// tslint:disable:no-submodule-imports
import ToneAnalyzerV3 = require('watson-developer-cloud/tone-analyzer/v3')
import { getSlides, updateActiveSlide } from '../store/slides'
import { find } from 'lodash'
import { getAllTopWords, createTopWords } from '../store'
import { genTopWords } from '../utils/'

export const socketControllers: SocketControllers = {
  on: {
    channelCreated(context: eventListenerContext) {
      createChannel(context.socket.id)
      context.socket.broadcast.emit('channelInitialized', {
        id: context.socket.id
      })
    },

    channelRecordingState(context: eventListenerContext) {
      let toneAnalyzer

      updateChannel(context.socket.id, 'recording', context.data.recording)
      context.socket.broadcast.emit('channelRecordingChange', {
        recording: context.data.recording,
        id: context.socket.id
      })

      if (context.data.recording === 'finished') {
        const channel = getChannel(context.socket.id)
        // tslint:disable:no-var-keyword prefer-const
        if (channel) {
          var sentenceArr = channel.transcript.split('.')
        }
        if (sentenceArr.length === 0) {
          return
        }
        if (sentenceArr.length > 100) {
          console.error(
            `\nTone Analyzer can only analyze 100 sentences in a single request, but got ${
              sentenceArr.length
            }!\n`
          )
          return
        }

        // Request new API token
        toneAnalyzer = new ToneAnalyzerV3({
          username: process.env.W_TA_USERNAME,
          password: process.env.W_TA_PASSWORD,
          version_date: '2016-05-19',
          url: 'https://gateway.watsonplatform.net/tone-analyzer/api/'
        })

        toneAnalyzer.tone(
          {
            tone_input: channel.transcript,
            content_type: 'text/plain'
          },
          (err: any, toneAnalysis: ToneAnalyzerV3.ToneAnalysis) => {
            if (err) {
              return console.error(err)
            }
            updateChannel(context.socket.id, 'tones', toneAnalysis)

            updateChannel(context.socket.id, 'recording', 'analyzed')
            context.socket.broadcast.emit('channelRecordingChange', {
              recording: 'analyzed',
              id: context.socket.id
            })

            context.socket.emit('toneAnalyzeComplete', {
              id: context.socket.id,
              analyzeObject: toneAnalysis
            })
          }
        )
      }
    },

    channelData(context: eventListenerContext) {
      context.io.emit('channelUpdated', {
        id: context.socket.id,
        ...context.data
      })

      createMess({
        id:
          context.socket.id +
          '_' +
          Math.floor((1 + Math.random()) * 0x10000)
            .toString(16)
            .substring(1),
        timestamp: Date.now(),
        transcript: context.data.transcript,
        confidence: context.data.confidence,
        tones: null
      })

      updateChannel(
        context.socket.id,
        'transcript',
        context.data.fullTranscript
      )
    },

    channelCandidacyChanged(context: eventListenerContext) {
      console.log('channel appointed', context.data)
      updateChannel(context.data.id, 'candidate', context.data.candidate)

      context.io.emit('channelCandidacyUpdated', {
        ...context.data
      })
    },

    changeSlide(context: eventListenerContext) {
      updateActiveSlide(context.data.slideName)

      context.io.emit('slideUpdated', {
        slideName: context.data.slideName
      })
    },

    finalizeMess(context: eventListenerContext) {
      const channels = getBulkChannels()
      const wholeMess = getMess()

      populateMessWithTones(
        wholeMess.map((mess: Mess, index) => {
          try {
            const channelId = mess.id.substring(0, mess.id.length - 5)
            const channelQuery = find(channels, {
              id: channelId
            })
            const tones = channelQuery.tones.sentences_tone
              ? channelQuery.tones.sentences_tone.find(
                  t =>
                    t.text.trim() === mess.transcript.trim() ||
                    t.text.trim().includes(mess.transcript.trim())
                )
              : null

            return {
              ...mess,
              tones: tones ? tones : null
            }
          } catch (e) {
            console.warn(e)

            return {
              ...mess,
              tone: null
            }
          }
        })
      )

      createTopWords(genTopWords(wholeMess))

      context.io.emit('messFinalized', {
        mess: getMess(),
        topWords: getAllTopWords()
      })
    },

    /**
     * @desc WARNING: possibly deprecated
     */
    mergeTonesToMess(context: eventListenerContext) {
      const tonesById: {
        [key: string]: ToneAnalyzerV3.SentenceAnalysis[]
      } = getBulkChannels().reduce((prev: any, curr: Channel) => {
        if (curr.tones) {
          return {
            ...prev,
            [curr.id]: curr.tones.sentences_tone
              ? curr.tones.sentences_tone
              : [curr.tones.document_tone]
          }
        }
      }, {})

      const messWithTones = getMess().map((messObj: Mess, index: number) => {
        const channelId = messObj.id.substring(0, messObj.id.length - 5)

        // Tone analysis has not been done
        if (!tonesById) {
          console.log('tonesById does not exist!')
          return
        }

        // This channel has not been analyzed
        if (!tonesById[channelId]) {
          console.log(`Tone analysis for channel ${channelId} does not exist!`)
          return
        }

        // This channel's analysis has been empty
        if (tonesById[channelId].length === 0) {
          console.log(`The tones array is empty for a channel: ${channelId}`)
          return
        }

        // Find correct sentence
        let sentenceTones = tonesById[channelId]
          .filter(tones => tones.sentence_id !== undefined)
          .filter(tones =>
            tones.text.trim().includes(messObj.transcript.trim())
          )

        if (sentenceTones.length === 0) {
          console.warn(
            `No matching mess for the sentence: "${messObj.transcript}"`
          )

          // Only document tones available for this channel
          if (tonesById[channelId][0].sentence_id === undefined) {
            console.warn(
              `Only document tones available for channel: ${channelId}`
            )
            sentenceTones = tonesById[channelId]
          } else {
            console.warn(`Could not find tones for mess. Skipping.`)
            return
          }
        } else {
          console.log(
            `Sentence "${messObj.transcript}" has a matching analyzed sentence.`
          )
        }
        return {
          ...messObj,
          tones: sentenceTones[0]
        }
      })

      populateMessWithTones(messWithTones)

      context.io.emit('messFinalized', { mess: getMess() })
    }
  },

  emit: {
    initStoreProps(context: eventHandlerContext) {
      return {
        id: context.socket.id,
        slides: getSlides(),
        channels: getBulkChannels(),
        mess: getMess(),
        topWords: getAllTopWords()
      }
    }
  }
}
