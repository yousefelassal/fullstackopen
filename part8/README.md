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
  - [skip](https://www.apollographql.com/docs/react/data/queries/#skip)

    ```js
    const [nameToSearch, setNameToSearch] = useState(null)
    const result = useQuery(FIND_PERSON, {
      variables: { nameToSearch },
      skip: !nameToSearch,
    })
    ```
    
- [Manual Execution with `useLazyQuery`](https://www.apollographql.com/docs/react/data/queries/#manual-execution-with-uselazyquery) | Apollo Docs

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

- [Caching](https://www.apollographql.com/docs/react/caching/overview/) | Apollo Docs

  Apollo Client stores the results of your GraphQL queries in a local, [normalized](https://www.apollographql.com/docs/react/caching/overview/#data-normalization), in-memory cache. This enables Apollo Client to respond almost immediately to queries for already-cached data, without even sending a network request.

  For example, the _first_ time your app executes a `GetBook` query for a `Book` object with id `5`, the flow looks like this:
  
  ```mermaid
  sequenceDiagram
    Apollo Client->>InMemoryCache: GetBook(bookId: "5")
    Note over InMemoryCache: Book:5 not found<br/>in cache
    InMemoryCache->>GraphQL Server: Query sent to server
    GraphQL Server->>InMemoryCache: Server responds<br/>with Book
    Note over InMemoryCache: Book:5 is cached
    InMemoryCache->>Apollo Client: Returns Book
  ```
  
  And each _later_ time your app executes `GetBook` for that same object, the flow looks like this instead:
  
  ```mermaid
  sequenceDiagram
    Apollo Client->>InMemoryCache: GetBook(bookId: "5")
    Note over InMemoryCache: Book:5 found<br/>in cache!
    InMemoryCache->>Apollo Client: Returns Book
    Note over GraphQL Server: (Server is never queried)
  ```

- [`useMutation`](https://www.apollographql.com/docs/react/api/react/hooks/#usemutation) | Apollo Docs

  ```js
  import { gql, useMutation } from '@apollo/client';

  const ADD_TODO = gql`
    mutation AddTodo($type: String!) {
      addTodo(type: $type) {
        id
        type
      }
    }
  `;
  
  function AddTodo() {
    let input;
    const [addTodo, { data }] = useMutation(ADD_TODO);
  
    return (
      <div>
        <form
          onSubmit={e => {
            e.preventDefault();
            addTodo({ variables: { type: input.value } });
            input.value = '';
          }}
        >
          <input
            ref={node => {
              input = node;
            }}
          />
          <button type="submit">Add Todo</button>
        </form>
      </div>
    );
  }
  ```

- [Polling](https://www.apollographql.com/docs/react/data/queries/#polling) | Apollo Docs

  Polling provides near-real-time synchronization with your server by executing your query periodically at a specified interval. To enable polling for a query, pass a `pollInterval` configuration option to the `useQuery` hook with an interval in milliseconds:

  ```js
  const { loading, error, data } = useQuery(GET_DOG_PHOTO, {
    variables: { breed },
    pollInterval: 500,
  });
  ```

- [`refetchQuries`](https://www.apollographql.com/docs/react/data/refetching/) | Apollo Docs

  ```js
  const [ createPerson ] = useMutation(CREATE_PERSON, {
    refetchQueries: [ { query: ALL_PERSONS } ]
  })
  ```

  If you want to do multiple queries, you can pass multiple objects inside `refetchQueries`. This will allow you to update different parts of your app at the same time. Here is an example:
  ```js
  const [ createPerson ] = useMutation(CREATE_PERSON, {
    refetchQueries: [ { query: ALL_PERSONS }, { query: OTHER_QUERY }, { query: ... } ] // pass as many queries as you need
  })
  ```

- [`onError`](https://www.apollographql.com/docs/react/api/react/hooks/#onerror) | Apollo Docs

  ```js
  const [ createPerson ] = useMutation(CREATE_PERSON, {
    // ...
    onError: (error) => {
      const messages = error.graphQLErrors.map(e => e.message).join('\n')
      // ...
    }
  }
  ```

### c Database and user administration

- [Resolver Return Value](https://www.apollographql.com/docs/apollo-server/data/resolvers/#return-values) | Apollo Docs

  | type | description |
  | ---- | ----------- |
  | Promise | Resolvers can be asynchronous and perform async actions, such as fetching from a database or back-end API. To support this, a resolver can return a promise that resolves to any other supported return type. |

- [context](https://www.apollographql.com/docs/apollo-server/data/context/) | Apollo Docs

  share data throughout your server's resolvers and plugins as their _third parameter_, server calls the `context` function _once for every request_, enabling you to customize your `contextValue` with each request's details (such as HTTP headers):

  ```js
  startStandaloneServer(server, {
    // ...
    // return an object
    context: async ({ req, res }) => {
      const auth = req ? req.headers.authorization : null
      if (auth && auth.startsWith('Bearer ')) {
        const decodedToken = jwt.verify(
          auth.substring(7), process.env.JWT_SECRET
        )
        const currentUser = await User.findById(decodedToken.id)
        return { currentUser }
      }
    },
  })
  ```

- [Query an Array of Documents](https://www.mongodb.com/docs/manual/tutorial/query-array-of-documents/) | MongoDB Docs

  inserting many documents:
  ```js
  await db.collection('inventory').insertMany([
    {
      item: 'journal',
      instock: [
        { warehouse: 'A', qty: 5 },
        { warehouse: 'C', qty: 15 }
      ]
    },
    {
      item: 'notebook',
      instock: [{ warehouse: 'C', qty: 5 }]
    },
    // ...
  ]);
  ```

  - #### Query for a Document Nested in an Array
    
    The following example selects all documents where an element in the instock array matches the specified document:
    ```js
    const cursor = db.collection('inventory').find({
      instock: { warehouse: 'A', qty: 5 }
    });
    ```
    
    Equality matches on the whole embedded/nested document require an exact match of the specified document, **including the field order**.
  
  - #### Specify a Query Condition on a Field Embedded in an Array of Documents
  
    If you do not know the index position of the document nested in the array, concatenate the name of the array field, with a dot (`.`) and the name of the field in the nested document.
    
    The following example selects all documents where the `instock` array has at least one embedded document that contains the field `qty` whose value is less than or equal to `20`:
    ```js
    const cursor = db.collection('inventory').find({
      'instock.qty': { $lte: 20 }
    });
    ```

  - #### A Single Nested Document Meets Multiple Query Conditions on Nested Fields
  
    Use `$elemMatch` operator to specify multiple criteria on an array of embedded documents such that at least one embedded document satisfies all the specified criteria.
    
    The following example queries for documents where the `instock` array has at least one embedded document that contains both the field `qty` equal to `5` and the field `warehouse` equal to `A`:
    ```js
    const cursor = db.collection('inventory').find({
      instock: { $elemMatch: { qty: 5, warehouse: 'A' } }
    });
    ```
    
    The following example queries for documents where the `instock` array has at least one embedded document that contains the field `qty` that is greater than `10` and less than or equal to `20`:
    ```js
    const cursor = db.collection('inventory').find({
      instock: { $elemMatch: { qty: { $gt: 10, $lte: 20 } } }
    });
    ```

- [Query Conditions](https://mongoosejs.com/docs/populate.html#query-conditions) | Mongoose Docs

  What if we wanted to populate our fans array based on their age and select just their names?
  ```js
  await Story.
    find().
    populate({
      path: 'fans',
      match: { age: { $gte: 21 } },
      select: 'name '
    })
    ```

### d Login and updating the cache

- User login

  Use of the effect hook is necessary to avoid an endless rendering loop.
  ```js
  const [ login, result ] = useMutation(LOGIN, {
    onError: (error) => {
      setError(error.graphQLErrors[0].message)
    }
  })

  useEffect(() => {
    if ( result.data ) {
      const token = result.data.login.value
      setToken(token)
      localStorage.setItem('user-token', token)
    }
  }, [result.data])
  ```

- [Reset store on logout](https://www.apollographql.com/docs/react/networking/authentication/#reset-store-on-logout) | Apollo Docs

  Since Apollo caches all of your query results, it's important to get rid of them when the login state changes.
  
  The most straightforward way to ensure that the UI and store state reflects the current user's permissions is to call `client.resetStore()` after your login or logout process has completed.

  ```js
  const logout = () => {
    setToken(null)
    localStorage.clear()
    client.resetStore()
  }
  ```

- [`useApolloClient`](https://www.apollographql.com/docs/react/api/react/hooks/#useapolloclient) | Apollo Docs

  access client inside a component

  ```js
  import { useApolloClient } from '@apollo/client';

  function SomeComponent() {
    const client = useApolloClient();
    // `client` is now set to the `ApolloClient` instance being used by the
    // application (that was configured using something like `ApolloProvider`)
  }
  ```

- [Link](https://www.apollographql.com/docs/react/api/link/introduction/) | Apollo Docs

  ```mermaid
  flowchart LR
    subgraph Apollo Client
    operation(GraphQL operation)
    link1(Link)
    link2(Link)
    link3(Terminating Link)
    operation--"Initiated"-->link1
    link1--down-->link2
    link2--down-->link3
    link3--up-->link2
    link2--up-->link1
    link1--"Completed"-->operation
    end
    server(GraphQL server)
    link3--Request-->server
    server--Response-->link3
    class server secondary;
  ```
  Each link should represent either a self-contained modification to a GraphQL operation or a side effect (such as logging).
  
  In the above diagram:
  
  1. The first link might log the details of the operation for debugging purposes.
  2. The second link might add an HTTP header to the outgoing operation request for authentication purposes.
  3. The final (terminating) link sends the operation to its destination (usually a GraphQL server over HTTP).
  4. The server's response is passed back up each link in reverse order, enabling links to modify the response or take other actions before the data is cached.

- [Context](https://www.apollographql.com/docs/react/api/link/apollo-link-context/#overview) | Apollo Docs

  setContext function accepts a function that returns either an object or a promise, which then returns an object to set the new context of a request. It receives two arguments: the GraphQL request being executed, and the previous context.

  ```js
  import { setContext } from "@apollo/client/link/context";

  const setAuthorizationLink = setContext((request, previousContext) => ({
    headers: {authorization: "1234"}
  }));
  
  const asyncAuthLink = setContext(
    request =>
      new Promise((success, fail) => {
        // do some async lookup here
        setTimeout(() => {
          success({ token: "async found token" });
        }, 10);
      })
  );


- [Authentication Header](https://www.apollographql.com/docs/react/networking/authentication/#header) | Apollo Docs

  Add an `authorization` header to every HTTP request by chaining together Apollo Links. In this example, we'll pull the login token from `localStorage` every time a request is sent:

  ```js  
  import { ApolloClient, createHttpLink, InMemoryCache } from '@apollo/client';
  import { setContext } from '@apollo/client/link/context';
  
  const httpLink = createHttpLink({
    uri: '/graphql',
  });
  
  const authLink = setContext((_, { headers }) => {
    // get the authentication token from local storage if it exists
    const token = localStorage.getItem('token');
    // return the headers to the context so httpLink can read them
    return {
      headers: {
        ...headers,
        authorization: token ? `Bearer ${token}` : "",
      }
    }
  });
  
  const client = new ApolloClient({
    link: authLink.concat(httpLink),
    cache: new InMemoryCache()
  });
  ```

- [The `update` function](https://www.apollographql.com/docs/react/data/mutations/#the-update-function) | Apollo Docs

  When a mutation's response is insufficient to update all modified fields in your cache (such as certain list fields), you can define an update function to apply manual changes to your cached data after a mutation.
  
  You provide an `update` function to `useMutation`, like so:
  ```js
  const [ createPerson ] = useMutation(CREATE_PERSON, {
    // ...
    update: (cache, response) => {
      cache.updateQuery({ query: ALL_PERSONS }, ({ allPersons }) => {
        return {
          allPersons: allPersons.concat(response.data.addPerson),
        }
      })
    },
  ```

- [TwoHardThings](https://martinfowler.com/bliki/TwoHardThings.html) | martinFowler

  > **There are only two hard things in Computer Science: cache invalidation and naming things.**   
  **-- Phil Karlton**  

### e Fragments and subscriptions

- [Fragments](https://graphql.org/learn/queries/#fragments) | GraphQL Docs

  Fragments let you construct sets of fields, and then include them in queries where you need to. Here's an example of how you could solve the above situation using fragments:
  ```gql
  {
    leftComparison: hero(episode: EMPIRE) {
      ...comparisonFields
    }
    rightComparison: hero(episode: JEDI) {
      ...comparisonFields
    }
  }
  ​
  fragment comparisonFields on Character {
    name
    appearsIn
    friends {
      name
    }
  }
  ```

- [Subscriptions](https://www.apollographql.com/docs/react/data/subscriptions/) | Apollo Docs

  Subscriptions can maintain an active connection to your GraphQL server (most commonly via WebSocket), enabling the server to push updates to the subscription's result.
  
  Subscriptions are useful for notifying your client in real time about changes to back-end data, such as the creation of a new object or updates to an important field.

  #### Server side
  The following `commentAdded` subscription notifies a subscribing client whenever a new comment is added to a particular blog post (specified by `postID`):
  ```gql
  type Subscription {
    commentAdded(postID: ID!): Comment
  }
  ```
  
  #### Client side
  In your application's client, you define the shape of each subscription you want Apollo Client to execute, like so:
  ```js
  const COMMENTS_SUBSCRIPTION = gql`
    subscription OnCommentAdded($postID: ID!) {
      commentAdded(postID: $postID) {
        id
        content
      }
    }
  `;
  ```
  When Apollo Client executes the `OnCommentAdded` subscription, it establishes a connection to your GraphQL server and listens for response data. Unlike with a query, there is no expectation that the server will immediately process and return a response. Instead, your server only pushes data to your client when a particular event occurs on your backend.

- [When to use Subscriptions](https://www.apollographql.com/docs/react/data/subscriptions/#when-to-use-subscriptions) | Apollo Docs

  In the majority of cases, your client should not use subscriptions to stay up to date with your backend. Instead, you should _poll intermittently_ with queries, or _re-execute queries on demand_ when a user performs a relevant action (such as clicking a button).

  #### You should use subscriptions for the following:

  - **Small, incremental changes to large objects**. Repeatedly polling for a large object is expensive, especially when most of the object's fields rarely change. Instead, you can fetch the object's initial state with a query, and your server can proactively push updates to individual fields as they occur.

  - **Low-latency, real-time updates**. For example, a chat application's client wants to receive new messages as soon as they're available.

- [Subscriptions in Apollo Server](https://www.apollographql.com/docs/apollo-server/data/subscriptions) | Apollo Docs

  ```ts
  import { ApolloServer } from '@apollo/server';
  import { expressMiddleware } from '@apollo/server/express4';
  import { ApolloServerPluginDrainHttpServer } from '@apollo/server/plugin/drainHttpServer';
  import { createServer } from 'http';
  import express from 'express';
  import { makeExecutableSchema } from '@graphql-tools/schema';
  import { WebSocketServer } from 'ws';
  import { useServer } from 'graphql-ws/lib/use/ws';
  import cors from 'cors';
  import resolvers from './resolvers';
  import typeDefs from './typeDefs';
  
  // Create the schema, which will be used separately by ApolloServer and
  // the WebSocket server.
  const schema = makeExecutableSchema({ typeDefs, resolvers });
  
  // Create an Express app and HTTP server; we will attach both the WebSocket
  // server and the ApolloServer to this HTTP server.
  const app = express();
  const httpServer = createServer(app);
  
  // Create our WebSocket server using the HTTP server we just set up.
  const wsServer = new WebSocketServer({
    server: httpServer,
    path: '/subscriptions',
  });
  // Save the returned server's info so we can shutdown this server later
  const serverCleanup = useServer({ schema }, wsServer);
  
  // Set up ApolloServer.
  const server = new ApolloServer({
    schema,
    plugins: [
      // Proper shutdown for the HTTP server.
      ApolloServerPluginDrainHttpServer({ httpServer }),
  
      // Proper shutdown for the WebSocket server.
      {
        async serverWillStart() {
          return {
            async drainServer() {
              await serverCleanup.dispose();
            },
          };
        },
      },
    ],
  });
  
  await server.start();
  app.use('/graphql', cors<cors.CorsRequest>(), express.json(), expressMiddleware(server));
  
  const PORT = 4000;
  // Now that our HTTP server is fully set up, we can listen to it.
  httpServer.listen(PORT, () => {
    console.log(`Server is now running on http://localhost:${PORT}/graphql`);
  });
  ```

- [The `PubSub` class](https://www.apollographql.com/docs/apollo-server/data/subscriptions/#the-pubsub-class) | Apollo Docs

  > **not recommended for production environments, use [Production `PubSub` Engine](https://www.apollographql.com/docs/apollo-server/data/subscriptions/#production-pubsub-libraries)**   
  **- [graphql-mongodb-subscriptions](https://github.com/mjwheatley/graphql-mongodb-subscriptions)**    
  **- [graphql-postgres-subscriptions](https://github.com/GraphQLCollege/graphql-postgres-subscriptions)**

  **publish-subscribe (pub/sub)** model to track events that update active subscriptions.

  create a PubSub instance like so:
  ```js
  import { PubSub } from 'graphql-subscriptions';
  
  const pubsub = new PubSub();
  ```

  #### Publishing an event
  You can publish an event using the publish method of a PubSub instance:
  ```js
  const resolvers = {
    Mutation: {
      createPost: async (root, args) => {
        const post = new Post({ ...args })
        pubsub.publish('POST_CREATED', { postCreated: post }); 
        return post
      },
    },
    // ...other resolvers...
  };
  ```

  #### Listening for events
   `AsyncIterator` object listens for events that are associated with a particular label (or set of labels) and adds them to a queue for processing.
  ```js
  const resolvers = {
    Subscription: {
      postCreated: {
        subscribe: () => pubsub.asyncIterator(['POST_CREATED']),
      },
    },
    // ...other resolvers...
  };
  ```
  With this subscribe function set, Apollo Server uses the payloads of `POST_CREATED` events to push updated values for the `postCreated` field.

- [Subscriptions on the client]() | Apollo Docs

  use the `split` function to combine the `HttpLink` and `GraphQLWsLink` Links into a single Link that uses one or the other according to the type of operation being executed.
  
  ```js
  import { split, HttpLink } from '@apollo/client';
  import { getMainDefinition } from '@apollo/client/utilities';
  import { GraphQLWsLink } from '@apollo/client/link/subscriptions';
  import { createClient } from 'graphql-ws';
  
  const httpLink = new HttpLink({
    uri: 'http://localhost:4000/graphql'
  });
  
  const wsLink = new GraphQLWsLink(createClient({
    url: 'ws://localhost:4000/subscriptions',
  }));
  
  // The split function takes three parameters:
  //
  // * A function that's called for each operation to execute
  // * The Link to use for an operation if the function returns a "truthy" value
  // * The Link to use for an operation if the function returns a "falsy" value
  const splitLink = split(
    ({ query }) => {
      const definition = getMainDefinition(query);
      return (
        definition.kind === 'OperationDefinition' &&
        definition.operation === 'subscription'
      );
    },
    wsLink,
    httpLink,
  );
  ```
  Using this logic, queries and mutations will use HTTP as normal, and subscriptions will use WebSocket.

  #### Executing a subscription
  You use Apollo Client's `useSubscription` Hook to execute a subscription from React. Like `useQuery`, `useSubscription` returns an object from Apollo Client that contains `loading`, `error`, and `data` properties you can use to render your UI.
  ```js  
  const COMMENTS_SUBSCRIPTION = gql`
    subscription OnCommentAdded($postID: ID!) {
      commentAdded(postID: $postID) {
        id
        content
      }
    }
  `;
  
  function LatestComment({ postID }) {
    const { data, loading } = useSubscription(
      COMMENTS_SUBSCRIPTION,
      { variables: { postID } }
    );
    return <h4>New comment: {!loading && data.commentAdded.content}</h4>;
  }
  ```

  - [Subscribing to updates for a query `subscribeToMore`](https://www.apollographql.com/docs/react/data/subscriptions/#subscribing-to-updates-for-a-query)
  - [The `fetchMore` function](https://www.apollographql.com/docs/react/pagination/core-api/#the-fetchmore-function)

      update a query's cached result with data returned by a _follow-up_ query. Most often, `fetchMore` is used to handle infinite-scroll pagination.

- [Batching GraphQL Queries with DataLoader](https://www.petecorey.com/blog/2017/08/14/batching-graphql-queries-with-dataloader/)
    - [DataLoader](https://github.com/graphql/dataloader) | GitHub Repo

- [Modularizing Schema](https://www.apollographql.com/blog/modularizing-your-graphql-schema-code/) | Apollo Blogs

  split up the schema types and the associated resolvers into multiple files.

  for the following example we can split up the query and resolvers object and put a piece of it in `author.js`, another in `book.js`, and then import them and use the `lodash.merge` function to put it all together in `schema.js`.

  This is what `author.js` would look like:
  ```js
  // author.js
  export const typeDef = `
    type Author {
      id: Int!
      firstName: String
      lastName: String
      books: [Book]
    }
  `;
  
  export const resolvers = {
    Author: {
      books: () => { ... },
    }
  };
  ```
  Here’s `book.js`:
  ```js
  // book.js
  export const typeDef = `
    type Book {
      title: String
      author: Author
    }
  `;
  
  export const resolvers = {
    Book: {
      author: () => { ... },
    }
  };
  ```
  Then, we apply `lodash.merge` in `schema.js` to put everything together:
  ```js
  import { merge } from 'lodash';
  import { 
    typeDef as Author, 
    resolvers as authorResolvers,
  } from './author.js';
  import { 
    typeDef as Book, 
    resolvers as bookResolvers,
  } from './book.js';
  
  const Query = `
    type Query {
      author(id: Int!): Author
      book(id: Int!): Book
    }
  `;
  
  const resolvers = {
    Query: { 
      ...,
    }
  };
  
  makeExecutableSchema({
    typeDefs: [ Query, Author, Book ],
    resolvers: merge(resolvers, authorResolvers, bookResolvers),
  });
  ```

- [Structuring Client Queries and Mutations](https://medium.com/@peterpme/thoughts-on-structuring-your-apollo-queries-mutations-939ba4746cd8) | Medium

  #### Folder Structure:
  ```
  /containers
  /components
  /utilities
  /modals
  /graphql
    /queries
    /mutations
  ```

  #### Naming Conventions:
  Mutations will always start with an action:
  - saveUserPushToken
  - updateOnboardingProfile
  - createUser
  
  Queries just describe what I’m looking for:
  - userProfile
  - userConnections
  - reminders
  
  Sometimes they’ll even look like this:
  - remindersWithNewFeatureOfSomeKind
  - userProfileWithUserSettings
  - userPrioritiesWithRemindersAtTheTop
  
  
  #### File Structure:
  I don’t like to keep them in the same file either because I literally spend more time scrolling than I do typing! What does each file look like? The way you’d expect:
  ```js
  import gql from 'graphql-tag'
  const updateUsername = gql`
    mutation UpdateUsername($id: ID!, $username: String!) {
      id
    }
  }
  `
  export default updateUsername
  ```
