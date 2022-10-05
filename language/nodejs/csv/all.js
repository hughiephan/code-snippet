const csvParser = require("csv-parser");
const calculate = require("./calculate");
const fs = require('fs');
const result = [];

fs.createReadStream("./transactions-test.csv")
  .pipe(csvParser())
  .on("data", (data) => {
    data.amount = parseFloat(data.amount);
    result.push(data);
  })
  .on("end", () => {
    console.log(calculate.all(result));
  });



