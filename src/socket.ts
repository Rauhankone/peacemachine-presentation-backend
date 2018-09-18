import { Server } from 'http'
import { socketControllers } from './controllers/socketControllers'
import { removeChannels } from './store'
import { getFunName } from './utils'

// export const io = socketIo(server)
export default class AppSocket {
  public connection: SocketIO.Server = null

  constructor(private websocket: any, private httpServer: Server) {
    this.connection = this.websocket(this.httpServer)
    this.init()
  }

  // tslint:disable:no-shadowed-variable
  public createEvents(socketControllers?: SocketControllers) {
    this.connection.on('connection', (socket: SocketIO.Socket) => {
      console.log(
        `connection with socket established. ID: ${socket.id} viewName: ${
          socket.handshake.query.viewName
        }`
      )
      // if (socket.handshake.query.viewName === 'director') {
      //   socket.emit('directorViewInit', getAllDiscussions())
      // }

      if (socketControllers.on) {
        // listen for events
        for (const [eventName, eventListener] of Object.entries(
          socketControllers.on
        )) {
          socket.on(eventName, (data: any) => {
            console.log(
              `${socket.handshake.query.viewName} view (${
                socket.id
              }) emitted event \'${eventName}\' `
            )
            eventListener.call(this, { data, io: this.connection, socket })
          })
        }
      }

      if (socketControllers.emit) {
        // broadcast events
        for (const [eventName, eventHandler] of Object.entries(
          socketControllers.emit
        )) {
          socket.emit(
            eventName,
            eventHandler.call(this, { io: this.connection, socket })
          )
        }
      }

      // common disconnect events emmited by the socket
      for (const ds of ['disconnect', 'connect_timeout', 'error'] as string[]) {
        socket.on(ds, (event: any) => {
          console.log(socket.handshake.query.viewName)
          if (socket.handshake.query.viewName === 'input') {
            removeChannels({ id: socket.id })
            socket.broadcast.emit('channelDisconnected', {
              id: socket.id
            })
          }
          console.log(
            `socket(${
              socket.handshake.query.viewName
            }) sent \`${ds}\` event with response of '${event}'`
          )
        })
      }
    })
  }

  private init() {
    this.createMiddlewares()
    this.createEvents(socketControllers)
  }

  private createMiddlewares() {
    // register the view connection
    this.connection.use((socket, next) => {
      socket.id = `${getFunName()}-${socket.id}`
      next()
    })
  }
}
