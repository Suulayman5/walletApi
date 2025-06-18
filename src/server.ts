import express from 'express';
import dotenv from 'dotenv';
import { connectDb } from './config/db.js';
import transactions from './routes/transactionRoutes.js';
import rateLimit from './middleware/rateLimiter.js';
import job from './config/cron.js';

dotenv.config();

const app = express();

if (process.env.NODE_ENV === 'production') {
  job.start();
}

// Middlewares
app.use(rateLimit);
app.use(express.json());

app.get('/api/helth', (req, res) => { 
  res.status(200).json({ status: 'ok' });
});

// Routes
app.use('/api', transactions);

const PORT = process.env.PORT || 3000;

connectDb()
  .then(() => {
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  })
  .catch(err => {
    console.error('Database connection failed', err);
    process.exit(1);
  });

export const server = app;
