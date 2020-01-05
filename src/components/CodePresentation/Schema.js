import React, { useState, useEffect } from 'react'
import prettier from 'prettier/standalone'
import parserGraphql from 'prettier/parser-graphql'
import Snippet from './Snippet'
// Images/Assets
import Logos from '../../assets/images/svgLogos/logos'
// Styling
import './Common.css'

export default function Schema({ rawCodeEntities }) {
  // Manipulated rawCode done on the Front-End
  const [finishedTypes, setfinishedTypes] = useState('')
  const [finishedInput, setFinishedInput] = useState('')
  const [finishedQuery, setFinishedQuery] = useState('')
  // PrettierFormattedCode - finishedTypes which is ran through prettier package
  const [prettierFormattedCode, setPrettierFormattedCode] = useState(null)
  // constants used to wrap around the TextArea of Schema.js
  const GRAPHQL_START =
    `const { buildSchema } = require('graphql'); 
module.exports = UserSchema = buildSchema(` +
    '`' +
    `

`
  const GRAPHQL_END = '`);'

  // format code blocks once rawCodeEntities is set. Loops through the rawCode and sticks the data into strings ready to be formatted by prettier.
  useEffect(() => {
    if (!rawCodeEntities) return

    let concatStringType = ''
    let concatStringInput = ''
    let concatQuery = ''
    let concatMutations = ''

    rawCodeEntities.forEach(([EntityName, Attributes]) => {
      let formattedAttributes = ``

      let tempQ = `${EntityName.toLowerCase()}s: [${EntityName}!]
`

      Attributes.forEach(({ attributeName, dataType, required }) => {
        let temp = `${attributeName}: ${dataType}${required ? '!' : ''}
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
      input ${EntityName}Input {
        ${formattedAttributes}
      }
      `
      concatStringType += tempStringEntity
      concatStringInput += tempStringInput
      concatQuery += tempQ
    })
    let finishedQuery = `
type RootQuery{
${concatQuery}
}`
    setfinishedTypes(concatStringType)
    setFinishedInput(concatStringInput)
    setFinishedQuery(finishedQuery)
  }, [rawCodeEntities])

  // Runs whenever the Schema types have been created
  useEffect(() => {
    if (finishedTypes === '' || finishedInput === '') return

    let tempConcat =
      finishedTypes +
      finishedInput +
      finishedQuery +
      `schema {
      query: RootQuery
      mutation: RootMutation
  }`

    const rawCombinedCode = prettier.format(`${tempConcat}`, {
      parser: 'graphql',
      plugins: [parserGraphql],
    })
    setPrettierFormattedCode(rawCombinedCode)
  }, [finishedTypes, finishedInput])
  if (!rawCodeEntities) {
    return <div>Loading...</div>
  }
  return (
    <div>
      <div className="codePresHeader">
        {Logos.graphql}
        <h2>
          <strong>Schema.js</strong> - GraphQL
        </h2>
      </div>
      <Snippet>{`${GRAPHQL_START}${prettierFormattedCode}${GRAPHQL_END}`}</Snippet>
    </div>
  )
}
