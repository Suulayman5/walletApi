import express from 'express';
import dotenv from 'dotenv';
import { connectDb } from './config/db.js';
import transactions from './routes/transactionRoutes.js';
import rateLimit from './middleware/rateLimiter.js';

dotenv.config();

const app = express();

app.use(rateLimit)
app.use(express.json());

await connectDb();

app.use('/api',transactions);
const PORT = process.env.PORT || 3000; 
app.listen(PORT, () => { 
  console.log(`Server is running on port =======>>>>>>>>${PORT}`);
});