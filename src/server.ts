const env = require('dotenv').config({ path: '.env' })

if (env.error) {
  if (env.error.code === 'ENOENT') {
    console.error(
      `\nCouldn't find env file.\nPlease use the \`.env.example\` to create a new env file`
    )
  }

  throw new Error(env.error)
}

import app from './app'
import { Server } from 'http'
import * as socketIo from 'socket.io'
import { initStore, flushStore } from './store'

import AppSocket from './socket'

const server = new Server(app)

const PORT = app.get('port')
const ENV = app.get('env')
server.listen(PORT, () => {
  initStore()
  flushStore()
  // ENV === 'development'
  //   ? removeChannels(null)
  //   : removeChannels({ active: false })

  console.log(
    `\nApp is running at http://localhost:${app.get('port')} in ${ENV} mode`
  )
})

// @ts-ignore
const io = new AppSocket(socketIo, server)

export default server
