import React from 'react'
import './AttributeForm.css'

export default function CompletedEntity({ indexKey }) {
  return (
    <div className="completedContainer">
      <h2>😄 Yay! Entity {indexKey + 1} has been created. ✔️</h2>
      <p>
        Feel free to add an additional entity, or hit "Submit API" if you're
        ready to get your GraphQL Schema and Resolvers.
      </p>
    </div>
  )
}
