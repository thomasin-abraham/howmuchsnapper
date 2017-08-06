import React from 'react'

import Domain from './Domain'

const BalanceVsTime = () => {
  return (
    <div className="container-fluid text-center" id="balancevtime">
      <h5>Snapper balance over time</h5>
      <div className='row' id='svgContainer'>
        <div className='zoomButtonContainer'>
          <div className="zoomButton zoomIn"><span className="jam jam-zoom-plus"></span></div>
          <div className="zoomButton zoomOut"><span className="jam jam-zoom-minus"></span></div>
        </div>
        <svg preserveAspectRatio='xMinYMin meet' viewBox='0 0 960 500' />
      </div>
      <Domain />
    </div>
    )
}

export default BalanceVsTime
