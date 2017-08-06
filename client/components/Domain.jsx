import React from 'react'
import moment from 'moment'
import jump from 'jump.js'

const Domain = () => {
  return (
    <div className="container-fluid text-center">
      Displaying data for
      <div className="domain" id="domainNum">
        <span className="domainText domain1"></span>
        <span className="domainText"> - </span>
        <span className="domainText domain2"></span>
      </div>
      (Change dates by zooming + dragging the above graph)
    </div>
  )
}

export default Domain
