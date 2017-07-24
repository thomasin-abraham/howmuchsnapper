import test from 'ava'

import { filterTopUps, totalDays, numDaysBetween } from '../../client/d3/daysBetweenTopups'

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
    DateTime: '2017-05-09 07:38',
    TagOnTime: '07:38',
    TagOffTime: ''
  },
  {
    Description: 'Top-up',
    Total: 25,
    DateTime: '2017-05-09 07:38',
    TagOnTime: '07:38',
    TagOffTime: '07:55'
  },
  {
    Description: 'Go Wellington',
    Total: 9.45,
    DateTime: '2017-05-13 07:38',
    TagOnTime: '07:38',
    TagOffTime: '07:39'
  },
  {
    Description: 'Go Wellington',
    Total: '',
    DateTime: '2017-05-15 07:38',
    TagOnTime: '07:38',
    TagOffTime: '07:44'
  },
  {
    Description: 'Go Wellington',
    Total: 1,
    DateTime: '2017-05-16 07:38',
    TagOnTime: '07:38',
    TagOffTime: '08:28'
  },
]

test('Filter top ups returns correctly filtered', t => {
  t.is(filterTopUps(fakeData).length, 3)
})

test('Total days returns correct number', t => {
  const daysArray = [ 3, 4, 5, 4, 2]
  t.is(totalDays(daysArray), 18)
})

test('Total days returns correct for 0 days in array', t => {
  const daysArray = [ ]
  t.is(totalDays(daysArray), 0)
})

test('Num days between returns correct array', t => {
  const expected = [1,0,4,2,1]
  t.is(numDaysBetween(fakeData)[0], expected[0])
  t.is(numDaysBetween(fakeData)[1], expected[1])
  t.is(numDaysBetween(fakeData)[2], expected[2])
  t.is(numDaysBetween(fakeData)[3], expected[3])
  t.is(numDaysBetween(fakeData)[4], expected[4])
})
