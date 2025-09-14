import { useState, useEffect } from 'react'
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
  const [errorMessage, setErrorMessage] = useState(null)

  useEffect(() => {
    personService.getAll().then(response => {
      setPersons(response.data)
    })
  }, [])

  useEffect(() => {
    if (errorMessage !== null) {
      const timer = setTimeout(() => {
        setErrorMessage(null)
      }, 5000)
      return () => clearTimeout(timer)
    }
  }, [errorMessage])

  const handleSubmit = (event) => {
    event.preventDefault()
    const newper = { name: newName, number: newNumber }

    const existingPerson = persons.find(person => person.name === newper.name)
    
    if (existingPerson) {
      if (window.confirm(`Replace ${newper.name}'s old number with new one?`)) {
        const updatedPer = {...existingPerson, number: newNumber}
        personService.update(existingPerson.id, updatedPer)
          .then(response => {
            setPersons(persons.map(person => 
              person.id === existingPerson.id ? response.data : person
            ))
            setErrorMessage(`Updated ${newper.name}'s number to ${newNumber}`)
            setNewName('')
            setNewNumber('')
          })
          .catch(error => {
            if (error.response && error.response.data && error.response.data.error) {
              setErrorMessage(error.response.data.error)
            } else if (error.response && error.response.status === 404) {
              setErrorMessage(`Information of ${newper.name} has already been removed from the server`)
              setPersons(persons.filter(p => p.id !== existingPerson.id))
            } else {
              setErrorMessage('An error occurred while updating the person')
            }
          })
      }
    } else {
      personService.create(newper)
        .then(response => {
          setPersons(persons.concat(response.data))
          setNewName('')
          setNewNumber('')
          setErrorMessage(`Added ${newper.name}`)
        })
        .catch(error => {
          if (error.response && error.response.data && error.response.data.error) {
            console.log('Validation error:', error.response.data.error)
            setErrorMessage(error.response.data.error)
          } else {
            setErrorMessage('An error occurred while adding the person')
          }
        })
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