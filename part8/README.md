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
