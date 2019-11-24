import React, { useEffect, useState, useLayoutEffect, useRef } from 'react'
import Helmet from 'react-helmet'
import prettier from 'prettier/standalone'
import parserGraphql from 'prettier/parser-graphql'

import Layout from '../components/layout'
import HeaderCode from '../components/HeaderCode'
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
  const [finishedCode, setFinishedCode] = useState('')
  // PrettierFormattedCode - finishedCode which is ran through prettier package
  const [prettierFormattedCode, setPrettierFormattedCode] = useState(null)
  // Error array which catches any issues with the pulled data from the server
  const [errors, setErrors] = useState([])
  const retrievalRef = useRef(null)

  // Runs before painting the UI, redirect if no creatorID or codeID
  useLayoutEffect(() => {
    let rawParams = props.location.search
    if (!rawParams) {
      window.location = `/create`
      return
    }
    /* 
    EXAMPLE: Working Code & Creator example 
    URL: http://localhost:8000/code?codeId=5dda9b2b9d988816a4eafc7d&creatorId=5d88bdea24f2aa181c649cd1
    */
    setCodeId(rawParams.split('=')[1].split('&')[0])
    setCreatorId(rawParams.split('=')[2])
  }, [props])

  // format code blocks once rawCodeEntities is set. Loops through the rawCode and sticks the data into strings ready to be formatted by prettier.
  useEffect(() => {
    if (!rawCodeEntities) return

    let concatString = ''

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
      concatString += tempStringEntity
    })
    console.log(concatString)
    setFinishedCode(concatString)
  }, [rawCodeEntities])

  useEffect(() => {
    console.log(prettierFormattedCode)
    /* const test = prettier.format(prettierFormattedCode, {
      parser: 'graphql',
      plugins: [parserGraphql],
    })
    console.log(typeof prettierFormattedCode)
    setPrettierFormattedCode(test) */
  }, [finishedCode])

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
        console.log(err)
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
      </div>
      <div id="main">
        <section id="content" className="main">
          <span className="image main">
            <img src={pic04} alt="" />
          </span>
          <h2>Here is your code!</h2>
          <p>{prettierFormattedCode}</p>
        </section>
      </div>
    </Layout>
  )
}
