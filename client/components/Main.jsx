import React from 'react'
import inViewport from 'in-viewport'
import moment from 'moment'
// import mapboxgl from 'mapbox-gl/dist/mapbox-gl.js'
// mapboxgl.accessToken = 'pk.eyJ1IjoidGhvbWFzaW4iLCJhIjoiY2o0d2ZlNHdoMTZ5NTJxcGhqejRmazg2MyJ9.fAtNxfp8KzDpI0UO7EOLZQ'


import { makeDataRequest } from '../api'
import { createGraph } from '../d3/lineGraph'
import pricePerDay from '../d3/pricePerDay'
import daysBetweenTopups from '../d3/daysBetweenTopups'

import Landing from './Landing'
import Divider from './Divider'
import BalanceVsTime from './BalanceVsTime'
import PricePerDay from './PricePerDay'
import DaysBetweenTopups from './DaysBetweenTopups'
import Domain from './Domain'
import Footer from './Footer'
// import StopMap from './StopMap'

class Main extends React.Component {
  componentDidMount() { // Send a copy of the data to all graphs on page
    makeDataRequest((data) => {
      createGraph(copyData(data), (domain) => newDomain(data, domain))
    })

    // let map = new mapboxgl.Map({
    // container: 'stop-map',
    // style: 'mapbox://styles/mapbox/light-v9'
    // })
    // map.addControl(new mapboxgl.NavigationControl())
    //   .scrollZoom.disable()
  }

  render() {
    return (
      <div className="wrapper">
        <Landing />
        <BalanceVsTime />
        <Divider />
        <div className="container-fluid horizontalContainer">
          <PricePerDay />
          <DaysBetweenTopups />
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

function newDomain (data, domain) { // Refresh statistics based on new domain
  pricePerDay(filterForDomain(data, domain), 'numOfDays')
  daysBetweenTopups(filterForDomain(data, domain))

  d3.selectAll('.domain')
    .text(`${formatDomain(domain[0])} - ${formatDomain(domain[1])}`)
}

function formatDomain (date) {
  return moment(date).format('MMM Mo YYYY h:mma')
}

function filterForDomain (data, domain) { // Edit data to only include days within domain
  return copyData(data)
    .filter((transaction) => {
      return (moment(transaction.DateTime).isAfter(domain[0]) && moment(transaction.DateTime).isBefore(domain[1])) || moment(transaction.DateTime).isSame(domain[0]) || moment(transaction.DateTime).isSame(domain[1])
    })
}

export default Main
