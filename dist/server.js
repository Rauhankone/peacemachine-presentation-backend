'use strict'
var __importDefault =
  (this && this.__importDefault) ||
  function(mod) {
    return mod && mod.__esModule ? mod : { default: mod }
  }
Object.defineProperty(exports, '__esModule', { value: true })
const app_1 = __importDefault(require('./app'))
const http_1 = require('http')
const socket_io_1 = __importDefault(require('socket.io'))
const server = new http_1.Server(app_1.default).listen(
  app_1.default.get('port'),
  () => {
    console.log(
      `App is running at http://localhost:${app_1.default.get(
        'port'
      )} in ${app_1.default.get('env')} mode`
    )
  }
)
const io = socket_io_1.default(server)
io.on('connection', socket => {
  socket.emit('foo', { hello: 'world' })
  socket.on('bar', function(data) {
    console.log(data)
  })
})
exports.default = server
//# sourceMappingURL=server.js.map
