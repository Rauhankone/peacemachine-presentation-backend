import {
  createChannel,
  updateChannel,
  getChannel,
  getBulkChannels
} from '../store/channels'
import {
  createMess,
  getMess,
  updateMess,
  populateMessWithTones
} from '../store/mess'
import ToneAnalyzerV3 from 'watson-developer-cloud/tone-analyzer/v3'
import { getSlides, updateActiveSlide } from '../store/slides'

const emitWarning = (connectionBroadcast: any, payload: any) => {
  connectionBroadcast.emit('error', payload)
}

// TODO: Move this out of here
const toneAnalyzer = new ToneAnalyzerV3({
  username: process.env.W_TA_USERNAME,
  password: process.env.W_TA_PASSWORD,
  version_date: '2016-05-19',
  url: 'https://gateway.watsonplatform.net/tone-analyzer/api/'
})

export const socketControllers: SocketControllers = {
  on: {
    channelCreated(context: eventListenerContext) {
      createChannel(context.socket.id)
      context.socket.broadcast.emit('channelInitialized', {
        id: context.socket.id
      })
    },

    channelRecordingState(context: eventListenerContext) {
      updateChannel(context.socket.id, 'recording', context.data.recording)
      context.socket.broadcast.emit('channelRecordingChange', {
        recording: context.data.recording,
        id: context.socket.id
      })

      if (context.data.recording === 'finished') {
        let channel = getChannel(context.socket.id)
        if (channel)
          toneAnalyzer.tone(
            {
              tone_input: channel.transcript,
              content_type: 'text/plain'
            },
            (err: any, toneAnalysis: ToneAnalyzerV3.ToneAnalysis) => {
              if (err) return console.error(err)

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
        id: context.socket.id,
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

    mergeTonesToMess(context: eventListenerContext) {
      let tonesById: {
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

      let messWithTones = getMess().map((messObj: Mess, index: number) => {
        if (!tonesById[messObj.id]) {
          console.log(`Tone analysis for ${messObj.transcript} does not exist!`)
          return
        }
        if (
          messObj.transcript.trim() !== tonesById[messObj.id][0].text.trim()
        ) {
          console.log('Analyzed sentence does not match the one in mess:')
          console.log(
            `Transcript: "${messObj.transcript}" \nAnalyezed sentence: "${
              tonesById[messObj.id][0].text
            }"`
          )
        } else {
          console.log(
            'all is well in the world. The birds are singing beautiful songs of happiness as the mess array and tone texts live in harmony... for now'
          )
        }
        return {
          ...messObj,
          tones: (tonesById as any)[messObj.id].shift()
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
        mess: getMess()
      }
    }
  }
}
