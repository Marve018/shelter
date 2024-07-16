const express = require('express');
const connectDB = require('./config/db');
const dotenv = require('dotenv');

dotenv.config();

const app = express();
const port = process.env.PORT || 3000;

connectDB();

// middleware
app.use(express.json({ extended: false }));

// routes
app.use('/api/auth', require('./routes/api/auth'));
app.use('/api/uploads', require('./routes/api/uploads'));


app.get('/', (req, res) => {
    res.send('Welcome to Shelter!');
    });

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
    });
