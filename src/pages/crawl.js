import React, { useEffect, useState, useLayoutEffect, useContext } from 'react'
import Helmet from 'react-helmet'
import { Link } from 'gatsby'
// Components
import Layout from '../components/layout'
import CrawlForm from '../components/CrawlComponents/CrawlForm'
// if success
import HeaderCode from '../components/Headers/Header'
// If Failed to fetch
import HeaderError from '../components/Headers/HeaderError'
// Styling
import './crawl.css'
// helpers
import { validateEmail } from '../helpers/helpers'

export default function Crawl(props) {
  const GRAPHQL_ENDPOINT = 'http://localhost:4500/graphql'
  // values decoded from the URL
  const [crawlId, setCrawlId] = useState(null)
  // Array of XPathNodes & DOMDesc. Also contains DOMNodes but these are host objects which cannot be saved to Mongo (Blank objects)
  const [data, setData] = useState(null)
  // Data with more context added to the raw data
  const [finishedData, setFinishedData] = useState([])
  // Error array which catches any issues with the pulled data from the server
  const [error, setError] = useState(null)
  // email address
  const [email, setEmail] = useState('')
  const [url, setUrl] = useState('')

  /* WORKING TEST
  http://localhost:8000/crawl?cid=5e32be1082fdad1934e4c713
  */
  // Runs before painting the UI, redirect if no creatorID or codeID
  useLayoutEffect(() => {
    const { search } = props.location
    if (!search) {
      window.location = `/create`
      return
    }
    setCrawlId(search.split('=')[1])
  }, [props])

  useEffect(() => {
    console.log(finishedData)
    if (!data) return
    const emailCheck = validateEmail(email)
    if (!emailCheck) {
      // TODO: add TimedError component to display this
      console.log('Please enter a valid email!')
    }
    // if all entities are correctly filled out
    if (data.length === finishedData.length) {
      let dataToPost = [...finishedData]
      dataToPost = JSON.stringify({
        data: dataToPost,
        emailAddress: email,
        url: url,
      })

      fetch('http://localhost:4500/code-submit', {
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
            throw new Error('Code ID is missing!')
          }
          if (!creatorId) {
            throw new Error('Creator ID is missing!')
          }
          window.location = `/code?codeId=${codeId}&creatorId=${creatorId}`
        })
        .catch(err => {
          throw new Error('There was an issue loading this combination.')
        })
    }
  }, [finishedData])

  // Fetch the code based on Code ID and the UserID which is supplied within the URL
  useEffect(() => {
    if (!crawlId) return

    const requestBody = {
      query: `query{
        findRawCrawl(crawlId: "${crawlId}"){
          _id
          rawAttributes
          url
        }
      }
      `,
    }
    // WORKING TEST - http://localhost:8000/crawl?cid=5e29a278df187f385cf1a537
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
        const { rawAttributes, url } = resData.data.findRawCrawl
        setData(JSON.parse(rawAttributes))
        setUrl(url)
      })
      .catch(err => {
        setError(
          '😢 We are sorry you are having issues. Double check you have the correct retrieval code (this will have been emailed to you). You can create a new API or go back to the homepage by using the actions above.'
        )
        console.log(err)
      })
  }, [crawlId])

  function handleEmailUpdate({ target: { value } }) {
    setEmail(value)
  }

  if (!crawlId) return <p>Loading...</p>

  if (crawlId && data) {
    return (
      <Layout>
        <Helmet title="Almost there!" />
        <HeaderCode />
        <div className="retreivalCodeCard">
          <h2>
            We just need to grab some more details about your selected DOM
            Entities and we should have your GraphQL resolvers and Schema
            created in no time.
          </h2>
        </div>
        <div id="main">
          <section id="content" className="main"></section>
          {url ? (
            <h2>
              <strong>URL To Crawl:</strong> {url}
            </h2>
          ) : null}
          <h3>Lets get started! Please enter your email address below.</h3>
          <input
            type="email"
            id="emailInput"
            placeholder="Please Enter Your Email Address"
            onChange={e => handleEmailUpdate(e)}
          />
          {data.map(({ entityName, xPathNodes, DOMDesc }) => (
            <CrawlForm
              key={xPathNodes}
              // DOMDesc stuff
              entityName={entityName}
              xPathNodes={xPathNodes}
              DOMDesc={DOMDesc}
              // read and update
              finishedData={finishedData}
              setFinishedData={setFinishedData}
            />
          ))}
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
