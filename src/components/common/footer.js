import React from 'react'
import 'bulma'

class Footer extends React.Component {
  constructor() {
    super()

    this.state = {}
  }

  render() {
    return (
      <section className="container">
        <nav className="level">
          <div className="level-left">
            <div className="level-item has-text-centered">
              <p className="subtitle is-5"> Journal: Powered by
                <a href="https://www.triple13.co.uk"> Triple13 Ltd</a>
              </p>
            </div>
          </div>
          <div className="level-right">
            <div className="level-item has-text-centered">
              <div className="subtitle is -2 is-right">
              Contact Us:
              </div>
              <a href="mailto:matthew@131313.co.uk">
                <span className="icon is-medium is-left">
                  <i className="fas fa-envelope"></i>
                </span>
              </a>
              <a href="https://wwww.twitter.com">
                <span className="icon is-medium is-left">
                  <i className="fab fa-twitter"></i>
                </span>
              </a>
              <a href="https://wwww.instagram.com">
                <span className="icon is-medium is-left">
                  <i className="fab fa-instagram"></i>
                </span>
              </a>
            </div>
          </div>
        </nav>
      </section>
    )
  }
}

export default Footer
