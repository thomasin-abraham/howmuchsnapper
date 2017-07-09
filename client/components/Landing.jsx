import React from 'react'
import jump from 'jump.js'

const Landing = () => {
  return (
    <div className="container-fluid landing">
      <h4>Graphing my Snapper</h4>
      <nav>
        { renderNavButton('#balancevtime', 'Change dates') }<br />
        { renderNavButton('#priceperday', '$ per day') }
        { renderNavButton('#daysbetweentopups', 'Days between topups') }
      </nav>
    </div>
  )
}

function renderNavButton (element, title) {
  return (
    <button onClick={() => { jumpTo(element) }}>{ title }</button>
  )
}

function jumpTo(element) {
  jump(element)
}

export default Landing
