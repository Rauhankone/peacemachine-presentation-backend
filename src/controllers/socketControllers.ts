import {
  createDiscussion,
  updateDiscussion,
  getDiscussion,
  getAllDiscussions
} from '../store/discussions'

export const socketControllers: SocketControllers = {
  on: {
    channelCreated(context: eventHandlerContext) {
      createDiscussion(context.socket.id)
      context.socket.broadcast.emit('channelInitialized', {
        id: context.socket.id
      })
    },

    channelRecording(context: eventHandlerContext) {
      updateDiscussion(context.socket.id, 'active', true)
      context.socket.broadcast.emit('channelRecording', {
        id: context.socket.id
      })
    },

    channelData(context: eventHandlerContext) {
      context.io.emit('channelUpdated', {
        id: context.socket.id,
        ...context.data
      })

      updateDiscussion(context.socket.id, 'text', context.data.fullTranscript)
    },

    channelCandidacyState(context: eventHandlerContext) {
      updateDiscussion(context.socket.id, 'candidate', context.data.candidate)

    },

    changeSlide(context: eventHandlerContext) {
      context.socket.broadcast.emit('slideUpdated', {
        slideName: context.data.slideName
      })
    }
  }
}
