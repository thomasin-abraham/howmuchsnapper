import test from 'ava'

import { findTripTimeTotal } from '../../client/d3/tripTime'

const fakeData = [
  {
    Total: -5,
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
    Total: 9.45,
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

test('Find trip time total returns correct', t => {
  const expected = 84
  const actual = findTripTimeTotal(fakeData)
  t.is(actual, expected)
})

test('Find trip time total returns correct with just one data point', t => {
  const expected = 50
  const actual = findTripTimeTotal(fakeData.slice(fakeData.length - 1))
  t.is(actual, expected)
})
