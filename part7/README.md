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
