import {
  createDiscussion,
  updateDiscussion,
  getDiscussion,
  updateDiscussionText
} from '../store/discussions'
import { debounce } from 'lodash/fp'

export const socketControllers: SocketControllers = {
  on: {
    connected(context: eventHandlerContext) {
      createDiscussion(context.socket.id)
      console.log(context.data)
    },

    channelData(context: eventHandlerContext) {
      console.log(context.data)

      updateDiscussionText(context.socket.id, context.data.transcript)
      console.log('getdisc', getDiscussion(context.socket.id))
      console.log('channelData')
      context.io.emit('channelUpdated', {
        id: context.socket.id,
        ...context.data
      })
    }
  }
}
