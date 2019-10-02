import React, { Fragment, useState } from 'react'

import './AttributeForm.css'

export default function({ value, onChange, indexNumber }) {
  const [status, setStatus] = useState(false)

  function handleClickEvent(e) {
    setStatus(!status)
  }

  if (!status) {
    return (
      <div className="attributeInactive" onClick={e => handleClickEvent(e)}>
        <h3>Click to add a attribute!</h3>
        <span className="icon style2 fa-plus" id="EntityClose"></span>
      </div>
    )
  }
  return (
    <Fragment>
      <div className="attributeContainer">
        <label for="Attribute1">
          Attribute {indexNumber}
          <input
            type="text"
            name={`Attribute1${indexNumber}`}
            placeholder={`Attribute ${indexNumber} Name`}
            className="inline-form-item"
          ></input>
          <select className="inline-form-item">
            <option selected disabled required>
              Select Data Type
            </option>
            <option name={`string_${indexNumber}`}>String</option>
            <option name="int">Int</option>
            <option>Date (Saved as ISOString)</option>
            <option>Bool</option>
          </select>
        </label>
      </div>
    </Fragment>
  )
}
