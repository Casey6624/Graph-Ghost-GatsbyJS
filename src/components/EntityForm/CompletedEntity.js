import React from 'react'
import './AttributeForm.css'

export default function CompletedEntity({ indexKey }) {
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
            <span
              className={
                attributeDataType !== ''
                  ? 'icon style2 fa-check-circle'
                  : 'icon style2 fa-times-circle'
              }
              id="validationIcons"
            ></span>
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
