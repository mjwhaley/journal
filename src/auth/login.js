import React from 'react'
import axios from 'axios'
import 'bulma'
import Auth from '../lib/auth'

class Login extends React.Component {
  constructor() {
    super()

    this.state = {
      data: { email: '', password: '' },
      error: ''
    }
    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
    this.handleDone = this.handleDone.bind(this)
  }

  handleChange({ target: { name, value }}) {
    const data = {...this.state.data, [name]: value }
    const error = ''
    this.setState({ data, error })
  }

  handleDone(e){
    e.preventDefault()
    this.props.history.push('/')
  }

  handleSubmit(e) {
    e.preventDefault()
    axios.post('/api/login', this.state.data)
      .then(res => {
        Auth.setToken(res.data.token)
        this.props.history.push('/entries')
      })
      .catch(() => {
        this.setState({ error: 'Invalid Credentials, login Fail.'})
      })
  }

  render() {
    return (
      <section className="hero is-fullheight">
        <div className="hero-body">
          <div className="container has-text-centered">
            <div className="column is-4 is-offset-4">
              <h3 className="title has-text-grey">Journal</h3>
              <p className="subtitle has-text-grey">Please login to proceed.</p>
              <div className="box">
                <form onSubmit={this.handleSubmit}>
                  <div className="field">
                    <div className="control has-icons-left">
                      <input
                        className="input is-large"
                        type="email"
                        placeholder="Your Email"
                        name="email"
                        value={this.state.data.email}
                        onChange={this.handleChange}
                        autoFocus=""
                      />
                      <span className="icon is-small is-left">
                        <i className="fas fa-envelope"></i>
                      </span>
                    </div>
                  </div>

                  <div className="field">
                    <div className="control has-icons-left">
                      <input
                        className="input is-large"
                        type="password"
                        placeholder="Your Password"
                        name="password"
                        value={this.state.data.password}
                        onChange={this.handleChange}
                        autoFocus=""
                      />
                      <span className="icon is-small is-left">
                        <i className="fas fa-lock"></i>
                      </span>
                    </div>
                  </div>
                  <button className="button is-block is-info is-large is-fullwidth">Login</button>
                </form>
              </div>
              <p className="has-text-grey">
                <a href="/register">Sign Up</a> &nbsp;·&nbsp;
                <a href="/forgotpassword">Forgot Password</a>
              </p>
            </div>
          </div>
        </div>
      </section>
    )
  }
}

export default Login
