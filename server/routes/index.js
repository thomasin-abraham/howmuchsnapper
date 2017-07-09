const path = require('path')
const express = require('express')
const fs = require('fs')
const trim = require('trim')
const request = require('superagent')
const router = express.Router()

const db = require('../db')

function getNormalData (data) {
  return JSON.parse(data).map((row) => {
    // Initialise variables
    let transaction = {
      tagOn: ['',''],
      tagOff: ['',''],
      splitAmount: ['',''],
      penalty: '',
      PenaltyFare: '',
      splitTag: ['','']
    }

    if (row.FIELD11.includes('Tag on')) transactionFare(transaction, row)

    return returnedTransaction(transaction, row)
  })
}

function returnedTransaction (t, row) {
  return {
    DateTime: row.FIELD3,
    Balance: Number(row.FIELD8.replace('$', '')),
    Total: Number(row.FIELD5.replace('$', '')),
    Description: row.FIELD4,
    TagOnLocation: trim(t.tagOn[1]),
    TagOffLocation: trim(t.tagOff[1]),
    TagOnTime: trim(t.tagOn[0]),
    TagOffTime: trim(t.tagOff[0]),
    tagOnPrice: Number(trim(t.splitAmount[0]).replace('$', '')),
    tagOffPrice: Number(trim(t.splitAmount[1]).replace('$', '')),
    Penalty: trim(t.penalty),
    PenaltyFare: Number(trim(t.PenaltyFare).replace('$', ''))
  }
}

function ifPenaltyFare (t) {
  if (t.splitTag[0].includes('Penalty') || t.splitTag[0].includes('IOU')) {
    t.penalty = t.splitTag.shift()
    t.PenaltyFare = t.splitAmount.shift()
  }
}

function ifNoTagOff (t) {
  if (!t.splitAmount[1]) {
    t.splitAmount.push('')
    t.tagOff.push('')
  }
}

function transactionFare (t, row) {
  t.splitTag = row.FIELD11.split('\n') // Split trip locations into array
  t.splitAmount = row.FIELD12.split('\n') // Split fare breakdown into array
  ifPenaltyFare(t) // If there is a penalty fare applied
  t.tagOn = t.splitTag[0].split('Tag on')
  t.tagOff = t.splitTag[1].split('Tag off')
  ifNoTagOff(t) // If fare has no tag off
}

router.get('/data', (req, res) => {
  fs.readFile(path.join(__dirname, '../data/htmlToJSON.json'), 'utf8', (err, data) => {
    if (err) throw err
    res.json(getNormalData(data))
  })
})

module.exports = router
