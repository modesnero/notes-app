const express = require('express')
const config = require('config')
const mongoose = require('mongoose')

const PORT = config.get('port') || 5000
const MONGO_URL = config.get('mongoUrl')
const MONGO_OPTIONS = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true
}

const app = express()

app.use('/api/auth', require('./routes/auth.routes'))

async function start () {
  try {
    await mongoose.connect(MONGO_URL, MONGO_OPTIONS)
    app.listen(PORT, () => console.log(`App has been started on port: ${PORT}`))
  } catch (e) {
    console.error('Server Error', e.message)
    process.exit(1)
  }
}

start()
