import { useState, useEffect } from 'react'
import phonebookService from './services/phonebooks'

const Filter = ({ filter, setFilter }) => {
  return (
    <div>
      filter shown with <input
        value={filter}
        onChange={e => setFilter(e.target.value)}
      />
    </div>
  )
}

const PersonForm = ({ newName, setNewName, newNumber, setNewNumber, addPhone }) => {
  return (
    <form onSubmit={addPhone}>
      <div>
        name: <input
          value={newName}
          onChange={e => setNewName(e.target.value)}
        />
      </div>
      <div>
        number: <input
          value={newNumber}
          onChange={e => setNewNumber(e.target.value)}
        />
      </div>
      <div>
        <button type="submit">add</button>
      </div>
    </form>
  )
}

const Person = ({ person }) => {
  return (
    <div>
      {person.name} {person.number}
    </div>
  )
}

const Persons = ({ personsToShow }) => {
  return (
    <div>
      {personsToShow.map(person =>
        <Person key={person.name} person={person} />
      )}
    </div>
  )
}

const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [filter, setFilter] = useState('')

  useEffect(() => {
    phonebookService
      .getAll()
      .then(initialPersons => {
        setPersons(initialPersons)
      })
  }, [])

  const personsToShow = filter === '' 
  ? persons 
  : persons.filter(person => person.name.toLowerCase().includes(filter.toLowerCase()))

  const addPhone = (event) => {
    event.preventDefault()
    console.log('button clicked', event.target)
    if(persons.some(person => person.name === newName)) {
      alert(`${newName} is already added to phonebook`)
      return
    }
    const phoneObject = {
      name: newName,
      number: newNumber,
    }
    
    phonebookService
      .create(phoneObject)
      .then(returnedPhone => {
        setPersons(persons.concat(returnedPhone))
        setNewName('')
        setNewNumber('')
      }
    )
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter filter={filter} setFilter={setFilter} />
      <h2>add a new</h2>
      <PersonForm 
        newName={newName}
        setNewName={setNewName}
        newNumber={newNumber}
        setNewNumber={setNewNumber}
        addPhone={addPhone} 
      />
      <h2>Numbers</h2>
      {personsToShow.length === 0 && <div>no matches found</div>}
      <Persons personsToShow={personsToShow} />
    </div>
  )
}

export default App