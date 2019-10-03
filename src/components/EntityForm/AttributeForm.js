import React, { Fragment, useState } from 'react'

import './AttributeForm.css'

export default function({ value, onChange }) {
  const [status, setStatus] = useState(false)
  const [attributeName, setAttributeName] = useState('')
  const [attributeDataType, setAttributeDataType] = useState('')

  // Used to display the Add New Attribute Form
  function handleClickEvent(e) {
    setStatus(!status)
  }

  // handle the dynamic change of form elements

  function handleFormChange({ target }) {
    // destructure the value and name from DOM element
    const { name, value } = target
    console.log(`Name: ${name} Value: ${value}`)
    if (name === 'attributeName') {
      setAttributeName(value)
    } else if (name === 'attributeDataType') {
      setAttributeDataType(value)
    }
    return
  }

  // Store form elements in state

  function handleSubmit(e) {
    console.log(attributeName, attributeDataType)
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
        <label htmlFor="AttributeName">
          Attribute 1
          <input
            type="text"
            onChange={e => handleFormChange(e)}
            name="attributeName"
            placeholder="Attribute 1 Name"
            className="inline-form-item"
          ></input>
          <select
            className="inline-form-item"
            name="attributeDataType"
            onChange={e => handleFormChange(e)}
          >
            <option defaultChecked disabled required>
              Select Data Type
            </option>
            <option name="string">String</option>
            <option name="int">Int</option>
            <option name="date">Date</option>
            <option name="bool">Bool</option>
          </select>
          <br />
          <div
            className="button"
            style={{
              alignItems: 'center',
              display: 'flex',
              justifyContent: 'space-between',
            }}
            onClick={e => handleSubmit(e)}
          >
            Save Attribute{' '}
            <span className="icon style2 fa-save" id="EntityClose"></span>
          </div>
        </label>
      </div>
    </Fragment>
  )
}
