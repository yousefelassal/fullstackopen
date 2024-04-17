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
