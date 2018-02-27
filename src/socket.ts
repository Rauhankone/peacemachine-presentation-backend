import * as socketIo from 'socket.io'
import { Server } from 'http'
import { socketControllers } from './controllers/socketControllers'

// export const io = socketIo(server)
export default class AppSocket {
  public connection: SocketIO.Server = null

  constructor(private websocket: any, private httpServer: Server) {
    this.connection = this.websocket(this.httpServer)
    this.init()
  }

  private init() {
    // this.createMiddlewares()
    this.createEvents(socketControllers)
  }

  public createEvents(socketControllers?: SocketControllers) {
    this.connection.on('connection', (socket: any) => {
      console.log(`connection with socket established. ID:${socket.id}`)
      if (socketControllers.on) {
        //listen for events
        for (let [key, value] of Object.entries(socketControllers.on)) {
          socket.on(key, (data: any) => {
            console.log(key, data)
          })
        }
      }

      if (socketControllers.emit) {
        // broadcast events
        for (let [key, value] of Object.entries(socketControllers.emit)) {
          socket.emit(key, (data: any) => {
            console.log(key, data)
          })
        }
      }

      // common disconnect events emmited by the socket
      for (let ds of ['disconnect', 'connect_timeout', 'error'] as string[]) {
        socket.on(ds, (event: any) =>
          console.log(`socket sent \`${ds}\` event with response of '${event}'`)
        )
      }
    })
  }

  private createMiddlewares() {
    // register the view connection
    this.connection.use((socket, next) => {
      const referer = socket.handshake.headers.referer.split('/')

      next()
    })
  }
}
