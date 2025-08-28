import mongoose from 'mongoose';
import { config } from './env.config.js';
const connectDB = async () => {
  try {
    console.log('Attempting to connect to MongoDB...');
    console.log(
      'MongoDB URI:',
      config.MONGODB_URI ? 'URI is set' : 'URI is undefined'
    );

    if (!config.MONGODB_URI) {
      throw new Error('MONGODB_URI is not defined in environment variables');
    }

    const conn = await mongoose.connect(config.MONGODB_URI);
    console.log(
      `MongoDB Connected successfully! Host: ${conn.connection.host}`
    );
  } catch (error) {
    console.error(`MongoDB Connection Error: ${error.message}`);
    process.exit(1);
  }
};

export default connectDB;
