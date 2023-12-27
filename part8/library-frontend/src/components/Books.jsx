import { useState } from 'react'
import { useQuery } from '@apollo/client'
import { ALL_BOOKS } from '../queries'

const Books = () => {
  const [filter, setFilter] = useState(null)
  const { data:books, loading, error } = useQuery(ALL_BOOKS, {
    pollInterval: 2000
  })

  if (error) return <div>error...</div>

  if (loading) return <div>loading...</div>

  if (!books) return <div>no books...</div>

  const booksGenres = books.allBooks.reduce((acc, book) => {
    book.genres.forEach(genre => {
      if (!acc.includes(genre)) {
        acc.push(genre)
      }
    })
    return acc
  }, [])

  const handleFilter = (event) => {
    event.preventDefault()
    setFilter(event.target.textContent)
  }

  const filteredBooks = filter ? books.allBooks.filter(book => book.genres.includes(filter)) : books.allBooks
  
    return (
      <div>
        <h2>books</h2>

        {filter ? <p>in genre <strong>{filter}</strong></p>
          : <p>Showing all genres</p>
        }

        <table>
          <tbody>
            <tr>
              <th></th>
              <th>author</th>
              <th>published</th>
            </tr>
            {filteredBooks.map((a) => (
              <tr key={a.id}>
                <td>{a.title}</td>
                <td>{a.author.name}</td>
                <td>{a.published}</td>
              </tr>
            ))}
          </tbody>
        </table>
        <button onClick={() => setFilter(null)}>all genres</button>
        {booksGenres.map(genre => (
          <button key={genre} onClick={handleFilter}>{genre}</button>
        ))}
      </div>
    )
  }
  
  export default Books