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
  
