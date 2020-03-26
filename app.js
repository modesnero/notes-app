const express = require('express')
const config = require('config')
const mongoose = require('mongoose')
const path = require('path')

const PORT = config.get('port') || 5000
const MONGO_URL = config.get('mongoUrl')
const MONGO_OPTIONS = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true
}

const app = express()

app.use(express.json())
app.use('/api/auth', require('./routes/auth.routes'))
app.use('/api/note', require('./routes/notes.routes'))

if (process.env.NODE_ENV === 'production') {
  app.use('/', express.static(path.join(__dirname, 'client', 'build')))

  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'))
  })
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
