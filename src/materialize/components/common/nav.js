import React from 'react'
import { withRouter } from 'react-router-dom'
import m from 'materialize-css'
import Register from '../auth/register'
import Login from '../auth/login'

class Nav extends React.Component {
  constructor() {
    super()

    this.state = { }
  }

  componentDidMount() {
    m.Sidenav.init(this.sidenav)
  }


  render() {
    return(
      <nav className="cyan darken-3">
        <div className="container">
          <div className="nav-wrapper ">
            <a href="#" data-target="mobile-demo" className="left sidenav-trigger">
              <i className="material-icons">menu</i>
            </a>
            <a href="/" className="brand-logo center">Journal</a>
            <ul id="nav" className="right hide-on-med-and-down">
              <Login />
            </ul>
            <ul className="sidenav" ref={el => this.sidenav = el} id="mobile-demo">
              <Register />
            </ul>
          </div>
        </div>
      </nav>
    )
  }
}

export default withRouter(Nav)
