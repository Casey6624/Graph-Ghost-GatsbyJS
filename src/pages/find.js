import React, { useState } from 'react'
import { Link } from 'gatsby'
import Helmet from 'react-helmet'
import Layout from '../components/layout'
import Header from '../components/Header'
import Ghost from '../assets/images/graph.svg'

export default function Find(props) {
  const [emailAddress, setEmailAddress] = useState('')
  const [retrievalCode, setRetrievalCode] = useState('')

  function submitForm(e) {
    e.preventDefault()
    console.log(`Email: ${emailAddress}`)
    console.log(`RC: ${retrievalCode}`)
  }

  function formUpdateHandler({ target }) {
    const { name, value } = target

    if (name === 'email') {
      setEmailAddress(value)
    }
    if (name === 'retrieval') {
      setRetrievalCode(value)
    }
  }

  return (
    <Layout>
      <Helmet title="Graph Ghost! 👻" />

      <Header />
      <div id="main">
        <section id="intro" className="main">
          <div className="spotlight">
            <div className="content">
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <h2>Don't have an API yet? Click below to go back home.</h2>
                <Link to="/" className="button">
                  Go Back Home
                </Link>
              </div>
              <header className="major">
                <h2>Find my API!</h2>
                <p>
                  Enter your Email Address and retrieval code below and we'll
                  pull your API right up.
                </p>
              </header>
              <form onSubmit={submitForm}>
                <input
                  type="email"
                  required
                  placeholder="Email Address"
                  name="email"
                  onChange={e => formUpdateHandler(e)}
                />
                <br />
                <input
                  type="text"
                  required
                  name="retrieval"
                  placeholder="Retrieval Code"
                  onChange={e => formUpdateHandler(e)}
                />
                <br />
                <input type="submit" value="Find My API!" />
              </form>
            </div>
          </div>
        </section>
      </div>
    </Layout>
  )
}
