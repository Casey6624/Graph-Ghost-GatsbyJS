import React, { Fragment } from 'react'

export default function({ value, onChange }) {
  return (
    <Fragment>
      <div className="attributeContainer">
        <label for="Attribute1">
          Attribute 1
          <input
            type="text"
            name="Attribute1"
            placeholder="Attribute 1 Name"
            className="inline-form-item"
          ></input>
          <select className="inline-form-item">
            <option selected disabled required>
              Select Data Type
            </option>
            <option name="string_1">String</option>
            <option name="int">Int</option>
            <option>Date (Saved as ISOString)</option>
            <option>Bool</option>
          </select>
        </label>
      </div>
    </Fragment>
  )
}
