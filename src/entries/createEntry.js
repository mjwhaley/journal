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
    categoriesForm: [],
    header_image: ''
    }

    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
    this.handleChangeRadio = this.handleChangeRadio.bind(this)
    this.handlePhotoModal = this.handlePhotoModal.bind(this)
    this.handleSelect = this.handleSelect.bind(this)

  }

  handleChange({ target: { name, value }}) {
    const data = {...this.state.data, [name]: value }
    this.setState({ data })
  }

  handleSelect(selected){
    const categoriesForm = selected.map(item => item.value)
    this.setState({ categoriesForm }, () => console.log(this.state.categoriesForm))
  }


  componentDidMount() {
    axios.get('/api/categories')
      .then(res => res.data.map(item => ({ value: item.id, label: item.name })))
      .then(categories => this.setState({ categories }))
  }

  handleChangeRadio() {

    this.setState({ data: {...this.state.data, ispublic: !this.state.data.ispublic }})
  }


  handleSubmit(e) {
    e.preventDefault()
    const headerImage = this.state.header_image ? this.state.header_image : this.state.data.header_image
    const data = {...this.state.data, header_image: headerImage, category_id: this.state.categoriesForm}
    console.log(data)
    axios.post('/api/entries',
      data,
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
            handleSelect={this.handleSelect}
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
