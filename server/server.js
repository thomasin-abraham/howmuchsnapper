const path = require('path')
const express = require('express')
const bodyParser = require('body-parser')

const router = require('./routes')

var app = express()
app.use(express.static(path.join(__dirname, '../public')))
app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())

app.use('/', router)

module.exports = () => {
  return app
}
