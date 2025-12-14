import mongoose from 'mongoose';
import fornecedor from './fornecedor';
import unidade from './unidade';

const produtoSchema = new mongoose.Schema({
  nome: String,
  quantidade: Int32,
  unidade: [{ type: mongoose.Schema.Types.ObjectId, ref: 'unidade' }],
  fornecedor: [{ type: mongoose.Schema.Types.ObjectId, ref: 'fornecedor' }],
});

export default mongoose.model('produto', produtoSchema);
