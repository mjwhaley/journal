import React from 'react'
import 'bulma'
import axios from 'axios'
import { Link } from 'react-router-dom'
import Map from './map'

import Auth from '../lib/auth'

class Entry extends React.Component {
  constructor() {
    super()

    this.state = {}

    this.handleDelete = this.handleDelete.bind(this)
  }

  componentDidMount() {
    axios.get(`/api/entries/${this.props.match.params.entryId}`)
      .then(res => this.setState({ entry: res.data }))
  }

  handleDelete() {

    axios.delete(`/api/entries/${this.props.match.params.entryId}`,
      { headers: {Authorization: `Bearer ${Auth.getToken()}`}})
      .then(() => this.props.history.push('/myentries'))
      .catch(err => (console.log(err.messager)))
  }

  isOwner() {
    return Auth.isAuthenticated() && this.state.entry.creator.id === Auth.getPayload().sub
  }
  render() {
    if (!this.state.entry) return null
    const { entry } = this.state
    return(
      <div className="column">
        <div className="card-large box">
          {entry.ispublic && Auth.getPayload().sub === entry.creator.id && <span className="button is-medium is-success is-fullwidth">
            Public
          </span>}
          {!entry.ispublic && Auth.getPayload().sub === entry.creator.id && <span className="button is-medium is-danger is-fullwidth">
            Private
          </span>}
          <figure className="image is-3by2">
            <img src={entry.header_image} alt={entry.title} />
          </figure>
          <div className="card-header-title is-centered is-size-3">
            {entry.title}
          </div>
          <br />
          <div className="has-text-centered is-size-5">
            {entry.description}
          </div>
          <br />
          <div>
            <Map
              id="myMap"
              options={{
                center: { lat: entry.mapLat, lng: entry.mapLng },
                zoom: 8
              }}
              onMapLoad={map => {
                new window.google.maps.Marker({
                  position: { lat: entry.mapLat, lng: entry.mapLng },
                  map: map
                })
              }}
            />
          </div>
          <br />
          <p className="title is-6 has-text-centered">Tags</p>
          {entry.categories.map(category =>
            <span key={category.id} className="tag is-large is-light is-rounded">
              {category.name}
            </span>
          )}
          <br />
          <hr />
          <div className="subtitle is-6 is-left" >User: {entry.creator.username}</div>
          <hr />
          <p className="title is-6 has-text-centered">Comments</p>
          {entry.comments.map(comment =>
            <span key={comment.id} className="tag is-large is-primary">
              {comment.content}
            </span>
          )}
        </div>
        {this.isOwner() && <Link className="button is-warning is-fullwidth" to={`/entries/${entry.id}/edit`}>Edit Entry</Link>}
        <br />
        {this.isOwner() && <button className="button is-danger is-fullwidth" onClick={this.handleDelete}>Delete Entry</button>}
      </div>
    )
  }
}

export default Entry
