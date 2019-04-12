import React, {Fragment} from 'react'
import 'bulma'
import axios from 'axios'
import Group from './group'
import CreateGroup from './createGroup'
import Auth from '../../lib/auth'

class Entries extends React.Component {
  constructor() {
    super()

    this.state = {
      entries: []
    }

    this.getAllEntries = this.getAllEntries.bind(this)
    this.filterEntries = this.filterEntries.bind(this)
  }

  getAllEntries() {
    axios.get('/api/entries', {
    })
      .then(res => this.setState({ entries: res.data }))
  }

  componentDidMount() {
    this.getAllEntries()
  }

  filterEntries() {
    const filteredArr = []
    this.state.entries.map(entry => {
      entry.creator.forEach(user => {
        if (user._id === Auth.getPayload().sub) {
          filteredArr.push(entry)
        } else return
      })
    })
    return filteredArr
  }

  render() {
    if(!this.state.entries) return null
    return(
      <Fragment>
        <section className="hero">
          <div className="hero-body">
            <div className="container has-text-centered">
              <div className="title group-title">
                <i className="fas fa-users"></i>
                <div>You Entries</div>
              </div>
            </div>
          </div>
        </section>
        <div className="container">
          <div className="section">
            <div className="columns is-multiline">
              {this.filterEntries().map(group =>
                <Group {...group} key={group._id} onFetchGroups={this.getAllGroups} />
              )}
            </div>
          </div>
        </div>
      </Fragment>
    )
  }
}

export default Entries
