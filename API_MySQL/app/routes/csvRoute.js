const express = require('express');
//for parsing and put in the mysql database the csv file 
const csvData = require('../middleware/cvs_data_parser');

const router = express.Router();

//change csv data to json data
router.get('/datacsv', (req, res) => {
    //csv file location
    const csvFile = './app/data/csvData.csv';

    //try to convert csv file
    csvData.convertCsvToJson(csvFile, (err, jsonData) => {
        if (err) {
            console.log(err);
            res.status(500).json({error : 'error with the JSON convertion'});
        } else {
            res.json({success: true, message: 'JSON convertion done', data: jsonData});
        }
    })
})

module.exports = router;