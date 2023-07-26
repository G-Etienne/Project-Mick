// router --> const express = require('express');
const express = require('express');
const csvFile = './app/data/csvData.csv';
const csvToJson = require('../middleware/csv_to_json');
const fullData = require('../middleware/fullObject');

const userFusion = require('../middleware/userFusion');

const router = express.Router();

// change csv data to json data
router.get('/datacsv', async (req, res) => {
    userFusion()
    try {
        const jsonData = await csvToJson(csvFile);
        const theFullData = await fullData(jsonData);
        console.log('conversion csv to json done');
        res.json(theFullData); // Send the JSON data as a response to the client
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'An error occurred' });
    }
});

module.exports = router;
