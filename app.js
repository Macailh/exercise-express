// Express application
import express from 'express'

// Configuration
const cfg = {
  port: process.env.PORT || 3000
}

// Express initiation
const app = express()

// Home page route
app.get('/', (req, res) => {
  res.send('Hellow Enn')
})

// Start server
app.listen(cfg.port, () => {
  console.log(`Example app listening at http://localhost:${cfg.port}`)
})
