### a Using relational databases with Sequelize

- [psql](https://www.postgresql.org/docs/current/app-psql.html)

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
