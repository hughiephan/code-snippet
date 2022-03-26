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