const mongoose = require('mongoose');

const MONGO_URI = 'mongodb://127.0.0.1:27017/wordle';

module.exports = {
  connectDB: async function() {
    await mongoose.connect(MONGO_URI);
    console.log('MongoDB connected');
  }
};