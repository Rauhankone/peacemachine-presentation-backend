import {
  createDiscussion,
  updateDiscussion,
  getDiscussion
} from '../store/discussions'

export const socketControllers: SocketControllers = {
  on: {
    channelCreated(context: eventHandlerContext) {
      createDiscussion(context.socket.id)

      context.socket.broadcast.emit('channelInitialized', {
        id: context.socket.id
      })
    },

    channelData(context: eventHandlerContext) {
      context.io.emit('channelUpdated', {
        id: context.socket.id,
        ...context.data
      })

      updateDiscussion(context.socket.id, 'text', context.data.fullTranscript)
    }
  }
}
