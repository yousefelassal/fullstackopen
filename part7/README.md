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
