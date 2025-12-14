import mongoose from 'mongoose';

const telefoneSchema = new mongoose.Schema(
  {
    ddd: String,
    numero: String,
    fornecedores: [{ type: mongoose.Schema.Types.ObjectId, ref: 'fornecedor' }],
  },
  { timestamps: true }
);

export default mongoose.model('telefone', telefoneSchema);
