import React from 'react'

import { makeDataRequest } from '../api'
import balanceOverTime from '../d3/lineGraph'
import pricePerDay from '../d3/pricePerDay'
import daysBetweenTopups from '../d3/pricePerDay'

import Landing from './Landing'
import BalanceVsTime from './BalanceVsTime'
import PricePerDay from './PricePerDay'
import DaysBetweenTopups from './PricePerDay'

class Main extends React.Component {
  componentDidMount() { // Send a copy of the data to all graphs on page
    makeDataRequest((data) => {
      balanceOverTime(data.map(a => Object.assign({}, a)))
      pricePerDay(data.map(a => Object.assign({}, a)), 'numOfDays')
      daysBetweenTopups(data.map(a => Object.assign({}, a)))
    })
  }

  render() {
    return (
      <div className="wrapper">
        <Landing />
        <BalanceVsTime />
        <PricePerDay />
        <DaysBetweenTopups />
      </div>
    )
  }
}

export default Main
