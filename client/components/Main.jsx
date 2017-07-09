import React from 'react'

import { makeDataRequest } from '../api'
import balanceOverTime from '../d3/lineGraph'
import pricePerDay from '../d3/pricePerDay'
import daysBetweenTopups from '../d3/daysBetweenTopups'

import Landing from './Landing'
import Divider from './Divider'
import BalanceVsTime from './BalanceVsTime'
import PricePerDay from './PricePerDay'
import DaysBetweenTopups from './DaysBetweenTopups'

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
        <Divider />
        <PricePerDay />
        <Divider />
        <DaysBetweenTopups />
        <Divider />
      </div>
    )
  }
}

export default Main
