### Queries with constraints

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
