import { filterDays, setText } from './utils'

export default function totalSaved (data) {
  const total = findTotalSaved(data)
  const formatTotal = total == Infinity
    ? '-'
    : `$${total.toFixed(2)}`

  setText(formatTotal, 'moneysaved')
}

function findTotalSaved (data) {
  return data.reduce((acc, row) => {
    return acc + (5 - Math.abs(row.Total))
  }, 0)
}
