### a React Router

- [BrowserRouter](https://reactrouter.com/en/main/router-components/browser-router) | React Router Docs

  stores the current location in the browser's address bar using clean URLs and navigates using the browser's built-in history stack.
  ```js
  import { BrowserRouter } from "react-router-dom";

  const root = createRoot(document.getElementById("root"));
  
  root.render(
    <BrowserRouter>
      {/* The rest of your app goes here */}
    </BrowserRouter>
  );
  ```
- [Link](https://reactrouter.com/en/main/components/link) | React Router Docs

  an element that lets the user navigate to another page by clicking or tapping on it.
  ```js
  <Link to="/aymakan">aymakan</Link>
  ```
  A relative `<Link to>` value (that does not begin with `/`) resolves relative to the parent route

- [Route](https://reactrouter.com/en/main/route/route) | React Router Docs

  couple URL segments to components
  ```js
  <Route path="/ayhaga" element={<AyHaga />} />
  ```

  dynamic route
  ```js
  <Route path="/ayhaga/:id" element={<AyHaga 7agat={7agat} />} />
  ```
- [Routes](https://reactrouter.com/en/main/components/routes) | React Router Docs

  match a set of child routes from the current location
  ```js
  <Routes>
    <Route path="/ayhaga" element={<AyHaga />} />
    <Route path="/" element={<Home />} />
  </Routes>
  ```
- [useParams](https://reactrouter.com/en/main/hooks/use-params) | React Router Docs

  returns an object of key/value pairs of the dynamic params from the current URL
  ```js
  // Get the userId param from the URL.
  let { userId } = useParams();
  ```
- [useNavigate](https://reactrouter.com/en/main/hooks/use-navigate) | React Router Docs

  - Either pass a To value (same type as `<Link to>`)
  - Pass the delta you want to go in the history stack. For example, `navigate(-1)` is equivalent to hitting the back button


  ```js
  import { useNavigate } from "react-router-dom";

  function useLogoutTimer() {
    const userIsInactive = useFakeInactiveUser();
    const navigate = useNavigate();
  
    useEffect(() => {
      if (userIsInactive) {
        fake.logout();
        navigate("/session-timed-out");
      }
    }, [userIsInactive]);
  }
  ```

- [Navigate](https://reactrouter.com/en/main/components/navigate) | React Router Docs

  changes the current location when it is rendered.

  ```js
  <Navigate replace to="/login" />
  ```

  could be used to redirect conditionally within a route
  ```js
  <Route path="/users" element={user ? <Users /> : <Navigate replace to="/login" />} />
  ```

  or within a page
  ```jsx
  {user && (
    <Navigate to="/dashboard" replace={true} />
  )}
  ```
- [useMatch](https://reactrouter.com/en/v6.3.0/api#usematch) | React Router Docs

  Returns match data about a route at the given path relative to the current location.

  ```jsx
  const match = useMatch('/notes/:id')
  const notes = match ? notes.find(note => note.id === Number(match.params.id)) : null
  
  return (
    <Routes>
      <Route path="/notes/:id" element={<Note note={note} />} />
      // ...
    </Routes>
  )
  ```
### b Custom hooks

- [Rules of Hooks](https://legacy.reactjs.org/docs/hooks-rules.html) | Legacy React Docs

  - #### Only Call Hooks at the Top Level

    Don’t call Hooks inside loops, conditions, or nested functions.

  - #### Only Call Hooks from React Functions

    Don’t call Hooks from regular JavaScript functions.

- [Reusing Logic with Custom Hooks](https://react.dev/learn/reusing-logic-with-custom-hooks) | React Docs

  extract the repetitive logic into a custom Hook
  ```jsx
  import { useState } from 'react';

  export function useFormInput(initialValue) {
    const [value, setValue] = useState(initialValue);
  
    function handleChange(e) {
      setValue(e.target.value);
    }
  
    const inputProps = {
      value: value,
      onChange: handleChange
    };
  
    return inputProps;
  }
  ```

  which could be used as following:
  ```jsx
  import { useFormInput } from './useFormInput.js';

  export default function Form() {
    const firstNameProps = useFormInput('Mary');
    const lastNameProps = useFormInput('Poppins');
  
    return (
      <>
        <label>
          First name:
          <input {...firstNameProps} />
        </label>
        <label>
          Last name:
          <input {...lastNameProps} />
        </label>
        <p><b>Good morning, {firstNameProps.value} {lastNameProps.value}.</b></p>
      </>
    );
  }
  ```
  **Custom Hooks let you share stateful logic but not state itself. Each call to a Hook is completely independent from every other call to the same Hook.**

- [Copying objects with spread syntax](https://react.dev/learn/updating-objects-in-state#copying-objects-with-the-spread-syntax) | React Docs

  we can pass the props to the element using the spread syntax
  ```js
  <Greeting firstName='Arto' lastName='Hellas' />
  
  const person = {
    firstName: 'Arto',
    lastName: 'Hellas'
  }
  
  <Greeting {...person} />
  ```
- Passing some attributes only

  ```js
  import { useState } from 'react'

  export const useField = (type) => {
    const [value, setValue] = useState('')
  
    const onChange = (event) => {
      setValue(event.target.value)
    }
  
    const reset = () => setValue('')
  
    const getFieldProps = () => ({
      type,
      value,
      onChange
    })
  
    return {
      getFieldProps,
      reset
    }
  }
  ```
  using the props
  ```jsx
  const ayhaga = useField('text')
  return (
    <>
      <input {...ayhaga.getFieldProps()} />
      <button onSubmit={ayhaga.reset()} >reset</button>
    </>
  )

### c More about styles

- [Bootstrap](https://getbootstrap.com/) | Bootstrap Docs

  - [link stylesheet](https://react-bootstrap.github.io/docs/getting-started/introduction/#stylesheets) | React Bootstrap Docs
  - [Containers](https://getbootstrap.com/docs/4.1/layout/overview/#containers) | Bootstrap v4 Docs

    required when using the default grid system.

    `.container-fluid` for a full width container, spanning the entire width of the viewport.
  - [Forms](https://react-bootstrap.github.io/docs/forms/overview/) | React Bootstrap Docs

    ```js
    import Button from 'react-bootstrap/Button';
    import Form from 'react-bootstrap/Form';
    
    function BasicExample() {
      return (
        <Form>
          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>Email address</Form.Label>
            <Form.Control type="email" placeholder="Enter email" />
            <Form.Text className="text-muted">
              We'll never share your email with anyone else.
            </Form.Text>
          </Form.Group>
    
          <Form.Group className="mb-3" controlId="formBasicPassword">
            <Form.Label>Password</Form.Label>
            <Form.Control type="password" placeholder="Password" />
          </Form.Group>
          <Form.Group className="mb-3" controlId="formBasicCheckbox">
            <Form.Check type="checkbox" label="Check me out" />
          </Form.Group>
          <Button variant="primary" type="submit">
            Submit
          </Button>
        </Form>
      );
    }
    
    export default BasicExample;
    ```
- [MaterialUI](https://mui.com/) | MUI Docs

  implements the [Material Design](https://material.io/) visual language developed by Google
