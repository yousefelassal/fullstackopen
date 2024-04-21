### a Using relational databases with Sequelize

- [psql](https://www.postgresql.org/docs/current/app-psql.html) | Postgres Docs

  `\d` tells the content of the databases
  ```bash
  postgres=# \d notes;
                                   Table "public.notes"                                          
   Column    |          Type          | Collation | Nullable |             Default               
  -----------+------------------------+-----------+----------+-----------------------------------
   id        | integer                |           | not null | nextval('notes_id_seq'::regclass) 
   content   | text                   |           | not null |                                   
   important | boolean                |           |          |                                   
   date      | time without time zone |           |          |                                   
  Indexes:
      "notes_pkey" PRIMARY KEY, btree (id)
  ```

  ```bash
  postgres=# select * from notes;
   id |               content               | important | date
  ----+-------------------------------------+-----------+------
    1 | relational databases rule the world | t         |      
    2 | MongoDB is webscale                 | f         |      
  (2 rows)
  ```

- [Sequelize](https://sequelize.org/docs/v6/) | Sequelize Docs

  #### [Model](https://sequelize.org/docs/v6/core-concepts/model-basics/)
  an abstraction that represents a table in your database. In Sequelize, it is a class that extends `Model`.

  ```js
  const { Sequelize, DataTypes, Model } = require('sequelize');
  const sequelize = new Sequelize('sqlite::memory:');
  
  class User extends Model {}
  
  User.init(
    {
      // Model attributes are defined here
      firstName: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      lastName: {
        type: DataTypes.STRING,
        // allowNull defaults to true
      },
    },
    {
      // Other model options go here
      sequelize, // We need to pass the connection instance
      underscore: true, // table names are derived from model names as plural snake_case versions
      modelName: 'User', // We need to choose the model name
    },
  );
  ```

  ##### [Naming policy](https://sequelize.org/docs/v6/other-topics/naming-strategies/#the-underscored-option)
  Sequelize provides the underscored option for a model. When true, this option will set the field option on all attributes to the snake_case version of its name.
  ```js
  Note.init({
    // ...
    creationYear: {
      type: DataTypes.INTEGER,
    },
  })
  ```
  The name of the corresponding column in the database would be _creation_year_. In code, reference to the column is always in the same format as in the model, i.e. in "camel case" format.

  #### [Model Querying](https://sequelize.org/docs/v6/core-concepts/model-querying-basics/)

  ##### Simple INSERT queries
  ```js
  // Create a new user
  const jane = await User.create({ firstName: 'Jane', lastName: 'Doe' });
  ```
  
  The `Model.create()` method is a shorthand for building an unsaved instance with `Model.build()` and saving the instance with `instance.save()`.

  it is also possible to save to a database using the _build_ method first to create a Model-object from the desired data, and then calling the _save_ method on it:
  ```js
  const note = Note.build(req.body)
  await note.save()copy
  ```
  Calling the _build_ method does not save the object in the database yet, so it is still possible to edit the object before the actual save event:
  ```js
  const note = Note.build(req.body)
  note.important = true
  await note.save()
  ```
  
  ##### Simple SELECT queries
  ```js
  const users = await User.findAll();
  ```
  ```sql
  SELECT * FROM ...
  ```
  
  ###### Specifying attributes for SELECT queries
  To select only some attributes, you can use the attributes option:
  ```js
  Model.findAll({
    attributes: ['foo', 'bar'],
  });
  ```
  ```sql
  SELECT foo, bar FROM ...
  ```
  
  ###### You can use sequelize.fn to do aggregations:
  ```sql
  Model.findAll({
    attributes: ['foo', [sequelize.fn('COUNT', sequelize.col('hats')), 'n_hats'], 'bar'],
  });
  ```
  ```sql
  SELECT foo, COUNT(hats) AS n_hats, bar FROM ...
  ```

  ###### remove a selected few attributes:
  ```js
  Model.findAll({
    attributes: { exclude: ['baz'] },
  });
  ```
  ```sql
  -- Assuming all columns are 'id', 'foo', 'bar', 'baz' and 'qux'
  SELECT id, foo, bar, qux FROM ...
  ```
  #### Applying WHERE clauses
  ```js
  Post.findAll({
    where: {
      authorId: 2,
    },
  });
  ```
  ```sql
  SELECT * FROM post WHERE authorId = 2;
  ```
  
  Multiple checks can be passed:
  ```js
  Post.findAll({
    where: {
      authorId: 12,
      status: 'active',
    },
  });
  ```
  ```sql
  SELECT * FROM post WHERE authorId = 12 AND status = 'active';
  ```

  #### Simple UPDATE queries
  ```js
  // Change everyone without a last name to "Doe"
  await User.update(
    { lastName: 'Doe' },
    {
      where: {
        lastName: null,
      },
    },
  );
  ```
  
  #### Simple DELETE queries
  ```js
  // Delete everyone named "Jane"
  await User.destroy({
    where: {
      firstName: 'Jane',
    },
  });
  ```

  #### [Model synchronization](https://sequelize.org/docs/v6/core-concepts/model-basics/#model-synchronization)

  - `User.sync()` - This creates the table if it doesn't exist (and does nothing if it already exists)
  - `User.sync({ force: true })` - This creates the table, dropping it first if it already existed
  - `User.sync({ alter: true })` - This checks what is the current state of the table in the database (which columns it has, what are their data types, etc), and then performs the necessary changes in the table to make it match the model.
  
  Example:
  ```js
  await User.sync({ force: true });
  console.log('The table for the User model was just (re)created!');
  ```
  
  ##### Synchronizing all models at once
  You can use `sequelize.sync()` to automatically synchronize all models. Example:
  ```js
  await sequelize.sync({ force: true });
  console.log('All models were synchronized successfully.');
  ```
  

- [Model Query]() | Sequelize Docs

  #### `findByPk`
  The `findByPk` method obtains only a single entry from the table, using the provided _primary key_.
  ```js
  const project = await Project.findByPk(123);
  if (project === null) {
    console.log('Not found!');
  } else {
    console.log(project instanceof Project); // true
    // Its primary key is 123
  }
  ```
  
  #### `findOne`
  The `findOne` method obtains the _first entry_ it finds (that fulfills the optional query options, if provided).
  ```js
  const project = await Project.findOne({ where: { title: 'My Title' } });
  if (project === null) {
    console.log('Not found!');
  } else {
    console.log(project instanceof Project); // true
    console.log(project.title); // 'My Title'
  }
  ```
  
  #### `findOrCreate`
  The method `findOrCreate` will create an entry in the table unless it can find one fulfilling the query options. In both cases, it will return an instance (either the found instance or the created instance) and a boolean indicating whether that instance was created or already existed.
  
  The `where` option is considered for finding the entry, and the `defaults` option is used to define what must be created in case nothing was found. If the defaults do not contain values for every column, Sequelize will take the values given to where (if present).
  
  Let's assume we have an empty database with a User model which has a username and a job.
  ```js
  const [user, created] = await User.findOrCreate({
    where: { username: 'sdepold' },
    defaults: {
      job: 'Technical Lead JavaScript',
    },
  });
  console.log(user.username); // 'sdepold'
  console.log(user.job); // This may or may not be 'Technical Lead JavaScript'
  console.log(created); // The boolean indicating whether this instance was just created
  if (created) {
    console.log(user.job); // This will certainly be 'Technical Lead JavaScript'
  }
  ```
  
  #### `findAndCountAll`
  The `findAndCountAll` method is a convenience method that combines `findAll` and `count`. This is useful when dealing with queries related to pagination where you want to retrieve data with a `limit` and `offset` but also need to know the total number of records that match the query.
  
    ```js
    const { count, rows } = await Project.findAndCountAll({
      where: {
        title: {
          [Op.like]: 'foo%',
        },
      },
      offset: 10,
      limit: 2,
    });
    console.log(count);
    console.log(rows);
    ```

### b Join tables and queries

##### Application structuring
```
index.js
util
  config.js
  db.js
models
  index.js
  note.js
controllers
  notes.js
```

- [One-To-Many Relationships](https://sequelize.org/docs/v6/core-concepts/assocs/#one-to-many-relationships) | Sequelize Docs

  each note is associated with the user who created it. a foreign key is needed in the notes table.
  ```js
  User.hasMany(Note)
  Note.belongsTo(User)
  Note.sync({ alter: true })
  User.sync({ alter: true })
  ```
  the `sync` option will match the changes made to the model definitions in the database.

- [`include`](https://sequelize.org/docs/v6/core-concepts/assocs/#eager-loading-example) | Sequelize Docs

  ```js
  const awesomeCaptain = await Captain.findOne({
    where: {
      name: 'Jack Sparrow',
    },
    include: Ship,
  });
  // Now the ship comes with it
  console.log('Name:', awesomeCaptain.name);
  console.log('Skill Level:', awesomeCaptain.skillLevel);
  console.log('Ship Name:', awesomeCaptain.ship.name);
  console.log('Amount of Sails:', awesomeCaptain.ship.amountOfSails);
  ```

#### Proper insertion of notes
  ```js  
  const tokenExtractor = (req, res, next) => {
    const authorization = req.get('authorization')
    if (authorization && authorization.toLowerCase().startsWith('bearer ')) {
      try {
        req.decodedToken = jwt.verify(authorization.substring(7), SECRET)
      } catch{
        return res.status(401).json({ error: 'token invalid' })
      }
    }  else {
      return res.status(401).json({ error: 'token missing' })
    }
    next()
  }
  
  router.post('/', tokenExtractor, async (req, res) => {
    try {
      const user = await User.findByPk(req.decodedToken.id)
      const note = await Note.create({...req.body, userId: user.id, date: new Date()})
      res.json(note)
    } catch(error) {
      return res.status(400).json({ error })
    }
  })
  ```
  The token is retrieved from the request headers, decoded and placed in the _req_ object by the _tokenExtractor_ middleware. When creating a note, a _date_ field is also given indicating the time it was created.

- [Validation](https://sequelize.org/docs/v6/core-concepts/validations-and-constraints/) | Sequelize Docs

  ```js
  sequelize.define('foo', {
    bar: {
      type: DataTypes.STRING,
      validate: {
        is: /^[a-z]+$/i,          // matches this RegExp
        is: ["^[a-z]+$",'i'],     // same as above, but constructing the RegExp from a string
        not: /^[a-z]+$/i,         // does not match this RegExp
        not: ["^[a-z]+$",'i'],    // same as above, but constructing the RegExp from a string
        isEmail: true,            // checks for email format (foo@bar.com)
        isUrl: true,              // checks for url format (https://foo.com)
        isIP: true,               // checks for IPv4 (129.89.23.1) or IPv6 format
        isIPv4: true,             // checks for IPv4 (129.89.23.1)
        isIPv6: true,             // checks for IPv6 format
        isAlpha: true,            // will only allow letters
        isAlphanumeric: true,     // will only allow alphanumeric characters, so "_abc" will fail
        isNumeric: true,          // will only allow numbers
        isInt: true,              // checks for valid integers
        isFloat: true,            // checks for valid floating point numbers
        isDecimal: true,          // checks for any numbers
        isLowercase: true,        // checks for lowercase
        isUppercase: true,        // checks for uppercase
        notNull: true,            // won't allow null
        isNull: true,             // only allows null
        notEmpty: true,           // don't allow empty strings
        equals: 'specific value', // only allow a specific value
        contains: 'foo',          // force specific substrings
        notIn: [['foo', 'bar']],  // check the value is not one of these
        isIn: [['foo', 'bar']],   // check the value is one of these
        notContains: 'bar',       // don't allow specific substrings
        len: [2,10],              // only allow values with length between 2 and 10
        isUUID: 4,                // only allow uuids
        isDate: true,             // only allow date strings
        isAfter: "2011-11-05",    // only allow date strings after a specific date
        isBefore: "2011-11-05",   // only allow date strings before a specific date
        max: 23,                  // only allow values <= 23
        min: 23,                  // only allow values >= 23
        isCreditCard: true,       // check for valid credit card numbers
  
        // Examples of custom validators:
        isEven(value) {
          if (parseInt(value) % 2 !== 0) {
            throw new Error('Only even values are allowed!');
          }
        }
        isGreaterThanOtherField(value) {
          if (parseInt(value) <= parseInt(this.otherField)) {
            throw new Error('Bar must be greater than otherField.');
          }
        }
      }
    }
  });
  ```

- [Operators](https://sequelize.org/docs/v6/core-concepts/model-querying-basics/#operators) | Sequelize Docs
  Sequelize provides several operators.
  ```js
  const { Op } = require("sequelize");
  Post.findAll({
    where: {
      [Op.and]: [{ a: 5 }, { b: 6 }],            // (a = 5) AND (b = 6)
      [Op.or]: [{ a: 5 }, { b: 6 }],             // (a = 5) OR (b = 6)
      someAttribute: {
        // Basics
        [Op.eq]: 3,                              // = 3
        [Op.ne]: 20,                             // != 20
        [Op.is]: null,                           // IS NULL
        [Op.not]: true,                          // IS NOT TRUE
        [Op.or]: [5, 6],                         // (someAttribute = 5) OR (someAttribute = 6)
  
        // Using dialect specific column identifiers (PG in the following example):
        [Op.col]: 'user.organization_id',        // = "user"."organization_id"
  
        // Number comparisons
        [Op.gt]: 6,                              // > 6
        [Op.gte]: 6,                             // >= 6
        [Op.lt]: 10,                             // < 10
        [Op.lte]: 10,                            // <= 10
        [Op.between]: [6, 10],                   // BETWEEN 6 AND 10
        [Op.notBetween]: [11, 15],               // NOT BETWEEN 11 AND 15
  
        // Other operators
  
        [Op.all]: sequelize.literal('SELECT 1'), // > ALL (SELECT 1)
  
        [Op.in]: [1, 2],                         // IN [1, 2]
        [Op.notIn]: [1, 2],                      // NOT IN [1, 2]
  
        [Op.like]: '%hat',                       // LIKE '%hat'
        [Op.notLike]: '%hat',                    // NOT LIKE '%hat'
        [Op.startsWith]: 'hat',                  // LIKE 'hat%'
        [Op.endsWith]: 'hat',                    // LIKE '%hat'
        [Op.substring]: 'hat',                   // LIKE '%hat%'
        [Op.iLike]: '%hat',                      // ILIKE '%hat' (case insensitive) (PG only)
        [Op.notILike]: '%hat',                   // NOT ILIKE '%hat'  (PG only)
        [Op.regexp]: '^[h|a|t]',                 // REGEXP/~ '^[h|a|t]' (MySQL/PG only)
        [Op.notRegexp]: '^[h|a|t]',              // NOT REGEXP/!~ '^[h|a|t]' (MySQL/PG only)
        [Op.iRegexp]: '^[h|a|t]',                // ~* '^[h|a|t]' (PG only)
        [Op.notIRegexp]: '^[h|a|t]',             // !~* '^[h|a|t]' (PG only)
  
        [Op.any]: [2, 3],                        // ANY (ARRAY[2, 3]::INTEGER[]) (PG only)
        [Op.match]: Sequelize.fn('to_tsquery', 'fat & rat') // match text search for strings 'fat' and 'rat' (PG only)
  
        // In Postgres, Op.like/Op.iLike/Op.notLike can be combined to Op.any:
        [Op.like]: { [Op.any]: ['cat', 'hat'] }  // LIKE ANY (ARRAY['cat', 'hat'])
  
        // There are more postgres-only range operators, see below
      }
    }
  });
  ```

- [Ordering](https://sequelize.org/docs/v6/core-concepts/model-querying-basics/#ordering) | Sequelize Docs

  takes an array of items to order the query by or a sequelize method. These items are themselves arrays in the form `[column, direction]`. The column will be escaped correctly and the direction will be checked in a whitelist of valid directions (such as `ASC`, `DESC`, `NULLS FIRST`, etc).
  
  ```js
  Subtask.findAll({
    order: [
      // Will escape title and validate DESC against a list of valid direction parameters
      ['title', 'DESC'],
  
      // Will order by max(age)
      sequelize.fn('max', sequelize.col('age')),
  
      // Will order by max(age) DESC
      [sequelize.fn('max', sequelize.col('age')), 'DESC'],
  
      // Will order by  otherfunction(`col1`, 12, 'lalala') DESC
      [sequelize.fn('otherfunction', sequelize.col('col1'), 12, 'lalala'), 'DESC'],
  
      // Will order an associated model's createdAt using the model name as the association's name.
      [Task, 'createdAt', 'DESC'],
  
      // Will order through an associated model's createdAt using the model names as the associations' names.
      [Task, Project, 'createdAt', 'DESC'],
  
      // Will order by an associated model's createdAt using the name of the association.
      ['Task', 'createdAt', 'DESC'],
  
      // Will order by a nested associated model's createdAt using the names of the associations.
      ['Task', 'Project', 'createdAt', 'DESC'],
  
      // Will order by an associated model's createdAt using an association object. (preferred method)
      [Subtask.associations.Task, 'createdAt', 'DESC'],
  
      // Will order by a nested associated model's createdAt using association objects. (preferred method)
      [Subtask.associations.Task, Task.associations.Project, 'createdAt', 'DESC'],
  
      // Will order by an associated model's createdAt using a simple association object.
      [{ model: Task, as: 'Task' }, 'createdAt', 'DESC'],
  
      // Will order by a nested associated model's createdAt simple association objects.
      [{ model: Task, as: 'Task' }, { model: Project, as: 'Project' }, 'createdAt', 'DESC'],
    ],
  
    // Will order by max age descending
    order: sequelize.literal('max(age) DESC'),
  
    // Will order by max age ascending assuming ascending is the default order when direction is omitted
    order: sequelize.fn('max', sequelize.col('age')),
  
    // Will order by age ascending assuming ascending is the default order when direction is omitted
    order: sequelize.col('age'),
  
    // Will order randomly based on the dialect (instead of fn('RAND') or fn('RANDOM'))
    order: sequelize.random(),
  });
  ```

- [Grouping](https://sequelize.org/docs/v6/core-concepts/model-querying-basics/#grouping) | Sequelize Docs

  The syntax for grouping and ordering are equal, except that grouping does not accept a direction as last argument of the array
  
  You can also pass a string directly to group, which will be included directly (verbatim) into the generated SQL. Use with caution and don't use with user generated content.
  ```js
  Project.findAll({ group: 'name' });
  // yields 'GROUP BY name'
  ```

  
- [query-parameter](https://expressjs.com/en/5x/api.html#req.query) | Express Docs

  querying database `WHERE` `req.query`
  ```js
  router.get('/', async (req, res) => {
    const where = {}
  
    if (req.query.important) {
      where.important = req.query.important === "true"
    }
  
    if (req.query.search) {
      where.content = {
        [Op.iLike]: `${req.query.search}%`
      }
    }
  
    const notes = await Note.findAll({
      attributes: { exclude: ['userId'] },
      include: {
        model: User,
        attributes: ['name']
      },
      where
    })
    res.json(notes)
  })
  ```
