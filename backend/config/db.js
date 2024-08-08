const mongoose = require('mongoose');
const dotenv = require('dotenv');

dotenv.config();

const connectDB = async () => {
    if (mongoose.connection.readyState === 0) { // 0 = disconnected, 1 = connected, 2 = connecting, 3 = disconnecting
        try {
            await mongoose.connect(process.env.MONGO_URI, {
                useNewUrlParser: true,
                useUnifiedTopology: true,
                ssl: true
            });
            console.log(`MongoDB Connected: ${mongoose.connection.host}`);
        } catch (error) {
            console.error(`Error: ${error.message}`);
            process.exit(1);
        }
    }

};

module.exports = connectDB;
