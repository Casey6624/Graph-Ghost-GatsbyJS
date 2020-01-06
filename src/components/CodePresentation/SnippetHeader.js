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
}) {
  const [showInfo, setShowInfo] = useState(false)
  function handleShowInfo() {
    setShowInfo(!showInfo)
  }

  return (
    <Fragment>
      <div className="codePresHeader">
        <h2>
          <strong>{fileName}</strong> - {technology}
        </h2>
        <div
          className="defaultFlex"
          id="showInfoCont"
          onClick={e => handleShowInfo()}
        >
          <a id="showInfoBtn" onClick={e => handleShowInfo()}>
            What is this?
          </a>
          {showInfo ? Logos.close : Logos.information}
          {Logos[`${image}`]}
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
