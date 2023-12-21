import { useState } from 'react'
import { useMutation } from '@apollo/client'
import { EDIT_AUTHOR } from '../queries'

const BornForm = () => {
    const [name, setName] = useState('')
    const [born, setBorn] = useState('')
    
    const [ changeBorn ] = useMutation(EDIT_AUTHOR)
    
    const submit = (event) => {
        event.preventDefault()
        changeBorn({ variables: { name, born } })
        setName('')
        setBorn('')
    }
    
    return (
        <div>
        <h2>Set birthyear</h2>
        <form onSubmit={submit}>
            <div>
            name <input
                value={name}
                onChange={({ target }) => setName(target.value)}
            />
            </div>
            <div>
            born <input
                type='number'
                value={born}
                onChange={({ target }) => setBorn(Number(target.value))}
            />
            </div>
            <button type='submit'>update author</button>
        </form>
        </div>
    )
}

export default BornForm