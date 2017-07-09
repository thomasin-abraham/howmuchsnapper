import moment from 'moment'

import { humaniseDuration, findSnapperDays, findTotalDays, setText } from './utils'

export default function tripTime (data, dayType) {
  const countedDays = {
    numOfDays: findTotalDays(data), // Total number of days in data,
    numOfSnapperDays: findSnapperDays(data)
  }
  const mean = findTripTimeTotal(data) / countedDays[dayType] // The average of whichever day type is selected
  const formatMean = mean == Infinity
    ? '-'
    : humaniseDuration(Math.round(mean), 'minutes')
  setText(formatMean, 'triptime')
}

function findTripTimeTotal (data) {
  return data.reduce((acc, row) => {
    const date = row.DateTime.split(' ')[0]
    const tagOff = moment(`${date} ${row.TagOffTime}`, 'YYYY-MM-DD HH:mm')
    const tagOn = moment(`${date} ${row.TagOnTime}`, 'YYYY-MM-DD HH:mm')
    return acc + tagOff.diff(tagOn, 'minutes')
  }, 0)
}
