import React from 'react'
import 'bulma'
import { Link, withRouter } from 'react-router-dom'
import Auth from '../../lib/auth'


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
              {!Auth.isAuthenticated() && <Link to="/login" title="Register or Log in"className="navbar-item">
                <span className="icon is-medium is-left">
                  <i className="fas fa-sign-in-alt" ></i>
                </span>
              </Link>}
              <div className="navbar-end">
                {Auth.isAuthenticated() && <Link to="/entries" className="navbar-item">
                  <span className="icon is-medium is-left">
                    <i className="fas fa-home"></i>
                  </span></Link>}
              </div>
              <div className="navbar-item has-dropdown is-hoverable">
                {Auth.isAuthenticated() && <Link to="/account" className="navbar-link">
                  <span className="icon is-medium is-left">
                    <i className="fas fa-user"></i>
                  </span></Link>}
                <div className="navbar-dropdown">
                  {Auth.isAuthenticated() && <Link to="/entry/create" className="navbar-item">New Entry</Link>}
                  {Auth.isAuthenticated() && <Link to="/myentries" className="navbar-item">My Entries</Link>}
                  {Auth.isAuthenticated() && <Link to="/myProfile" className="navbar-item">My Profile</Link>}
                  <hr className="navbar-divider" />
                  {Auth.isAuthenticated() && <Link to="/" className="navbar-item" onClick={Auth.logout}>Logout</Link>}
                </div>
              </div>
            </div>
          </div>
        </div>
      </nav>
    )
  }
}

export default withRouter(Nav)
