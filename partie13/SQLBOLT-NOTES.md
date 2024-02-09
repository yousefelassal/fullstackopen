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
