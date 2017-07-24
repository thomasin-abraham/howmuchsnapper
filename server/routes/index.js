const path = require('path')
const express = require('express')
const fs = require('fs')
const router = express.Router()

const getNormalData = require('../dataManip')


router.get('/data', (req, res) => {
  fs.readFile(path.join(__dirname, '../data/htmlToJSON.json'), 'utf8', (err, data) => {
    if (err) throw err
    res.json(getNormalData(data))
  })
})

module.exports = router
