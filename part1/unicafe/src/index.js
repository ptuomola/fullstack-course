import React, { useState } from 'react'
import ReactDOM from 'react-dom'

const Statistic = ({text, value}) => (<tr><td>{text}</td><td>{value}</td></tr>)

const Statistics = ({good, neutral, bad}) => {

    if(good === 0 && bad === 0 && neutral === 0) {
        return (
            <p>No feedback given</p>            
        )
    }    

    const getAverage = () => (good - bad) / (good + bad + neutral)
    const getPositive = () => <>{(100 * good / (good + bad + neutral))} %</>
    
    return (
        <table><tbody>
        <Statistic text="Good" value={good} />
        <Statistic text="Neutral" value={neutral} />
        <Statistic text="Bad" value={bad} />
        <Statistic text="Average" value={getAverage()} />
        <Statistic text="Positive" value={getPositive()} />
        </tbody></table> 
    )
}

const Button = ({onClick, text}) => <button onClick={onClick}>{text}</button>

const App = () => {
  // tallenna napit omaan tilaansa
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  return (
    <div>
      <h1>Give feedback</h1>
      <Button onClick={() => setGood(good + 1)} text="Good"/>
      <Button onClick={() => setNeutral(neutral + 1)} text="Neutral"/>
      <Button onClick={() => setBad(bad + 1)} text="Bad"/>
      <h1>Statistics</h1>
      <Statistics good={good} neutral={neutral} bad={bad}/>
    </div>
  )
}

ReactDOM.render(<App />, 
  document.getElementById('root')
)
