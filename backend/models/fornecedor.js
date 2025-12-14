import mongoose from 'mongoose';

const fornecedorSchema = new mongoose.Schema({
  nome: String,
  cnpj: { type: String, required: true, unique: true },
  telefones: [{ type: mongoose.Schema.Types.ObjectId, ref: 'telefone' }],
});

export default mongoose.model('fornecedor', fornecedorSchema);
