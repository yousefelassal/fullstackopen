# [using SWR with GraphQL](https://swr.vercel.app/docs/data-fetching#graphql) | SWR Docs

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

## [Passing Variables](https://stackoverflow.com/a/70172822) | Stackoverflow

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

## Make It Reusable
When building a web app, you might need to reuse the data in many places of the UI. It is incredibly easy to create reusable data hooks on top of SWR:

```js
function useUser (id) {
  const { data, error, isLoading } = useSWR(`query ...`, fetcher)
 
  return {
    user: data,
    isLoading,
    isError: error
  }
}
```

And use it in your components:
```js
function Avatar ({ id }) {
  const { user, isLoading, isError } = useUser(id)
 
  if (isLoading) return <Spinner />
  if (isError) return <Error />
  return <img src={user.avatar} />
}
```

By adopting this pattern, you can forget about fetching data in the imperative way: start the request, update the loading state, and return the final result. Instead, your code is more declarative: you just need to specify what data is used by the component.
