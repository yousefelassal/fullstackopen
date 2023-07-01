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

const Person = ({ person, handleDelete }) => {
  return (
    <div>
      {person.name} {person.number} 
      <button onClick={handleDelete}>delete</button>
    </div>
  )
}

const Persons = ({ personsToShow, handleDelete }) => {
  return (
    <div>
      {personsToShow.map(person =>
        <Person 
          key={person.name} 
          person={person}
          handleDelete={() => handleDelete(person.id)}
        />
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

  const handleDelete = (id) => {
    const person = persons.find(p => p.id === id)
    if(window.confirm(`Delete ${person.name}?`)) {
      phonebookService
        .deletePerson(id)
        .then(() => {
          setPersons(persons.filter(p => p.id !== id))
        })
    }
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
      <Persons personsToShow={personsToShow} handleDelete={handleDelete} />
    </div>
  )
}

export default App