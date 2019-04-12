import React from 'react'
import m from 'materialize-css'
import { Button, Modal, Icon } from 'react-materialize'

class Home extends React.Component {
  constructor() {
    super()

    this.state = {}
  }

  render() {
    return (
      <div className="container">
        <div className="row">
          <div className="col s12">
            <p className="card-panel teal lighten-2">Welcome to the Journal.</p>

            <div id="modal1" className="modal"trigger={<Button className="waves-effect waves-light btn modal-trigger" href="#modal1">Modal</Button>}>
              <div className="modal-content">
                <h4>Modal Header</h4>
                <p>A bunch of text</p>
              </div>
              <div className="modal-footer">
                <a href="#!" className="modal-close waves-effect waves-green btn-flat">Agree</a>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default Home
