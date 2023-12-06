### [#1: Practical React Query](https://tkdodo.eu/blog/practical-react-query)

- Use the React Query DevTools
- #### Treat the query key like a dependency array

  React Query will trigger a refetch whenever the query key changes. So when we pass a variable parameter to our `queryFn`, we almost always want to fetch data when that value changes.
  ```ts
  type State = 'all' | 'open' | 'done'
  type Todo = {
    id: number
    state: State
  }
  type Todos = ReadonlyArray<Todo>
  
  const fetchTodos = async (state: State): Promise<Todos> => {
    const response = await axios.get(`todos/${state}`)
    return response.data
  }
  
  export const useTodosQuery = (state: State) =>
    useQuery({
      queryKey: ['todos', state],
      queryFn: () => fetchTodos(state),
    })
  ```
- #### A new cache entry

  pre-fill the newly created cache entry with initialData so it does not result in a hard loading state.
  ```ts
  useQuery({
  // ...
    initialData: () => {
        const allTodos = queryClient.getQueryData<Todos>([
          'todos',
          'all',
        ])
        const filteredData =
          allTodos?.filter((todo) => todo.state === state) ?? []
  
        return filteredData.length > 0 ? filteredData : undefined
      }
  })
  ```
  
- #### Create custom hooks
  Even if it's only for wrapping one `useQuery` call, creating a custom hook usually pays off because:

  - You can keep the actual data fetching out of the ui, but co-located with your `useQuery` call.
  - You can keep all usages of one query key (and potentially type definitions) in one file.
  - If you need to tweak some settings or add some data transformation, you can do that in one place.

### [#2: React Query Data Transformation](https://tkdodo.eu/blog/react-query-data-transformations)

- #### on the backend

  If you are in control of the backend and have an endpoint that returns data for your exact use-case, prefer to deliver the data the way you expect it.

- #### using the select option

  a redux like `useSelector` API.

  ```js
  export const useTodosQuery = (select) =>
    useQuery({
      queryKey: ['todos'],
      queryFn: fetchTodos,
      select,
    })
  
  export const useTodosCount = () =>
    useTodosQuery((data) => data.length)
  export const useTodo = (id) =>
    useTodosQuery((data) => data.find((todo) => todo.id === id))
  ```
  The custom hooks still works like before, as `select` will be `undefined` if you don't pass it, so the whole state will be returned. But if you pass a selector, you are now only subscribed to the result of the selector function.

### [#3: React Query Render Optimizations](https://tkdodo.eu/blog/react-query-render-optimizations)

- [Fix the slow render before you fix the re-render](https://kentcdodds.com/blog/fix-the-slow-render-before-you-fix-the-re-render)
  
### [#4: Status Checks in React Query](https://tkdodo.eu/blog/status-checks-in-react-query)
