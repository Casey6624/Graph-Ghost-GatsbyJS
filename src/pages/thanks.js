// Libraries
import React, { useState } from 'react'
import { Link } from 'gatsby'
import Helmet from 'react-helmet'
// Components
import Layout from '../components/layout'
import Header from '../components/Header'
import Ghost from '../assets/images/ghost.svg'

export default function Thanks(props) {
  return (
    <Layout>
      <Helmet title="Graph Ghost! 👻" />

      <Header
        Title="A Big Thank You!"
        Description="A quick thank you to those who made this project possible..."
      />
      <div id="main">
        <section id="intro" className="main">
          <div className="spotlight">
            <div className="content">
              <Link to="/" className="button" style={{ float: 'right' }}>
                Go Back Home
              </Link>

              <header className="major">
                <h2>Credits & Thanks</h2>
                <h3>Assets & Images</h3>
                <p>
                  <li>
                    Icons made by{' '}
                    <a
                      href="https://www.flaticon.com/authors/smashicons"
                      title="Smashicons"
                    >
                      Smashicons
                    </a>{' '}
                    from{' '}
                    <a href="https://www.flaticon.com/" title="Flaticon">
                      www.flaticon.com
                    </a>
                  </li>
                  <li>
                    GatsbyJS Starter Theme by{' '}
                    <a href="https://github.com/codebushi/gatsby-starter-stellar">
                      CodeBushi
                    </a>
                  </li>
                </p>
              </header>
            </div>
          </div>
        </section>
      </div>
    </Layout>
  )
}
