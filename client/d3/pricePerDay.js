import moment from 'moment'

export default function pricePerDay (data, dayType) {
  const countedDays = {
    numOfDays: findTotalDays(data), // Total number of days in data,
    numOfSnapperDays: findSnapperDays(data)
  }

  applyTransition((findFareTotal(data) / countedDays[dayType]).toFixed(2)) // The average of whichever day type is selected
}

function applyTransition (mean) {
  d3.select('#priceperdayNum')
    .transition()
    .ease(d3.easeCircle)
    .duration(1500)
    .tween("text", () => {
          var that = d3.select('#priceperdayNum')
          var i = d3.interpolateNumber(that.text().replace('$', ''), mean) // Scale of numbers between 0 and the mean
          return function (t) { that.text(`$${i(t).toFixed(2)}`) } // For every transition frame display number on the scale of 0 to the mean
    })
}

function findFareTotal (data) {
  return data.reduce((acc, row) => {
    return row.Description.includes('Top-up') ? acc : acc + Math.abs(row.Total) // Count all the fare totals
  }, 0)
}

function findTotalDays (data) {
  return moment(data[data.length - 1].DateTime).diff(data[0].DateTime, 'days')
}

function doesDayExist(acc, row) {
  return acc.find((r) => {
    return r.DateTime.split(' ')[0] === row.DateTime.split(' ')[0] // Has this day already been counted?
  })
}

function findSnapperDays (data) {
  return data.reduce((acc, row) => { // Total number of days that a fare has been paid on
    return ( doesDayExist(acc, row) || row.Description.includes('Top-up')) // If day already counted or transaction not a fare
    ? acc
    : acc.concat([row].slice(0)) // Push a copy of the row onto accumulator
  }, []).length
}
