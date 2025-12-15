import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import { connectDB } from './backend/database/connect.js';
import produtoRoutes from './backend/routes/produtoRoutes.js';

// coisos de seguranca
dotenv.config();

const app = express();
app.use(express.json());
app.use(cors());

// connectando a DB
await connectDB();

// routes
app.get('/', (req, res) => res.send('Backend rodando!'));
app.use('/produto', produtoRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log('Sevidor rodando na porta $(PORT)'));

export default app;
