import express from 'express';
import dotenv from 'dotenv';
import { connectDb } from './config/db.ts';
import transactions from './routes/transactionRoutes.ts';
import rateLimit from './middleware/rateLimiter.ts';
import job from './config/cron.ts';
dotenv.config();

const app = express();


if (process.env.NODE_ENV === 'production') {
  job.start()
}
// Middlewares 
app.use(rateLimit);
app.use(express.json());


app.get('/api/helth', (req, res) =>{
  res.status(200).json({status: 'ok'})
})

// Routes
app.use('/api', transactions); 

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