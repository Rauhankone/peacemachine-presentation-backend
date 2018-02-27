import app from './app'
import { Server } from 'http'
import socketIo from 'socket.io'
import { initStore, updateDiscussion } from './store'

import AppSocket from './socket'

const PORT = app.get('port')
const ENV = app.get('env')
const server = new Server(app).listen(PORT, () => {
  initStore()
  console.log(
    `App is running at http://localhost:${app.get('port')} in ${ENV} mode`
  )
})

const io = new AppSocket(socketIo, server)

export default server
