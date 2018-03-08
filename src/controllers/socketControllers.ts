import {
  createChannel,
  updateChannel,
  getChannel,
  getAllChannels
} from '../store/channels'
import { createMess, getMess } from '../store/mess'
import ToneAnalyzerV3 from 'watson-developer-cloud/tone-analyzer/v3'
import { getSlides, updateActiveSlide } from '../store/slides'

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

      if (!context.data.recording) {
        toneAnalyzer.tone(
          {
            tone_input: getChannel(context.socket.id).transcript,
            content_type: 'text/plain'
          },
          (err: any, tone: any) => {
            if (err) {
              console.log(err)
            } else {
              const analyzedString = JSON.stringify(tone, null, 2)
              context.io.emit('toneAnalyzeComplete', {
                id: context.socket.id,
                analyzeObject: tone
              })
            }
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
        confidence: context.data.confidence
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
    }
  },

  emit: {
    initStoreProps(context: eventHandlerContext) {
      return {
        id: context.socket.id,
        slides: getSlides(),
        channels: getAllChannels()
      }
    }
  }
}
