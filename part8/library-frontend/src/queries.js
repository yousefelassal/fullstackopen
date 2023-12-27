import { gql } from "@apollo/client"

export const LOGIN = gql`
  mutation login($username: String!, $password: String!) {
    login(username: $username, password: $password)  {
      value
    }
  }
`

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

export const AUTHOR_NAMES = gql`
query getAuthorNames {
  allAuthors {
    name
  }
}
`

export const ALL_BOOKS = gql`
query getAllBooks {
  allBooks {
    title
    author {
      name
    }
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

export const EDIT_AUTHOR = gql`
mutation editAuthor($name: String!, $born: Int!) {
  editAuthor(
    name: $name,
    setBornTo: $born
  ) {
    name
    born
    id,
    bookCount
  }
}
`