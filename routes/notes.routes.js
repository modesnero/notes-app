const { Router } = require('express')
const { check, validationResult } = require('express-validator')
const jwt = require('jsonwebtoken')
const config = require('config')
const Note = require('../models/Note')
const notesRouter = Router()

notesRouter.post(
  '/',
  [
    check('title', 'Incorrect title').isLength({ min: 4, max: 120 }),
    check('text', 'Incorrect text').isLength({ min: 4, max: 600 })
  ],
  async (req, res) => {
    try {
      const errors = validationResult(req)
      if (errors.isEmpty) {
        return res.status(400).json({
          errors: errors.array(),
          message: 'Incorrect note data'
        })
      }

      const { token, noteId, note } = req.body
      const email = await jwt.verify(token, config.get('jwtSecret'))
      const newNote = new Note({ email, noteId, note })

      await newNote.save()
      res.status(201).json({ message: 'Note has been created' })
    } catch (error) {
      res.status(500).json({ message: 'Server Error' })
    }
  }
)

notesRouter.get('/', async (req, res) => {
  try {
    const { token, noteId } = req.query
    const email = await jwt.verify(token, config.get('jwtSecret'))

    const result = await Note.find({ email, noteId })
    res.json(result)
  } catch (error) {
    res.status(500).json({ message: 'Server Error' })
  }
})

notesRouter.delete('/', async (req, res) => {
  try {
    const { token, noteId } = req.query
    const email = await jwt.verify(token, config.get('jwtSecret'))

    await Note.findOneAndDelete({ email, noteId })
    res.json({ message: 'Note has been deleted' })
  } catch (error) {
    res.status(500).json({ message: 'Server Error' })
  }
})

notesRouter.put(
  '/',
  [
    check('title', 'Incorrect title').isLength({ min: 4, max: 120 }),
    check('text', 'Incorrect text').isLength({ min: 4, max: 600 })
  ],
  async (req, res) => {
    try {
      const { token, noteId, note } = req.body
      const email = await jwt.verify(token, config.get('jwtSecret'))

      await Note.findOneAndUpdate({ email, noteId }, { $set: { note } })
      res.json({ message: 'Note has been updated' })
    } catch (error) {
      res.status(500).json({ message: 'Server Error' })
    }
  }
)

module.exports = notesRouter
