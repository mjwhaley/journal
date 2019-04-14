import React from 'react'
import axios from 'axios'
import 'bulma'
import Auth from '../lib/auth'


class LostPassword extends React.Component {
  constructor() {
    super()

    this.state = {
      data: {
        email: ''
      }
    }

    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
    this.handleDone = this.handleDone.bind(this)
  }

  handleChange({ target: { name , value }}) {
    const data = {...this.state.data, [name]: value}
    this.setState({ data })
  }

  handleDone(e){
    e.preventDefault()
    this.props.history.push('/')
  }

  handleSubmit(e) {
    e.preventDefault()
    axios.post('/api/forgotpassword', this.state.data)
      .then(res => {
        Auth.setToken(res.data.token)
      })
      .then(() => this.props.history.push('/'))
      .catch(err => console.log(err.message))
  }

  render() {
    return(
      <div>
        <div className="modal is-active">
          <div className="modal-background"></div>
          <div className="modal-card">
            <header className="modal-card-head">
              <p className="modal-card-title"><strong>Forgot Password?</strong></p>
              <button className="delete" aria-label="close" onClick={this.handleDone}></button>
            </header>
            <section className="modal-card-body">
              <form onSubmit={this.handleSubmit}>
                <h1 className="subtitle is-5">Please submit your email address below to recieve an email reminder of your password</h1>
                <div className="field">
                  <div className="control has-icons-left">
                    <div className="control">
                      <input
                        className="input is-medium"
                        name="email"
                        placeholder="Email"
                        value={this.state.data.email}
                        onChange={this.handleChange}
                      />
                      <span className="icon is-small is-left">
                        <i className="fas fa-envelope"></i>
                      </span>
                    </div>
                  </div>
                </div>
                <button className="button is-info is-fullwidth"><strong>Reset Password</strong></button>
              </form>
            </section>
            <footer className="modal-card-foot">
              <a className="subtitle is-6 has-text-grey-light is-italic" href="/terms">Check out our terms and conditions</a>
            </footer>
          </div>
        </div>
      </div>
    )
  }
}

export default LostPassword
