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
  
