import React, { useEffect, useState } from 'react'
// Components
import Snippet from './Snippet'
import SnippetHeader from './SnippetHeader'

export default function Resolver({ rawCodeEntities, url }) {
  const [destructuredObj, setDestructuredObj] = useState('')

  useEffect(() => {
    if (!rawCodeEntities) return

    let masterCopy
    rawCodeEntities.forEach(([EntityName, Attributes]) => {
      let tempStr
      Attributes.forEach(
        ({ attributeName, dataType, required, xPath }, index) => {
          tempStr += `{ attributeName: '${attributeName}', xPath: '${xPath}' }`
        }
      )
      masterCopy += `{ ${EntityName}: ${tempStr} }`
      tempStr = ''
    })
    setDestructuredObj(masterCopy)
  }, [rawCodeEntities])

  if (!rawCodeEntities) {
    return <div>Loading...</div>
  }

  let formatted = `
  const puppeteer = require("puppeteer");

  const elements = ${destructuredObj}

async function scrape(url, xPath) {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  await page.goto(url);

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
