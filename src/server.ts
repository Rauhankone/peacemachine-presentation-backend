import app from './app'
import { Server } from 'http'
import socketIo from 'socket.io'
import { initStore, updateChannel, removeChannels } from './store'

import AppSocket from './socket'

const PORT = app.get('port')
const ENV = app.get('env')
const server = new Server(app).listen(PORT, () => {
  initStore()

  ENV === 'development'
    ? removeChannels(null)
    : removeChannels({ active: false })

  console.log(
    `App is running at http://localhost:${app.get('port')} in ${ENV} mode`
  )
})

const io = new AppSocket(socketIo, server)

export default server
