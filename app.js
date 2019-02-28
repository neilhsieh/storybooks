const express = require('express')
const exphbs = require('express-handlebars')
const mongoose = require('mongoose')
const passport = require('passport')
const session = require('express-session')
const cookieParser = require('cookie-parser')

// Load User Model
require('./models/User')
// Passport config
require('./config/passport')(passport)

// Load route
const index = require('./routes/index')
const auth = require('./routes/auth')

// Load keys
const keys = require('./config/keys')

// Map Promises
mongoose.Promise = global.Promise

// Mongoose connect
mongoose.connect(keys.mongoURI, {
  useNewUrlParser: true
})
  .then( () => console.log('MongoDB connected'))
  .catch( err => console.log(err))
  
const app = express();

// Handlebars Middleware
app.engine('handlebars', exphbs ({
  defaultLayout: 'main'
}))
app.set('view engine', 'handlebars')

app.use(cookieParser())
app.use(session({
  secret: 'secret',
  resave: false,
  saveUninitialized: false
}))

// Passport Middleware
app.use(passport.initialize())
app.use(passport.session())

// Global vars
app.use((req, res, next) => {
  res.locals.user = req.user || null
  next()
})

// Use routes
app.use('/', index)
app.use('/auth', auth)

const port = process.env.PORT || 5000

app.listen( port, () => {
  console.log(`Server started on port ${port}`)
})