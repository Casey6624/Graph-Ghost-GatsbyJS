import { createContext } from 'react'

const CrawlFormContext = createContext({
  Entities: [],
  setAllEntities: entity => {},
  allEntities: [],
  rawData: [],
})

export default CrawlFormContext
