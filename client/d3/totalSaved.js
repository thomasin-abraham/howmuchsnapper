import { filterDays, setText, formatMean } from './utils'

export default function totalSaved (data) {
  const total = findTotalSaved(data)

  setText(formatMean(total, `$${total.toFixed(2)}`), 'moneysaved')
}

export function findTotalSaved (data) {
  return data.reduce((acc, row) => {
    return row.Total
    ? acc + (5 - Math.abs(row.Total))
    : acc
  }, 0)
}
