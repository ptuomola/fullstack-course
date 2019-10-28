import React from 'react'

const Header = (props) => (
        <h4>{props.course}</h4>
    )

const Part = (props) => (
    <p>
    {props.part.name} {props.part.exercises}
    </p>
)

const Content = ({parts}) => parts.map(part => <Part key={part.id} part={part} />)
 
const Course = ({course}) => (
  <div>
    <Header course={course.name}/>
    <Content parts={course.parts} />
    <Total parts={course.parts} />
  </div>
)

const getNumExercises = ({parts}) => 
  parts.reduce(
    (accumulator, currentValue) => accumulator + currentValue.exercises, 
    0)

const Total = ({parts}) => (
    <b>total of {getNumExercises({parts})} exercises</b>
)

export default Course