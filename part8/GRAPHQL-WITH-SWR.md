## [using SWR with GraphQL](https://swr.vercel.app/docs/data-fetching#graphql) | SWR Docs

  using a lib like [`graphql-requests`](https://github.com/jasonkuhrt/graphql-request)
  ```js
  import { request } from 'graphql-request'
 
  const fetcher = query => request('/api/graphql', query)
   
  function App () {
    const { data, error } = useSWR(
      `{
        Movie(title: "Inception") {
          releaseDate
          actors {
            name
          }
        }
      }`,
      fetcher
    )
    // ...
  }
  ```

- [Passing Variables](https://stackoverflow.com/a/70172822) | Stackoverflow

  ```js
  useSWR(['query ...', variables], fetcher)
  ```

    While `variables` can be a JavaScript object (can be nested, or an array, too), and it will not cause any unnecessary re-renders. Also, the serialization process is stable so the following keys are identical, no extra requests:
  ```js
  // Totally OK to do so, same resource!
  useSWR(['query ...', { name: 'foo', id: 'bar' }], fetcher)
  useSWR(['query ...', { id: 'bar', name: 'foo' }], fetcher)
  ```
  
  You can directly pass an object as the key too, it will get passed to the fetcher:
  ```js
  useSWR(
    {
      query: 'query ...',
      variables: { name: 'foo', id: 'bar' }
    },
    fetcher
  )
  ```
