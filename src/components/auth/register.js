import React from 'react'
import axios from 'axios'
import Auth from '../../lib/auth'
import { Button, Modal, Icon } from 'react-materialize'

const trigger = <li><a href="#">Model</a></li>

class Register extends React.Component {
  constructor() {
    super()

    this.state = {
      data: {
        username: '',
        email: '',
        password: '',
        passwordConfirmation: ''
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
    this.props.history.push('/login')
  }


  handleSubmit(e) {
    e.preventDefault()
    axios.post('/api/register', this.state.data)
      .then(res => {
        Auth.setToken(res.data.token)
      })
      .then(() => this.props.history.push('/'))
      .catch(err => console.log(err.message))
  }

  render() {
    return(
      <Modal header="Register" trigger={trigger}>
        <div className="row">
          <form className="col s12" onSubmit={this.handleSubmit}>
            <div className="input-field col s12">
              <input
                id="username"
                type="text"
                name="username"
                value={this.state.data.username}
                onChange={this.handleChange}
              />
              <label htmlFor="name">Username</label>
            </div>
            <div className="input-field col s12">
              <input
                id="email"
                type="email"
                className="validate"
                name="email"
                value={this.state.data.email}
                onChange={this.handleChange}
              />
              <label htmlFor="email">Email</label>
            </div>
            <div className="input-field col s12">
              <input id="password"
                type="password"
                className="validate"
                name="password"
                value={this.state.data.password}
                onChange={this.handleChange}
              />
              <label htmlFor="password">Password</label>
              <span className="helper-text" data-error="wrong" data-success="8 plus digits">8 plus digits</span>
            </div>
            <div className="input-field col s12">
              <input
                id="passwordConfirmation"
                type="password"
                className="validate"
                name="passwordConfirmation"
                value={this.state.data.passwordConfirmation}
                onChange={this.handleChange}
              />
              <label htmlFor="password">Password Confirmation</label>
              <span className="helper-text" data-error="wrong" data-success="8 plus digits">8 plus digits</span>
            </div>
            <Button type="submit" waves="light" className="right">
              Register
              <Icon right>
              send
              </Icon>
            </Button>
          </form>
        </div>
      </Modal>
    )
  }
}

export default Register
