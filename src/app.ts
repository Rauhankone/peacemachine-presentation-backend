import express from 'express'
import path from 'path'
import logger from 'morgan'
import cookieParser from 'cookie-parser'
import bodyParser from 'body-parser'
import cors from 'cors'

/**
 * Controllers a.k.a route handlers
 */
import * as Home from './controllers/home'
import * as Auth from './controllers/auth'
import * as Discussion from './controllers/channels'
import * as Documentation from './controllers/documentation'

/**
 * Express configuration
 */
const app = express()

app.set('port', process.env.PORT || 8080)
app.set('env', process.env.NODE_ENV || 'development')
app.use(logger('dev'))
app.use(cookieParser())
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))
app.use(express.static(path.join(__dirname, 'public'), { maxAge: 0 }))

/**
 * Primary app routes
 */
app.get('/', Home.index)

app.options('/token', cors())
app.get('/token', cors({ preflightContinue: true }), Auth.getToken)

app.get('/discussion', cors(), Discussion.getDiscussion)

app.get('/doc', cors(), Documentation.getUserDocumentation)

export default app
