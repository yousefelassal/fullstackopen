import { useQuery } from '@apollo/client'
import { ALL_BOOKS, ME } from '../queries'

const Recommended = () => {
    const { data:books, loading, error } = useQuery(ALL_BOOKS)
    const { data:user } = useQuery(ME)

    if (error) return <div>error...</div>

    if (loading) return <div>loading...</div>

    if (!books) return <div>no books...</div>

    console.log(user)

    const favoriteGenre = user.me.favoriteGenre

    const favBooks = books.allBooks.filter(book => book.genres.includes(favoriteGenre))
    
      return (
        <div>
          <h2>recommendations</h2>

          <p>books in your favorite genre <strong>{favoriteGenre}</strong></p>

          <table>
            <tbody>
              <tr>
                <th></th>
                <th>author</th>
                <th>published</th>
              </tr>
              {favBooks.map((a) => (
                <tr key={a.id}>
                  <td>{a.title}</td>
                  <td>{a.author.name}</td>
                  <td>{a.published}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
    )
}

export default Recommended