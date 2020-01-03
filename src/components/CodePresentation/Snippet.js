import React from 'react'
import Highlight from 'react-highlight'
import './Common.css'

export default function Snippet(props) {
  return <Highlight className="highlightContainer">{props.children}</Highlight>
}
