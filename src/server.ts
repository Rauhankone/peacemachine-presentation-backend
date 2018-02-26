import app from './app'
import { Server } from 'http'
import socketIo from 'socket.io'
import { initStore, updateDiscussion } from './store'

const server = new Server(app).listen(app.get('port'), () => {
  initStore()
  console.log(
    `App is running at http://localhost:${app.get('port')} in ${app.get(
      'env'
    )} mode`
  )
})

const io = socketIo(server)

io.on('connection', socket => {
  socket.emit('foo', { hello: 'world' })
  socket.on('bar', function(data) {
    console.log(data)
  })
})

export default server
