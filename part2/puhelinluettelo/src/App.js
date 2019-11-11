import React, { useState, useEffect } from 'react'
import Persons from './components/Persons'
import Filter from './components/Filter'
import PersonForm from './components/PersonForm'
import Notification from './components/Notification'
import personService from './services/persons'

const App = () => {
  const [persons, setPersons] = useState([])

  const [ newName, setNewName ] = useState('')
  const [ newPhone, setNewPhone ] = useState('')
  const [ filter, setNewFilter ] = useState('')

  const [ errorMessage, setErrorMessage ] = useState(null)
  const [ notificationType, setNotificationType ] = useState('error')

  const handleNameChange = (event) => { setNewName(event.target.value) }
  const handlePhoneChange = (event) => { setNewPhone(event.target.value) }
  const handleFilterChange = (event) => { setNewFilter(event.target.value) }

  useEffect(() => {
    personService
    .getAll()
    .then(initialPersons => {
      setPersons(initialPersons)
    })
  }, [])

  const nameFilter = (value) => value.name.toLowerCase().includes(filter.toLowerCase())
  const shownPersons = persons.filter(nameFilter)

  const addName = (event) => {
    event.preventDefault();

    const oldIndex = persons.findIndex(x => x.name === newName)
    
    if(oldIndex !== -1) 
    {
      if(!window.confirm(`${newName} is already added to the phonebook, replace the old number with a new one?`))
        return

      const newPerson = { ...persons[oldIndex], name: newName, number: newPhone}

      personService
      .update(newPerson.id, newPerson)
      .then(() => {
        setPersons(persons.map(person => (person.id === newPerson.id) ? newPerson : person))
        setErrorMessage(`Updated ${newPerson.name}`)
        setNotificationType("success")
        setTimeout(() => { setErrorMessage(null)}, 5000)
      })
      .catch(error => {
        setPersons(persons.filter(person => (person.id !== newPerson.id)))
        setErrorMessage(`Information of ${newPerson.name} has already been removed from server`)
        setNotificationType("error")
        setTimeout(() => { setErrorMessage(null)}, 5000)
      })
    }
    else
    {
      const newPerson = {
        name: newName,
        number: newPhone
      }

      personService
        .create(newPerson)
        .then(returnedPerson => {
          setPersons(persons.concat(returnedPerson))
          setErrorMessage(`Added ${newPerson.name}`)
          setNotificationType("success")
          setTimeout(() => { setErrorMessage(null)}, 5000)
        })
    }
    setNewName('')
    setNewPhone('')
  }

  const deleteName = (person) => 
  {
    if(!window.confirm(`Delete ${person.name}?`)) return
  
    console.log("deleting person ", person)
  
    personService
    .deletePerson(person.id)
    .then(() => {
      setPersons(persons.filter(val => val.id !== person.id))
      setErrorMessage(`Deleted ${person.name}`)
      setNotificationType("success")
      setTimeout(() => { setErrorMessage(null)}, 5000)
    })
  }
  

  return (
    <div>
      <h2>Phone book</h2>

      <Notification message={errorMessage} type={notificationType}/>

      <Filter filter={filter} handleFilterChange={handleFilterChange}/>
      <h2>Add a new</h2>
      <PersonForm addName={addName} 
                  newName={newName} 
                  handleNameChange={handleNameChange}
                  newPhone={newPhone}
                  handlePhoneChange={handlePhoneChange}
                  />
      <h2>Numbers</h2>
      <Persons shownPersons={shownPersons} deletePerson={deleteName}/>
    </div>
  )
}

export default App