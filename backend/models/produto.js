import mongoose from 'mongoose';

const produtoSchema = new mongoose.Schema(
  {
    nome: { type: String, required: true },
    quantidade: { type: Number, default: 0 },

    fornecedor: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'fornecedor',
      required: true,
    },

    unidade: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'unidade',
      required: true,
    },
  },
  { timestamps: true }
);

export default mongoose.model('produto', produtoSchema);
