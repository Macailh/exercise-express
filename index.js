// Express application
import express from 'express'
import compression from 'compression'

import { fileURLToPath } from 'url'
import { dirname, sep } from 'path'

// Configuration
const
  __dirname = dirname(fileURLToPath(import.meta.url)) + sep
const cfg = {
  port: process.env.PORT || 3000,
  dir: {
    root: __dirname,
    static: __dirname + 'static' + sep,
    views: __dirname + 'view' + sep,
    routes: __dirname + 'routes' + sep
  }
}

console.dir(cfg, { depth: null, color: true })

// Express initiation
const app = express()

// do not identify Express
app.disable('x-powered-by')

// use EJS template engine
app.set('view engine', 'ejs')
app.set('views', cfg.dir.views)

// log every request ot the terminal
app.use((req, res, next) => {
  console.log(req.url)
  next()
})

// HTTP compression
app.use(compression())

// render form
app.get('/', (req, res) => {
  res.render('form', {
    title: 'Parse HTTP GET data',
    data: req.query
  })
})

// Home page route
app.get('/', (req, res) => {
  res.render('message', { title: 'Hello world!' })
})
// /hello/ route
// eslint-disable-next-line import/first
import { helloRouter } from './routes/hello.js'
app.use('/hello', helloRouter)

// /goodbye/ route
// eslint-disable-next-line import/first
import { goodbyeRouter } from './routes/goodbye.js'
app.use('/goodbye', goodbyeRouter)

// Params route
app.get('/user/:id', (req, res) => {
  res.render('message', { title: `${req.params.id}` })
})

// return a value for a user
app.get('/author/:name/book/:bookName', (req, res, next) => {
  console.log(`author: ${req.params.name}`)
  console.log(`author: ${req.params.bookName}`)

  next()
})

// Serve static assets
app.use(express.static(cfg.dir.static))

// 404 error
app.use((req, res) => {
  res.status(404).render('message', { title: 'Not found' })
})

// Start server
app.listen(cfg.port, () => {
  console.log(`Example app listening at http://localhost:${cfg.port}`)
})

// export defaults
export { cfg, app }
