const express = require('express')
const http = require('http')
const bodyParser = require('body-parser')
const morgan = require('morgan')
const router= require('./router')
const mongoose = require('mongoose')

require('../services/passport')

// DB setup
mongoose.set('useCreateIndex', true);
mongoose.connect('mongodb://localhost:27017/auth', { useNewUrlParser: true })

const App = express()

// App Setup

App.use(morgan('combined'))
App.use(bodyParser.json({ type: '*/*' }))
router(App)





// Server Setup

const port = process.env.PORT || 3090

const server = http.createServer(App)

server.listen(port, ()=>{
  console.log(`Server listening on port ${port}`)
})