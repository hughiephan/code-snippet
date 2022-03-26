Quick solution for big file
```
node --max-old-space-size=8192 start
```

Optimal solution for big file
```
TODO
```

Decisions made in this project
- Separate into small modules, we duplicate csv file instead of pointing to a generic csv file because it will break when the project grows bigger and many more pointing to that
- For question 3: we could always stop when the transaction has gone passed the given date, but it needs to make sure that the csv is in a ascending or descending format. So I write this generic cases where it needs to loop through all the rows