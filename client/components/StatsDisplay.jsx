import React from 'react'

const StatsDisplay = ({name, desc}) => {
  return (
    <div className="right-border text-center" id={ name }>
      <div id={`${name}Num`} className="bigText"></div>
      <div className="bigTextdesc">{ desc }</div>
    </div>
    )
}

export default StatsDisplay
