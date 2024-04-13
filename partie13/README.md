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
