import React, { useState } from 'react'
import AttributeForm from './AttributeForm'
import './EntityForm.css'

export default function EntityForm(props) {
  const [status, setStatus] = useState(false)

  function handleClickEvent(e) {
    setStatus(!status)
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
        <form>
          <label for="EntityTitle">
            Entity Title
            <input type="text" name="EntityTitle"></input>
          </label>
          <div className="AttributeMasterContainer">
            <AttributeForm />
          </div>
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
