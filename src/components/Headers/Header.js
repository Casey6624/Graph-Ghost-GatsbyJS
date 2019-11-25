import React from 'react'

import logo from '../../assets/images/logo.svg'

export default function Header({
  Title = 'Graph - Ghost!',
  Description = 'Create a reliable, GraphQL API in a matter of minutes.',
}) {
  return (
    <header id="header" className="alt">
      <span className="logo">
        <img src={logo} alt="GraphGhost Logo" />
      </span>
      <h1>{Title}</h1>
      <p>
        {Description}
        <br />A dissertation implementation by{' '}
        <a href="https://caseysmith.co.uk">Casey Smith</a>.
      </p>
    </header>
  )
}
