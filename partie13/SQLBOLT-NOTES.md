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