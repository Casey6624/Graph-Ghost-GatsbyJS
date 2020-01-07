import React, { useEffect, useState } from 'react'
import Snippet from './Snippet'
import SnippetHeader from './SnippetHeader'

export default function Model({ EntityName, Attributes }) {
  const [prettierFormatted, setPrettierFormatted] = useState(null)

  const MODEL_START = `// ${EntityName} Model
const mongoose = require('mongoose');
const { Schema } = mongoose; 
const ${EntityName}Schema = new Schema({`

  const MODEL_END = `},{ timestamps: true });
module.exports = mongoose.model("${EntityName}", ${EntityName}Schema);`

  useEffect(() => {
    let completedString = ''
    Attributes.forEach(({ attributeName, dataType, required }) => {
      // peronsalise the dataType to suit Mongoose specification
      switch (dataType) {
        case 'string':
          dataType = 'String'
          break
        case 'Int':
          dataType = 'Number'
          break
        case 'Date':
          dataType = 'String // Use toISOString() to format to date'
          break
      }
      let tempString

      // format with additional required field, if user choose non nullable item
      if (required) {
        tempString = `
    ${attributeName}: {
        type: ${dataType},
        required: true
    }`
      } else {
        tempString = `
    ${attributeName}: {
        type: ${dataType}
    }
    `
      }
      completedString += tempString
    })

    //const formmatedCode = prettier.format(completedString)

    setPrettierFormatted(completedString)
  }, [EntityName, Attributes])

  if (!prettierFormatted) {
    return <div>Loading Model...</div>
  }
  return (
    <div>
      <SnippetHeader
        image="mongo"
        fileName={`${EntityName}.js`}
        technology="Mongoose Model"
        fileContents={`${MODEL_START}
        ${prettierFormatted}
        ${MODEL_END}`}
      />
      <Snippet>
        {MODEL_START}
        {prettierFormatted}
        {MODEL_END}
      </Snippet>
    </div>
  )
}
