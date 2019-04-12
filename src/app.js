import React from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter as Browser, Route, Switch } from 'react-router-dom'
import 'materialize-css'
import 'react-materialize'

import Nav from './components/common/nav'
import Home from './components/common/home'
import Footer from './components/common/footer'

const App = () => {
  return (
    <Browser>
      <div>
        <Nav />
        <Switch>
          <Route path="/"component={Home} />


        </Switch>
      </div>
    </Browser>
  )
}

ReactDOM.render(<App />, document.getElementById('root'))
