interface eventListenerContext {
  data: any
  io: SocketIO.Server
  socket: SocketIO.Socket
}

interface eventHandlerContext {
  io: SocketIO.Server
  socket: SocketIO.Socket
}

interface socketEventListener {
  [flag: string]: Function
}

interface socketEventHandler {
  [flag: string]: Function
}

interface SocketControllers {
  on?: socketEventListener
  emit?: socketEventHandler
}
