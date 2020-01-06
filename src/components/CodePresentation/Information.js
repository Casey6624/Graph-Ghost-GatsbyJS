import React, { useState } from 'react'
import './Common.css'
import Logos from '../../assets/images/svgLogos/logos'

export default function Information({ setShowInfo, showInfo, technology }) {
  const [status, setStatus] = useState(false)

  let textBody

  if (!showInfo) {
    return null
  }

  switch (technology) {
    case 'GraphQL Resolver':
      textBody =
        'Resolvers are used by GraphQL to carry out the tasks and business logic you require within your API. Resolvers are split into two parts - Queries (I.E reading data from the endpoint) and Mutations (I.E changing data, inserting new data or deleting data). We have created Queries for you which bring all the records of an Entity and mutations which create new entities.'
      break
    case 'NodeJS/ExpressJS Application':
      textBody =
        'App.js is a generic ExpressJS application to help get you started. It contains middleware to combat CORS issues, libraries to build the GraphQL endpoint and Mongoose connection code to help wire up the Mongoose Models to your Cloud or On-Premise NoSQL Database.'
      break
    case 'GraphQL Schema':
      textBody =
        'Schema.js is the definition of how data should look within a GraphQL endpoint. GraphQL is a strongly typed query language, so we must define the types of data each attribute is. The "!" next to an attribute tells GraphQL this is a required attribute (I.E not nullable)'
      break
    case 'Mongoose Model':
      textBody =
        'Mongoose Models are a definition of how data should sit inside of a MongoDB record. When we create a new Entity inside of a GraphQL resolver, Mongoose uses this Model in order to make queries and carry out CRUD operations.'
      break
  }

  return (
    <div className="informationContainer">
      <div className="defaultFlex">
        {Logos.information}
        <h4>{technology}</h4>
      </div>
      <p>{textBody}</p>
    </div>
  )
}
