interface eventHandlerContext {
  data: any
  io: SocketIO.Server
  socket: SocketIO.Socket
}

interface socketEventListener {
  [flag: string]: Function
}

interface SocketControllers {
  on?: socketEventListener
  emit?: object
}
