import { useState } from 'react'

const Button = ({ handleClick, text }) => (
  <button onClick={handleClick}>
    {text}
  </button>
)

const StatisticsLine = ({text, value}) => {
  return (
    <tr><td>{text}</td><td>{value}</td></tr>
  )
}

const Statistics = ({all, good, neutral, bad}) => {
  
  const calcAverage = () => {
    return (good - bad) / all
  }

  const calcPositive = () => {
    return good / all * 100
  }

  return (
    <>
      {all === 0 ? 
      <p>No feedback given</p> :
      <table>
        <tbody>
          <>
            <StatisticsLine text="Good" value={good} />
            <StatisticsLine text="Neutral" value={neutral} />
            <StatisticsLine text="Bad" value={bad} />
            <StatisticsLine text="All" value={all} />
            <StatisticsLine text="Average" value={calcAverage()} />
            <StatisticsLine text="Positive" value={calcPositive() + ` %`} />
          </>
        </tbody>
      </table>
      }
    </>
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