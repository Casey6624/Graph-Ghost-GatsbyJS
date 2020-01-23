import React, { useEffect, useState } from 'react'
// Components
import Snippet from './Snippet'
import SnippetHeader from './SnippetHeader'

export default function Resolver({ rawCodeEntities }) {
  const [finishedCode, setFinishedCode] = useState('')

  if (!rawCodeEntities) {
    return <div>Loading...</div>
  }

  return (
    <div>
      <SnippetHeader
        image="graphql"
        fileName="Resolvers.js"
        technology="GraphQL Resolver"
        fileContents={'finishedCode'}
      />
      <Snippet></Snippet>
    </div>
  )
}
