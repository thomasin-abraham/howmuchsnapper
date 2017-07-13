import test from 'ava'

import { filterDays, formatMean, humaniseDuration, findTotalDays, doesDayExist, findSnapperDays } from '../../client/d3/utils'

const fakeData = [
  {
    Total: -1,
    DateTime: '2017-05-08 07:38',
    TagOnTime: '07:38',
    TagOffTime: '07:48',
    TagOnLocation: 'test'
  },
  {
    Total: 3.5,
    DateTime: '2017-05-09 07:38',
    TagOnTime: '07:38',
    TagOffTime: '',
    TagOnLocation: ''
  },
  {
    Total: -2,
    DateTime: '2017-05-09 07:38',
    TagOnTime: '07:38',
    TagOffTime: '07:55',
    TagOnLocation: 'testing'
  },
  {
    Total: 6,
    DateTime: '2017-05-12 07:38',
    TagOnTime: '07:38',
    TagOffTime: '07:39',
    TagOnLocation: 'test'
  },
  {
    Total: '',
    DateTime: '2017-05-13 07:38',
    TagOnTime: '07:38',
    TagOffTime: '07:44',
    TagOnLocation: ''
  },
  {
    Total: 1,
    DateTime: '2017-05-14 07:38',
    TagOnTime: '07:38',
    TagOffTime: '08:28',
    TagOnLocation: ''
  },
]

test('Filter days returns correct', t => {
  t.is(filterDays(fakeData).length, 3)
})

test('Format mean returns correct output for valid number', t => {
  t.is(formatMean(5, 'test'), 'test')
})

test('Format mean returns correct output for Infinity', t => {
  t.is(formatMean(Infinity, 'test'), '-')
})

test('Format mean returns correct output for 0', t => {
  t.is(formatMean(0, 'test'), '-')
})

test('Humanise duration returns correct for minutes', t => {
  t.is(humaniseDuration(60, 'minutes'), 'an hour')
})

test('Humanise duration returns correct string', t => {
  t.is(humaniseDuration(1, 'days'), 'a day')
})

test('Find total days returns correct amount', t => {
  t.is(findTotalDays(fakeData), 6)
})

test('Find total days returns correct amount', t => {
  t.is(findTotalDays(fakeData.slice(4)), 1)
})

test('Find snapper days returns correct length', t => {
  t.is(findSnapperDays(fakeData), 5)
})

test('Find snapper days returns correct length on no days', t => {
  t.is(findSnapperDays(fakeData.slice(6)), 1)
})

test('Does day exist returns true if day already counted', t => {
  const row = {
      Total: -2,
      DateTime: '2017-05-09 07:38',
      TagOnTime: '07:38',
      TagOffTime: '07:55',
      TagOnLocation: 'testing'
    }
  const actual = doesDayExist(fakeData, row, 2)
  t.is(actual, true)
})

test('Does day exist returns false if day not already counted', t => {
  const row = {
      Total: 3.5,
      DateTime: '2017-05-09 07:38',
      TagOnTime: '07:38',
      TagOffTime: '',
      TagOnLocation: ''
    }
  const actual = doesDayExist(fakeData, row, 1)
  t.is(actual, false)
})
