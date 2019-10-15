// Libraries
import React, { useState, useContext, useEffect } from 'react'
import { Link } from 'gatsby'
import Helmet from 'react-helmet'
// Components
import Layout from '../components/layout'
import Header from '../components/Header'
import Ghost from '../assets/images/ghost.svg'
import EntityForm from '../components/EntityForm/EntityForm'
// Context
import CreateFormContext from '../context/CreateFormContext'
// Styling
import './create.css'

export default function Create(props) {
  let timer

  const [attributeForms, setAttributeForms] = useState([true])
  const [warning, setWarning] = useState(null)

  const createFormContext = useContext(CreateFormContext)

  useEffect(() => {
    clearTimeout(timer)
    if (warning === null) return
    timer = setTimeout(() => {
      setWarning(null)
    }, 4000)
  })

  function addNewForm() {
    if (createFormContext.Entities.length !== attributeForms.length - 1) {
      setWarning('⚠️ Please Save/Discard the existing attribute form first!')
      return
    }
    const oldForms = [...attributeForms]
    oldForms.push(true)
    setAttributeForms(oldForms)
  }

  function sendToServer() {
    if (createFormContext.Entities.length === 0) {
      setWarning('⚠️ You must add at least one entity before submitting!')
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
              <CreateFormContext.Provider
                value={{
                  Entities: [],
                }}
              >
                <div className="creationContainer">
                  {attributeForms.map((form, index) => (
                    <EntityForm key={index} indexKey={index} />
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
                  <p>{warning} </p>
                </div>
              </CreateFormContext.Provider>
            </div>
          </div>
        </section>
      </div>
    </Layout>
  )
}
