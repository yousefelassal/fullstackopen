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
