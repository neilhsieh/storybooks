const express = require('express')
const mongoose = require('mongoose')

const app = express();

app.get('/', (req, res) => {
  res.send('Welcome')
})

app.get('/about', (req, res) => {
  res.send('Test')
})

const port = process.env.PORT || 5000

app.listen( port, () => {
  console.log(`Server started on port ${port}`)
})