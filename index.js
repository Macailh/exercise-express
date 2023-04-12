// Express application
import express from 'express'

import { fileURLToPath } from 'url'
import { dirname, sep } from 'path'

// Configuration
const
  __dirname = dirname(fileURLToPath(import.meta.url)) + sep
const cfg = {
  port: process.env.PORT || 3000,
  dir: {
    root: __dirname,
    static: __dirname + 'static' + sep
  }
}

console.dir(cfg, { depth: null, color: true })

// Express initiation
const app = express()

// log every request ot the terminal
app.use((req, res, next) => {
  console.log(req.url)
  next()
})

// Home page route
app.get('/', (req, res) => {
  res.send('Hellow Enn')
})

// Another route
app.get('/hello/', (req, res) => {
  res.send('Hello again!')
})

// Serve static assets
app.use(express.static(cfg.dir.static))

// Start server
app.listen(cfg.port, () => {
  console.log(`Example app listening at http://localhost:${cfg.port}`)
})

// export defaults
export { cfg, app }
