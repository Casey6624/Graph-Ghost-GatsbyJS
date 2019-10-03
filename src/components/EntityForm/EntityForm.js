import React, { useState, useContext } from 'react'
import AttributeForm from './AttributeForm'
import CreateFormContext from '../../context/CreateFormContext'
import './EntityForm.css'

export default function EntityForm(props) {
  const [status, setStatus] = useState(false)
  const [attributes, setAttributes] = useState({})

  const createFormContext = useContext(CreateFormContext)

  // toggle adding new attribute
  function handleClickEvent(e) {
    setStatus(!status)
  }

  function handleSubmit(e) {
    e.preventDefault()
    if (e.target.EntityTitle.value === '') {
      console.log('Please enter a title!')
      // TODO: Add error pop up later
      return
    }
    console.log(
      `Entity: ${e.target.EntityTitle.value} Created with the attributes ${attributes.dataType} ${attributes.attributeName}`
    )
  }

  // Shows when editing/adding a new Entity
  if (status) {
    return (
      <div className="EntityFormContainerActive">
        <div className="EntityFormActiveTitleAndControl">
          <span
            className="icon style2 fa-close"
            id="EntityClose"
            onClick={e => handleClickEvent(e)}
          ></span>
        </div>
        <form onSubmit={e => handleSubmit(e)}>
          <label htmlFor="EntityTitle">
            Entity Title
            <input type="text" name="EntityTitle"></input>
          </label>
          <div className="AttributeMasterContainer">
            {/* attributes.map((el, index) => (
              <AttributeForm data={}/>
            )) */}
            <AttributeForm setData={setAttributes} />
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
