import React from 'react'

import logo from '../assets/images/logo.svg'

const Header = props => (
  <header id="header" className="alt">
    <span className="logo">
      <img src={logo} alt="GraphGhost Logo" />
    </span>
    <h1>Graph - Ghost!</h1>
    <p>
      Create a reliable, GraphQL API in a matter of minutes.
      <br />A dissertation implementation by{' '}
      <a href="https://caseysmith.co.uk">Casey Smith</a>.
    </p>
  </header>
)

export default Header
