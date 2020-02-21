import React, { useEffect, useState } from 'react'
// Components
import Snippet from './Snippet'
import SnippetHeader from './SnippetHeader'

export default function CrawlResolver({ rawCodeEntities, url }) {
  const [destructuredObj, setDestructuredObj] = useState('')
  const [finishedMutations, setFinishedMutations] = useState('')

  useEffect(() => {
    if (!rawCodeEntities) return

    let masterCopy = ''
    let tempMutations = ''
    rawCodeEntities.forEach(([EntityName, Attributes], entityIndex) => {
      let tempStr = ''
      // get mutations code
      tempMutations += `create${EntityName}: async args => {
        const {${Attributes.map(
          ({ attributeName }) => ' ' + attributeName
        )} } = args.${EntityName.toLowerCase()}Input`

      Attributes.forEach(
        ({ attributeName, dataType, required, xPath }, index) => {
          tempStr += `{ attributeName: '${attributeName}', xPath: '${xPath}' }${
            index !== Attributes.length - 1 ? ',' : ''
          } `
        }
      )
      masterCopy += ` { ${EntityName}: ${tempStr} }${
        entityIndex !== rawCodeEntities.length - 1 ? ',' : ''
      } `
      tempStr = ''
    })
    setDestructuredObj(masterCopy)
    setFinishedMutations(tempMutations)
  }, [rawCodeEntities])

  if (!rawCodeEntities) {
    return <div>Loading...</div>
  }

  let formatted = `
  const puppeteer = require("puppeteer");
  const urlToCrawl = "${url}"
  const elements = ${destructuredObj}

  ${`module.exports = GraphQLResolvers = {
    ${finishedMutations}
  }`}

async function scrape(urlToCrawl, xPath) {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  await page.goto(urlToCrawl);

  const [el] = await page.$x(xPath);
  const txt = await el.getProperty("textContent");
  const rawTxt = await txt.jsonValue();
  console.log(rawTxt);
}
`

  return (
    <div>
      <SnippetHeader
        image="graphql"
        fileName="Resolvers.js"
        technology="GraphQL Resolver"
        fileContents={'finishedCode'}
      />
      <Snippet>{formatted}</Snippet>
    </div>
  )
}
