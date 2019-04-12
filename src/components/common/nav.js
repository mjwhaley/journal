import React from 'react'
import { Link, withRouter } from 'react-router-dom'
import m from 'materialize-css'
import Register from '../auth/register'

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
            <a href="#" data-target="mobile-demo" className="right sidenav-trigger">
              <i className="material-icons">menu</i>
            </a>

            <a href="/" className="brand-logo left">Journal</a>
            <ul id="nav-mobile" className="right hide-on-med-and-down">
              <li><a href="#">All</a></li>
              <Register />
              <li><a href="#">About</a></li>
              <li><a href="#">Account</a></li>
            </ul>
            <ul className="sidenav" ref={el => this.sidenav = el} id="mobile-demo">
              <li><a href="sass.html">Sass</a></li>
              <li><a href="badges.html">Components</a></li>
              <li><a href="collapsible.html">Javascript</a></li>
              <li><a href="mobile.html">Mobile</a></li>
            </ul>
          </div>
        </div>
      </nav>
    )
  }
}

export default withRouter(Nav)
