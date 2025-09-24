import express from 'express'
import path from 'path'
import {fileURLToPath} from 'url'
import eventData from '../data/events.js'

const _filename = fileURLToPath(import.meta.url)
const _dirname = path.dirname(_filename)

const router = express.Router()

router.get('/', (req, res) => {
  res.status(200).json(eventData)
})

router.get('/:eventID', (req,res) => {
    res.status(200).sendFile(path.resolve(_dirname, "../public/event.html"))
})

export default router