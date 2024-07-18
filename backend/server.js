const express = require('express');
const connectDB = require('./config/db');
const dotenv = require('dotenv');
const cors = require('cors');

dotenv.config();

const app = express();
const port = process.env.PORT || 5000;

connectDB();

// middleware
app.use(express.json({ extended: false }));

// routes
app.use('/api/auth', require('./routes/api/auth'));
app.use('/api/uploads', require('./routes/api/uploads'));
app.use('/api/dashboard', require('./routes/api/dashboard'));
app.use('/api/properties', require('./routes/api/properties'));
app.use('/api/bookings', require('./routes/api/bookings'));

app.use(cors());

// app.get('/', (req, res) => {
//     res.send('Welcome to Shelter!');
//     });

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
    });
