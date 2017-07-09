import moment from 'moment'

export default function daysBetweenTopups (data) {
  const filteredData = filterTopUps(data)
  const daysBetween = numDaysBetween(filteredData)
  const mean = filteredData.length >= 1
    ? Math.round((totalDays(daysBetween)/daysBetween.length))
    : null

  mean
  ? setText(mean)
  : noTopUps()
}

function noTopUps () {
  d3.select('#daysbetweentopupsNum')
    .text('-')
}

function setText (mean) {
  d3.select('#daysbetweentopupsNum')
    .text(formatDuration(mean))
}


function filterTopUps (data) {
  return data.filter((transaction) => {
    return transaction.Description.includes('Top-up')
  })
}

function totalDays(days) {
  return days.reduce((acc, daysNum) => {
    return acc + daysNum
  }, 0)
}

function numDaysBetween (totalTopUps) {
  return totalTopUps.map((transaction, i) => {
    return i === 0
    ? null
    : moment(transaction.DateTime).diff(totalTopUps[i-1].DateTime, 'days')
  }).slice(1)
}

function formatDuration (numOfDays) {
  return moment.duration(numOfDays, 'days').humanize() // Display time in human readable way
}
