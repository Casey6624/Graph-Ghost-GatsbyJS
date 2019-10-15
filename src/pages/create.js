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

export default function Create(props) {
  const [attributeForms, setAttributeForms] = useState([true])
  const [warning, setWarning] = useState(null)

  const createFormContext = useContext(CreateFormContext)

  useEffect(() => {
    if (warning === null) return
    setTimeout(() => {
      setWarning(null)
    }, 2000)
  })

  function addNewForm() {
    if (createFormContext.Entities.length !== attributeForms.length - 1) {
      setWarning('⚠️ Please Save/Discard the existing Attribute form first!')
      return
    }
    const oldForms = [...attributeForms]
    oldForms.push(true)
    setAttributeForms(oldForms)
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
                  <span onClick={() => addNewForm()} className="button">
                    Add an Additional Entity
                  </span>
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
