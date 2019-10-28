import React from 'react'

const Persons = ({shownPersons}) => 
( 
  <ul>
    {shownPersons.map((person) => <li key={person.name}>{person.name} {person.number}</li>)}
  </ul>
)

export default Persons