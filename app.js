const express = require('express')
const config = require('config')
const mongoose = require('mongoose')
const path = require('path')

const PORT = config.get('port') || 5000
const MONGO_URL = config.get('mongoUrl')
const MONGO_OPTIONS = config.get('mongoOptions')

const PATH_CLIENT_STATIC = path.join(__dirname, 'client', 'build')
const PATH_INDEX_PAGE = path.resolve(__dirname, 'client', 'build', 'index.html')

const app = express()

app.use(express.json())
app.use('/api/auth', require('./routes/auth.routes'))
app.use('/api/note', require('./routes/notes.routes'))

// Send static files on Prod
if (process.env.NODE_ENV === 'production') {
  app.use('/', express.static(PATH_INDEX_PAGE))
  app.get('*', (_req, res) => res.sendFile(PATH_CLIENT_STATIC))
}

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
