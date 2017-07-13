import moment from 'moment'

import { humaniseDuration, findSnapperDays, findTotalDays, setText, formatMean } from './utils'

export default function tripTime (data, dayType) {
  const countedDays = {
    numOfDays: findTotalDays(data), // Total number of days in data,
    numOfSnapperDays: findSnapperDays(data)
  }

  const mean = findTripTimeTotal(data) / countedDays[dayType] // The average of whichever day type is selected

  setText(formatMean(mean, humaniseDuration(mean, 'minutes')), 'triptime')
}

export function findTripTimeTotal (data) {
  return data.reduce((acc, row) => {
    const date = row.DateTime.split(' ')[0]
    const tagOff = moment(`${date} ${row.TagOffTime}`, 'YYYY-MM-DD HH:mm')
    const tagOn = moment(`${date} ${row.TagOnTime}`, 'YYYY-MM-DD HH:mm')
    return row.TagOffTime
    ? acc + tagOff.diff(tagOn, 'minutes')
    : acc
  }, 0)
}
