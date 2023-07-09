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
