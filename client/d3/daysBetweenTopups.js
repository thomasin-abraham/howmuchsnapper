import moment from 'moment'

import { humaniseDuration, setText, formatMean } from './utils'

export default function daysBetweenTopups (data) {
  const filteredData = filterTopUps(data)
  const daysBetween = numDaysBetween(filteredData)
  const mean = filteredData.length > 1
    ? Math.round((totalDays(daysBetween)/daysBetween.length))
    : 0

  setText(formatMean(mean, humaniseDuration(mean, 'days')), 'daysbetweentopups')
}

export function filterTopUps (data) {
  return data.filter((transaction) => {
    return transaction.Description.includes('Top-up')
  })
}

export function totalDays(days) {
  return days.reduce((acc, daysNum) => {
    return acc + daysNum
  }, 0)
}

export function numDaysBetween (totalTopUps) {
  return totalTopUps.map((transaction, i) => {
    return i === 0
    ? null
    : moment(transaction.DateTime).diff(totalTopUps[i-1].DateTime, 'days')
  }).slice(1)
}
