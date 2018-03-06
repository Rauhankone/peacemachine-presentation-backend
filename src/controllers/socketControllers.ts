import {
  createDiscussion,
  updateDiscussion,
  getDiscussion,
  getAllDiscussions
} from '../store/discussions'
import ToneAnalyzerV3 from 'watson-developer-cloud/tone-analyzer/v3'
import { getSlides, updateActiveSlide } from '../store/slides'

export const socketControllers: SocketControllers = {
  on: {
    channelCreated(context: eventListenerContext) {
      createDiscussion(context.socket.id)
      context.socket.broadcast.emit('channelInitialized', {
        id: context.socket.id
      })
    },

    channelRecordingState(context: eventListenerContext) {
      updateDiscussion(context.socket.id, 'recording', context.data.recording)
      context.socket.broadcast.emit('channelRecordingChange', {
        recording: context.data.recording,
        id: context.socket.id
      })

      // Move this out of here
      const toneAnalyzer = new ToneAnalyzerV3({
        username: process.env.W_TA_USERNAME,
        password: process.env.W_TA_PASSWORD,
        version_date: '2016-05-19',
        url: 'https://gateway.watsonplatform.net/tone-analyzer/api/'
      })

      toneAnalyzer.tone({
        tone_input: getDiscussion(context.socket.id).text,
        content_type: 'text/plain'
      }, (err: any, tone: any) => {
        if (err) {
          console.log(err)
        } else {
          const analyzedString = JSON.stringify(tone, null, 2)
          context.io.emit('toneAnalyzeComplete', {
            id: context.socket.id,
            analyzeObject: tone
          })
        }
      })

    },

    channelData(context: eventListenerContext) {
      context.io.emit('channelUpdated', {
        id: context.socket.id,
        ...context.data
      })

      updateDiscussion(context.socket.id, 'text', context.data.fullTranscript)
    },

    channelCandidacyChanged(context: eventListenerContext) {
      updateDiscussion(context.data.id, 'candidate', context.data.candidate)
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
        channels: getAllDiscussions()
      }
    }
  }
}
