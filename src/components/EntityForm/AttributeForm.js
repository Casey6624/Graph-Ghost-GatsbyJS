import React, { Fragment, useState } from 'react'

import './AttributeForm.css'

export default function({ value, onChange }) {
  const [status, setStatus] = useState(false)

  function handleClickEvent(e) {
    setStatus(!status)
  }

  if (!status) {
    return (
      <div className="attributeInactive" onClick={e => handleClickEvent(e)}>
        <h3>Click To Add An Attribute!</h3>
        <span className="icon style2 fa-plus" id="EntityClose"></span>
      </div>
    )
  }
  return (
    <Fragment>
      <div className="attributeContainer">
        <label htmlFor="Attribute1">
          Attribute 1
          <input
            type="text"
            name="Attribute1"
            placeholder="Attribute 1 Name"
            className="inline-form-item"
          ></input>
          <select className="inline-form-item">
            <option defaultChecked disabled required>
              Select Data Type
            </option>
            <option name="string">String</option>
            <option name="int">Int</option>
            <option name="date">Date (Saved as ISOString)</option>
            <option name="bool">Bool</option>
          </select>
          <button className="button">
            Save Attribute
            <span className="icon style2 fa-save" id="EntityClose"></span>{' '}
          </button>
        </label>
      </div>
    </Fragment>
  )
}
