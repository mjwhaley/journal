import React from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter as Browser, Route, Switch } from 'react-router-dom'

import Nav from './nav'
import Entries from './entries/entries'


const App = () => {
  return (
    <Browser>
      <div>
      <Nav />
        <Route path="/" component={Entries} />
      </div>
    </Browser>
  )
}

ReactDOM.render(<App />, document.getElementById('root'))
