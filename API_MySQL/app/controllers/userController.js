//config for the database connecting 
const db = require('../../config/db');


//Get the users informations
//http://localhost:54600/api/users
const getAllUsers = (req, res) => {
    db.query('SELECT * FROM bo_users', (error, results) => {
        if(error){
            console.error(error);
            res.status(500).json({error: error});
        }else{
            console.log('User all getted');
            res.json(results); 
        }
    });
}; 


//Add an user
//http://localhost:54600/api/users/created
const createUser = (req, res) => {
  const { name, email } = req.body;
  db.query('INSERT INTO bo_addresses (name, email) VALUES (?, ?)', [name, email], (error, results) => {
    if (error) {
      console.error(error);
      res.status(500).json({ error: 'error with the user creation.' });
    } else {
        console.log('User created');
      res.json({ message: 'Utilisateur sucesful created.' });
    }
  });
};

//Update an user
//http://localhost:54600/api/users/updated
const updateUser = (req, res) => {
  const { id } = req.params;
  const { name, email } = req.body;
  db.query('UPDATE bo_addresses SET name = ?, email = ? WHERE id = ?', [name, email, id], (error, results) => {
    if (error) {
      console.error(error);
      res.status(500).json({ error: 'Erreur with the user updating.' });
    } else if (results.affectedRows === 0) {
      res.status(404).json({ error: "User don't find." });
    } else {
      console.log('user updating')
        res.json({ message: 'user succesful uptdating.' });
    }
  });
};

//Delete an user
//http://localhost:54600/api/users/deleted
const deleteUser = (req, res) => {
  const { id } = req.params;
  db.query('DELETE FROM bo_addresses WHERE id = ?', [id], (error, results) => {
    if (error) {
      console.error(error);
      res.status(500).json({ error: 'Erreur during the deleting.' });
    } else if (results.affectedRows === 0) {
      res.status(404).json({ error: 'User not found' });
    } else {
      console.log('User deleted')
      res.json({ message: 'user succesful deleted ' });
    }
  });
};

module.exports = {
  getAllUsers,
  createUser,
  updateUser,
  deleteUser,
}; 