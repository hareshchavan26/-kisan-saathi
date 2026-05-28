import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import rateLimit from 'express-rate-limit';
import dotenv from 'dotenv';
import { errorHandler } from './middleware/errorHandler.js';

import eligibilityRoutes from './routes/eligibility.js';
import schemesRoutes from './routes/schemes.js';
import analyticsRoutes from './routes/analytics.js';

dotenv.config();

const app = express();

// Middleware
app.use(helmet());
app.use(cors({
  origin: process.env.FRONTEND_URL || 'http://localhost:5173',
  methods: ['GET', 'POST']
}));
app.use(express.json());
app.use(morgan('dev'));

const limiter = rateLimit({
  windowMs: process.env.RATE_LIMIT_WINDOW_MS || 900000, 
  max: process.env.RATE_LIMIT_MAX || 100, 
  message: { success: false, error: 'Too many requests, please try again later.', code: 'RATE_LIMIT_EXCEEDED' }
});

app.use('/api', limiter);

// Routes
app.get('/api/health', (req, res) => {
  res.json({ status: "ok", timestamp: new Date().toISOString() });
});

app.use('/api/eligibility', eligibilityRoutes);
app.use('/api/schemes', schemesRoutes);
app.use('/api/analytics', analyticsRoutes);

// Error Handler
app.use(errorHandler);

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
