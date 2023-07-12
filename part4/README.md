# Resources

### a Structure of backend application, introduction to testing
- Project structure [best](https://dev.to/nermineslimane/always-separate-app-and-server-files--1nc7) [practices](https://nodejsbestpractices.com/sections/projectstructre/separateexpress/)
- [Router](https://expressjs.com/en/api.html#router) | Express Docs

  ```js
  // will handle any request that ends in /events
  // depends on where the router is "use()'d"
  router.get('/events', function (req, res, next) {
    // ..
  })
  ```
