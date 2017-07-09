import React from 'react'

import Domain from './Domain'

const BalanceVsTime = () => {
  return (
    <div className="container-fluid text-center" id="balancevtime">
      <h5>Snapper balance over time</h5>
      ( scroll to zoom and click + drag to pan )
      <div className='row' id='svgContainer'>
        <svg preserveAspectRatio='xMinYMin meet' viewBox='0 0 960 500' />
        <Domain />
      </div>
    </div>
    )
}

export default BalanceVsTime
