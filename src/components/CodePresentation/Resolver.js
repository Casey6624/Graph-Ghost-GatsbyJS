import React, { useEffect, useState } from 'react'
// Components
import Snippet from './Snippet'
import SnippetHeader from './SnippetHeader'

export default function Resolver({ rawCodeEntities }) {
  const [finishedCode, setFinishedCode] = useState('')

  // TODO: forEach of the Entities and create findAll and create Mongoose actions

  useEffect(() => {
    let tempImports = ''
    let tempMutations = ''
    let tempQueries = ''
    rawCodeEntities.forEach(([EntityName, Attributes]) => {
      // get imports code
      tempImports += `const ${EntityName} = require("../../models/${EntityName}");
`
      // get mutations code
      tempMutations += `create${EntityName}: async args => {
const {${Attributes.map(
        ({ attributeName }) => ' ' + attributeName
      )} } = args.${EntityName.toLowerCase()}Input

const ${EntityName.toLowerCase()} = new ${EntityName}({
  ${Attributes.map(
    ({ attributeName }) => `
    ${attributeName}: ${attributeName}`
  )}
})
const result = await ${EntityName.toLowerCase()}.save()
return result
},
`

      tempQueries += `${EntityName.toLowerCase()}s: async () => {
try {
  const ${EntityName.toLowerCase()}s = await ${EntityName}.find();
  return ${EntityName.toLowerCase()}s;
} catch (err) {
  throw err;
}
},
`
    })

    let formatted = `const mongoose = require("mongoose");
${tempImports}
module.exports = GraphQLResolvers = {
${tempQueries}
${tempMutations}
};
`
    setFinishedCode(formatted)
  }, [rawCodeEntities])

  if (!rawCodeEntities) {
    return <div>Loading...</div>
  }

  return (
    <div>
      <SnippetHeader
        image="graphql"
        fileName="Resolvers.js"
        technology="GraphQL Resolver"
      />
      <Snippet>{finishedCode}</Snippet>
    </div>
  )
}
