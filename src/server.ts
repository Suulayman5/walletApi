import express from 'express';
import dotenv from 'dotenv';
import { connectDb } from './config/db.js';
import transactions from './routes/transactionRoutes.js';
import rateLimit from './middleware/rateLimiter.js';

dotenv.config();

const app = express();

// Middlewares
app.use(rateLimit);
app.use(express.json());

// Routes
app.use('/api', transactions);

// Database connection and server start
const PORT = process.env.PORT || 3000;
connectDb()
  .then(() => {
    const server = app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  })
  .catch(err => {
    console.error("Database connection failed", err);
    process.exit(1);
  });

export const server = app;  // For testing