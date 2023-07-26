//contecting settings
const db = require('../../config/db');

//SQL requests
const sqlUsers = 'SELECT * FROM bo_users;';
const sqlAddress = 'SELECT * FROM bo_addresses';

//recover the address
function getAddresses() {
    return new Promise((resolve, reject) => {
        db.query(sqlAddress, (error, results) => {
            if (error) {
                console.error('Error during the request execution.');
                reject(error);
            } else {
                resolve(results);
            }
        });
    });
}

//recover the users
function getUsers() {
    return new Promise((resolve, reject) => {
        db.query(sqlUsers, (error, results) => {
            if (error) {
                console.error('Error during the request execution.');
                reject(error);
            } else {
                resolve(results);
            }
        });
    });
}


function storageData(data){
    return new Promise(async (resolve, reject) => {
        //csv data in JSON 
        const csvData = data;
        let completedData = [];
        const Adresses = await getAddresses();
        const Users = await  getUsers();
        csvData.forEach(element => {

            //csv object
            const myObjetc = {
                branch: element['Ngành'],
                Insurance_certificate: element['Attestation assurance'],
                payment: element['Moyen paiement'],
                registrations: element['Inscriptions Ngành'],
                vn_class: element['Lớp VN'],
                gl_class: element['Lớp GL'],
                last_name: element.Họ, //user
                first_name: element.Tên, //user
                login: "", //user
                password: "", //user
                baptismal_name: element["Tên thánh"], //user
                birthdate: element["Ngày sinh"], //user
                first_communion_date: null, //user
                confirmation_date: null, //user
                gender: null,//user
                mobile: { //user
                    residential: element['Số đt nhà'],
                    second_number: element['Số đt ba'],
                    mother_numer: element['Số đt mẹ'],
                },
                email: {//user
                    first_email: element["Email 1"],
                    second_email: element['Email 2'],
                },
                notes: element.Commentaires,//user
                address: { //bo_address
                    N_rue: element['Địa chỉ nhà numéro rue'],
                    postal_code: element['Code postal'],
                    city: element.Ville,
                },
                address_id: 0,//user --> 0 = create a new address_object and add it's id.
                family_id: 0,//user --> 0 = create a new family_object and add it's id.
                type: 0,//user
                section: 0, //user 
                catechism: 0, //user
                already_exist: false,

            };
            //put the data under the same format 
            if (element.Giới == 'Nam'){
                myObjetc.gender = 0;
            } else if (element.Giới == 'Nữ'){
                myObjetc.gender = 1;
            } 
            
            // compare the address in the sql database to the address in the csv data to recover the address_id 
            //of the user if his address exist in the sql database
            for (let i in Adresses){
            
                if (Adresses[i].address == element["Địa chỉ nhà numéro rue"] && Adresses[i].postal_code == element["Code postal"] && Adresses[i].city == element.Ville && Adresses[i].address != '' && Adresses[i].postal_code != 0 && Adresses[i].city != ''){
                    myObjetc.address_id = Adresses[i].id; 
                } 
            }

            //recover the family_id with the adress and looking for same user in the sql database and csv data
            for (let j in Users){
                //compare the address to recover the family id
                if ( Users[j].family_id != 0 && Users[j].address_id != 0 && myObjetc.address_id != null && Users[j].address_id == myObjetc.address_id ){
                    myObjetc.family_id = Users[j].family_id;
                } else if (Users[j].last_name == myObjetc.last_name && Users[j].first_name === myObjetc.first_name && Users[j].gender === myObjetc.gender){
                    //make the birthdate under the same format
                    const theUser = JSON.stringify(Users[j].birthdate)
                    let [restDate, rest] = theUser.split('T');
                    let sqlDate = '';
                    //remove the first caractere 
                    for (let k in restDate){
                        if (k != 0){
                            let caracterToAdd = restDate[k];
                            sqlDate = sqlDate +caracterToAdd;
                        }
                    }
                    //rebuild the sql date like in the csv data 
                    let [year, month, day] = sqlDate.split('-')
                    const realSqlDate = day + '/' + month + '/' + year;
                    //compare the birthdate and last_name to see the same users 
                    if (realSqlDate == myObjetc.birthdate && myObjetc.last_name == Users[j].last_name){
                        myObjetc.already_exist = true;
                    }
                    completedData.push(myObjetc);
                }
            }
        });
        resolve(completedData);
    })
        
}

module.exports = storageData;

