// importation of : express, routes for user journey, configuration database.
const express = require('express');
const userRoute = require('./routes/userRoutes');
const firstDataBase = require('../config/db');

//for the convesion of csv datas
const csvRoute = require('./routes/csvRoute');
//express app creation
const app = express();

//using  json
app.use(express.json());
//Connecting with the main database
firstDataBase.connect((err) => {
  if (err) {
    console.error('error with the database connexion', err);
    return;
  }
  console.log('Connexion with the MySQL database');
});

//header setting
app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
  next();
});

//API routes
//csvData
app.use('/api/csv', csvRoute);
//users journey
app.use('/api/users', userRoute);

module.exports = app;
