import { useState } from 'react'
import { useMutation, useQuery } from '@apollo/client'
import { EDIT_AUTHOR, AUTHOR_NAMES } from '../queries'
import Select from 'react-select'

const BornForm = () => {
    const [name, setName] = useState('')
    const [born, setBorn] = useState('')
    const [selectedOption, setSelectedOption] = useState([])
    
    const [ changeBorn ] = useMutation(EDIT_AUTHOR)

    const { data:authors, loading } = useQuery(AUTHOR_NAMES, {
        onCompleted: () => {
            setSelectedOption(authors.allAuthors.map(a => {
                return { value: a.name, label: a.name.toUpperCase() }
            }))
        }
    })
    
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
            <Select 
                options={selectedOption} 
                onChange={({ value }) => setName(value)} 
                isLoading={loading}
                isDisabled={loading}
            />
            <div style={{
                display: 'flex',
                alignItems: 'center',
                gap: 10,
                marginTop: 10,
                marginBottom: 10,
            }}>
            born <input
                style={{
                    paddingTop: 4,
                    paddingBottom: 4,
                    paddingLeft: 6,
                    paddingRight: 6,
                    borderRadius: 4,
                    flex: 1,
                }}
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