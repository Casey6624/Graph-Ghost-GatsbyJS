import React from 'react'
// Components
import SelectedAttributes from './SelectedAttributes'
import './Common.css'

export default function CrawlForm({ entityName, xPathNodes, DOMDesc }) {
  return (
    <div className="crawl-form-container">
      <h1>{entityName}</h1>
      {DOMDesc.map(({ type, content, outerHTML }, index) => (
        <SelectedAttributes
          key={xPathNodes[index]}
          id={xPathNodes[index]}
          content={content}
          type={type}
          outerHTML={outerHTML}
        />
      ))}
    </div>
  )
}
