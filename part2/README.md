# Resources

### a Rendering a collection, modules
- [Rendering Lists](https://react.dev/learn/rendering-lists) | React Docs
- [Array Magic](https://phase-food-425.notion.site/Array-Magic-5916ebc2e4014eccb30b6ea69ccfe4c7) | Notion notes

### b Forms
- [Controlling input with state variables](https://react.dev/reference/react-dom/components/input#controlling-an-input-with-a-state-variable) | React Docs

  ```js
  const [value, setValue] = useState('');
  return (
    <input
      value={value}
      onChange={e => setValue(e.target.value)}
    />
  );
  ```
