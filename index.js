// Express application
import express from 'express'
import compression from 'compression'
import formidable from 'formidable'

import { fileURLToPath } from 'url'
import { dirname, sep, parse } from 'path'
// /hello/ route
// eslint-disable-next-line import/first
import { helloRouter } from './routes/hello.js'

// /goodbye/ route
// eslint-disable-next-line import/first
import { goodbyeRouter } from './routes/goodbye.js'

// Configuration
const
  __dirname = dirname(fileURLToPath(import.meta.url)) + sep
const cfg = {
  port: process.env.PORT || 3000,
  dir: {
    root: __dirname,
    static: __dirname + 'static' + sep,
    views: __dirname + 'view' + sep,
    routes: __dirname + 'routes' + sep,
    uploads: __dirname + 'uploads' + sep
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

// Serve static assets
app.use(express.static(cfg.dir.static))
app.use(express.static(cfg.dir.uploads))

// body parsing
app.use(express.urlencoded({ extended: true }))

// log every request ot the terminal
app.use((req, res, next) => {
  console.log(req.url)
  next()
})

// HTTP compression
app.use(compression())

// Home page route
app.get('/', (req, res) => {
  res.render('message', { title: 'Hello world!' })
})
app.use('/hello', helloRouter)
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

// render form
// app.get('/form', (req, res) => {
//   res.render('form', {
//     title: 'Parse HTTP GET data',
//     data: req.query
//   })
// })

// use .all to handle initial GET and POST
app.all('/form', (req, res, next) => {
  if (req.method === 'GET' || req.method === 'POST') {
    res.render('form', {
      title: 'Parse HTTP POST data',
      data: req.body
    })
  } else {
    next()
  }
})

// render form
// use /form-img to handle initial GET and POST
app.all('/form-img', (req, res, next) => {
  if (req.method === 'GET' || req.method === 'POST') {
    // parse uploaded file data
    const form = formidable({
      uploadDir: cfg.dir.uploads,
      keepExtensions: true
    })

    form.parse(req, (err, data, files) => {
      if (err) {
        next(err)
        return
      }

      if (files && files.image && files.image.size > 0) {
        data.filename = files.image.originalFilename
        data.filetype = files.image.mimetype
        data.filesize = Math.ceil(files.image.size / 1024) + ' KB'
        data.uploadto = files.image.filepath
        data.imageurl = '/' + parse(files.image.filepath).base
      }

      res.render('form', { title: 'Parse HTTP POST file data', data })
    })
  } else {
    next()
  }
})

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
