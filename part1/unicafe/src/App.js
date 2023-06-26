import { useState } from 'react'

const Button = ({ handleClick, text }) => (
  <button onClick={handleClick}>
    {text}
  </button>
)

//1.8 already a component
const Statistics = ({all, good, neutral, bad}) => {
  
  const calcAverage = () => {
    return (good - bad) / all
  }

  const calcPositive = () => {
    return good / all * 100
  }

  return (
    <div>
      {all === 0 ? 
          <p>No feedback given</p> : 
          <>
            <p>Good: {good}</p>
            <p>Neutral: {neutral}</p>
            <p>Bad: {bad}</p>
            <p>All: {all}</p>
            <p>Average: {calcAverage()}</p>
            <p>Positive: {calcPositive()}%</p>
          </>
        }
    </div>
  );
}

const App = () => {
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)
  const [all, setAll] = useState(0)

  const handleGoodClick = () => {
    setGood(g => g + 1)
    setAll(a => a + 1)
  }

  const handleNeutralClick = () => {
    setNeutral(n => n + 1)
    setAll(a => a + 1)
  }

  const handleBadClick = () => {
    setBad(b => b + 1)
    setAll(a => a + 1)
  }


  return (
    <div>
      <h1>Give feedback</h1>
      <Button handleClick={handleGoodClick} text='good' />
      <Button handleClick={handleNeutralClick} text='neutral' />
      <Button handleClick={handleBadClick} text='bad' />

      <h1>Statistics</h1>
      <Statistics
        all={all}
        good={good}
        neutral={neutral}
        bad={bad}
      />
    </div>
  )
}

export default App