## Queries with constraints

```sql
SELECT column, another_column, …
FROM mytable
WHERE condition
    AND/OR another_condition
    AND/OR …;
```

<table>
        <tbody><tr>
            <td style="width: 20%; text-align: center;">Operator</td>
            <td style="width: 50%">Condition</td>
            <td>SQL Example</td>
        </tr>
        <tr>
            <td style="text-align: center;">=, !=, &lt; &lt;=, &gt;, &gt;=</td>
            <td>Standard numerical operators</td>
            <td>col_name <span class="faux-keyword">!=</span> 4</td>
        </tr>
        <tr>
            <td style="text-align: center;">BETWEEN … AND …</td>
            <td>Number is within range of two values (inclusive)</td>
            <td>col_name <span class="faux-keyword">BETWEEN</span> 1.5 <span class="faux-keyword">AND</span> 10.5</td>
        </tr>
        <tr>
            <td style="text-align: center;">NOT BETWEEN … AND …</td>
            <td>Number is not within range of two values (inclusive)</td>
            <td>col_name <span class="faux-keyword">NOT BETWEEN</span> 1 <span class="faux-keyword">AND</span> 10</td>
        </tr>
        <tr>
            <td style="text-align: center;">IN (…)</td>
            <td>Number exists in a list</td>
            <td>col_name <span class="faux-keyword">IN</span> (2, 4, 6)</td>
        </tr>
        <tr>
            <td style="text-align: center;">NOT IN (…)</td>
            <td>Number does not exist in a list</td>
            <td>col_name <span class="faux-keyword">NOT IN</span> (1, 3, 5)</td>
        </tr>
    </tbody>
</table>

---

SQL supports a number of useful operators to do things like case-insensitive string comparison and wildcard pattern matching.

<table class="table table-striped table-condensed">
        <tbody><tr>
            <td style="width: 15%; text-align: center;">Operator</td>
            <td style="width: 60%">Condition</td>
            <td>Example</td>
        </tr>
        <tr>
            <td style="text-align: center;">=</td>
            <td>Case sensitive exact string comparison (<em>notice the single equals</em>)</td>
            <td>col_name <span class="faux-keyword">=</span> "abc"</td>
        </tr>
        <tr>
            <td style="text-align: center;">!= or &lt;&gt;</td>
            <td>Case sensitive exact string inequality comparison</td>
            <td>col_name <span class="faux-keyword">!=</span> "abcd"</td>
        </tr>
        <tr>
            <td style="text-align: center;">LIKE</td>
            <td>Case insensitive exact string comparison</td>
            <td>col_name <span class="faux-keyword">LIKE</span> "ABC"</td>
        </tr>
        <tr>
            <td style="text-align: center;">NOT LIKE</td>
            <td>Case insensitive exact string inequality comparison</td>
            <td>col_name <span class="faux-keyword">NOT LIKE</span> "ABCD"</td>
        </tr>
        <tr>
            <td style="text-align: center;">%</td>
            <td>Used anywhere in a string to match 
                a sequence of zero or more characters (only with LIKE or NOT LIKE)</td>
            <td>col_name <span class="faux-keyword">LIKE</span> "%AT%"<br>
                (matches "<span class="uline">AT</span>", "<span class="uline">AT</span>TIC", "C<span class="uline">AT</span>" 
                    or even "B<span class="uline">AT</span>S")</td>
        </tr>
        <tr>
            <td style="text-align: center;">_</td>
            <td>Used anywhere in a string to match 
                a single character (only with LIKE or NOT LIKE)</td>
            <td>col_name <span class="faux-keyword">LIKE</span> "AN_"<br>
                (matches "<span class="uline">AN</span>D", but not "<span class="uline">AN</span>")</td>
        </tr>
        <tr>
            <td style="text-align: center;">IN (…)</td>
            <td>String exists in a list</td>
            <td>col_name <span class="faux-keyword">IN</span> ("A", "B", "C")</td>
        </tr>
        <tr>
            <td style="text-align: center;">NOT IN (…)</td>
            <td>String does not exist in a list</td>
            <td>col_name <span class="faux-keyword">NOT IN</span> ("D", "E", "F")</td>
        </tr>
    </tbody>
</table>

## Filtering and sorting Query results

Select query with **unique** results
```sql
SELECT DISTINCT column, another_column, …
FROM mytable
WHERE condition(s);
```

---

Select query with **ordered** results
```sql
SELECT column, another_column, …
FROM mytable
WHERE condition(s)
ORDER BY column ASC/DESC;
```

---

Select query with **limited** rows
```sql
SELECT column, another_column, …
FROM mytable
WHERE condition(s)
ORDER BY column ASC/DESC
LIMIT num_limit OFFSET num_offset;
```

## Multi-table queries with JOINs

Select query with INNER JOIN on multiple tables
```sql
SELECT column, another_table_column, …
FROM mytable
INNER JOIN another_table 
    ON mytable.id = another_table.id
WHERE condition(s)
ORDER BY column, … ASC/DESC
LIMIT num_limit OFFSET num_offset;
```
The `INNER JOIN` is a process that matches rows from the first table and the second table which have the same key to create a result row with the combined columns from both tables.

---

Select query with LEFT/RIGHT/FULL JOINs on multiple tables
```sql
SELECT column, another_column, …
FROM mytable
INNER/LEFT/RIGHT/FULL JOIN another_table 
    ON mytable.id = another_table.matching_id
WHERE condition(s)
ORDER BY column, … ASC/DESC
LIMIT num_limit OFFSET num_offset;
```
- `LEFT JOIN` simply includes rows from A regardless of whether a matching row is found in B.
- `RIGHT JOIN` is the same, but reversed, keeping rows in B regardless of whether a match is found in A.
- `FULL JOIN` simply means that rows from both tables are kept, regardless of whether a matching row exists in the other table.

## Queries with expressions

expressions can use mathematical and string functions along with basic arithmetic to transform values when the query is executed, as shown in this physics example.

Example query with expressions
```sql
SELECT particle_speed / 2.0 AS half_particle_speed
FROM physics_data
WHERE ABS(particle_position) * 10.0 > 500;
```

---

In addition to expressions, regular columns and even tables can also have aliases to make them easier to reference in the output and as a part of simplifying more complex queries.

Example query with both column and table name aliases
```sql
SELECT column AS better_column_name, …
FROM a_long_widgets_table_name AS mywidgets
INNER JOIN widget_sales
  ON mywidgets.id = widget_sales.widget_id;
```

## Queries with aggregates

Select query with aggregate functions over all rows
```sql
SELECT AGG_FUNC(column_or_expression) AS aggregate_description, …
FROM mytable
WHERE constraint_expression;
```

**Common aggregate functions**

<table class="table table-striped table-condensed">
        <tbody><tr>
            <td style="width: 20%">Function</td>
            <td class="unhighlight">Description</td>
        </tr>
        <tr>
            <td><strong>COUNT(</strong>*<strong>)</strong>, <strong>COUNT(</strong><span style="font-style: italic">column</span><strong>)</strong></td>
            <td>A common function used to counts the number of rows in the group if no column name is specified. 
                Otherwise, count the number of rows in the group with non-NULL values in the specified column.</td>
        </tr>
        <tr>
            <td><strong>MIN(</strong><span style="font-style: italic">column</span><strong>)</strong></td>
            <td>Finds the smallest numerical value in the specified column for all rows in the group.</td>
        </tr>
        <tr>
            <td><strong>MAX(</strong><span style="font-style: italic">column</span><strong>)</strong></td>
            <td>Finds the largest numerical value in the specified column for all rows in the group.</td>
        </tr>
        <tr>
            <td><strong>AVG(</strong><span style="font-style: italic">column</span>)<strong></strong></td>
            <td>Finds the average numerical value in the specified column for all rows in the group.</td>
        </tr>
        <tr>
            <td><strong>SUM(</strong><span style="font-style: italic">column</span><strong>)</strong></td>
            <td>Finds the sum of all numerical values in the specified column for the rows in the group.</td>
        </tr>
        <tr>
            <td colspan="2">Docs:
                <a href="https://dev.mysql.com/doc/refman/5.6/en/group-by-functions.html" title="MySQL Aggregate Functions">MySQL</a>,
                <a href="http://www.postgresql.org/docs/9.4/static/functions-aggregate.html" title="Postgres Aggregate Functions">Postgres</a>,
                <a href="http://www.sqlite.org/lang_aggfunc.html" title="SQLite Aggregate Functions">SQLite</a>,
                <a href="https://msdn.microsoft.com/en-us/library/ms173454.aspx" title="Microsoft SQL Server Aggregate Functions">Microsoft SQL Server</a>
            </td>
        </tr>
    </tbody>
</table>

---

**Grouped aggregate functions**


Select query with aggregate functions over groups
```sql
SELECT AGG_FUNC(column_or_expression) AS aggregate_description, …
FROM mytable
WHERE constraint_expression
GROUP BY column;
```
The `GROUP BY` clause works by grouping rows that have the same value in the column specified.

---

Select query with `HAVING` constraint
```sql
SELECT group_by_column, AGG_FUNC(column_expression) AS aggregate_result_alias, …
FROM mytable
WHERE condition
GROUP BY column
HAVING group_condition;
```

## Order of execution of a Query

Complete SELECT query
```sql
SELECT DISTINCT column, AGG_FUNC(column_or_expression), …
FROM mytable
    JOIN another_table
      ON mytable.column = another_table.column
    WHERE constraint_expression
    GROUP BY column
    HAVING constraint_expression
    ORDER BY column ASC/DESC
    LIMIT count OFFSET COUNT;
```

## Inserting rows
**`INSERT`** statement, which declares which **table** to write _into_, the _columns_ of data that we are filling, and one or more _rows_ of data to insert.

Insert statement with values **for all columns**
```sql
INSERT INTO mytable
VALUES (value_or_expr, another_value_or_expr, …),
       (value_or_expr_2, another_value_or_expr_2, …),
       …;
```

---

Insert statement with **specific columns**
```sql
INSERT INTO mytable
(column, another_column, …)
VALUES (value_or_expr, another_value_or_expr, …),
      (value_or_expr_2, another_value_or_expr_2, …),
      …;
```

## Updating rows

Update statement with values
```sql
UPDATE mytable
SET column = value_or_expr, 
    other_column = another_value_or_expr, 
    …
WHERE condition;
```

## Deleting rows

Delete statement with condition
```sql
DELETE FROM mytable
WHERE condition;
```

## Creating tables

Create table statement w/ optional table constraint and default value
```sql
CREATE TABLE IF NOT EXISTS mytable (
    column DataType TableConstraint DEFAULT default_value,
    another_column DataType TableConstraint DEFAULT default_value,
    …
);
```

### Table data types

<table class="table table-striped table-condensed">
        <tbody><tr>
            <td style="width: 30%">Data type</td>
            <td class="unhighlight">Description</td>
        </tr>
        <tr>
            <td><code>INTEGER</code>, <code>BOOLEAN</code></td>
            <td>The integer datatypes can store whole integer values like the count of a number or an 
                age.  In some implementations, the boolean value is just represented as an integer value
                of just 0 or 1.</td>
        </tr>
        <tr>
            <td><code>FLOAT</code>, <code>DOUBLE</code>, <code>REAL</code></td>
            <td>The floating point datatypes can store more precise numerical data like measurements 
                or fractional values.  Different types can be used depending on the floating point 
                precision required for that value.</td>
        </tr>
        <tr>
            <td><code>CHARACTER(num_chars)</code>, <code>VARCHAR(num_chars)</code>, <code>TEXT</code></td>
            <td><p>The text based datatypes can store strings and text in all sorts of locales.  The distinction
                between the various types generally amount to underlaying efficiency of the database when working
                with these columns.</p>
                <p>Both the CHARACTER and VARCHAR (variable character) types are specified with
                the max number of characters that they can store (longer values may be truncated), so can be more
                efficient to store and query with big tables.</p></td>
        </tr>
        <tr>
            <td><code>DATE</code>, <code>DATETIME</code></td>
            <td>SQL can also store date and time stamps to keep track of time series and event data.  They can be
                tricky to work with especially when manipulating data across timezones.</td>
        </tr>
        <tr>
            <td><code>BLOB</code></td>
            <td>Finally, SQL can store binary data in blobs right in the database.  These values are often opaque
                to the database, so you usually have to store them with the right metadata to requery them.</td>
        </tr>
        <tr>
            <td colspan="2">Docs:
                <a href="http://dev.mysql.com/doc/refman/5.6/en/data-types.html" title="MySQL Data Types">MySQL</a>,
                <a href="http://www.postgresql.org/docs/9.4/static/datatype.html" title="Postgres Data Types">Postgres</a>,
                <a href="https://www.sqlite.org/datatype3.html" title="SQLite Data Types">SQLite</a>,
                <a href="https://msdn.microsoft.com/en-us/library/ms187752.aspx" title="Microsoft SQL Server Data Types">Microsoft SQL Server</a>
            </td>
        </tr>
    </tbody>
</table>

### Table constraints

<table class="table table-striped table-condensed">
        <tbody><tr>
            <td style="width: 30%">Constraint</td>
            <td class="unhighlight">Description</td>
        </tr>
        <tr>
            <td><code>PRIMARY KEY</code></td>
            <td>This means that the values in this column are unique, and each value can be used to 
                identify a single row in this table.</td>
        </tr>
        <tr>
            <td><code>AUTOINCREMENT</code></td>
            <td>For integer values, this means that the value is automatically filled in and incremented 
                with each row insertion.  Not supported in all databases.</td>
        </tr>
        <tr>
            <td><code>UNIQUE</code></td>
            <td>This means that the values in this column have to be unique, so you can't insert another 
                row with the same value in this column as another row in the table.  Differs from the
                `PRIMARY KEY` in that it doesn't have to be a key for a row in the table.</td>
        </tr>
        <tr>
            <td><code>NOT NULL</code></td>
            <td>This means that the inserted value can not be `NULL`.</td>
        </tr>
        <tr>
            <td><code>CHECK (expression)</code></td>
            <td>This allows you to run a more complex expression to test whether the values inserted 
                are valid. For example, you can check that values are positive, or greater than a specific 
                size, or start with a certain prefix, etc.</td>
        </tr>
        <tr>
            <td><code>FOREIGN KEY</code></td>
            <td>This is a consistency check which ensures that each value in this column corresponds to 
                another value in a column in another table.<br><br>
                For example, if there are two tables, one listing all Employees by ID,
                and another listing their payroll information, the `FOREIGN KEY` can ensure that every 
                row in the payroll table corresponds to a valid employee in the master Employee list.</td>
        </tr>
    </tbody>
</table>


## Altering tables

Altering table to **add new column(s)**
```sql
ALTER TABLE mytable
ADD column DataType OptionalTableConstraint 
    DEFAULT default_value;
```

---

Altering table to remove** column(s)**
```sql
ALTER TABLE mytable
DROP column_to_be_deleted;
```

---

Altering table **name**
```sql
ALTER TABLE mytable
RENAME TO new_table_name;
```

## Dropping tables

Drop table statement
```sql
DROP TABLE IF EXISTS mytable;
```
