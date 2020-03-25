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

      const { token, title, text, date } = req.body
      const userId = await jwt.verify(token, config.get('jwtSecret'))
      const note = new Note({ userId, title, text, date })

      await note.save()
      res.status(201).json({ message: 'Note has been created' })
    } catch (error) {
      res.status(500).json({ message: 'Server Error' })
    }
  }
)

notesRouter.get('/', async (req, res) => {
  try {
    const { token } = req.params
    const userId = await jwt.verify(token, config.get('jwtSecret'))

    const notes = await Note.find({ userId })
    res.json(notes)
  } catch (error) {
    res.status(500).json({ message: 'Server Error' })
  }
})

notesRouter.delete('/', async (req, res) => {
  try {
    const { token, noteId } = req.params
    const userId = await jwt.verify(token, config.get('jwtSecret'))

    await Note.findOneAndDelete({ userId, _id: noteId })
    res.json({ message: 'Note has been deleted' })
  } catch (error) {
    res.status(500).json({ message: 'Server Error' })
  }
})

notesRouter.put('/', async (req, res) => {
  try {
    const { token, noteId, title, text } = req.body
    const userId = await jwt.verify(token, config.get('jwtSecret'))

    await Note.findOneAndUpdate(
      { _id: noteId, userId },
      { $set: { title, text } }
    )
    res.json({ message: 'Note has been updated' })
  } catch (error) {
    res.status(500).json({ message: 'Server Error' })
  }
})

module.exports = notesRouter
