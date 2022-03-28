# Propine Test Interview
The interview question: 

Let us assume you are a crypto investor. You have made transactions over a period of time which is logged in a CSV file. Write a command line program that does the following

- Given no parameters, return the latest portfolio value per token in USD
- Given a token, return the latest portfolio value for that token in USD
- Given a date, return the portfolio value per token in USD on that date
- Given a date and a token, return the portfolio value of that token in USD on that date

(Full version: https://gist.github.com/liangzan/4436cb8b083c66b3517e7f4d80939f06)

About me
- Interviewee: Hughie Phan
- Github: https://github.com/hughiephan
- Medium: https://medium.com/@hughiephan
- Youtube: https://www.youtube.com/channel/UCmsf5j_2wHuFWhtAOOcJ1pw

# Initialize the project
## Ubuntu
```
make pre-init
make init
```
## Windows
- Install nodejs & npm.
- Download https://s3-ap-southeast-1.amazonaws.com/static.propine.com/transactions.csv.zip to `storage` folder and unzip it.
- Run `npm install`

# How to start
```
npm run start
```

# Run test
```
npm run test
```

# FAQ
If the project failed to start, you can have a look at the
- `package.json`. Change the `--max-old-space-size=8192` to your computer RAM 
- `Makefile`. Make sure all the prerequistes here have been installed 
- If a folder is not found, please manually create it (I might have forget to add .gitkeep)


# Decisions made on this project
- We need this line `node --max-old-space-size=8192 start` to avoid memory limit issue when reading big CSV file. A more efficent approach to handle big CSV file we can use is NodeJS MapReduce https://aws.amazon.com/vi/blogs/big-data/node-js-streaming-mapreduce-with-amazon-emr/
- For a more efficent run with Question 3, we could stop the program when our cursor has processed all the transactions in the given date. But for that to work, the transactions.csv's timestamp need to be ascending or descending. So I stick to the generic approach and let it process all, instead of prematurely stop. 
- About the project structure
  - I break the project in to small modules like `portfolio` (portfolio.js, portfolio.test.csv, portfolio.test.js) so when the codebase grows bigger it's more maintainable. The important thing is the *.test.csv should belongs to that module only. As project grows bigger, more inheritance will cause more harm than good
  - `Core` folder contains generic libraries like (environments, prompt messages, options, validation). `Validator` (Authentication, Authorizing, Validate...) should always be a generic library, so developers can focus on writing the business logic instead of having to think twice about who should and should not have the access.
