# Resources

### a Node.js and Express
- [Understanding the npm dependency model](https://lexi-lambda.github.io/blog/2016/08/24/understanding-the-npm-dependency-model/)
- [Richardson (RESTful) Maturity Model](https://martinfowler.com/articles/richardsonMaturityModel.html)
- [req](https://expressjs.com/en/4x/api.html#req) | Express Docs

  contains all of the information of the HTTP request
- [res](https://expressjs.com/en/4x/api.html#res) | Express Docs

  used to define how the request is responded to
  - [res.send](https://expressjs.com/en/4x/api.html#res.send) | Express Docs

    ```js
    res.send({ some: 'json' })
    res.send('<p>some html</p>')
    res.status(404).send('Sorry, we cannot find that!')
    res.status(500).send({ error: 'something blew up' })
    ```
    it automatically assigns the Content-Length HTTP response header field
  - [res.status](https://expressjs.com/en/4x/api.html#res.status) | Express Docs
 
    ```js
    res.status(403).end()
    res.status(400).send('Bad Request')
    res.status(404).sendFile('/absolute/path/to/404.png')
    ```

    - [Overriding status message](https://stackoverflow.com/questions/14154337/how-to-send-a-custom-http-status-message-in-node-express/36507614#36507614) | Stackoverflow

      ```js
      res.statusMessage = "ay haga"
      
      res.status(404).end()
      ```

      <img width="550" alt="statusMessage" src="https://github.com/yousefelassal/fullstackopen/assets/76617202/014543b2-8208-4eb5-b023-1e40ccd6fb8f">

      
    
- [routing](https://expressjs.com/en/guide/routing.html) | Express Docs

  for fetching a single resource
  - [route parameters](https://expressjs.com/en/guide/routing.html#route-parameters) | Express Docs

    ```
    Route path: /users/:userId/books/:bookId
    Request URL: http://localhost:3000/users/34/books/8989
    req.params: { "userId": "34", "bookId": "8989" }
    ```
    
    ```js
    app.get('/users/:userId/books/:bookId', (req, res) => {
      res.send(req.params)
    })
    ```
- [Spread syntax (...)](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Spread_syntax) | MDN Docs

  ```js
  const numbers = [1, 2, 3];

  console.log(sum(...numbers));
  // Expected output: 6
  ```
  The array is transformed into individual numbers by using the "three dot" _spread syntax_ as `numbers` is an array so it can't directly be given as a parameter to sum.

### b Deploying app to internet
- [Same-origin policy](https://developer.mozilla.org/en-US/docs/Web/Security/Same-origin_policy) | MDN Docs
- [CORS](https://developer.mozilla.org/en-US/docs/Web/HTTP/CORS) | MDN Docs
- [Launch app](https://fly.io/docs/hands-on/launch-app/) | Fly.io Docs

  Initialize app
  ```
  fly launch
  ```
  updating _fly.toml_ configs
  ```
  [env]
  PORT = "8080" # add this
  
  [experimental]
    auto_rollback = true
  
  [[services]]
    http_checks = []
    internal_port = 8080 
    processes = ["app"]
  ```

  use the port defined in the environment variable `PORT` or port 3001 if the environment variable `PORT` is undefined. 
  ```js
  const PORT = process.env.PORT || 3001
  ```
  Deploy app
  ```
  fly deploy
  ```
- [static](https://expressjs.com/en/starter/static-files.html) | Express Docs

  To serve static files from the production build (`npm run build`)
  ```js
  app.use(express.static('build'))
  ```
- Fly.io scrpit

  use bash
  ```
  {
    "scripts": {
      // ...
      "build:ui": "rm -rf build && cd ../dev/ && npm run build && cp -r build ../prod",
      "deploy": "fly deploy",
      "deploy:full": "npm run build:ui && npm run deploy",    
      "logs:prod": "fly logs"
    }
  }
  ```
- [proxy](https://create-react-app.dev/docs/proxying-api-requests-in-development/) | Create React App Docs
  
  ```
  {
    "dependencies": {
      // ...
    },
    "scripts": {
      // ...
    },
  
    "proxy": "http://localhost:3001"
  }
  ```
### c Saving data to MongoDB
MongoDB stores data records as [documents](https://www.mongodb.com/docs/manual/core/document/) which are gathered together in [collections](https://www.mongodb.com/docs/manual/core/databases-and-collections/#collections).
![crud-annotated-collection bakedsvg](https://github.com/yousefelassal/fullstackopen/assets/76617202/32c2dca0-5828-4075-91c8-bf03da911f65)

- [Schema](https://mongoosejs.com/docs/guide.html) | Mongoose Docs

  Schema tells Mongoose how objects are to be stored in the database.
- [model](https://mongoosejs.com/docs/models.html) | Mongoose Docs

  Models are fancy constructors compiled from `Schema` definitions. An instance of a model is called a document. Models are responsible for creating and reading documents from the underlying MongoDB database.
  ```js
  const schema = new mongoose.Schema({ name: String, size: String });
  const Tank = mongoose.model('Tank', schema);
  ```
  - [Model.find()](https://mongoosejs.com/docs/api/model.html#Model.find()) | Mongoose Docs

    The parameter of the method is an object expressing search conditions
    ```js
        // find all documents
    await MyModel.find({});
    
    // find all documents named john and at least 18
    await MyModel.find({ name: 'john', age: { $gte: 18 } }).exec();
    
    // executes, name LIKE john and only selecting the "name" and "friends" fields
    await MyModel.find({ name: /john/i }, 'name friends').exec();
    
    // passing options
    await MyModel.find({ name: /john/i }, null, { skip: 10 }).exec();
    ```
    The search conditions adhere to the Mongo search query [syntax](https://www.mongodb.com/docs/manual/reference/operator/query/).

    **Other methods:**
    - [Model.findById()](https://mongoosejs.com/docs/api/model.html#Model.findById())
    - [Model.findByIdAndRemove()](https://mongoosejs.com/docs/api/model.html#Model.findByIdAndRemove())
    - [Model.findByIdAndUpdate()](https://mongoosejs.com/docs/api/model.html#Model.findByIdAndUpdate())
- [process.argv](https://nodejs.org/docs/latest-v8.x/api/process.html#process_process_argv) | Node.js Docs

   returns an array containing the command line arguments passed when the Node.js process was launched.
  ```
  node mongo.js <password>
  ```
  `<Array>` will have `mongo.js` in index [1]
- [transform](https://mongoosejs.com/docs/api/document.html#transform) | Mongoose Docs
  
  ```js
  noteSchema.set('toJSON', {
    transform: (document, returnedObject) => {
      returnedObject.id = returnedObject._id.toString()
      delete returnedObject._id
      delete returnedObject.__v
    }
  })
  ```
  The toJSON method transforms the __id_ object to a string
- Set env values to fly.io
  
  prevent .env from being copied to fly.io by creating `.dockerignore` in the root, then set the env value from the command line with the command:
  ```
  fly secrets set ay_haga='ay haga`
  ```
- [Status Code Definitions](https://www.w3.org/Protocols/rfc2616/rfc2616-sec10.html) | W3.org

  - **400 Bad Request**

    _The request could not be understood by the server due to malformed syntax. The client SHOULD NOT repeat the request without modifications._

  - **204 No Content**

    _The server has fulfilled the request but does not need to return an entity-body._

### d Validation and ESLint
- [validation](https://mongoosejs.com/docs/validation.html) | Mongoose Docs

  ```js
  const breakfastSchema = new Schema({
    eggs: {
      type: Number,
      min: [6, 'Must be at least 6, got {VALUE}'],
      max: 12
    },
    drink: {
      type: String,
      required: true,
      enum: {
        values: ['Coffee', 'Tea'],
        message: '{VALUE} is not supported'
      }
    }
  });
  ```
  The _min_ and _required_ validators are [built-in](https://mongoosejs.com/docs/validation.html#built-in-validators) and provided by Mongoose. The Mongoose [custom validator](https://mongoosejs.com/docs/validation.html#custom-validators) functionality allows us to create new validators if none of the built-in ones cover our needs.
