import React, { useState } from 'react'
import ReactDOM from 'react-dom'

const Anecdote = ({selected, points, anecdotes}) => {
    return (
        <div>
        <p>{anecdotes[selected]}</p>
        <p>has {points[selected]} votes</p>
        </div>
    )
}

const App = (props) => {
  const [selected, setSelected] = useState(0)
  const [points, setPoints] = useState(Array(anecdotes.length).fill(0))

  const getRandom = () => Math.floor(Math.random() * anecdotes.length)
  const getMaxIndex = () => points.indexOf(Math.max(...points))

  const vote = () => {
     const copy = [...points]
     copy[selected] += 1
     setPoints(copy)
  }

  return (
    <div>
      <h1>Anecdote of the day</h1>
      <Anecdote selected={selected} points={points} anecdotes={props.anecdotes}/>
      <button onClick={() => vote()}>Vote</button>
      <button onClick={() => setSelected(getRandom())}>Next anecdote</button>
      <h1>Anecdote with most votes</h1>
      <Anecdote selected={getMaxIndex()} points={points} anecdotes={props.anecdotes}/>
    </div>
  )
}

const anecdotes = [
  'If it hurts, do it more often',
  'Adding manpower to a late software project makes it later!',
  'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
  'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
  'Premature optimization is the root of all evil.',
  'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.'
]

ReactDOM.render(
  <App anecdotes={anecdotes} />,
  document.getElementById('root')
)
