import React, { useState, useEffect } from 'react'
// Components
import SelectedAttributes from './SelectedAttributes'
import './Common.css'

export default function CrawlForm({
  entityName,
  xPathNodes,
  DOMDesc,
  finishedData,
  setFinishedData,
}) {
  const [entity, setEntity] = useState([])
  const [status, setStatus] = useState(false)

  useEffect(() => {
    if (entity.length === xPathNodes.length) {
      let tempEntities = [...finishedData]
      tempEntities.push([entityName, [...entity]])
      setFinishedData(tempEntities)
      setStatus(true)
    }
  }, [entity])

  if (status) {
    return (
      <div className="crawl-form-container">
        <h1>{entityName} has been completed!</h1>
      </div>
    )
  }

  return (
    <div className="crawl-form-container">
      <h1>{entityName}</h1>
      {DOMDesc.map(({ type, content, outerHTML }, index) => (
        <SelectedAttributes
          key={xPathNodes[index]}
          // DOMDesc
          type={type}
          outerHTML={outerHTML}
          content={content}
          xPath={xPathNodes[index]}
          // Position of attribute in array
          formIndex={index}
          // read and update curr data
          entity={entity}
          setEntity={setEntity}
        />
      ))}
    </div>
  )
}
