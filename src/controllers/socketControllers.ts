import {
  createDiscussion,
  updateDiscussion,
  getDiscussion,
  updateDiscussionText
} from '../store/discussions'

export const socketControllers: SocketControllers = {
  on: {
    connected(context: eventHandlerContext) {
      createDiscussion(context.socket.id)

      if (context.data.viewName === 'input') {
        context.io.emit('channelInitialized', {
          id: context.socket.id
        })
      }
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
