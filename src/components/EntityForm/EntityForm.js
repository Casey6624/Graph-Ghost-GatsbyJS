import React, { useState, useContext, useEffect, Fragment } from 'react'
import AttributeForm from './AttributeForm'
import CreateFormContext from '../../context/CreateFormContext'
import CompletedEntity from '../EntityForm/CompletedEntity'
import './EntityForm.css'

export default function EntityForm({ indexKey }) {
  const [status, setStatus] = useState(false)
  const [attributes, setAttributes] = useState([])
  const [tempAttribute, setTempAttribute] = useState(null)

  const createFormContext = useContext(CreateFormContext)

  // toggle adding new attribute
  function handleClickEvent(e) {
    setStatus(!status)
  }

  useEffect(() => {
    if (tempAttribute === null) return
    attributes.push(tempAttribute)
    setTempAttribute(null)
  }, tempAttribute)

  function handleSubmit(e) {
    e.preventDefault()
    if (e.target.EntityTitle.value === '') {
      console.log('Please enter a title!')
      // TODO: Add error pop up later
      return
    }
    const oldEntities = [...createFormContext.allEntities]
    oldEntities.push([e.target.EntityTitle.value, attributes])
    createFormContext.setAllEntities(oldEntities)
    //createFormContext.Entities.push([e.target.EntityTitle.value, attributes])
    setStatus('Complete')
  }

  if (status === 'Complete') {
    return <CompletedEntity indexKey={indexKey} />
  }

  // Shows when editing/adding a new Entity
  if (status === true) {
    return (
      <div className="EntityFormContainerActive">
        <div className="EntityFormActiveTitleAndControl">
          {indexKey === 0 ? null : (
            <span
              className="icon style2 fa-close"
              id="EntityClose"
              onClick={e => handleClickEvent(e)}
            ></span>
          )}
        </div>
        <h2>Entity {indexKey + 1}</h2>
        <form onSubmit={e => handleSubmit(e)}>
          <label htmlFor="EntityTitle">
            Entity Title
            <input
              type="text"
              name="EntityTitle"
              placeholder="E.g Product"
            ></input>
          </label>
          <div className="AttributeMasterContainer">
            <AttributeForm setData={setTempAttribute} />
            <AttributeForm setData={setTempAttribute} />
            <AttributeForm setData={setTempAttribute} />
          </div>
          <input type="submit" value="Save Entity"></input>
        </form>
      </div>
    )
  }
  // Shows by default or when Form is closed by the user
  return (
    <div className="EntityFormContainer" onClick={e => handleClickEvent(e)}>
      <div className="EntityFormInctive">
        <span className="icon style2 fa-plus" id="EntityAdd"></span>
        <h3>Add New Entity</h3>
      </div>
    </div>
  )
}
