import { useQuery } from '@apollo/client'
import { ALL_BOOKS } from '../queries'

const Books = () => {
  const { data:books, loading, error } = useQuery(ALL_BOOKS, {
    pollInterval: 2000
  })

  if (error) return <div>error...</div>

  if (loading) return <div>loading...</div>
  
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
                <td>{a.author}</td>
                <td>{a.published}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    )
  }
  
  export default Books