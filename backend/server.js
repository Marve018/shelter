const express = require('express');
const connectDB = require('./config/db');
const dotenv = require('dotenv');

dotenv.config();

const app = express();
const port = process.env.PORT || 3000;

connectDB();

app.get('/', (req, res) => {
    res.send('Welcome to Shelter!');
    });

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
    });
