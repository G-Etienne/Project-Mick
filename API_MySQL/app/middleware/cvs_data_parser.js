//importation for parsing csv, raeding it and converting it
const csv = require('csv-parser');
const fs = require('fs');

//storing the data in the mysql database
const storage = require('../middleware/csvJson_to_sql');

function convertCsvToJson(csvFile, callback){
    const data = [];

    //converting csv file into json file
    fs.createReadStream(csvFile)
        .pipe(csv({separator:';'}))
        .on('data', (row) => {
          const rowData = {};
          for (const [key, value] of Object.entries(row)){
            const csvKeys = key.split(';');
            const csvValues = value.split(';');
            csvKeys.forEach((csvKey, index) => {
              rowData[csvKey] = csvValues[index];
            })
          }
          data.push(rowData);
        })
        .on('end', () => {          
            //put the csv data in mysql database
            callback(storage(data));
        })
        .on('error', (err) => {
            callback(err);
        })
}

module.exports = {convertCsvToJson};