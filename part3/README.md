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
