const mongoose = require('mongoose');

const MONGO_URI = 'mongodb://127.0.0.1:27017/Wordle';

module.exports = 
   async function connectDB() {
    await mongoose.connect(MONGO_URI);
    console.log('MongoDB connected');
  };