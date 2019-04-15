import React, {Fragment} from 'react'
import 'bulma'
import axios from 'axios'
import Map from './map'
import { Link } from 'react-router-dom'
import Auth from '../lib/auth'


const Entry = ({ header_image, title, mapLat, mapLng, description, url, creator, categories, id, ispublic  }) => {
  return (
    <div className="column is-one-third">
      <Link to={`/entry/${id}`}>
        <div className="card equal-height">
          {ispublic && <span className="button is-small is-success is-fullwidth">
            Public
          </span>}
          {!ispublic && <span className="button is-small is-danger is-fullwidth">
              Private
          </span>}
          <div className="card-image">
            <figure className="image is-3by2">
              <img src={header_image} alt={title} />
            </figure>
          </div>
          <div className="card-content">
            <div className="media">
              <div className="media-content">
                <p className="title is-4 no-padding center">{title}</p>
                <hr />
                <div className="media-content">
                  <div className="media-left">
                    <div className="title is-6">{description}</div>
                    <hr />
                    <div className="subtitle is-6 is-left" >User: {creator.username}</div>
                  </div>
                  <br />
                  {categories.map(category =>
                    <span key={category.id} className="tag is-light is-rounded">
                      {category.name}
                    </span>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </Link>
    </div>

  )
}

class MyEntries extends React.Component {
  constructor() {
    super()

    this.state = {
      entries: []
    }

    this.getAllEntries = this.getAllEntries.bind(this)
  }

  getAllEntries() {
    axios.get('/api/entries', {
    })
      .then(res => this.setState({ entries: res.data }, this.filterEntries))
  }

  componentDidMount() {
    this.getAllEntries()
  }

  filterEntries() {
    const entries = this.state.entries.filter(entry => {
      return Auth.getPayload().sub === entry.creator.id
    })
    return entries
  }

  render() {
    if(!this.state.entries) return null
    return(
      <Fragment>
        <div className="container">
          <div className="section">
            <div className="columns is-multiline">
              {this.filterEntries().map(entry =>
                <Entry {...entry} key={entry.id} onFetchEntries={this.getAllEntries} />
              )}
            </div>
          </div>
        </div>
      </Fragment>
    )
  }
}

export default MyEntries
