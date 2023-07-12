# Resources

### a Structure of backend application, introduction to testing
- Project structure [best](https://dev.to/nermineslimane/always-separate-app-and-server-files--1nc7) [practices](https://nodejsbestpractices.com/sections/projectstructre/separateexpress/)
- [Router](https://expressjs.com/en/api.html#router) | Express Docs

  The router is a middleware, that can be used for defining "related routes" in a single place, which is typically placed in its own module.

  ```js
  // will handle any request that ends in /:id
  // depends on where the router is "use()'d"
  notesRouter.get('/:id', function (req, res, next) {
    // ..
  })
  ```
  The _app.js_ file that creates the actual application takes the router into use as shown below:

  ```js
  const notesRouter = require('./controllers/notes')
  app.use('/api/notes', notesRouter)
  ```
  The router we defined earlier is used _if_ the URL of the request starts with _/api/notes_. For this reason, the notesRouter object must only define the relative parts of the routes, i.e. the empty path _/_ or just the parameter _/:id_.
