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

export const ADD_BOOK = gql`
mutation addBook($title: String!, $author: String!, $published: Int!, $genres: [String!]!) {
  addBook(
    title: $title,
    author: $author,
    published: $published,
    genres: $genres
    ){
      title
      author
      published
      genres
      id
  }
}
`