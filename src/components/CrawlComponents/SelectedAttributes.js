import React, { useState } from 'react'

// PURPOSE: Display the attributes which are concerned with the selected DOM elements
export default function SelectedAttributes({ type, content, outerHTML }) {
  const [attriName, setAttriName] = useState('')

  function attriNameHandler({ target }) {
    target = target.value.trim()
    target = target.split(' ').join('')
    if (target.split('').length >= 15) return
    setAttriName(target)
  }
  function submitHandler() {
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
      Enter Name:{' '}
      <input onChange={e => attriNameHandler(e)} value={attriName} />
      <button onClick={submitHandler}>Submit</button>
      <p>
        This attribute will be named: <strong>{attriName}</strong>
      </p>
      <hr />
    </div>
  )
}
