import React, { useState, useContext } from 'react'
// PURPOSE: Display the attributes which are concerned with the selected DOM elements
export default function SelectedAttributes({
  type,
  content,
  outerHTML,
  formIndex,
  entity,
  setEntity,
  xPath,
}) {
  const [attriName, setAttriName] = useState('')
  const [dataType, setDataType] = useState('String')
  const [required, setRequired] = useState(false)
  const [status, setStatus] = useState(false)

  function attriNameHandler({ target }) {
    // Don't allow trailing spaces
    target = target.value.trim()
    // Don't allow spaces between characters
    target = target.split(' ').join('')
    // Don't allow over 15 characters
    if (target.split('').length >= 15) return
    setAttriName(target)
  }

  console.log(required)

  function dropdownChangeHandler({ target: { value, name } }) {
    switch (name) {
      case 'attributeRequired':
        setRequired(value)
        break
      case 'attributeDataType':
        setDataType(value)
        break
    }
  }
  function submitHandler() {
    if (attriName === '') return
    setStatus(true)
    console.log(attriName + ' has been submitted')
    let tempEntity = [...entity]
    // TODO: Add required
    tempEntity.push({
      attributeName: attriName,
      dataType: dataType,
      required: required,
      xPath: xPath,
    })
    setEntity(tempEntity)
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
      {!status ? `Enter Data Type: ` : null}
      {!status ? (
        <select
          className="inline-form-item"
          name="attributeDataType"
          onChange={e => dropdownChangeHandler(e)}
        >
          <option name="string" defaultValue>
            String
          </option>
          <option name="int">Int</option>
          <option name="date">Date</option>
          <option name="bool">Bool</option>
        </select>
      ) : null}
      {!status ? (
        <select
          className="inline-form-item"
          name="attributeRequired"
          onChange={e => dropdownChangeHandler(e)}
        >
          <option name="required" defaultValue value={true}>
            Required (Not Nullable)
          </option>
          <option name="notRequired" value={false}>
            Not Required (Nullable)
          </option>
        </select>
      ) : null}
      {!status ? `Enter Name: ` : null}
      {!status ? (
        <input onChange={e => attriNameHandler(e)} value={attriName} />
      ) : null}
      {!status ? <button onClick={submitHandler}>Submit</button> : null}
      {!status ? (
        <p>
          This {required ? 'Non-Nullable' : 'Nullable'} attribute will be named:{' '}
          <strong>{attriName}</strong> with a Data Type of{' '}
          <strong>{dataType}</strong>
        </p>
      ) : (
        <p>
          {required ? 'Non-Nullable' : 'Nullable'} Attribute{' '}
          <strong>{attriName}</strong> saved, with a data type of{' '}
          <strong>{dataType}</strong>.
        </p>
      )}
      <hr />
    </div>
  )
}
