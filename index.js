import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import { connectDB } from './backend/database/connect.js';
import produtoRoutes from './backend/routes/produtoRoutes.js';

dotenv.config();

const app = express();
app.use(express.json());
app.use(cors());

// Routes
app.get('/', (req, res) => res.send('Backend rodando!'));
app.use('/produto', produtoRoutes);

// Define the port (Fixing the string interpolation below)
const PORT = process.env.PORT || 3000;

// WRAPPER FUNCTION: Ensures DB connects BEFORE listening
const startServer = async () => {
  try {
    // 1. Log to prove execution started
    console.log('Iniciando o servidor...');

    // 2. Connect to Database
    await connectDB();

    // 3. Start listening only after DB is ready
    app.listen(PORT, () => {
      // Use backticks (`) for variables, not single quotes (')
      console.log(`Servidor rodando na porta ${PORT}`); 
    });

  } catch (error) {
    console.error('Erro fatal ao iniciar servidor:', error);
    process.exit(1); // Kill process if DB fails
  }
};

// Execute the wrapper
startServer();

export default app;