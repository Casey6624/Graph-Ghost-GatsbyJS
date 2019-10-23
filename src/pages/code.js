import React, { useEffect, useState } from 'react'
import Helmet from 'react-helmet'

import Layout from '../components/layout'
import HeaderCode from '../components/HeaderCode'
import pic04 from '../assets/images/pic04.jpg'

export default function Code(props) {
  const GRAPHQL_URL = 'http://localhost:4500/graphql'

  const [codeId, setCodeId] = useState(null)
  const [creatorId, setCreatorId] = useState(null)
  const [fetchedData, setFetchedData] = useState(null)

  useEffect(() => {
    let rawParams = props.location.search
    setCodeId(rawParams.split('=')[1].split('&')[0])
    setCreatorId(rawParams.split('=')[2])
  }, [props])

  useEffect(() => {
    if (fetchedData) return

    let requestBody = `query{
      findCodeRedirect(creatorId: "${creatorId}", codeId: "${codeId}"){
        _id
        generatedCode
        retrievalCode
        createdAt
        updatedAt
      }
    }`

    fetch(GRAPHQL_URL, {
      method: 'POST',
      body: JSON.stringify(requestBody),
      headers: { 'Content-Type': 'application/json' },
    })
      .then(res => {
        if (res.status !== 200 && res.status !== 201) {
          throw new Error('Failed to fetch data!')
        }
        return res.json()
      })
      .then(data => {
        console.log('data: ', data)
      })
      .catch(err => {
        console.log(err)
      })
  }, [codeId, creatorId])

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
