### a GraphQL-server

- [schema](https://graphql.org/learn/schema/) | GraphQL Docs

  GraphQL query language is basically about selecting fields on objects

  So, for example, in the following query:
  ```gql
  {
    hero {
      name
      appearsIn
    }
  }
  ```
  
  result:
  ```json
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

- [Mutations](https://graphql.org/learn/queries/#mutations) | GraphQL Docs

  Just like in queries, if the mutation field returns an object type, you can ask for nested fields. This can be useful for fetching the new state of an object after an update.

  Let's look at a simple example mutation:
  ```gql
  mutation CreateReviewForEpisode($ep: Episode!, $review: ReviewInput!) {
    createReview(episode: $ep, review: $review) {
      stars
      commentary
    }
  }
  ```

  variables:
  ```json
  {
    "ep": "JEDI",
    "review": {
      "stars": 5,
      "commentary": "This is a great movie!"
    }
  }
  ```

  result:
  ```json
  {
    "data": {
      "createReview": {
        "stars": 5,
        "commentary": "This is a great movie!"
      }
    }
  }
  ```
  
- [`GraphQLErro`](https://www.apollographql.com/docs/apollo-server/data/errors/#custom-errors) | Apollo Docs

  ```js
  import { GraphQLError } from 'graphql';

  throw new GraphQLError(message, {
    extensions: { code: 'YOUR_ERROR_CODE', myCustomExtensions },
  });
  ```

  Custom errors can provide additional context, enabling your clients to understand why an error is happening. We recommend making clear errors for common cases, for example, when a user isn't logged in (`UNAUTHENTICATED`), or someone is forbidden from performing an action:
  ```js
  import { GraphQLError } from 'graphql';
  
  throw new GraphQLError('You are not authorized to perform this action.', {
    extensions: {
      code: 'FORBIDDEN',
    },
  });
  ```

- [Built-in error codes](https://www.apollographql.com/docs/apollo-server/data/errors/#built-in-error-codes)

  | code | description |
  |------|-------------|
  | `BAD_USER_INPUT` | The GraphQL operation includes an invalid value for a field argument |

- [Enums](https://graphql.org/learn/schema/#enumeration-types) | GraphQL Docs

  enumeration types are a special kind of scalar that is restricted to a particular set of allowed values. This allows you to:
  
  1. Validate that any arguments of this type are one of the allowed values
  2. Communicate through the type system that a field will always be one of a finite set of values
  
  Here's what an enum definition might look like in the GraphQL schema language:
  ```gql
  enum Episode {
    NEWHOPE
    EMPIRE
    JEDI
  }
  ```
  This means that wherever we use the type Episode in our schema, we expect it to be exactly one of `NEWHOPE`, `EMPIRE`, or `JEDI`.

- More on queries

  it is possible to combine multiple fields of type Query, or "separate queries" into one query.

  ```gql
  query {
    personCount
    allPersons {
      name
    }
  }
  ```

  Combined query can also use the same query multiple times. You must however give the queries alternative names like so:
  ```gql
  query {
    havePhone: allPersons(phone: YES){
      name
    }
    phoneless: allPersons(phone: NO){
      name
    }
  }
  ```

### b React and GraphQL

- [Client](https://www.apollographql.com/docs/react/get-started/) | Apollo Docs

  ```js
  const client = new ApolloClient({
    uri: 'http://localhost:4000',
    cache: new InMemoryCache(),
  })
  ```
- [Queries](https://www.apollographql.com/docs/react/data/queries/) | Apollo Docs

  ```js
  import { gql, useQuery } from '@apollo/client';

  const GET_DOGS = gql`
    query GetDogs {
      dogs {
        id
        breed
      }
    }
  `;
  ```
  `useQuery` makes the query it receives as a parameter. It returns an object with multiple [fields](https://www.apollographql.com/docs/react/api/react/hooks/#result).
  ```js
  function Dogs({ onDogSelected }) {
    const { loading, error, data } = useQuery(GET_DOGS);
  
    if (loading) return 'Loading...';
    if (error) return `Error! ${error.message}`;
  
    return (
      <select name='dog' onChange={onDogSelected}>
        {data.dogs.map((dog) => (
          <option key={dog.id} value={dog.breed}>
            {dog.breed}
          </option>
        ))}
      </select>
    );
  }
  ```
    
- [Manual Execution with `useLAzyQuery`](https://www.apollographql.com/docs/react/data/queries/#manual-execution-with-uselazyquery) | Apollo Docs

  Unlike with `useQuery`, when you call `useLazyQuery`, it does not immediately execute its associated query. Instead, it returns a **query function** in its result tuple that you call whenever you're ready to execute the query.

  ```js
  import { useLazyQuery } from '@apollo/client';

  function DelayedQuery() {
    const [getDog, { loading, error, data }] = useLazyQuery(GET_DOG_PHOTO);
  
    if (loading) return <p>Loading ...</p>;
    if (error) return `Error! ${error}`;
  
    return (
      <div>
        {data?.dog && <img src={data.dog.displayImage} />}
        <button onClick={() => getDog({ variables: { breed: 'bulldog' } })}>
          Click me!
        </button>
      </div>
    );
  }
  ```
