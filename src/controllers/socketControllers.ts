import {
  createDiscussion,
  updateDiscussion,
  getDiscussion,
  getAllDiscussions
} from '../store/discussions'
import { getSlides, updateActiveSlide } from '../store/slides'

export const socketControllers: SocketControllers = {
  on: {
    channelCreated(context: eventListenerContext) {
      createDiscussion(context.socket.id)
      context.socket.broadcast.emit('channelInitialized', {
        id: context.socket.id
      })
    },

    channelRecording(context: eventListenerContext) {
      updateDiscussion(context.socket.id, 'active', true)
      context.socket.broadcast.emit('channelRecording', {
        id: context.socket.id
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
      console.log(context.data)
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
        slides: getSlides(),
        channels: getAllDiscussions()
      }
    }
  }
}
