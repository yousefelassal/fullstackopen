### a Login in frontend
- [Conditional Rendering](https://react.dev/learn/conditional-rendering#logical-and-operator-) | React Docs
  
  ```js
  {
    user === null && loginForm()
  }
  ```
  If the first statement evaluates to false or is [falsy](https://developer.mozilla.org/en-US/docs/Glossary/Falsy), the second statement (generating the form) is not executed at all.
- Tokenization
  
  ```js
  let token = null

  const setToken = newToken => {
    token = `Bearer ${newToken}`
  }
  
  const create = async newObject => {
    const config = {
      headers: { Authorization: token },
    }
  
    const response = await axios.post(baseUrl, newObject, config)
    return response.data
  }
  ```
  The module contains a private variable `token`. Its value can be changed with a function `setToken`, which is exported by the module. `create`, now with async/await syntax, sets the token to the _Authorization_ header. The header is given to axios as the third parameter of the _post_ method.
- [local storage](https://developer.mozilla.org/en-US/docs/Web/API/Storage) | MDN Docs
  
  Local Storage is a key-value database in the browser.

  Values in the local storage are persisted even when the page is re-rendered. The storage is [origin](https://developer.mozilla.org/en-US/docs/Glossary/Origin)-specific so each web application has its own storage.

   - [setItem](https://developer.mozilla.org/en-US/docs/Web/API/Storage/setItem) | MDN Docs
     
     A _value_ corresponding to a certain _key_ is saved to the database.
      ```js
      window.localStorage.setItem('name', 'juha tauriainen')
      ```
  
  - [getItem](https://developer.mozilla.org/en-US/docs/Web/API/Storage/getItem) | MDN Docs
    
    The value of a key can be found with this method.
    ```js
    window.localStorage.getItem('name')
    ```
   - [removeItem](https://developer.mozilla.org/en-US/docs/Web/API/Storage/removeItem) | MDN Docs
     
     removes a key.
     ```js
     window.localStorage.removeItem('name')
     ```
  Values saved to the storage are [DOMstrings](https://docs.w3cub.com/dom/domstring), so we cannot save a JavaScript object as it is. The object has to be parsed to JSON first, with the method `JSON.stringify`. Correspondingly, when a JSON object is read from the local storage, it has to be parsed back to JavaScript with `JSON.parse`.
  ```js
      window.localStorage.setItem(
        'loggedNoteappUser', JSON.stringify(user)
      )
  ```

  check if user details of a logged-in user can already be found on the local storage:
  ```js
  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedNoteappUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      noteService.setToken(user.token)
    }
  }, [])
  ```

### b props.children and proptypes
  - [props.children](https://react.dev/learn/passing-props-to-a-component#passing-jsx-as-children) | React Docs
    
    <img alt="i_children-prop" height="auto" width="650px" src="https://github.com/yousefelassal/fullstackopen/assets/76617202/fb629610-c73d-4d63-a9a5-d42cc10db654" />
    
  - [Sharing State](https://react.dev/learn/sharing-state-between-components) | React Docs

    > Sometimes, you want the state of two components to always change together. To do it, remove state from both of them, move it to their closest common parent, and then pass it down to them via props. This is known as lifting state up, and it’s one of the most common things you will do writing React code.

  - [ref](https://react.dev/learn/referencing-values-with-refs) | React Docs
  
    | **refs** ([useRef](https://react.dev/reference/react/useRef))	 | **state** |
    | ----- | ----- |
    | `useRef(initialValue)` returns `{ current: initialValue }` |	`useState(initialValue)` returns the current value of a state variable and a state setter function ( `[value, setValue]`) |
    | Doesn’t trigger re-render when you change it. |	Triggers re-render when you change it. |
    | Mutable—you can modify and update `current`’s value outside of the rendering process. |	“Immutable”—you must use the state setting function to modify state variables to queue a re-render. |
    | You shouldn’t read (or write) the `current` value during rendering. |	You can read state at any time. However, each render has its own snapshot of state which does not change. |

  - [forwardRef](https://react.dev/reference/react/forwardRef) | React Docs

    expose a DOM node to parent component with a ref.

    You will receive a ref as the second argument after props. Pass it to the DOM node that you want to expose:
      ```js
      const MyInput = forwardRef(function MyInput(props, ref) {
        // ...
        return <input {...props} ref={ref} />
      });
      ```
    This lets the parent Form component access the `<input> DOM node` exposed by `MyInput`:
      ```js
      function Form() {
        const ref = useRef(null);
      
        function handleClick() {
          ref.current.focus();
        }
      
        return (
          <form>
            <MyInput label="Enter your name:" ref={ref} />
            <button type="button" onClick={handleClick}>
              Edit
            </button>
          </form>
        );
      }
      ```
  - [useImperativeHandle](https://react.dev/reference/react/useImperativeHandle) | React Docs

    With the code above, a ref to `MyInput` will receive the `<input> DOM node`. However, you can expose a custom value instead. To customize the exposed handle, call `useImperativeHandle` at the top level of your component:
    
    ```js
    const MyInput = forwardRef(function MyInput(props, ref) {
      useImperativeHandle(ref, () => {
        return {
          // ... your methods ...
        };
      }, []);
    
      return <input {...props} />;
    });
    ```
    Note that in the code above, the `ref` is no longer forwarded to the `<input>`.

  - [Manipulating the DOM with Refs](https://react.dev/learn/manipulating-the-dom-with-refs) | React Docs

    Scrolling to an element
      ```js
      export default function Component(){
        ref = useRef(null)
  
        function handleScrolling(){
          ref.current.scrollIntoView({
            behavior: 'smooth',
            block: 'nearest',
            inline: 'center'
          })
        }
  
        return(
          <>
            <button onClick={handleScrolling}>Scroll To View</button>
            // ...
            <img ref={ref} src="..." alt="..." />
          </>
        )
      }
      ```
### d End to end testing

  - [Introduction to Cypress](https://docs.cypress.io/guides/core-concepts/introduction-to-cypress#Cypress-Can-Be-Simple-Sometimes) | Cypress Docs

    ```js
    describe('Note app', function() {
      beforeEach(function() {
        cy.visit('http://localhost:5173')
      })
    
      it('user can login', function () {
        cy.contains('login').click()
        cy.get('#username').type('admin')
        cy.get('#password').type('admin')
        cy.get('#login-button').click()
      })  
    })
    ```
    - [cy.visit](https://docs.cypress.io/api/commands/visit)
    - [cy.contains](https://docs.cypress.io/api/commands/contains)
    - [cy.click](https://docs.cypress.io/api/commands/click#Syntax)
    - [cy.get](https://docs.cypress.io/api/commands/get#Syntax)
    - [cy.type](https://docs.cypress.io/api/commands/type#Syntax)

    <br />

    ```js
    it('login fails with wrong password', function() {
      // ...
    
      cy.get('.error')
        .should('contain', 'wrong credentials')
        .and('have.css', 'color', 'rgb(255, 0, 0)')
        .and('have.css', 'border-style', 'solid')
    })
    ```
    - [Assertions](https://docs.cypress.io/guides/references/assertions#Common-Assertions)
    - [.and](https://docs.cypress.io/api/commands/and)

  - [Bypassing UI](https://docs.cypress.io/guides/end-to-end-testing/testing-your-app#Bypassing-your-UI) | Cypress Docs

    ```js
    describe('when logged in', function() {
      beforeEach(function() {
        cy.request('POST', 'http://localhost:3001/api/login', {
          username: 'admin', password: 'admin'
        }).then(response => {
          localStorage.setItem('loggedNoteappUser', JSON.stringify(response.body))
          cy.visit('http://localhost:5173')
        })
      })
    
      it('a new note can be created', function() {
        // ...
      })
    
      // ...
    })
    ```
    - [cy.request](https://docs.cypress.io/api/commands/request)

  - [Custom Commands](https://docs.cypress.io/api/cypress-api/custom-commands) | Cypress Docs

    Custom commands are declared in `cypress/support/commands.js`. The code for logging in is as follows:
    ```js
    Cypress.Commands.add('login', ({ username, password }) => {
      cy.request('POST', 'http://localhost:3001/api/login', {
        username, password
      }).then(({ body }) => {
        localStorage.setItem('loggedNoteappUser', JSON.stringify(body))
        cy.visit('http://localhost:5173')
      })
    })
    ```
    
    Using our custom command is easy, and our test becomes cleaner:
    ```js
    describe('when logged in', function() {
      beforeEach(function() {
        cy.login({ username: 'admin', password: 'admin' })
      })
    
      it('a new note can be created', function() {
        // ...
      })
    
      // ...
    })
    ```
