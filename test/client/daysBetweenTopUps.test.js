import test from 'ava'

import { findTripTimeTotal } from '../../client/d3/tripTime'

const fakeData = [
  {
    Description: 'Top-up',
    Total: 15,
    DateTime: '2017-05-08 07:38',
    TagOnTime: '07:38',
    TagOffTime: '07:48'
  },
  {
    Description: 'Top-up',
    Total: 10,
    DateTime: '2017-05-10 07:38',
    TagOnTime: '07:38',
    TagOffTime: ''
  },
  {
    Description: 'Top-up',
    Total: 25,
    DateTime: '2017-05-13 07:38',
    TagOnTime: '07:38',
    TagOffTime: '07:55'
  },
  {
    Description: 'Go Wellington',
    Total: 9.45,
    DateTime: '2017-05-08 07:38',
    TagOnTime: '07:38',
    TagOffTime: '07:39'
  },
  {
    Description: 'Go Wellington',
    Total: '',
    DateTime: '2017-05-08 07:38',
    TagOnTime: '07:38',
    TagOffTime: '07:44'
  },
  {
    Description: 'Go Wellington',
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
