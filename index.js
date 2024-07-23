// index.js
const express = require('express');
const bodyParser = require('body-parser');
require('dotenv').config();
const sequelize = require('./config/db');
const Admin = require('./models/admin'); // Correct path to your Admin model

const app = express();
const port = 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
const adminRoutes = require('./routes/admin');
app.use('/admin', adminRoutes);

app.listen(port, '172.20.10.2', async () => {
  try {
    await sequelize.authenticate();
    console.log('Connection has been established successfully.');
    
    // Sync models
    await sequelize.sync({ force: true }); // Use force: true only for development
    console.log('All models were synchronized successfully.');

    console.log(`Server is running on port ${port}`);
  } catch (error) {
    console.error('Unable to connect to the database:', error);
  }
});
