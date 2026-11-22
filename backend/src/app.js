import express from 'express';
import cors from 'cors';
import authRoutes from './routes/authRoutes.js';
import carRoutes from './routes/carRoutes.js';

const app = express();

app.use(cors({
  origin: process.env.CLIENT_URL,
}));

app.use(express.json());

// Health Check
app.get('/api/health', (req, res) => {
  res.status(200).json({
    success: true,
    message: 'Haupcar API is running',
  });
});

// Authentication Routes
app.use('/api/auth', authRoutes);
app.use('/api/cars', carRoutes);

export default app;