import React, {Fragment} from 'react'
import 'bulma'
import axios from 'axios'
import Map from './map'

const Entry = ({ header_image, title, mapLat, mapLng, description, url, creator }) => {
  console.log(creator.username)
  return (
    <div className="column is-one-third">
      <div className="card large equal-height">
        <div className="card-image">
          <figure className="image is-square">
            <img src={header_image} alt={title} />
          </figure>
        </div>
        <div className="card-content">
          <div className="media">
            <div className="media-content">
              <p className="title is-4 no-padding center">{title}</p>
              <hr />
              <Map
                id="myMap"
                options={{
                  center: { lat: 51.3865, lng: 0.5095 },
                  zoom: 8
                }}
                onMapLoad={map => {
                  var marker = new window.google.maps.Marker({
                    position: { lat: 51.3865, lng: 0.5095 },
                    map: map,
                    title: 'Hello Istanbul!'
                  })
                }}
              />
              <div className="media-content">
                <div className="media-left">
                  <div className="title is-6">{description}</div>
                  <div className="subtitle is-6">{creator.username}<a href="https://twitter.com/BBC"></a></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

class Entries extends React.Component {
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
      .then(res => this.setState({ entries: res.data }))
  }

  componentDidMount() {
    this.getAllEntries()
  }


  render() {
    console.log(this.state)
    if(!this.state.entries) return null
    return(
      <Fragment>
        <div className="container">
          <div className="section">
            <div className="columns is-multiline">
              {this.state.entries.map(entry =>
                <Entry {...entry} key={entry.id} onFetchEntries={this.getAllEntries} />
              )}
            </div>
          </div>
        </div>
      </Fragment>
    )
  }
}

export default Entries
