import React from 'react'
import inViewport from 'in-viewport'
import moment from 'moment'
// import mapboxgl from 'mapbox-gl/dist/mapbox-gl.js'
// mapboxgl.accessToken = 'pk.eyJ1IjoidGhvbWFzaW4iLCJhIjoiY2o0d2ZlNHdoMTZ5NTJxcGhqejRmazg2MyJ9.fAtNxfp8KzDpI0UO7EOLZQ'


import { makeDataRequest } from '../api'
import { createGraph } from '../d3/lineGraph'
import pricePerDay from '../d3/pricePerDay'
import tripTime from '../d3/tripTime'
import totalSaved from '../d3/totalSaved'
import daysBetweenTopups from '../d3/daysBetweenTopups'
import { filterDays } from '../d3/utils'

import Landing from './Landing'
import Divider from './Divider'
import BalanceVsTime from './BalanceVsTime'
import StatsDisplay from './StatsDisplay'
import Domain from './Domain'
import Footer from './Footer'


class Main extends React.Component {
  componentDidMount() { // Send a copy of the data to all graphs on page (how can I make this faster?)
    makeDataRequest((data) => {
      createGraph(copyData(data), (domain, isZoomEnd) => {
        newDomain(data, domain, isZoomEnd)
      })
    })
  }

  render() {
    return (
      <div className="wrapper">
        <Landing />
        <BalanceVsTime />
        <Divider />
        <div className="container-fluid horizontalContainer">
          <StatsDisplay name="priceperday" desc="a day on average spent with Snapper" />
          <StatsDisplay name="daysbetweentopups" desc="on average in between top ups"/>
        </div>
        <Divider />
          <div className="container-fluid horizontalContainer">
            <StatsDisplay name="triptime" desc="average time on public transport a day" />
            <StatsDisplay name="moneysaved" desc="total saved by using Snapper"/>
          </div>
        <Divider />
        <Footer />
      </div>
    )
  }
}

function copyData (data) {
  return data.map(a => Object.assign({}, a))
}

function newDomain (unfilteredData, domain, isZoomEnd) { // Refresh statistics based on new domain
  let data = filterForDomain(unfilteredData, domain)
  let filteredByFares = filterDays(data)

  renderDomainDates(domain)
  if (isZoomEnd) {
    pricePerDay(filteredByFares, 'numOfDays')
    daysBetweenTopups(data)
    tripTime(filteredByFares, 'numOfSnapperDays')
    totalSaved(filteredByFares)
  }
}

function renderDomainDates (domain) {
  d3.select('#domainNum')
    .text(`${formatDomain(domain[0])} - ${formatDomain(domain[1])}`)
}

function formatDomain (date) {
  const formatTime = d3.timeFormat('%b %e %Y %I:%M%p')
  return formatTime(date)
}

function filterForDomain (data, domain) { // Edit data to only include days within domain
  return copyData(data)
    .filter((transaction) => {
      return moment(transaction.DateTime).isAfter(domain[0]) && moment(transaction.DateTime).isBefore(domain[1])
    })
}

export default Main
