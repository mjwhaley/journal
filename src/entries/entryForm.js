import React from 'react'

const EntryForm = ({ handlePhotoModal, handleChangeRadio, handleChange, handleSubmit, data, errors, categories, image }) => {
  if (!categories) return null
  return (
    <form onSubmit={handleSubmit}>
      <div className="field">
        <label className="label">Title</label>
        <div className="control">
          <input
            className={`input ${errors.title ? 'is-danger': ''}`}
            name="title"
            placeholder="Title"
            onChange={handleChange}
            value={data.title || ''}
          />
        </div>
        {errors.name && <small className="help is-danger">Entry <b>title</b> is required</small>}
      </div>
      <div className="field">
        <label className="label">Map:Latitude</label>
        <div className="control">
          <input
            className={`input ${errors.mapLat ? 'is-danger': ''}`}
            name="mapLat"
            placeholder="Map:Lat"
            onChange={handleChange}
            value={data.mapLat || ''}
          />
        </div>
        {errors.mapLat && <small className="help is-danger">Map: <b>Lat</b> is required</small>}
      </div>
      <div className="field">
        <label className="label">Map:Longitude</label>
        <div className="control">
          <input
            className={`input ${errors.mapLng ? 'is-danger': ''}`}
            name="mapLng"
            placeholder="Map:Lng"
            onChange={handleChange}
            value={data.mapLng || ''}
          />
        </div>
        {errors.mapLng && <small className="help is-danger">Map: <b>Lng</b> is required</small>}
      </div>
      {!image && <div className="field">
        <label className="label">Image</label>
        <div className="control">
          <input
            className={`input ${errors.image ? 'is-danger': ''}`}
            name="header_image"
            placeholder="Image"
            onChange={handleChange}
            value={data.header_image || ''}
          />
          <div
            className="button is-primary is-fullwidth"
            onClick={handlePhotoModal}>
            Click here to upload a photo instead

          </div>
        </div>
        {errors.image && <small className="help is-danger">Image<b>image</b> is required</small>}
      </div>}
      {image && <img src={image}/>}
      <div className="field">
        <label className="label">Description</label>
        <div className="control">
          <textarea
            className="textarea"
            placeholder="Description"
            name="description"
            onChange={handleChange}
            value={data.description || ''}
          />
        </div>
      </div>
      <div className="control">
        <div className="select is-fullwidth">
          <select
            onChange={handleChange}
            name="category_id">
            <option>Select dropdown</option>
            {categories.map(category =>
              <option
                key={category.id}
                value={category.id}>
                {category.name}
              </option>
            )}
          </select>
        </div>
      </div>
      <br />
      <div className="control">
        <label className="checkbox">
          <input
            type="checkbox"
            name="ispublic"
            onChange={handleChangeRadio}
            checked={!data.ispublic}
          />
          <strong> Make this post private</strong>
        </label>
      </div>
      <br />
      <button className="button is-info">Submit</button>
    </form>
  )
}

export default EntryForm
