import mongoose from 'mongoose';

const telefoneSchema = new mongoose.Schema({
  numero: { type: String, required: true },
});

const fornecedorSchema = new mongoose.Schema(
  {
    nome: { type: String, required: true },
    cnpj: { type: String, required: true, unique: true },
    // array de sub-documentos
    telefones: [telefoneSchema],
  },
  { timestamps: true }
);

export default mongoose.model('fornecedor', fornecedorSchema);
