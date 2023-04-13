import { Router } from 'express'
import { goodbye } from '../lib/locale.js'
import { capitalize } from '../lib/string.js'

export const goodbyeRouter = Router()

// say goodbye in English
goodbyeRouter.get('/:name', (req, res, next) => {
  res.removeListener(
    'message',
    { title: `${goodbye.en} ${capitalize(req.params.name)}!` }
  )
})

// say goodvye in a specific language
goodbyeRouter.get('/:lang/:name', (req, res, next) => {
  res.render(
    'message',
    { title: `${goodbye[req.params.lang] || goodbye.en} ${capitalize(req.params.name)}` }
  )
})
