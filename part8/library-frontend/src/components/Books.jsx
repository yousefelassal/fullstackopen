import { useState } from 'react'
import { useQuery } from '@apollo/client'
import { BOOKS_BY_GENRE, ALL_BOOKS } from '../queries'

const Books = () => {
  const [filter, setFilter] = useState('')
  const [booksGenres, setBooksGenres] = useState([])

  const { data:books, loading, error } = useQuery(BOOKS_BY_GENRE, {
    pollInterval: 2000,
    variables: { genre: filter },
  })

  const { data:initialData } = useQuery(ALL_BOOKS, {
    onCompleted: () => {
      const genres = initialData.allBooks.map(book => book.genres).flat()
      const uniqueGenres = [...new Set(genres)]
      setBooksGenres(uniqueGenres)
    }
  })

  // const booksGenres = initialData.allBooks.reduce((acc, book) => {
  //   book.genres.forEach(genre => {
  //     if (!acc.includes(genre)) {
  //       acc.push(genre)
  //     }
  //   })
  //   return acc
  // }, [])

  if (error) return <div>error...</div>

  if (loading) return <div>loading...</div>

  if (!books) return <div>no books...</div>

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
            {books.allBooks.map((a) => (
              <tr key={a.id}>
                <td>{a.title}</td>
                <td>{a.author.name}</td>
                <td>{a.published}</td>
              </tr>
            ))}
          </tbody>
        </table>
        <button onClick={() => setFilter('')}>all genres</button>
        {booksGenres.map(genre => (
          <button key={genre} onClick={() => setFilter(genre)}>{genre}</button>
        ))}
      </div>
    )
  }
  
  export default Books