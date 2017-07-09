import React from 'react'
import jump from 'jump.js'

const Landing = () => {
  return (
    <div className="container-fluid landing">
      <h4>Graphing my Snapper</h4>
      <nav>
        { renderNavButton('#balancevtime', 'Explore') }<br />
        { renderNavButton('#priceperday', '$ per day') }
        { renderNavButton('#daysbetweentopups', 'Days between topups') }<br />
        { renderNavButton('#triptime', 'Trip time') }
        { renderNavButton('#moneysaved', 'Total money saved') }
      </nav>
    </div>
  )
}

function renderNavButton (element, title) {
  return (
    <button onClick={() => { jump(element) }}>{ title }</button>
  )
}

export default Landing
