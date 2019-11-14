import React, { useEffect, useState, useLayoutEffect } from 'react'
import Helmet from 'react-helmet'

import Layout from '../components/layout'
import HeaderCode from '../components/HeaderCode'
import pic04 from '../assets/images/pic04.jpg'

export default function Code(props) {
  const GRAPHQL_ENDPOINT = 'http://localhost:4500/graphql'

  const [codeId, setCodeId] = useState(null)
  const [creatorId, setCreatorId] = useState(null)
  const [rawCodeEntities, setRawCodeEntities] = useState(null)
  const [errors, setErrors] = useState([])

  // Runs before painting the UI
  useLayoutEffect(() => {
    let rawParams = props.location.search
    if (!rawParams) {
      window.location = `/create`
      return
    }
    /* 
    EXAMPLE: Working Code & Creator example 
    URL: http://localhost:8000/code?codeId=5db07d6d9229df4b84878f43&creatorId=5d88bdea24f2aa181c649cd1
    */
    setCodeId(rawParams.split('=')[1].split('&')[0])
    setCreatorId(rawParams.split('=')[2])
  }, [props])

  useEffect(() => {
    console.log(rawCodeEntities)
  }, [rawCodeEntities])

  useEffect(() => {
    if (!codeId || !creatorId) return

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
      .then(({ data }) => {
        const { generatedCode, retrievalCode, creator } = data.findCodeRedirect
        if (!generatedCode) {
        }
        setRawCodeEntities(JSON.parse(generatedCode))
      })
      .catch(err => {
        console.log(err)
      })
  }, [codeId, creatorId])

  if (!codeId || !creatorId) return <p>Loading...</p>

  return (
    <Layout>
      <Helmet title="Your Code!" />
      <HeaderCode />
      <div id="main">
        <section id="content" className="main">
          <span className="image main">
            <img src={pic04} alt="" />
          </span>
          <h2>Here is your code!</h2>
        </section>
      </div>
    </Layout>
  )
}
