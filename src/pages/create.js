// Libraries
import React, { useState } from 'react'
import { Link } from 'gatsby'
import Helmet from 'react-helmet'
// Components
import Layout from '../components/layout'
import Header from '../components/Header'
import Ghost from '../assets/images/ghost.svg'
import EntityForm from '../components/EntityForm'
// Hooks

export default function Create(props) {
  return (
    <Layout>
      <Helmet title="Graph Ghost! 👻" />

      <Header />
      <div id="main">
        <section id="intro" className="main">
          <div className="spotlight">
            <div className="content">
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <h2>
                  Not ready to create an API yet? Click here to go back home.
                </h2>
                <Link to="/" className="button">
                  Go Back Home
                </Link>
              </div>
              <header className="major">
                <h2>Create Your API!</h2>
                <p>Lets Get Started.</p>
              </header>
              <div className="creationContainer">
                <EntityForm />
              </div>
            </div>
          </div>
        </section>
      </div>
    </Layout>
  )
}
