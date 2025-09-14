import { useState, useEffect } from 'react'
import axios from 'axios'
import personService from './services/persons'

const Filter = ({ filterName, handleFilter }) => {
  return (
    <div>
      Filter shown with <input value={filterName} onChange={handleFilter} />
    </div>
  )
}


const PersonForm = ({ newName, newNumber, handleNameChange, handleNumberChange, handleSubmit }) => {
  return (
    <form onSubmit={handleSubmit}>
      <div>
        name: <input value={newName} onChange={handleNameChange} />
      </div>
      <div>
        number: <input value={newNumber} onChange={handleNumberChange} />
      </div>
      <div>
        <button type="submit">add</button>
      </div>
    </form>
  )
}
const Notification = ({ message }) => {
  if (message === null) {
    return null
  }

  return (
    <div className='error'>
      {message}
    </div>
  )
}


const Persons = ({ persons, setPersons}) => {
  const handleDel = (person) => {
    if (window.confirm(`Delete ${person.name}?`)) {
      personService.personDel(person.id)
        .then(() => {
          setPersons(persons.filter(p => p.id !== person.id))
        })
    }
  }

  return (
    <div>
      {persons.map(person => (
        <p key={person.id}>
          {person.name} {person.number}{" "}
          <button onClick={() => handleDel(person)}>Delete</button>
        </p>
      ))}
    </div>
  )
}


const App = () => {
  const [persons, setPersons] = useState([])
  const [filterName, setFilter] = useState('')
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [errorMessage, setErrorMessage] = useState('')

  useEffect(() => {
  personService.getAll().then(response => {
      setPersons(response.data)
    })
}, [])


  const handleSubmit = (event) => {
    event.preventDefault()
    const newper = { name: newName, number: newNumber }

    if ((persons.some(person => person.name === newper.name)) && window.confirm(`Replace ${newper.name} old number with new one?`)) {
        const found = persons.find(person => person.name === newper.name)
        const updatedPer = {...found, number:newNumber}
        personService.update(found.id, updatedPer)
        .then(response => {
          setPersons(persons.map(person => person.id === found.id ? response.data : person))
        }
      )
      .catch(error=>{setErrorMessage(`Information of ${newper.name} has already been removed from the server`)})
      setErrorMessage(`Updated ${newper.name} number to ${newNumber}`)
  }
  else{
    personService.create(newper)
    .then(response => {
    setPersons(persons.concat(response.data))
    setNewName('')
    setNewNumber('')
    setErrorMessage(`Added ${newper.name}`)
    })
    .catch(error=>console.log(error.response.data.error))
  }
    
  }

  const handleNameChange = (event) => setNewName(event.target.value)
  const handleNumberChange = (event) => setNewNumber(event.target.value)
  const handleFilter = (event) => setFilter(event.target.value)


  const namesToShow = filterName
    ? persons.filter(person =>
        person.name.toLowerCase().startsWith(filterName.toLowerCase())
      )
    : persons

  return (
    <div>
      <h2>Phonebook</h2>
      <Notification message={errorMessage} />
      <Filter filterName={filterName} handleFilter={handleFilter} />

      <h2>Add a new</h2>
      <PersonForm
        newName={newName}
        newNumber={newNumber}
        handleNameChange={handleNameChange}
        handleNumberChange={handleNumberChange}
        handleSubmit={handleSubmit}
      />

      <h2>Numbers</h2>
      <Persons persons={namesToShow} setPersons={setPersons} />
    </div>
  )
}

export default App
