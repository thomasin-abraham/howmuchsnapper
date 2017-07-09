import moment from 'moment'

import { findSnapperDays, findTotalDays, setText } from './utils'

export default function pricePerDay (data, dayType) {
  const countedDays = {
    numOfDays: findTotalDays(data), // Total number of days in data,
    numOfSnapperDays: findSnapperDays(data)
  }
  const mean = findFareTotal(data) / countedDays[dayType] // The average of whichever day type is selected
  const formatMean = mean == Infinity
    ? '-'
    : `$${mean.toFixed(2)}`
  setText(formatMean, 'priceperday')
}

function findFareTotal (data) {
  return data.reduce((acc, row) => {
    return acc + Math.abs(row.Total) // Count all the fare totals
  }, 0)
}
