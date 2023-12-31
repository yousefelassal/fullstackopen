/* eslint-disable react/prop-types */
import { useQuery } from '@apollo/client'
import { ALL_AUTHORS } from '../queries'
import BornForm from './BornForm'

const Authors = ({token}) => {
    const { data:authors, loading, error } = useQuery(ALL_AUTHORS, {
      pollInterval: 2000
    })

    if (error) return <div>error...</div>
    
    if (loading) return <div>loading...</div>

    return (
      <div>
        <h2>authors</h2>
        <table>
          <tbody>
            <tr>
              <th></th>
              <th>born</th>
              <th>books</th>
            </tr>
            {authors.allAuthors.map((a) => (
              <tr key={a.id}>
                <td>{a.name}</td>
                <td>{a.born}</td>
                <td>{a.bookCount}</td>
              </tr>
            ))}
          </tbody>
        </table>
        {token ? <BornForm /> : null}
      </div>
    )
  }
  
  export default Authors