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
