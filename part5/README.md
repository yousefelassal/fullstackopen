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
