import React, { useEffect, useState, useLayoutEffect, useRef } from 'react'
import Helmet from 'react-helmet'
import prettier from 'prettier/standalone'
import parserGraphql from 'prettier/parser-graphql'
import { Link } from 'gatsby'
import Layout from '../components/layout'
// if success
import HeaderCode from '../components/Headers/Header'
// if failed to fetch
import HeaderError from '../components/Headers/HeaderError'
import TimedError from '../components/misc/TimedError'
import pic04 from '../assets/images/pic04.jpg'
import './code.css'

export default function Code(props) {
  const GRAPHQL_ENDPOINT = 'http://localhost:4500/graphql'
  // values decoded from the URL
  const [codeId, setCodeId] = useState(null)
  const [creatorId, setCreatorId] = useState(null)
  // retrieval code from the server
  const [retrieval, setRetrievalCode] = useState(null)
  // Parsed raw code from the API
  const [rawCodeEntities, setRawCodeEntities] = useState(null)
  // Manipulated rawCode done on the Front-End
  const [finishedTypes, setfinishedTypes] = useState('')
  const [finishedInput, setFinishedInput] = useState('')
  // PrettierFormattedCode - finishedTypes which is ran through prettier package
  const [prettierFormattedCode, setPrettierFormattedCode] = useState(null)
  // Error array which catches any issues with the pulled data from the server
  const [error, setError] = useState(null)
  const retrievalRef = useRef(null)

  // constants used to wrap around the TextArea of Schema.js
  const GRAPHQL_START =
    `const { buildSchema } = require('graphql'); 
module.exports = UserSchema = buildSchema(` + '`'
  const GRAPHQL_END = '`);'

  // Runs before painting the UI, redirect if no creatorID or codeID
  useLayoutEffect(() => {
    const { search } = props.location
    if (!search) {
      window.location = `/create`
      return
    }
    /* 
    EXAMPLE: Working Code & Creator example 
    URL: http://localhost:8000/code?codeId=5dda9b2b9d988816a4eafc7d&creatorId=5d88bdea24f2aa181c649cd1
    */
    setCodeId(search.split('=')[1].split('&')[0])
    setCreatorId(search.split('=')[2])
  }, [props])

  // format code blocks once rawCodeEntities is set. Loops through the rawCode and sticks the data into strings ready to be formatted by prettier.
  useEffect(() => {
    if (!rawCodeEntities) return

    let concatStringType = ''
    let concatStringInput = ''

    rawCodeEntities.data.forEach(([EntityName, Attributes]) => {
      let formattedAttributes = ``

      Attributes.forEach(({ attributeName, dataType }) => {
        let temp = `${attributeName}: ${dataType}
        `
        formattedAttributes += temp
      })

      let tempStringEntity = `
      type ${EntityName} {
        _id: ID!
        ${formattedAttributes}
      }
      `
      let tempStringInput = `
      input ${EntityName} {
        ${formattedAttributes}
      }
      `
      concatStringType += tempStringEntity
      concatStringInput += tempStringInput
    })
    console.log(concatStringInput)
    setfinishedTypes(concatStringType)
    setFinishedInput(concatStringInput)
  }, [rawCodeEntities])

  // Runs whenever the Schema types have been created
  useEffect(() => {
    if (finishedTypes === '' || finishedInput === '') return

    let tempConcat =
      finishedTypes +
      finishedInput +
      `schema {
      query: RootQuery
      mutation: RootMutation
  }`

    const rawCombinedCode = prettier.format(`${tempConcat}`, {
      parser: 'graphql',
      plugins: [parserGraphql],
    })
    console.log(rawCombinedCode)
    setPrettierFormattedCode(rawCombinedCode)
  }, [finishedTypes, finishedInput])

  // Fetch the code based on Code ID and the UserID which is supplied within the URL
  useEffect(() => {
    if (!codeId || !creatorId || rawCodeEntities || retrieval) return

    const requestBody = {
      query: `query{
        findCodeRedirect(codeId: "${codeId}", creatorId: "${creatorId}"){
          _id
          generatedCode
          retrievalCode
        }
      }
      `,
    }
    // might need to be set to the GRAPHQL_URL constnant in prod
    fetch(GRAPHQL_ENDPOINT, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
      body: JSON.stringify(requestBody),
    })
      .then(res => {
        if (res.status !== 200 && res.status !== 201) {
          throw new Error('Failed to fetch data!')
        }
        return res.json()
      })
      .then(resData => {
        let { generatedCode, retrievalCode } = resData.data.findCodeRedirect
        setRawCodeEntities(JSON.parse(generatedCode))
        setRetrievalCode(retrievalCode)
      })
      .catch(err => {
        setError(
          '😢 We are sorry you are having issues. Double check you have the correct retrieval code (this will have been emailed to you). You can create a new API or go back to the homepage by using the actions above.'
        )
      })
  }, [codeId, creatorId])

  function copyToClipboard(e) {
    //TODO: Get this to work!!
    // See - https://stackoverflow.com/questions/39501289/in-reactjs-how-to-copy-text-to-clipboard
    console.log(
      'Copied to clipboard! Well not really, but in the future it will be :) '
    )
    /* retrievalRef.current.select()
    document.execCommand('copy')
    e.target.focus() */
  }

  if (!codeId || !creatorId) return <p>Loading...</p>

  if (retrieval) {
    return (
      <Layout>
        <Helmet title="Your Code!" />
        <HeaderCode />
        <div className="retreivalCodeCard">
          <h2>
            You can come back and get your code anytime by entering your unique
            retrieval code below.
          </h2>
          <h1 onClick={copyToClipboard} ref={retrievalRef}>
            {retrieval}
          </h1>
          <p>
            <strong>Pro Tip:</strong> Click the code above to copy it to your
            clipboard! 📋
          </p>
          <p>
            You can also bookmark this page and view it any time in the future.
          </p>
        </div>
        <div id="main">
          <section id="content" className="main">
            <span className="image main">
              <img src={pic04} alt="" />
            </span>
            <h2>Schema.js - GraphQL</h2>
            <textarea
              className="schemaViewContainer"
              value={`${GRAPHQL_START}${prettierFormattedCode}${GRAPHQL_END}`}
            ></textarea>
          </section>
        </div>
      </Layout>
    )
  }

  return (
    <Layout>
      <Helmet title="Ooops we're sorry." />
      <HeaderError
        Title="Well, this is awkward."
        Description="We can't seem to find your API code using that retrieval code."
      />
      <div style={{ display: 'flex', justifyContent: 'space-around' }}>
        <Link to="/create" className="button">
          <span className="icon style1 fa-plus"></span>
          &nbsp;
          <span>Create an API</span>
        </Link>

        <Link to="/" className="button">
          <span className="icon style1 fa-home"></span>
          &nbsp;
          <span>Go Back Home</span>
        </Link>
      </div>
      <div className="retreivalCodeCard">
        <h2>{error}</h2>
      </div>
    </Layout>
  )
}
