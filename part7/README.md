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

  - [Container](https://mui.com/material-ui/react-container/) | MUI Docs

    The container centers your content horizontally. It's the most basic layout element.

  - [AppBar](https://mui.com/material-ui/react-app-bar/) | MUI Docs

    ```js
    <AppBar position="static">
      <Toolbar>
        <IconButton edge="start" color="inherit" aria-label="menu">
        </IconButton>
        <Button color="inherit">
          <Link to="/">home</Link>
        </Button>
        // ...               
      </Toolbar>
    </AppBar>
    ```

  - [Component prop](https://mui.com/material-ui/guides/composition/#component-prop) | MUI Docs

    Material UI allows you to change the root element that will be rendered via a prop called `component`.

    ```js
    <Button color="inherit" component={Link} to="/">
      home
    </Button>
    ```
    the `Button` component is rendered so that its root component is react-router-dom's `Link` which receives its path as the prop field `to`.

- UI Frameworks
  - https://mantine.dev/
  - https://www.radix-ui.com/
  - https://react-spectrum.adobe.com/react-aria/index.html
  - https://master.co/
  - https://www.radix-ui.com/
  - https://nextui.org/
  - https://daisyui.com/
  - https://ui.shadcn.com/
  - https://www.tremor.so/
  - https://headlessui.com/

- [styled-components](https://styled-components.com/) | styled-components docs

  utilises tagged template literals to style your components.

  Basic Example
  ```js
  // Create a Title component that'll render an <h1> tag with some styles
  const Title = styled.h1`
    font-size: 1.5em;
    text-align: center;
    color: #BF4F74;
  `;
  
  // Create a Wrapper component that'll render a <section> tag with some styles
  const Wrapper = styled.section`
    padding: 4em;
    background: papayawhip;
  `;
  
  // Use Title and Wrapper like any other React component – except they're styled!
  render(
    <Wrapper>
      <Title>
        Hello World!
      </Title>
    </Wrapper>
  );
  ```

  Adapting based on props
  ```js
  const Button = styled.button<{ $primary?: boolean; }>`
    /* Adapt the colors based on primary prop */
    background: ${props => props.$primary ? "#BF4F74" : "white"};
    color: ${props => props.$primary ? "white" : "#BF4F74"};
  
    font-size: 1em;
    margin: 1em;
    padding: 0.25em 1em;
    border: 2px solid #BF4F74;
    border-radius: 3px;
  `;
  
  render(
    <div>
      <Button>Normal</Button>
      <Button $primary>Primary</Button>
    </div>
  );
  ```
### d Webpack

- [entry](https://webpack.js.org/concepts/#entry) | Webpack Docs

  indicates which module webpack should use to begin building out its internal dependency graph. Webpack will figure out which other modules and libraries that entry point depends on (directly and indirectly).

  ```js
  module.exports = {
    entry: './path/to/my/entry/file.js',
  };
  ```
- [output](https://webpack.js.org/concepts/#output) | Webpack Docs

  tells webpack where to emit the _bundles_ it creates and how to name these files. It defaults to `./dist/main.js` for the main output file and to the `./dist` folder for any other generated file.

  ```js
  const path = require('path');

  module.exports = {
    entry: './path/to/my/entry/file.js',
    output: {
      path: path.resolve(__dirname, 'dist'),
      filename: 'my-first-webpack.bundle.js',
    },
  };
  ```
- [Loaders](https://webpack.js.org/concepts/loaders/) | Webpack Docs

  transformations that are applied to the source code of a module. They allow you to pre-process files as you `import` or “load” them.

  ```js
  module.exports = {
    // ...
    module: {
      rules: [
        {
          test: /\.js$/,
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env', '@babel/preset-react'],
          },
        },
      ],
    },
  }
  ```
  The _test_ property specifies that the loader is for files that have names ending with .js. The _loader_ property specifies that the processing for those files will be done with [babel-loader](https://github.com/babel/babel-loader). The _options_ property is used for specifying parameters for the loader, which configure its functionality.


  - [css-loader](https://webpack.js.org/loaders/css-loader/) | Webpack Docs

    ```js
    module.exports = {
      module: {
        rules: [
          {
            test: /\.css$/i,
            use: ["style-loader", "css-loader"],
          },
        ],
      },
    };
    ```
- [webpack-dev-server](https://webpack.js.org/guides/development/#using-webpack-dev-server) | Webpack Docs

  provides you with a rudimentary web server and the ability to use live reloading.

  ```js
  module.exports = {
    // ...
    devServer: {
      static: path.resolve(__dirname, 'build'),
      compress: true,
      port: 3000,
    },
  }
  ```
- [Devtool](https://webpack.js.org/configuration/devtool/) | Webpack Docs

  This option controls if and how source maps are generated.

  ```js
  const config = {
    entry: './src/index.js',
    output: {
      // ...
    },
    devServer: {
      // ...
    },
  
    devtool: 'source-map',
    // ..
  };
  ```

- [DefinePlugin](https://webpack.js.org/plugins/define-plugin/) | Webpack Docs

  replaces variables in your code with other values or expressions at `compile` time. This can be useful for allowing different behavior between development builds and production builds.

  ```js
  const path = require('path')
  const webpack = require('webpack')
  
  const config = (env, argv) => {
  
    const backend_url = argv.mode === 'production'
      ? 'https://production.link/api/notes'
      : 'http://localhost:3001/notes'
  
    return {
      entry: './src/index.js',
      output: {
       // ...
      },
      module: {
        // ...
      },
      plugins: [
        new webpack.DefinePlugin({
          BACKEND_URL: JSON.stringify(backend_url)
        })
      ]
    }
  }
  
  module.exports = config
  ```

  We can inspect the bundled production version of the application locally by executing the following command in the build directory:
  ```
  npx static-server
  ```
- [HTML5 Cross Browser Polyfills](https://github.com/Modernizr/Modernizr/wiki/HTML5-Cross-browser-Polyfills) | Modernizr Wiki GitHub

### e Class components, Miscellaneous

- [`constructor(props)`](https://react.dev/reference/react/Component#constructor) | React Docs

  The [constructor](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Classes/constructor) runs before your class component mounts (gets added to the screen). Typically, a constructor is only used for two purposes in React. It lets you declare state and [bind](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_objects/Function/bind) your class methods to the class instance:
  ```js
  class Counter extends Component {
    constructor(props) {
      super(props);
      this.state = { counter: 0 };
      this.handleClick = this.handleClick.bind(this);
    }
  
    handleClick() {
      // ...
    }
  ```
- [`render()`](https://react.dev/reference/react/Component#render) | React Docs

  specify what you want to appear on the screen, for example:
  ```js
  import { Component } from 'react';
  
  class Greeting extends Component {
    render() {
      return <h1>Hello, {this.props.name}!</h1>;
    }
  }
  ```
- [Adding lifecycle methods to a class component](https://react.dev/reference/react/Component#adding-lifecycle-methods-to-a-class-component) | React Docs
  
  There are a few special methods you can define on your class.
  
  If you define the [`componentDidMount`](https://react.dev/reference/react/Component#componentdidmount) method, React will call it when your component is added (mounted) to the screen. React will call [`componentDidUpdate`](https://react.dev/reference/react/Component#componentdidupdate) after your component re-renders due to changed props or state. React will call [`componentWillUnmount`](https://react.dev/reference/react/Component#componentwillunmount) after your component has been removed (unmounted) from the screen.

  ```js
  class App extends React.Component {
    constructor(props) {
      super(props)
      this.state = {
        data: []
      }
    }

    componentDidMount = () => {
      axios.get('http://server.link/api').then(response => {
        this.setState({ data: response.data })
      })
    }
  
    // ...
  }
  ```
- [`setState(nextState, callback?)`](https://react.dev/reference/react/Component#setstate) | React Docs

  update the state of your React component.
  ```js
  class Form extends Component {
    state = {
      name: 'Taylor',
    };
  
    handleNameChange = (e) => {
      const newName = e.target.value;
      this.setState({
        name: newName
      });
    }
  
    // ...
  }
  ```

  You can also pass a function to `setState`. It lets you update state based on the previous state:
  ```js
  handleIncreaseAge = () => {
    this.setState(prevState => {
      return {
        age: prevState.age + 1
      };
    });
  }
  ```
- [WebSocket API](https://developer.mozilla.org/en-US/docs/Web/API/WebSockets_API) | MDN Docs

  - [Writing a WebSocket server in JavaScript (Deno)](https://developer.mozilla.org/en-US/docs/Web/API/WebSockets_API/Writing_a_WebSocket_server_in_JavaScript_Deno) | MDN Docs
  - [Getting started with Socket.IO](https://socket.io/docs/v4/tutorial/introduction) | Socket.io Docs

- Security

  - [Cyber Security Base](https://cybersecuritybase.mooc.fi/) | University of Helsinki Course
  - [The Open Web Application Security Project](https://www.owasp.org/) | OWASP
  - SQL Injection

    Using parameterized queries user input isn't mixed with the SQL query, but the database itself inserts the input values at placeholders in the query (usually `?`).
    ```sql
    execute("SELECT * FROM Users WHERE name = ?", [userName])
    ```
    Injection attacks are also possible in NoSQL databases. However, mongoose prevents them by [sanitizing](https://zanon.io/posts/nosql-injection-in-mongodb) the queries.
  - Cross-site scripting (XSS)

    an attack where it is possible to inject malicious JavaScript code into a legitimate web application.
  - Update libraries if there are security updates

    You can check how up-to-date your dependencies are using the command
      ```
      npm outdated --depth 0
      ```
    The dependencies can be brought up to date by updating the file `package.json`. The best way to do that is by using a tool called `npm-check-updates`. It can be installed globally by running the command
      ```
      npm install -g npm-check-updates
      ```
  - [Website Security Guide](https://developer.mozilla.org/en-US/docs/Learn/Server-side/First_steps/Website_security) | MDN Docs

    > The single most important lesson you can learn about website security is to **never trust data from the browser**. This includes, but is not limited to data in URL parameters of `GET` requests, `POST` requests, HTTP headers and cookies, and user-uploaded files. Always check and sanitize all incoming data. Always assume the worst.
  - [Securiry Best Practices](https://expressjs.com/en/advanced/best-practice-security.html) | Express Docs

      - Use [Helmet](https://helmetjs.github.io/) | Helmet.js Docs

        Helmet is a collection of several smaller middleware functions that set security-related HTTP response headers.
        ```js
        // ...

        const helmet = require('helmet')
        app.use(helmet())
        
        // ...
        ```
- Trends

  - [Progressive Web Apps](https://web.dev/explore/progressive-web-apps) | Google
  - [Microservice architecture](https://martinfowler.com/articles/microservices.html) | Article by Martin Fowler

    ![h1uop35t](https://github.com/yousefelassal/fullstackopen/assets/76617202/01330363-49f2-4658-89bc-00806b100b59)

    
