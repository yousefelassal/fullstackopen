import { gql } from "@apollo/client"

export const ALL_AUTHORS = gql`
query getAllAuthors {
  allAuthors {
    name
    born
    bookCount
    id
  }
}
`

export const ALL_BOOKS = gql`
query getAllBooks {
  allBooks {
    title
    author
    published
    id
  }
}
`