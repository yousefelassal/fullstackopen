# Resources

### a Structure of backend application, introduction to testing
- Project structure [best](https://dev.to/nermineslimane/always-separate-app-and-server-files--1nc7) [practices](https://nodejsbestpractices.com/sections/projectstructre/separateexpress/)

  ```
  ├── index.js
  ├── app.js
  ├── build
  │   └── ...
  ├── controllers
  │   └── notes.js
  ├── models
  │   └── note.js
  ├── package-lock.json
  ├── package.json
  ├── utils
  │   ├── config.js
  │   ├── logger.js
  │   └── middleware.js
  ```
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
- [Expect](https://jestjs.io/docs/expect#expectvalue) | Jest Docs

  ```js
  test('the best flavor is grapefruit', () => {
    expect(bestLaCroixFlavor()).toBe('grapefruit');
  });
  ```
  The first parameter of the function is the test description as a string. The second parameter is a function, that defines the functionality for the test case.
  - [.toBe()](https://jestjs.io/docs/expect#tobevalue) | Jest Docs
    
- [test.only()](https://jestjs.io/docs/api#testonlyname-fn-timeout) | Jest Docs

  When you are debugging a large test file, you will often only want to run a subset of tests. You can use .only to specify which tests are the only ones you want to run in that test file.
  
  ```js
  test.only('it is raining', () => {
    expect(inchesOfRain()).toBeGreaterThan(0);
  });
  
  test('it is not snowing', () => {
    expect(inchesOfSnow()).toBe(0);
  });
  ```
  Only the "it is raining" test will run in that test file, since it is run with `test.only`.
