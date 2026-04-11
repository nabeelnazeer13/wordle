import mongoose from 'mongoose';

const MONGO_URI = 'mongodb://127.0.0.1:27017/wordle';

export async function connectDB() {
  await mongoose.connect(MONGO_URI);
  console.log('MongoDB connected');
}