import React, { useState, useEffect } from 'react'
import prettier from 'prettier/standalone'
import parserGraphql from 'prettier/parser-graphql'

export default function Schema({ rawCodeEntities }) {
  // Manipulated rawCode done on the Front-End
  const [finishedTypes, setfinishedTypes] = useState('')
  const [finishedInput, setFinishedInput] = useState('')
  // PrettierFormattedCode - finishedTypes which is ran through prettier package
  const [prettierFormattedCode, setPrettierFormattedCode] = useState(null)
  // constants used to wrap around the TextArea of Schema.js
  const GRAPHQL_START =
    `const { buildSchema } = require('graphql'); 
module.exports = UserSchema = buildSchema(` + '`'
  const GRAPHQL_END = '`);'

  // format code blocks once rawCodeEntities is set. Loops through the rawCode and sticks the data into strings ready to be formatted by prettier.
  useEffect(() => {
    if (!rawCodeEntities) return

    let concatStringType = ''
    let concatStringInput = ''

    rawCodeEntities.data.forEach(([EntityName, Attributes]) => {
      let formattedAttributes = ``

      Attributes.forEach(({ attributeName, dataType }) => {
        let temp = `${attributeName}: ${dataType}
        `
        formattedAttributes += temp
      })

      let tempStringEntity = `
      type ${EntityName} {
        _id: ID!
        ${formattedAttributes}
      }
      `
      let tempStringInput = `
      input ${EntityName} {
        ${formattedAttributes}
      }
      `
      concatStringType += tempStringEntity
      concatStringInput += tempStringInput
    })
    console.log(concatStringInput)
    setfinishedTypes(concatStringType)
    setFinishedInput(concatStringInput)
  }, [rawCodeEntities])

  // Runs whenever the Schema types have been created
  useEffect(() => {
    if (finishedTypes === '' || finishedInput === '') return

    let tempConcat =
      finishedTypes +
      finishedInput +
      `schema {
      query: RootQuery
      mutation: RootMutation
  }`

    const rawCombinedCode = prettier.format(`${tempConcat}`, {
      parser: 'graphql',
      plugins: [parserGraphql],
    })
    console.log(rawCombinedCode)
    setPrettierFormattedCode(rawCombinedCode)
  }, [finishedTypes, finishedInput])
  if (!rawCodeEntities) return
  return (
    <div>
      <h2>Schema.js - GraphQL</h2>
      <textarea
        className="schemaViewContainer"
        value={`${GRAPHQL_START}${prettierFormattedCode}${GRAPHQL_END}`}
      ></textarea>
    </div>
  )
}