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
