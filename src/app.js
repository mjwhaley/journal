import React from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter as Browser, Route, Switch } from 'react-router-dom'

import 'bulma'

import Nav from './components/common/nav'
import Footer from './components/common/footer'
import Login from './auth/login'
import Entries from './entries/entries'
import MyEntries from './entries/myentries'
import Entry from './entries/entry'
import CreateEntry from './entries/createEntry'
import Register from './auth/register'
import ForgotPassword from './auth/forgotpassword'


const App = () => {
  return (
    <Browser>
      <div className="container">
        <Nav />
        <Switch>
          <Route path="/myentries" component={MyEntries} />
          <Route path="/entry/create" component={CreateEntry} />
          <Route path="/entry/:entryId" component={Entry} />
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
