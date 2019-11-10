import React, { useState, useEffect } from 'react'
import Persons from './components/Persons'
import Filter from './components/Filter'
import PersonForm from './components/PersonForm'
import axios from 'axios'

const App = () => {
  const [persons, setPersons] = useState([])

  const [ newName, setNewName ] = useState('')
  const [ newPhone, setNewPhone ] = useState('')
  const [ filter, setNewFilter ] = useState('')

  const handleNameChange = (event) => { setNewName(event.target.value) }
  const handlePhoneChange = (event) => { setNewPhone(event.target.value) }
  const handleFilterChange = (event) => { setNewFilter(event.target.value) }

  useEffect(() => {
    axios
    .get('http://localhost:3001/persons')
    .then(response => {
      setPersons(response.data)
    })
  }, [])

  const nameFilter = (value) => value.name.toLowerCase().includes(filter.toLowerCase())
  const shownPersons = persons.filter(nameFilter)

  const addName = (event) => {
    event.preventDefault();

    if(persons.findIndex(x => x.name === newName) !== -1)
    {
      alert(`${newName} is already added to the phonebook`);
    }
    else
    {
      setPersons(persons.concat({name: newName, number: newPhone}))
    }
    setNewName('')
    setNewPhone('')
  }



  return (
    <div>
      <h2>Phone book</h2>
      <Filter filter={filter} handleFilterChange={handleFilterChange}/>
      <h2>Add a new</h2>
      <PersonForm addName={addName} 
                  newName={newName} 
                  handleNameChange={handleNameChange}
                  newPhone={newPhone}
                  handlePhoneChange={handlePhoneChange}
                  />
      <h2>Numbers</h2>
      <Persons shownPersons={shownPersons}/>
    </div>
  )
}

export default App