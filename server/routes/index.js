const path = require('path')
const express = require('express')
const fs = require('fs')
const trim = require('trim')
const router = express.Router()

const db = require('../db')

router.get('/data', (req, res) => {
  fs.readFile(path.join(__dirname, '../data/htmlToJSON.json'), 'utf8', (err, data) => {
    if (err) throw err
    let manipulatedData = JSON.parse(data).map((row) => {
      let tagOn = ['','']
      let tagOff = ['','']
      let splitAmount = ['','']
      let penalty = ''
      let PenaltyFare = ''
      let splitTag=['','']
      if (row.FIELD11.includes('Tag on')) {
        splitTag = row.FIELD11.split('\n')
        if (splitTag[0].includes('Penalty') || splitTag[0].includes('IOU')) {
          penalty = splitTag.shift()
        }
        tagOn = splitTag[0].split('Tag on')
        tagOff = splitTag[1].split('Tag off')
        if (!tagOff[1]) tagOff.push('')
        splitAmount = row.FIELD12.split('\n')
        if (!splitAmount[1]) splitAmount.push('')
        if (splitAmount.length === 3) PenaltyFare = splitAmount.shift()
      }
      return {
        DateTime: row.FIELD3,
        Balance: Number(row.FIELD8.replace('$', '')),
        Total: Number(row.FIELD5.replace('$', '')),
        Description: row.FIELD4,
        TagOnLocation: trim(tagOn[1]),
        TagOffLocation: trim(tagOff[1]),
        TagOnTime: trim(tagOn[0]),
        TagOffTime: trim(tagOff[0]),
        tagOnPrice: Number(trim(splitAmount[0]).replace('$', '')),
        tagOffPrice: Number(trim(splitAmount[1]).replace('$', '')),
        Penalty: trim(penalty),
        PenaltyFare: Number(trim(PenaltyFare).replace('$', ''))
      }
    })
    console.log(manipulatedData)
    res.json(manipulatedData)
  })
})

module.exports = router
