import moment from 'moment'

export default function pricePerDay (data, dayType) {
  const countedDays = {
    numOfDays: findTotalDays(data), // Total number of days in data,
    numOfSnapperDays: findSnapperDays(data)
  }

  setText((findFareTotal(data) / countedDays[dayType]).toFixed(2)) // The average of whichever day type is selected
}

function setText(mean) {
  d3.select('#priceperdayNum')
    .text(() => {
      return mean == Infinity
      ? '-'
      : `$${mean}`
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
    return moment(r.DateTime).isSame(r.DateTime, 'day') // Has this day already been counted?
  })
}

function findSnapperDays (data) {
  return data.reduce((acc, row) => { // Total number of days that a fare has been paid on
    return ( doesDayExist(acc, row) || row.Description.includes('Top-up')) // If day already counted or transaction not a fare
    ? acc
    : acc.concat([row].slice(0)) // Push a copy of the row onto accumulator
  }, []).length
}
