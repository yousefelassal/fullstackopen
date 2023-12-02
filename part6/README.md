### a Flux-architecture and Redux

- [Flux-architecture Overview](https://facebookarchive.github.io/flux/docs/in-depth-overview/) | Facebook Archive

  Data in a Flux application flows in a single direction. The views may cause a new action to be propagated through the system in response to user interactions
  
  ![flux-simple-f8-diagram-explained-1300w](https://github.com/yousefelassal/fullstackopen/assets/76617202/a395beec-9f7c-4d6d-b1e7-47c07964d338)

- [Redux Essentials](https://redux.js.org/tutorials/essentials/part-1-overview-concepts) | Redux Docs

  Redux expects that all state updates are done _immutably_ (make copies of existing objects/arrays, and then modify the copies)
    - [A Visual Guide to References in JavaScript](https://daveceddia.com/javascript-references/)
    - [Immutability in React and Redux: The Complete Guide](https://daveceddia.com/react-redux-immutability-guide/)

  #### Actions
  An **action** is a plain JavaScript object that has a `type` field. You can think of an action as an event that describes something that happened in the application.
  
  The `type` field should be a string that gives this action a descriptive name, like `"todos/todoAdded"`. We usually write that type string like `"domain/eventName"`, where the first part is the feature or category that this action belongs to, and the second part is the specific thing that happened.
  
  An action object can have other fields with additional information about what happened. By convention, we put that information in a field called `payload`.
  
  A typical action object might look like this:
  ```js
  const addTodoAction = {
    type: 'todos/todoAdded',
    payload: 'Buy milk'
  }
  ```
  #### Action Creators
  An **action creator** is a function that creates and returns an action object. We typically use these so we don't have to write the action object by hand every time:
  ```js
  const addTodo = text => {
    return {
      type: 'todos/todoAdded',
      payload: text
    }
  }
  ```
  #### Reducers
  A **reducer** is a function that receives the current `state` and an `action` object, decides how to update the state if necessary, and returns the new state: `(state, action) => newState`. You can think of a reducer as an event listener which handles events based on the received action (event) type.
  
  > "Reducer" functions get their name because they're similar to the kind of callback function you pass to the [`Array.reduce()`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/reduce) method.
  ```js
  const initialState = { value: 0 }
  
  function counterReducer(state = initialState, action) {
    // Check to see if the reducer cares about this action
    if (action.type === 'counter/increment') {
      // If so, make a copy of `state`
      return {
        ...state,
        // and update the copy with the new value
        value: state.value + 1
      }
    }
    // otherwise return the existing state unchanged
    return state
  }
  ```
  Reducers can use any kind of logic inside to decide what the new state should be: `if/else`, `switch`, loops, and so on.

  #### Store
  The current Redux application state lives in an object called the store .
  
  The store is created by passing in a reducer, and has a method called `getState` that returns the current state value:
  ```js
  import { configureStore } from '@reduxjs/toolkit'
  
  const store = configureStore({ reducer: counterReducer })
  
  console.log(store.getState())
  // {value: 0}
  ```
  #### Dispatch
  The Redux store has a method called dispatch. The only way to update the state is to call `store.dispatch()` and pass in an action object. The store will run its reducer function and save the new state value inside, and we can call `getState()` to retrieve the updated value:
  ```js
  store.dispatch({ type: 'counter/increment' })
  
  console.log(store.getState())
  // {value: 1}
  ```
  
- [Redux Store](https://redux.js.org/tutorials/fundamentals/part-4-store#redux-store) | Redux Docs

  The Redux store brings together the state, actions, and reducers that make up your app. The store has several responsibilities:
  
  - Holds the current application state inside
  - Allows access to the current state via `store.getState()`;
  - Allows state to be updated via `store.dispatch(action)`;
  - Registers listener callbacks via `store.subscribe(listener)`;
  - Handles unregistering of listeners via the unsubscribe function returned by `store.subscribe(listener)`.

- [Controlled vs uncontrolled inputs](https://goshacmd.com/controlled-vs-uncontrolled-inputs-react/)
  | Element |	Value property | Change callback |	New value in the callback |
  |---------|---------|---------|---------|
  | `<input type="text" />` |	`value="string"`|	`onChange`|	`event.target.value`|
  | `<input type="checkbox" />` |	`checked={boolean}`	|`onChange`|	`event.target.checked`|
  | `<input type="radio" />` |	`checked={boolean}`	|`onChange`|	`event.target.checked`|
  | `<textarea />` |	`value="string"`	|`onChange`	|`event.target.value`|
  | `<select />` | `value="option value"`	|`onChange`|	`event.target.value`|

- [`<Provider>`](https://react-redux.js.org/api/provider) | React Redux Docs

  makes the Redux store available to any nested components that need to access the Redux store.

  ```js
  import { Provider } from 'react-redux'
  
  const store = createStore()

  const root = ReactDOM.createRoot(document.getElementById('root'))
  root.render(
    <Provider store={store}>
      <App />
    </Provider>
  )
  ```
- [`useDispatch()`](https://react-redux.js.org/api/hooks#usedispatch) | React Redux Docs

  This hook returns a reference to the `dispatch` function from the Redux store. You may use it to dispatch actions as needed.

  ```js
  import { useDispatch } from 'react-redux'

  export const CounterComponent = ({ value }) => {
    const dispatch = useDispatch()
  
    return (
      <div>
        <span>{value}</span>
        <button onClick={() => dispatch({ type: 'increment-counter' })}>
          Increment counter
        </button>
      </div>
    )
  }
  ```
- [`useSelector()`](https://react-redux.js.org/api/hooks#useselector) | React Redux Docs

  receives a function as a parameter. The function either searches for or selects data from the Redux store.

  - return the whole state:
    
    ```js
    const notes = useSelector(state => state)
    ```
  - return only selected parts of the contents of the Redux store:
    
    ```js
    const importantNotes = useSelector(state => state.filter(note => note.important))
    ```
### b Many reducers

- [`combineReducers(reducers)`](https://redux.js.org/api/combinereducers) | Redux Docs

  turns an object whose values are different "slice reducer" functions into a single combined reducer function you can pass to Redux Toolkit's `configureStore` (or the legacy `createStore` method)

  ```js
  combineReducers({
    posts: postsReducer,
    comments: commentsReducer
  })
  ```
- [`configureStore`](https://redux-toolkit.js.org/api/configureStore) | Redux Toolkit Docs

  The standard method for creating a Redux store. It uses the low-level Redux core createStore method internally, but wraps that to provide good defaults to the store setup for a better development experience.

  ```js
  import { configureStore } from '@reduxjs/toolkit'
  
  const store = configureStore({
    reducer: {
      notes: noteReducer,
      filter: filterReducer
    }
  })
  ```
- [`createSlice`](https://redux-toolkit.js.org/api/createSlice) | Redux Toolkit Docs
  
  A function that accepts an initial state, an object of reducer functions, and a "slice name", and automatically generates action creators and action types that correspond to the reducers and state.

  ```js
  import { createSlice } from '@reduxjs/toolkit'
  
  const initialState = { value: 0 }
  
  const counterSlice = createSlice({
    name: 'counter',
    initialState,
    reducers: {
      increment(state) {
        state.value++
      },
      decrement(state) {
        state.value--
      },
      incrementByAmount(state, action) {
        state.value += action.payload
      },
    },
  })
  
  export const { increment, decrement, incrementByAmount } = counterSlice.actions
  export default counterSlice.reducer
  ```
- [Immer](https://immerjs.github.io/immer/) | Immer Docs

  Redux Toolkit utilizes this library which is a tiny package that allows you to work with immutable state in a more convenient way.

  ```js
  import {produce} from "immer"

  const nextState = produce(baseState, draft => {
    draft[1].done = true
    draft.push({title: "Tweet about it"})
  })
  ```
    ![immer-4002b3fd2cfd3aa66c62ecc525663c0d](https://github.com/yousefelassal/fullstackopen/assets/76617202/e1fdcfe8-bcfb-4010-bd13-a08987761351)

  - console logging inside Immer
    
    status can be converted to a human-readable format, e.g. by converting it to a string and back to a JavaScript object as follows:
    ```js
    console.log(JSON.parse(JSON.stringify(state)))
    ```
### c Communicating with server in a redux application

- [Writing Logic Thunks](https://redux.js.org/usage/writing-logic-thunks) | Redux Docs

  "thunks" are a pattern of writing functions with logic inside that can interact with a Redux store's dispatch and getState methods.

  _Thunk action creators and thunk functions_
  ```js
  // fetchTodoById is the "thunk action creator"
  export function fetchTodoById(todoId) {
    // fetchTodoByIdThunk is the "thunk function"
    return async function fetchTodoByIdThunk(dispatch, getState) {
      const response = await client.get(`/fakeApi/todo/${todoId}`)
      dispatch(todosLoaded(response.todos))
    }
  }
  ```

  _Writing thunks using arrow functions_
  ```js
  export const fetchTodoById = todoId => async dispatch => {
    const response = await client.get(`/fakeApi/todo/${todoId}`)
    dispatch(todosLoaded(response.todos))
  }
  ```
  - [redux-thunk](https://github.com/reduxjs/redux-thunk) | GitHub repo

### d React Query, useReducer and the context

- [React Query](https://tanstack.com/query/latest) | TanStack Docs
