import { useQuery } from '@apollo/client'
import Persons from './components/Persons'
import PersonForm from './components/PersonForm'
import { ALL_PERSONS } from './queries'

const App = () => {
  const result = useQuery(ALL_PERSONS, {
    pollInterval: 2000
  })

  if (result.loading)  {
    return <div>loading...</div>
  }

  return (
    <>
      <Persons persons={result.data.allPersons}/>
      <PersonForm />
    </>
  )
}

export default App