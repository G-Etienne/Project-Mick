// importation of : express, and logi for user routes
const express = require('express');
const userController = require('../controllers/userController');

//express router methode
const router = express.Router();

// Recover users informations
router.get('/', userController.getAllUsers);

// Create an user
router.post('/created', userController.createUser);

// Update an user
router.put('/updated:id', userController.updateUser);

// Delete an user
router.delete('/deleted:id', userController.deleteUser);

module.exports = router;
