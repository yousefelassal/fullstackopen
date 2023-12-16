### a GraphQL-server

- [schema](https://graphql.org/learn/schema/) | GraphQL Docs

  GraphQL query language is basically about selecting fields on objects

  So, for example, in the following query:
  ```js
  {
    hero {
      name
      appearsIn
    }
  }
  ```
  
  result:
  ```js
  {
    "data": {
      "hero": {
        "name": "R2-D2",
        "appearsIn": [
          "NEWHOPE",
          "EMPIRE",
          "JEDI"
        ]
      }
    }
  }
  ```

  1. We start with a special "root" object
  2. We select the `hero` field on that
  3. For the object returned by `hero`, we select the `name` and `appearsIn` fields

- [scalar types](https://graphql.org/learn/schema/#scalar-types) | GraphQL Docs

  GraphQL comes with a set of default scalar types out of the box:
  
  1. `Int`: A signed 32‐bit integer.
  2. `Float`: A signed double-precision floating-point value.
  3. `String`: A UTF‐8 character sequence.
  4. `Boolean`: true or false.
  5. `ID`: The ID scalar type represents a unique identifier, often used to refetch an object or as the key for a cache. The ID type is serialized in the same way as a String; however, defining it as an `ID` signifies that it is not intended to be human‐readable.

  - [Lists and Non-Nulls](https://graphql.org/learn/schema/#lists-and-non-null)

    ```js
    type Character {
      name: String!
      appearsIn: [Episode]!
    }
    ```

     `String` type is marked as _Non-Null_ by adding an exclamation mark, `!` after the type name. This means that our server always expects to return a non-null value for this field, and if it ends up getting a null value that will actually trigger a GraphQL execution error, letting the client know that something has gone wrong.

- [Apollo Server](https://www.apollographql.com/docs/apollo-server/api/apollo-server/) | Apollo Docs

  The `ApolloServer` class creates an instance of Apollo Server that you can then pass to a web framework integration function (e.g., `startStandaloneServer` or `expressMiddleware`).

  ```js
  import { ApolloServer } from '@apollo/server';

  const server = new ApolloServer({
    typeDefs,
    resolvers,
  });
  ```
- [Resolvers](https://www.apollographql.com/docs/apollo-server/data/resolvers/) | Apollo Docs

  **A resolver is a function that's responsible for populating the data for a single field in your schema.** It can populate that data in any way you define, such as by fetching data from a back-end database or a third-party API.

  ```js
  const resolvers = {
    Query: {
      personCount: () => persons.length,
      allPersons: () => persons,
      findPerson: (root, args) =>
        persons.find(p => p.name === args.name)
    }
  }
  ```
