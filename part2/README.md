# Resources

### a Rendering a collection, modules
- [Rendering Lists](https://react.dev/learn/rendering-lists) | React Docs
- [Array Magic](https://phase-food-425.notion.site/Array-Magic-5916ebc2e4014eccb30b6ea69ccfe4c7) | Notion notes

### b Forms
- [Controlling input with state variables](https://react.dev/reference/react-dom/components/input#controlling-an-input-with-a-state-variable) | React Docs

  ```js
  const [value, setValue] = useState(''); // Declare a state variable...
  return (
    <input
      value={value} // ...force the input's value to match the state variable...
      onChange={e => setValue(e.target.value)} // ... and update the state variable on any edits!
    />
  );
  ```
- [Object Equality](https://www.joshbritz.co/posts/why-its-so-hard-to-check-object-equality/) | some donny called josh
  ```js
  const a = { name: 'simple object' };
  const b = a;
  console.log(a === b); // -> true
  const c = { name: 'simple object' };
  console.log(a === c); // -> false
  ```
   (`===`) doesn’t check that both objects have the same property keys and values. Instead, it checks that the two objects occupy the same place in memory. Hence, when we declare a it is given a place in memory.
  
  Solutions:
  - [JSON.stringify()](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/JSON/stringify) | MDN Docs
    ```js
    console.log(JSON.stringify(a) === JSON.stringify(b)); // -> true
    ```
    all the keys and values must be in the same order, otherwise, it will see the two objects as unequal.
  - [Array.prototype.some()](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/some) | MDN Docs
    ```js
    const arr = [a, b];
    arr.some(obj => a.name === b.name) // => true 
    ```
    if we're dealing with an array of objects we can use the `some` method which returns true if, in the array, it finds an element for which the provided function returns true; otherwise it returns false.
  - [_.isEqual()](https://lodash.com/docs/4.17.15#isEqual) | Lodash
    ```js
    _.isEqual(a, b); // => true
    ```
    (external package which needs to be installed)

### c Getting data from server
[axios](https://axios-http.com/docs/example) `GET` request
```js
// Make a request
axios.get('/user?ID=12345')
  .then(function (response) {
    // handle success
    console.log(response);
  })
  .catch(function (error) {
    // handle error
    console.log(error);
  })
  .finally(function () {
    // always executed
  });
```
the same example using async/await:
```js
async function getUser() {
  try {
    const response = await axios.get('/user?ID=12345');
    console.log(response);
  } catch (error) {
    console.error(error);
  }
}
```

- [What the heck is the event loop anyway?](https://www.youtube.com/watch?v=8aGhZQkoFbQ) | YouTube Video
- [Effect Hooks](https://react.dev/reference/react#effect-hooks) | React Docs
- [Conditionally firing an effect](https://legacy.reactjs.org/docs/hooks-reference.html#conditionally-firing-an-effect) | Legacy React Docs

  _By default, effects run after every completed render, but you can choose to fire it only when certain values have changed._

  If we don’t need to run the effect on every update, pass a second argument to `useEffect` that is an array of values that the effect depends on.
  
  If you want to run an effect and clean it up only once, you can pass an empty array (`[]`) as a second argument. This tells React that your effect doesn’t depend on any values from props or state, so it never needs to re-run.

### d Altering data in server
[axios](https://axios-http.com/docs/post_example) `POST` request
```js
axios.post('/user', {
    firstName: 'Fred',
    lastName: 'Flintstone'
  })
  .then(function (response) {
    console.log(response);
  })
  .catch(function (error) {
    console.log(error);
  });
```

Data stored in the backend can be modified in two different ways by making HTTP requests to the object's unique URL:
1. `HTTP PUT` request: replace the entire object.
2. `HTTP PATCH` request: only change some of the object's properties.
