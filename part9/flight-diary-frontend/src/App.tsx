import { useEffect, useState } from "react"
import service from "./service"
import { DiaryEntry } from '../../flight-diary/src/types'

const App = () => {
  const [diaries, setDiaries] = useState<DiaryEntry[]>([]);
  const [date, setDate] = useState('')
  const [visibility, setVisibility] = useState('')
  const [weather, setWeather] = useState('')
  const [comment, setComment] = useState('')
  const [errorMessage, setErrorMessage] = useState('')

  useEffect(() => {
    service
      .getAll()
      .then(data => {
        setDiaries(data)
      })
  }, [])

  const addDiary = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const newDiary = {
      date: date,
      visibility: visibility,
      weather: weather,
      comment: comment
    }
    service
      .create(newDiary)
      .then(data => {
        setDiaries(diaries.concat(data))
        setDate('')
        setVisibility('')
        setWeather('')
        setComment('')
      })
      .catch(error => {
        setErrorMessage(error)
        setTimeout(() => {
          setErrorMessage('')
        }, 5000)
      })
  }
  
  return (
    <div>
      {errorMessage && <p style={{color:"red"}}>{errorMessage}</p>}
      <h2>Add new entry</h2>
      <form onSubmit={addDiary}>
        <div style={{
          display:"flex",
          flexDirection:"column"
        }}>
        <label>
          date
          <input type="date" value={date} onChange={(e) => setDate(e.target.value)} />
        </label>
        <label>
          visibility
          <input type="text" value={visibility} onChange={(e) => setVisibility(e.target.value)} />
        </label>
        <label>
          weather
          <input type="text" value={weather} onChange={(e) => setWeather(e.target.value)} />
        </label>
        <label>
          comment
          <input type="text" value={comment} onChange={(e) => setComment(e.target.value)} />
        </label>
        <button style={{width:"fit-content"}} type="submit">Add</button>
        </div>
      </form>
      <h2>Flight Diary</h2>
      {diaries.map(diary => (
        <div key={diary.id}>
          <h3>{diary.date}</h3>
          <p>visibility: {diary.visibility}</p>
          <p>weather: {diary.weather}</p>
        </div>
      ))}
    </div>
  )
}

export default App