const csvFile = './app/data/csvData.csv';

const csvToJson = require('../middleware/csv_to_json');
const fullData = require('../middleware/fullObject');

async function userFusion(){
    try {
        const jsonData = await csvToJson(csvFile);
        const theFullData = await fullData(jsonData);
        console.log('csv data full compiled to json');
        //console.log(theFullData);
        theFullData.forEach(element => {
            if (element.address_id == 0){
                console.log('add')
            }
            if (element.family_id == 0){
                console.log('familly')
            }
        });
    } catch (err) {
        console.error(err);
    }
}

module.exports = userFusion;