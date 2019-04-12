import React from 'react'
import 'bulma'
import { Link, withRouter } from 'react-router-dom'
import Auth from './lib/auth'


class Nav extends React.Component {
  constructor() {
    super()

    this.state = { navbarOpen: false }

    this.toggleNavbar = this.toggleNavbar.bind(this)
  }

  toggleNavbar() {
    this.setState({ navbarOpen: !this.state.navbarOpen })
  }

  componentDidUpdate(prevProps) {
    if (this.props.location.pathname !== prevProps.location.pathname) {
      this.setState({ navbarOpen: false })
    }
  }

  render() {
    return(
      <nav className="navbar is-white">
        <div className="container">
          <div className="navbar-brand">
            <Link className="navbar-item" to="/">
              <img className="logo" src="../../assets/jicon.png" />
              <p className="is-size-4"><strong></strong></p>
            </Link>
            <a role="button"
              className={`navbar-burger ${this.state.navbarOpen ? 'is-active' : ''}`}
              onClick={this.toggleNavbar}
              aria-label="menu" aria-expanded="false"
            >
              <span aria-hidden="true"></span>
              <span aria-hidden="true"></span>
              <span aria-hidden="true"></span>
            </a>
          </div>
          <div className={`navbar-menu ${this.state.navbarOpen ? 'is-active' : ''}`}>
            <div className="navbar-end">
              {!Auth.isAuthenticated() && <Link to="/about" className="navbar-item">About</Link>}
              {!Auth.isAuthenticated() && <Link to="/pricing" className="navbar-item">Pricing</Link>}
              {!Auth.isAuthenticated() && <Link to="/features" className="navbar-item">Features</Link>}
              <div className="navbar-end">
                {Auth.isAuthenticated() && <Link to="/entries" className="navbar-item is-primary "><strong>Entries</strong></Link>}
              </div>
              <div className="navbar-end">
                {!Auth.isAuthenticated() && <Link to="/login" className="navbar-item">Login/Register</Link>}
              </div>
              <div className="navbar-item has-dropdown is-hoverable">
                {Auth.isAuthenticated() && <Link to="/account" className="navbar-link">Account</Link>}
                <div className="navbar-dropdown">
                  <a href="/myProfile" className="navbar-item">My Profile</a>
                  <hr className="navbar-divider" />
                  <Link to="/" className="navbar-item" onClick={Auth.logout}>Logout</Link>
                </div>
              </div>

              <div className="navbar-end">
              </div>
            </div>
          </div>
        </div>
      </nav>
    )
  }
}

export default withRouter(Nav)
