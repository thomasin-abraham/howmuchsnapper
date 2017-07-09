import moment from 'moment'

export function filterDays (data) {
  return data.filter((row) => row.TagOnLocation !== '')
}

export function humaniseDuration (number, type) {
  return moment.duration(number, type).humanize() // Display time in human readable way
}

export function findTotalDays (data) {
  return moment(data[data.length - 1].DateTime).diff(data[0].DateTime, 'days')
}

export function findSnapperDays (data) {
  return data.filter((row, i, self) => { // Total number of days that a fare has been paid on
    return !doesDayExist(self, row, i) // If day already counted
  }).length
}

function doesDayExist(self, row, i) {
  return self.findIndex((r) => { // Has this day already been counted
    return moment(row.DateTime).isSame(r.DateTime, 'day')
  }) !== i
  ? true
  : false
}

export function setText(str, id) {
  d3.select(`#${id}Num`)
    .text(str)
}
