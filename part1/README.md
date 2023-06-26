# Resources
### a Introduction to React
- [JSX](https://react.dev/learn/writing-markup-with-jsx) | React Docs
- [Passing Props](https://react.dev/learn/passing-props-to-a-component) | React Docs

### b JavaScript 
- [Understading "this" in depth](https://egghead.io/lessons/javascript-this-in-the-global-context) | egghead.io
- [Function.prototype.bind()](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Function/bind) | MDN Docs

  ```javascript
    const module = {
    x: 42,
    getX: function() {
      return this.x;
    }
  };

  const unboundGetX = module.getX;
  console.log(unboundGetX()); // undefined
  ```
  When calling the method through a reference, the method loses knowledge of what the original `this` was.
  ```javascript
  const boundGetX = unboundGetX.bind(module);
  console.log(boundGetX()); // 42
  ```
  The bind() method creates a new function that, when called, has its this keyword set to the provided value

### c Component state, event handlers
- [State](https://react.dev/learn/state-a-components-memory) | React Docs

  ```js
  const [something, setSomething] = useState(/*initial value of something*/)
  ```
  The `useState` Hook provides those two things:
  1. A state variable to retain the data between renders.
  2. A state setter function to update the variable and trigger React to render the component again.


- [Responding to Events](https://react.dev/learn/responding-to-events) | React Docs
  |passing a function (correct) |calling a function (incorrect)|
  |-----|--------|
  |`<button onClick={handleClick}>`|`<button onClick={handleClick()}>`|
  |`<button onClick={() => alert('...')}>`|`<button onClick={alert('...')}>`|

  Passing a function tells React to remember it and only call your function when the user clicks the button. The second example fires the function immediately during rendering, without any clicks. This is because JavaScript inside the JSX executes right away.
- [Sharing State Between Components](https://react.dev/learn/sharing-state-between-components) | React Docs
  
  _Often, several components need to reflect the same changing data. We recommend lifting the shared state up to their closest common ancestor._

  To coordinate two components, we need to “lift their state up” to a parent component in three steps:
  1. Remove state from the child components.
  2. Pass hardcoded data from the common parent.
  3. Add state to the common parent and pass it down together with the event handlers.
  
### d A more complex state, debugging React apps
- [Spread syntax (...)](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Spread_syntax) | MDN Docs
  
  ```js
  const newObj = { 
    ...obj,
    aProperty: // some changes
  }
  ```
  `...obj` creates a new object that has copies of all of the properties of that object. When we specify a particular property and do _some changes_ the value of that property only in the new object will change.
- [DO NOT CHANGE/MUTATE THE STATE DIRECTLY](https://stackoverflow.com/a/40309023) | Stackoverflow

  Changing state has to always be done by setting the state to a new object. If properties from the previous state object are not changed, they need to simply be copied, which is done by copying those properties into a new object and setting that as the new state.
- [Choosing State Structure](https://react.dev/learn/choosing-the-state-structure) | React Docs
  1. Group related state.
  2. Avoid contradictions in state.
  3. Avoid redundant state.
  4. Avoid duplication in state.
  5. Avoid deeply nested state.
- [Array.prototype.concat()](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/concat) | MDN Docs

  The `concat` method does not mutate the existing array but rather returns a _new copy of the array_ with the item added to it.
- [Queueing a Series of State Updates](https://react.dev/learn/queueing-a-series-of-state-updates) | React Docs
  
  <img src="https://github.com/yousefelassal/fullstackopen/assets/76617202/ed757eb3-853e-449f-9241-df3b9225c413" width="375px" height="auto" title="React">

  React waits until all code in the event handlers has run before processing state updates.

