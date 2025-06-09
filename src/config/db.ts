import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();

const MONGO_URI = process.env.DATABASE_URL;

if (!MONGO_URI) {
  console.log('MONGO_URI not defined in environment variables');
}

export async function connectDb(): Promise<void> {
  try {
    await mongoose.connect(MONGO_URI as string);
    console.log('Connected to MongoDB ====>>>>>>', MONGO_URI);
  } catch (err) {
    console.error('Failed to connect to MongoDB======>>>>>>>', err);
    process.exit(1);
  }
}
