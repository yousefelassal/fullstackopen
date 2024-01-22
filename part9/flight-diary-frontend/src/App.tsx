import React, { useEffect, useState } from "react"
import service from "./service"
import { DiaryEntry, NewDiaryEntry, Visibility, Weather } from '../../flight-diary/src/types'

const App = () => {
  const [diaries, setDiaries] = useState<DiaryEntry[]>([]);
  const [date, setDate] = useState('')
  const [visibility, setVisibility] = useState<Visibility | null>(null)
  const [weather, setWeather] = useState<Weather | null>(null)
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
    if(!date || !visibility || !weather || !comment) {
      setErrorMessage('Please fill all the fields')
      setTimeout(() => {
        setErrorMessage('')
      }, 5000)
      return
    }
    const newDiary: NewDiaryEntry = {
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
        setVisibility(null)
        setWeather(null)
        setComment('')
      })
      .catch(error => {
        setErrorMessage(error)
        setTimeout(() => {
          setErrorMessage('')
        }, 5000)
      })
  }

  const weathers = Object.values(Weather)
  const visibilities = Object.values(Visibility)
  
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
          {visibilities.map(visibility => (
            <React.Fragment key={visibility}>
              <input type="radio" name="visibility" value={visibility} onChange={() => setVisibility(visibility)} />
              {visibility}
            </React.Fragment>
          ))}
        </label>
        <label>
          weather
          {weathers.map(weather => (
            <React.Fragment key={weather}>
              <input type="radio" name="weather" value={weather} onChange={() => setWeather(weather)} />
              {weather}
            </React.Fragment>
          ))}
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