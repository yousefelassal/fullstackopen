import { useQuery } from '@apollo/client'
import { ALL_BOOKS } from '../queries'

const Books = () => {
  const { data:books, loading, error } = useQuery(ALL_BOOKS, {
    pollInterval: 2000
  })

  if (error) return <div>error...</div>

  if (loading) return <div>loading...</div>

  if (!books) return <div>no books...</div>

  const booksGenres = books.allBooks.reduce((acc, book) => {
    console.log(book)
    book.genres.forEach(genre => {
      if (!acc.includes(genre)) {
        acc.push(genre)
      }
    })
    return acc
  }, [])
  
    return (
      <div>
        <h2>books</h2>
  
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
        {booksGenres.map(genre => (
          <button key={genre}>{genre}</button>
        ))}
      </div>
    )
  }
  
  export default Books