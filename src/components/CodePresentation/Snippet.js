import React from 'react'
import Highlight from 'react-highlight'
import './Snippet.css'

export default function Snippet({ children }) {
  return <Highlight className="highlightContainer">{children}</Highlight>
}
