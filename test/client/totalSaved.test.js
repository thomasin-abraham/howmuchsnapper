import test from 'ava'

import { findTotalSaved } from '../../client/d3/totalSaved'

const fakeData = [
  {
    Total: -1,
    DateTime: '2017-05-08 07:38',
    TagOnTime: '07:38',
    TagOffTime: '07:48'
  },
  {
    Total: 3.5,
    DateTime: '2017-05-08 07:38',
    TagOnTime: '07:38',
    TagOffTime: ''
  },
  {
    Total: -2,
    DateTime: '2017-05-08 07:38',
    TagOnTime: '07:38',
    TagOffTime: '07:55'
  },
  {
    Total: 6,
    DateTime: '2017-05-08 07:38',
    TagOnTime: '07:38',
    TagOffTime: '07:39'
  },
  {
    Total: '',
    DateTime: '2017-05-08 07:38',
    TagOnTime: '07:38',
    TagOffTime: '07:44'
  },
  {
    Total: 1,
    DateTime: '2017-05-08 07:38',
    TagOnTime: '07:38',
    TagOffTime: '08:28'
  },
]

test('Find total saved returns correct', t => {
  const expected = 11.5
  const actual = findTotalSaved(fakeData)
  t.is(actual, expected)
})
