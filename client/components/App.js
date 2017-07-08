import React from 'react'
import {HashRouter as Router, Route} from 'react-router-dom'

import Main from './Main'

const App = () => {
  return (
    <Router>
      <div className='content'>
        <Route component={Main} />
      </div>
    </Router>
  )
}

export default App
