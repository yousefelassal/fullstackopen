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
