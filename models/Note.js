const { Schema, model } = require('mongoose')

const noteSchema = new Schema({
  noteId: { type: Number, required: true, unique: true },
  userId: { type: Number, required: true },
  title: { type: String, required: true },
  text: { type: String, required: true },
  date: { type: String, required: true }
})

module.exports = model('User', noteSchema)
