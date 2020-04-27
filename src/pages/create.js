// Libraries
import React, { useState, useContext, useEffect } from 'react'
import { Link } from 'gatsby'
import Helmet from 'react-helmet'
// Components
import Layout from '../components/layout'
import Header from '../components/Headers/Header'
import Ghost from '../assets/images/ghost.svg'
import EntityForm from '../components/EntityForm/EntityForm'
// Context
import CreateFormContext from '../context/CreateFormContext'
// Helpers
import { validateEmail } from '../helpers/helpers'
// Styling
import './create.css'
import TimedError from '../components/misc/TimedError'

export default function Create(props) {
  const [attributeForms, setAttributeForms] = useState([true])
  const [warning, setWarning] = useState(null)
  const [emailAddress, setEmailAddress] = useState('')
  const [emailValidity, setEmailValidity] = useState(false)

  const [allEntities, setAllEntities] = useState([])

  const createFormContext = useContext(CreateFormContext)

  function updateEmailHandler({ target: { value } }) {
    setEmailAddress(value.trim().toLowerCase())
  }

  useEffect(() => {
    const res = validateEmail(emailAddress)
    if (res) {
      setEmailValidity(true)
    } else {
      setEmailValidity(false)
    }
  }, [emailAddress])

  function addNewForm() {
    if (allEntities.length !== attributeForms.length) {
      setWarning('⚠️ Please Save/Discard the existing attribute form first!')
      return
    }
    const oldForms = [...attributeForms]
    oldForms.push(true)
    setAttributeForms(oldForms)
  }

  function sendToServer() {
    console.log('POST triggered')
    /*     if (allEntities.length === 0) {
      setWarning('⚠️ You must add at least one entity before submitting!')
      return
    }
    if (emailAddress === '') {
      setWarning('⚠️ You must set an email address before continuing.')
      return
    } */
    let dataToPost = [...allEntities]
    dataToPost = JSON.stringify({
      data: dataToPost,
      emailAddress: emailAddress,
    })

    fetch('https://graphghost.co.uk/code-submit/', {
      method: 'POST',
      body: dataToPost,
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then(res => {
        return res.json()
      })
      .then(data => {
        const { codeId, creatorId } = data
        if (!codeId) {
          setWarning('Code ID is missing!')
          return
        }
        if (!creatorId) {
          setWarning('Creator ID is missing!')
          return
        }
        window.location = `/code?codeId=${codeId}&creatorId=${creatorId}`
      })
      .catch(err => {
        setWarning(err.message)
        return
      })
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
                <h2>
                  Not ready to create an API yet? Click here to go back home.
                </h2>
                <Link to="/" className="button">
                  Go Back Home
                </Link>
              </div>
              <header className="major">
                <h2>Create Your API!</h2>
                <p>
                  Lets Get Started. Enter your email address below, and click
                  "Add New Entity" when you're ready to start building.
                </p>
                <span style={{ display: 'flex', alignItems: 'center' }}>
                  <input
                    style={{ width: '50%' }}
                    type="email"
                    required
                    placeholder="Email Address"
                    onChange={e => updateEmailHandler(e)}
                  ></input>
                  {/* TODO: Sort this out */}
                  {emailValidity && emailAddress.length > 0
                    ? '✔️'
                      ? !emailValidity && emailAddress.length > 0
                      : '❌'
                    : ''}
                </span>
              </header>
              <CreateFormContext.Provider
                value={{
                  setAllEntities: entity => setAllEntities(entity),
                  allEntities: allEntities,
                  emailAddress: emailAddress,
                }}
              >
                <div className="creationContainer">
                  {attributeForms.map((form, index) => (
                    <EntityForm
                      key={index}
                      indexKey={index}
                      setWarning={e => setWarning(e)}
                    />
                  ))}
                  <div className="creationBtnContainer">
                    <span onClick={() => addNewForm()} className="button">
                      Add an Additional Entity
                    </span>
                    <span
                      onClick={() => sendToServer()}
                      className="button"
                      id="createBtn"
                    >
                      Create API!
                    </span>
                  </div>
                  <TimedError warning={warning} setWarning={setWarning} />
                </div>
              </CreateFormContext.Provider>
            </div>
          </div>
        </section>
      </div>
    </Layout>
  )
}
