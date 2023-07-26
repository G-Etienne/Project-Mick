//importation for parsing csv, raeding it and converting it
const csv = require('csv-parser');
const fs = require('fs');
let data = [];

function convertCsvToJson(csvData){

    //converting csv file into json file
    fs.createReadStream(csvData)
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
        .on('error', (err) => {
            callback(err);
        }) 
        return data;

};

module.exports = convertCsvToJson;