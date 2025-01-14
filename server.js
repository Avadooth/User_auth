import express from 'express';
import dotenv from 'dotenv';
import authRoutes from './routes/auth.js';
import  connectionDB from './config/db.js';


dotenv.config();

connectionDB();

const app = express();

app.use(express.json());

app.use('/api', authRoutes);

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

