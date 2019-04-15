import React from 'react'
import axios from 'axios'
import * as filestack from 'filestack-js'

import Auth from '../lib/auth'
import EntryForm from './entryForm'

const client = filestack.init(process.env.FILESTACK)

class CreateEntry extends React.Component {
  constructor() {
    super()

    this.state = { data: {
      ispublic: true
    },
    errors: {},
    categories: '',
    header_image: ''
    }

    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
    this.handleChangeRadio = this.handleChangeRadio.bind(this)
    this.handlePhotoModal = this.handlePhotoModal.bind(this)

  }

  handleChange({ target: { name, value }}) {
    const data = {...this.state.data, [name]: value }
    this.setState({ data })
  }

  componentDidMount() {
    axios.get('/api/categories')
      .then(res => this.setState({ categories: res.data }))
  }

  handleChangeRadio() {

    this.setState({ data: {...this.state.data, ispublic: !this.state.data.ispublic }})
  }


  handleSubmit(e) {
    e.preventDefault()
    const data = {...this.state.data, header_image: this.state.header_image}
    axios.post('/api/entries',
      this.state.data,
      { headers: { Authorization: `Bearer ${Auth.getToken() }`}})
      .then((res) => this.props.history.push(`/entry/${res.data.id}`))
      .catch(err => console.log(err.response))
  }

  handlePhotoModal() {
    const options = {
      fromSources: ['local_file_system','instagram','facebook'],
      accept: ['image/*'],
      onFileUploadFinished: file => {
        this.setState({ header_image: file.url })
      }
    }
    client.picker(options).open()
  }

  render() {
    return (
      <main className="section">
        <div className="container">
          <EntryForm
            handleChange={this.handleChange}
            handleSubmit={this.handleSubmit}
            handleChangeRadio={this.handleChangeRadio}
            handlePhotoModal={this.handlePhotoModal}
            data={this.state.data}
            errors={this.state.errors}
            categories={this.state.categories}
            image={this.state.header_image}
          />
        </div>
      </main>
    )
  }
}

export default CreateEntry
