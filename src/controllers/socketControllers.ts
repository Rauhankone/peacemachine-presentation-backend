export const socketControllers: SocketControllers = {
  on: {
    connected(context: eventHandlerContext) {
      console.log(context.data)
    },

    channelData(context: eventHandlerContext) {
      console.log('channelData')
      context.io.emit('channelUpdated', context.data)
    }
  }
}
