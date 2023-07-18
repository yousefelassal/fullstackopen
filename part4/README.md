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
- [cli](https://jestjs.io/docs/cli) | Jest Docs

  **-t**
  Run tests that match this spec name (match against the name in describe or test).
  ```
  jest -t name-of-spec
  ```
### b Testing the backend
- [afterAll](https://jestjs.io/docs/api#afterallfn-timeout) | Jest Docs

  ```js
  afterAll(async () => {
    await mongoose.connection.close()
  })
  ```
  closes the connection to the database after the tests are finished executing
- [cli](https://jestjs.io/docs/cli) | Jest Docs

  The following command only runs the tests found in the tests/note_api.test.js file:
  ```
  npm test -- tests/note_api.test.js
  ```
- [Promises Chaining](https://javascript.info/promise-chaining) | Javascript.info

  If a `.then` (or `catch/finally`, doesn’t matter) handler returns a promise, the rest of the chain waits until it settles. When it does, its result (or error) is passed further.
  
  <img width="550" alt="promises" src="https://github.com/yousefelassal/fullstackopen/assets/76617202/cb72924d-8140-4901-9c45-01fee10ddbad">

### c User administration

The _whateverData_ collection contains a user field that references a user in the users collection:
```js
[
  {
    content: 'HTML is easy',
    important: false,
    _id: 221212,
    user: 123456,
  },
  {
    content: 'The most important operations of HTTP protocol are GET and POST',
    important: true,
    _id: 221255,
    user: 123456,
  },
]
```
Document databases do not demand the foreign key to be stored in the _whateverData_ resources, it could also be stored in the users collection, or even both:

```js
[
  {
    username: 'mluukkai',
    _id: 123456,
    whateverData: [221212, 221255],
  },
  {
    username: 'sha3ban',
    _id: 141414,
    whateverData: [221244],
  },
]
```
In stark contrast to the conventions of relational databases, _references are now stored in both documents_: the _whateverData_ references the user who created it, and the user has an array of references to all of the _whateverData_ created by them.

- User Schema

  The ids of the data are stored within the user document as an array of Mongo ids. The definition is as follows:
  ```js
  const userSchema = new mongoose.Schema({
    // ...
    data: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'elReference'
      }
    ],
  })
  ```
- [How To Safely Store A Password](https://codahale.com/how-to-safely-store-a-password/)

  Use **bycrypt** [saltRounds](https://github.com/kelektiv/node.bcrypt.js/#a-note-on-rounds)
  ```js
  const bcrypt = require('bcrypt')
  const usersRouter = require('express').Router()
  const User = require('../models/user')
  
  usersRouter.post('/', async (request, response) => {
    const { username, name, password } = request.body
  
    const saltRounds = 10
    const passwordHash = await bcrypt.hash(password, saltRounds)
  
    const user = new User({
      username,
      name,
      passwordHash,
    })
  
    const savedUser = await user.save()
  
    response.status(201).json(savedUser)
  })
  
  module.exports = usersRouter
  ```
- [populate](https://mongoosejs.com/docs/populate.html) | Mongoose Docs

  lets you reference documents in other collections
  ```js
  .find({}).populate('notes', { content: 1, important: 1 })
  ```

  - [Return specified fileds](https://www.mongodb.com/docs/manual/tutorial/project-fields-from-query-results/#return-the-specified-fields-and-the-id-field-only) | MongoDB Docs

### d Token authentication

![16new](https://github.com/yousefelassal/fullstackopen/assets/76617202/527070fc-bf00-4eab-ba99-e9bc3ce8ae18)

- [How Token-Based Works](https://www.digitalocean.com/community/tutorials/the-ins-and-outs-of-token-based-authentication#how-token-based-works) | DigitalOcean

  1. User Requests Access with Username / Password
  2. Application validates credentials
  3. Application provides a signed token to the client
  4. Client stores that token and sends it along with every request
  5. Server verifies token and responds with data

- bycrypt.compare

  the `bcrypt.compare` method is used to check if the password is correct:
  ```js
  await bcrypt.compare(body.password, user.passwordHash)copy
  ```
  If the user is not found, or the password is incorrect, the request is responded to with the status code [401 unauthorized](https://www.rfc-editor.org/rfc/rfc9110.html#name-401-unauthorized).

- jwt.sign
  
  If the password is correct, a token is created with the method `jwt.sign`. The token contains the username and the user id in a digitally signed form.
  ```js
  const userForToken = {
    username: user.username,
    id: user._id,
  }
  
  const token = jwt.sign(userForToken, process.env.SECRET)
  ```
- jwt.verify

  The validity of the token is checked with `jwt.verify`. The method also decodes the token, or returns the Object which the token was based on.
  ```js
  const decodedToken = jwt.verify(token, process.env.SECRET)
  ```
