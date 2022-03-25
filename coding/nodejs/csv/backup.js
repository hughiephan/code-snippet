const csvParser = require("csv-parser");
const needle = require("needle");
const unzipper = require('unzipper');
const fs = require('fs');

const result = [];

const url = "https://people.sc.fsu.edu/~jburkardt/data/csv/deniro.csv";
const url_transaction = "https://s3-ap-southeast-1.amazonaws.com/static.propine.com/transactions.csv.zip";


// Needle parse random file
// needle
//   .get(url)
//   .pipe(csvParser())
//   .on("data", (data) => {
//     result.push(data);
//   })
//   .on("end", (err) => {
//     if (err) console.log("An error has occurred");
//     else console.log(result);
//   });


// Needle with gzip parse
// needle
//   .get(url_transaction)
//   .pipe(unzipper.Parse())
//   .on('entry', function (entry) {
//     var fileName = entry.path;
//     var type = entry.type; // 'Directory' or 'File'

//     console.log();
//     if (/\/$/.test(fileName)) {
//       console.log('[DIR]', fileName, type);
//       return;
//     }

//     console.log('[FILE]', fileName, type);

//     // TODO: probably also needs the security check

//     entry.pipe(process.stdout/*fs.createWriteStream('output/path')*/);
//     // NOTE: To ignore use entry.autodrain() instead of entry.pipe()
//   });


//Needle test 2
needle
  .get(url_transaction)
  .pipe()
  .pipe(csvParser())
  .on("data", (data) => {
    result.push(data);
  })
  .on("end", (err) => {
    if (err) console.log("An error has occurred");
    else console.log(result);
  });