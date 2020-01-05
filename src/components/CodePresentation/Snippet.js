import React from 'react'
import Highlight from 'react-highlight'
import './Common.css'

export default function Snippet({ children }) {
  return <Highlight className="highlightContainer">{children}</Highlight>
}
