import React from 'react'
import {HashRouter as Router, Route} from 'react-router-dom'
import jump from 'jump.js'

import { makeDataRequest } from '../api'
import balanceOverTime from '../d3/lineGraph'
import pricePerDay from '../d3/pricePerDay'

class Main extends React.Component {
  jumpTo(element) {
    jump(element)
  }

  componentDidMount() {
    makeDataRequest((data) => {
      balanceOverTime(data.map(a => Object.assign({}, a)))
      pricePerDay(data.map(a => Object.assign({}, a)), 'numOfDays')
    })
  }

  render() {
    return (
      <div className="wrapper">
        <div className="container-fluid landing">
          <h4>Graphing my Snapper</h4>
          <nav>
            <button onClick={() => { this.jumpTo('#balancevtime') }}>Balance v Time</button>
            <button onClick={() => { this.jumpTo('#priceperday') }}>$ per day</button>
          </nav>
        </div>

        <div className="container-fluid text-center" id="balancevtime">
          <h5>Snapper balance over time</h5>
          <div className='row' id='svgContainer'>
            <svg preserveAspectRatio='xMinYMin meet' viewBox='0 0 960 500' />
          </div>
        </div>

        <div className="container-fluid text-center" id="priceperday">
          <div id="priceperdayNum">$0.00</div>
          <div className="priceperdayDesc">a day on average spent with Snapper</div>
        </div>
      </div>
    )
  }
}

export default Main
