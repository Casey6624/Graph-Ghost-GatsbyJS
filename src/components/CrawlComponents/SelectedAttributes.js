import React, { useState } from 'react'

// PURPOSE: Display the attributes which are concerned with the selected DOM elements
export default function SelectedAttributes({ type, content, outerHTML, id }) {
  const [attriName, setAttriName] = useState('')
  const [dataType, setDataType] = useState('String')
  const [status, setStatus] = useState(false)

  console.log(dataType)
  function attriNameHandler({ target }) {
    // Don't allow trailing spaces
    target = target.value.trim()
    // Don't allow spaces between characters
    target = target.split(' ').join('')
    // Don't allow over 15 characters
    if (target.split('').length >= 15) return
    setAttriName(target)
  }

  function dataTypeHandler({ target: { value } }) {
    setDataType(value)
  }
  function submitHandler() {
    if (attriName === '') return
    setStatus(true)
    console.log(attriName + ' has been submitted')
  }
  return (
    <div className="selected-attri-container">
      <h2>
        <strong>HTML Tag:</strong> {type}
      </h2>
      <h2>
        <strong>Content:</strong> {content}
      </h2>
      <h3>
        <strong>Full HTML:</strong> {outerHTML}
      </h3>
      Enter DataType:{' '}
      {!status ? (
        <select
          className="inline-form-item"
          name="attributeDataType"
          onChange={e => dataTypeHandler(e)}
        >
          <option name="string" defaultValue>
            String
          </option>
          <option name="int">Int</option>
          <option name="date">Date</option>
          <option name="bool">Bool</option>
        </select>
      ) : null}
      Enter Name:{' '}
      {!status ? (
        <input onChange={e => attriNameHandler(e)} value={attriName} />
      ) : null}
      {!status ? <button onClick={submitHandler}>Submit</button> : null}
      {!status ? (
        <p>
          This attribute will be named: <strong>{attriName}</strong> with a Data
          Type of {dataType}
        </p>
      ) : (
        <p>
          Attribute {attriName} saved, with a data type of {dataType}.
        </p>
      )}
      <hr />
    </div>
  )
}
