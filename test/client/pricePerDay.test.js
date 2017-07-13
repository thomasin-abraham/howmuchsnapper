import test from 'ava'

import { findFareTotal } from '../../client/d3/pricePerDay'

const fakeData = [
  {
    Total: -5
  },
  {
    Total: 3.5
  },
  {
    Total: -2
  },
  {
    Total: 9.45
  },
  {
    Total: ''
  },
  {
    Total: 1
  },
]

test('Find fare total returns correct total', t => {
  const expected = 20.95
  const actual = findFareTotal(fakeData)
  t.is(expected, actual)
})
