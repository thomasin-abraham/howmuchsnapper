const path = require('path')
const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')

const router = require('./routes')

const corsOptions = {
  origin: true,
  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
  preflightContinue: false,
  credentials: true
}

var app = express()
app.use(express.static(path.join(__dirname, '../public')))
app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())

app.use('/', router)

module.exports = () => {
  return app
}
