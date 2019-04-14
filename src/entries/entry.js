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
  }

  componentDidMount() {
    axios.get(`/api/entries/${this.props.match.params.entryId}`)
      .then(res => this.setState({ entry: res.data }))
  }
  render() {
    if (!this.state.entry) return null
    const { entry } = this.state
    return(
      <div className="column">
        <div className="card-large box">
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
          <div className="has-text-centered is-size-5">
            {entry.description}
          </div>
          <br />
          <div>
            <Map
              id="myMap"
              options={{
                center: { lat: 51.3865, lng: 0.5095  },
                zoom: 8
              }}
              onMapLoad={map => {
                var marker = new window.google.maps.Marker({
                  position: { lat: 51.3865, lng: 0.5095 },
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
      </div>
    )
  }
}

export default Entry
