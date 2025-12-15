import mongoose from 'mongoose';

const unidadeSchema = new mongoose.Schema({
  nome: { type: String, required: true },
  sigla: { type: String, required: true, uppercase: true }
}, { timestamps: true });

export default mongoose.model('unidade', unidadeSchema);