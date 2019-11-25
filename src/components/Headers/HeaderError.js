import React from 'react'

import logo from '../../assets/images/logo.svg'
import sad from '../../assets/images/sadGhost.svg'

export default function Header({
  Title = 'Graph - Ghost!',
  Description = 'Create a reliable, GraphQL API in a matter of minutes.',
}) {
  return (
    <header id="header" className="alt">
      <span className="logo">
        <img src={sad} alt="GraphGhost Logo" />
      </span>
      <h1>{Title}</h1>
      <p>{Description}</p>
    </header>
  )
}
