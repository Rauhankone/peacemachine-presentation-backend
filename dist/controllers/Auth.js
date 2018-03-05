'use strict'
var __awaiter =
  (this && this.__awaiter) ||
  function(thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function(resolve, reject) {
      function fulfilled(value) {
        try {
          step(generator.next(value))
        } catch (e) {
          reject(e)
        }
      }
      function rejected(value) {
        try {
          step(generator['throw'](value))
        } catch (e) {
          reject(e)
        }
      }
      function step(result) {
        result.done
          ? resolve(result.value)
          : new P(function(resolve) {
              resolve(result.value)
            }).then(fulfilled, rejected)
      }
      step((generator = generator.apply(thisArg, _arguments || [])).next())
    })
  }
var __importStar =
  (this && this.__importStar) ||
  function(mod) {
    if (mod && mod.__esModule) return mod
    var result = {}
    if (mod != null)
      for (var k in mod)
        if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k]
    result['default'] = mod
    return result
  }
Object.defineProperty(exports, '__esModule', { value: true })
const watson = __importStar(require('watson-developer-cloud'))
const auth = new watson.AuthorizationV1({
  username: process.env.W_USERNAME,
  password: process.env.W_PASSWORD,
  url: watson.SpeechToTextV1.URL
})
const getAuthToken = () => {
  return new Promise((resolve, reject) => {
    auth.getToken((err, token) => {
      if (!token) return reject(err)
      return resolve(token)
    })
  })
}
exports.getToken = (req, res, next) =>
  __awaiter(this, void 0, void 0, function*() {
    try {
      const token = yield getAuthToken()
      res.send({ token })
    } catch (error) {
      res.send({ error })
    }
  })
//# sourceMappingURL=Auth.js.map
