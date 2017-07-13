import moment from 'moment'

import { findSnapperDays, findTotalDays, setText, formatMean } from './utils'

export default function pricePerDay (data, dayType) {
  const countedDays = {
    numOfDays: findTotalDays(data), // Total number of days in data,
    numOfSnapperDays: findSnapperDays(data)
  }
  const mean = findFareTotal(data) / countedDays[dayType] // The average of whichever day type is selected
  setText(formatMean(mean, `$${mean.toFixed(2)}`), 'priceperday')
}

export function findFareTotal (data) {
  return data.reduce((acc, row) => {
    return acc + Math.abs(row.Total) // Count all the fare totals
  }, 0)
}
