import React from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter as Browser, Route, Switch } from 'react-router-dom'

import 'bulma'

import Nav from './components/common/nav'
import Footer from './components/common/footer'
import Login from './auth/login'
import Entries from './entries/entries'
import Register from './auth/register'
import ForgotPassword from './auth/forgotpassword'


const App = () => {
  return (
    <Browser>
      <div>
        <Nav />
        <Switch>
          <Route path="/register" component={Register} />
          <Route path="/login" component={Login} />
          <Route path="/forgotpassword" component={ForgotPassword} />
          <Route path="/" component={Entries} />
        </Switch>
        <br />
        <Footer />
      </div>
    </Browser>
  )
}

ReactDOM.render(<App />, document.getElementById('root'))
