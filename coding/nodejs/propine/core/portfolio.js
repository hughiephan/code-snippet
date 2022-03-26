const csvParser = require("csv-parser");
const calculate = require("./calculate");
const fs = require('fs');
const result = [];

function all(path) {
  fs.createReadStream(path)
  .pipe(csvParser())
  .on("data", (data) => {
    data.amount = parseFloat(data.amount);
    console.log("Processing: ", data.timestamp);
    result.push(data);
  })
  .on("end", () => {
    console.log(calculate.all(result));
  });
}

module.exports = {
  all
}