const { Schema, model } = require('mongoose')

const noteSchema = new Schema({
  email: { type: String, required: true },
  noteId: { type: Number, required: true },
  note: {
    title: { type: String, required: true },
    text: { type: String, required: true },
    important: { type: 'Number', require: true },
    date: { type: Date, required: true }
  }
})

module.exports = model('Note', noteSchema)
