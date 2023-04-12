// Express application
import express from 'express'

// Configuration
const cfg = {
  port: process.env.PORT || 3000
}

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
app.use(express.static('static'))

// Start server
app.listen(cfg.port, () => {
  console.log(`Example app listening at http://localhost:${cfg.port}`)
})
