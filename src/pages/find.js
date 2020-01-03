// Libraries
import React, { useState } from 'react'
import { Link } from 'gatsby'
import Helmet from 'react-helmet'
// Components
import Layout from '../components/layout'
import Header from '../components/Headers//Header'
import Ghost from '../assets/images/ghost.svg'
// Hooks
import useInterval from '../hooks/useInterval'

import ChangeableGhost from '../components/ChangeableGhost'

import './find.css'

export default function Find(props) {
  const graphQLEndpoint = 'http://localhost:4500/graphql'
  const [emailAddress, setEmailAddress] = useState('')
  const [retrievalCode, setRetrievalCode] = useState('')
  const [error, setError] = useState(null)
  const [activeField, setActiveField] = useState(1)

  function handleFieldChange({ target }) {
    if (target.name === 'email') {
      setActiveField(1)
    }
    if (target.name === 'retrieval') {
      setActiveField(2)
    }
  }

  function submitForm(e) {
    e.preventDefault()

    //TODO: Add error handling for no email or retrievalCode

    if (!emailAddress || !retrievalCode) return

    /*
    Working User Account
    --------------------
    USERID: 5d88bdea24f2aa181c649cd1
    retrievalCode: 123
    email: casey@test.com
    */

    const requestBody = {
      query: `
      query {
        findCode(email: "${emailAddress}", retrievalCode:"${retrievalCode}"){
          codeID
          userID
        }
    }`,
    }
    fetch(graphQLEndpoint, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(requestBody),
    })
      .then(res => {
        if (res.status !== 200 && res.status !== 201) {
          throw new Error('Could not find that combination')
        }
        return res.json()
      })
      .then(resData => {
        const { codeID, userID } = resData.data.findCode
        if (!codeID || !userID) {
          throw new Error('We could not find that combination :(')
        }
        window.location = `/code?codeId=${codeID}&creatorId=${userID}`
      })
      .catch(err => {
        setError(err.message)
      })
  }

  function formUpdateHandler({ target }) {
    setError(null)
    let { name, value } = target
    value = value.trim()
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
              <div className={`formContainer${activeField}`}>
                <form onSubmit={submitForm} className="findForm">
                  <input
                    type="email"
                    required
                    placeholder="Email Address"
                    name="email"
                    onClick={e => handleFieldChange(e)}
                    onSelect={e => handleFieldChange(e)}
                    onChange={e => formUpdateHandler(e)}
                  />
                  <br />
                  <input
                    type="text"
                    required
                    name="retrieval"
                    placeholder="Retrieval Code"
                    onClick={e => handleFieldChange(e)}
                    onSelect={e => handleFieldChange(e)}
                    onChange={e => formUpdateHandler(e)}
                  />
                  <br />
                  <input type="submit" value="Find My API!" />
                </form>
                <ChangeableGhost
                  error={error}
                  emailAddress={emailAddress}
                  retrievalCode={retrievalCode}
                />
              </div>
              {error ? (
                <p className="errorForm">
                  <span id="oops">Ooops!</span> {error}
                </p>
              ) : null}
            </div>
          </div>
        </section>
      </div>
    </Layout>
  )
}
