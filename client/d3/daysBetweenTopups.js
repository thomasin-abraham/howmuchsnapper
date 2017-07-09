import moment from 'moment'

export default function daysBetweenTopups (data) {
  const filteredData = filterTopUps(data)
  const daysBetween = numDaysBetween(filteredData)
  console.log(daysBetween)
  const mean = Math.round((totalDays(daysBetween)/daysBetween.length))

  applyTransition(mean)
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

function applyTransition (mean) {
  d3.select('#daysbetweentopupsNum')
    .transition()
    .ease(d3.easeLinear)
    .duration(1500)
    .tween("text", () => {
          var that = d3.select('#daysbetweentopupsNum')
          var i = d3.interpolateNumber(that.text(), mean) // Scale of numbers between 0 and the mean
          return (t) => { that.text(formatDuration(i, t)) } // For every transition frame display number on the scale of 0 to the mean
    })
}

function formatDuration (i, t) {
  return moment.duration(i(t), 'days').humanize() // Display time in human readable way
}
