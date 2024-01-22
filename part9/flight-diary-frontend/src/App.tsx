import { useEffect, useState } from "react"
import service from "./service"
import { DiaryEntry } from '../../flight-diary/src/types'

const App = () => {
  const [diaries, setDiaries] = useState<DiaryEntry[]>([])

  useEffect(() => {
    service
      .getAll()
      .then(data => {
        setDiaries(data)
      })
  }, [])
  
  return (
    <div>
      <h1>Flight Diary</h1>
      {diaries.map(diary => (
        <div key={diary.id}>
          <h2>{diary.date}</h2>
          <p>visibility: {diary.visibility}</p>
          <p>weather: {diary.weather}</p>
        </div>
      ))}
    </div>
  )
}

export default App