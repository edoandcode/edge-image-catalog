const mongoose = require('mongoose');

async function connectToDatabase() {
    try {
        mongoose.connect(process.env.MONGODB_CONNECTION_URI)
        console.log('Connected to MongoDB');
    } catch (error) {
        console.error('Error connecting to MongoDB:', error);
        process.exit(1);
    }
}

module.exports = connectToDatabase