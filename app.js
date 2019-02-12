const express = require('express')
const mongoose = require('mongoose')
const passport = require('passport')

// Passport config
require('./config/passport')(passport)

// Load route
const auth = require('./routes/auth')

const app = express();

app.get('/', (req, res) => {
  res.send('Welcome')
})

app.get('/about', (req, res) => {
  res.send('Test')
})

// Use routes
app.use('/auth', auth)

const port = process.env.PORT || 5000

app.listen( port, () => {
  console.log(`Server started on port ${port}`)
})