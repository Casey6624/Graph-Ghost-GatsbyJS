import React, { useState, Fragment } from 'react'
// Components
import Information from './Information'
// Images/Assets
import Logos from '../../assets/images/svgLogos/logos'
// Styling
import './Common.css'

export default function SnippetHeader({
  fileName,
  technology,
  image = 'nodeJS',
  fileContents,
}) {
  const [showInfo, setShowInfo] = useState(false)

  function handleShowInfo() {
    setShowInfo(!showInfo)
  }

  function handleDownload() {
    const element = document.createElement('a')
    const file = new Blob([fileContents], { type: 'text/javascript' })
    element.href = URL.createObjectURL(file)
    element.download = fileName
    document.body.appendChild(element) // Required for this to work in FireFox
    element.click()
    element.remove()
  }

  return (
    <Fragment>
      <div className="codePresHeader">
        <h2>
          <strong>{fileName}</strong> - {technology}
        </h2>
        <div className="defaultFlex" id="showInfoCont">
          <button name="schemaSet" onClick={e => handleDownload(e)}>
            Download {fileName}
          </button>
          <a id="showInfoBtn" onClick={e => handleShowInfo()}>
            What is this?
          </a>
          <div onClick={e => handleShowInfo()}>
            {showInfo ? Logos.close : Logos.information}
            {Logos[`${image}`]}
          </div>
        </div>
      </div>
      <Information
        setShowInfo={setShowInfo}
        showInfo={showInfo}
        technology={technology}
      />
    </Fragment>
  )
}
