import { useState } from "react"
import Authors from './components/Authors'
import Books from './components/Books'
import NewBook from './components/NewBook'
import Login from './components/Login'
import Recommended from './components/Recommended'
import { useApolloClient } from "@apollo/client"

import {
  Routes,
  Route,
  Link,
} from "react-router-dom"

const App = () => {
  const [token, setToken] = useState(null)
  const client = useApolloClient()

  const logout = () => {
    setToken(null)
    localStorage.clear()
    client.resetStore()
  }

  return (
    <div>
      <div style={{
        display: 'flex',
        gap: '10px',
        padding: '10px',
      }}>
        <Link to="/">authors</Link>
        <Link to="/books">books</Link>
        {token ? 
          <>
            <Link to="/add">add book</Link>
            <Link to="/recommended">recommended</Link>
            <button onClick={logout}>logout</button>
          </>
          : <Link to="/login">login</Link>
        }
      </div>

      <Routes>
        <Route path="/" element={<Authors token={token} />} />
        <Route path="/books" element={<Books />} />
        {token ? 
          <>
            <Route path="/add" element={<NewBook />} />
            <Route path="/recommended" element={<Recommended />} />
          </>
          : 
            <Route path="/login" element={<Login setToken={setToken} />} />
        }
      </Routes>
    </div>
  )
}

export default App