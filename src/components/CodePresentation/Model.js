import React, { useEffect } from 'react'
import Snippet from './Snippet'

export default function Model({ EntityName, Attributes }) {
  const MODEL_START = `const mongoose = require('mongoose');const { Schema } = mongoose; const ${EntityName}Schema = new Schema({`

  const MODEL_END = `},{ timestamps: true }); module.exports = mongoose.model("${EntityName}", codeSchema);`

  useEffect(() => {
    let completedString = ''
    Attributes.forEach(({ attributeName, dataType, required }) => {
      let tempString = `
    ${attributeName}: {
        type: ${dataType},
        ${required ? 'required: true' : ''}
      }
    `
      completedString += tempString
    })
  }, [EntityName, Attributes])

  if (!EntityName || !Attributes) {
    return <div>Loading...</div>
  }
  return (
    <div>
      <h2>
        <strong>{`${EntityName}.js`}</strong> - Mongoose Model
      </h2>
      <Snippet>
        {MODEL_START}
        {MODEL_END}
      </Snippet>
    </div>
  )
}
