const { Schema, model } = require('mongoose')

const noteSchema = new Schema({
  userId: { type: Number, required: true },
  title: { type: String, required: true },
  text: { type: String, required: true },
  date: { type: Date, required: true }
})

module.exports = model('User', noteSchema)
