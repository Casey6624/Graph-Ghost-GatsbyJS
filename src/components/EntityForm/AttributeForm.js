import React, { Fragment, useState, useContext } from 'react'

import './AttributeForm.css'

export default function({ setData }) {
  const [status, setStatus] = useState(false)
  const [attributeName, setAttributeName] = useState('')
  const [attributeDataType, setAttributeDataType] = useState('string')
  const [requiredData, setRequiredData] = useState(false)

  // Used to display the Add New Attribute Form
  function handleClickEvent(e) {
    setStatus(!status)
  }

  // handle the dynamic change of form elements

  function handleFormChange({ target }) {
    // destructure the value and name from DOM element
    const { name, value } = target
    if (name === 'attributeName') {
      setAttributeName(value)
      return
    } else if (name === 'attributeDataType') {
      setAttributeDataType(value)
      return
    } else if (name === 'requiredDataType') {
      setRequiredData(!requiredData)
    }
  }

  // Store form elements in state

  function handleSubmit(e) {
    if (attributeName.trim() !== '' && attributeDataType.trim() !== '') {
      setData({
        attributeName: attributeName,
        dataType: attributeDataType,
        required: requiredData,
      })
      setStatus('COMPLETE')
    }
    // TODO: Add validation to check fields if the validation fails
  }

  if (status === 'COMPLETE') {
    return (
      <div className="attributeComplete">
        <h3>
          Attribute <strong>{attributeName}</strong> Added!
        </h3>
        <p>
          A {requiredData ? 'Non-Nullable' : 'Nullable'} {attributeDataType}{' '}
          Data Type
        </p>
        <span className="icon style2 fa-check" id="EntityClose"></span>
      </div>
    )
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
          <div className="basicFlex">
            <input
              type="text"
              onChange={e => handleFormChange(e)}
              name="attributeName"
              placeholder="E.g Price"
              className="inline-form-item"
            ></input>
            <span
              className={
                attributeName !== ''
                  ? 'icon style2 fa-check-circle'
                  : 'icon style2 fa-times-circle'
              }
              id="validationIcons"
            ></span>
          </div>
          <div className="basicFlex">
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
          </div>
          <div className="basicFlex">
            <select
              className="inline-form-item"
              name="requiredDataType"
              onChange={e => handleFormChange(e)}
            >
              <option defaultChecked disabled required>
                Is Attribute Required?
              </option>
              <option name="notrequired">Nullable</option>
              <option name="required">Not Nullable</option>
            </select>
          </div>
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
            Save Attribute
            <span className="icon style2 fa-save" id="EntityClose"></span>
          </div>
        </label>
      </div>
    </Fragment>
  )
}
