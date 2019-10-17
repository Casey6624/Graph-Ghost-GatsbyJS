import { createContext } from 'react'

const CreateFormContext = createContext({
  Entities: [],
  setAllEntities: entity => {},
  allEntities: [],
})

export default CreateFormContext
