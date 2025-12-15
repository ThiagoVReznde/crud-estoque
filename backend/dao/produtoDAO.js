import Produto from '../models/produto.js';
import Fornecedor from '../models/fornecedor.js';
import Unidade from '../models/unidade.js';

class ProdutoDAO {
  // LIST
  async listar() {
    return await Produto.find()
      .populate('fornecedor')
      .populate('unidade')
      .sort({ nome: 1 });
  }

  // LIST BY NAME
  async listarByName(nome) { 
    const filtro = nome ? { nome: { $regex: nome, $options: 'i' } } : {};

    return await Produto.find(filtro)
      .populate('fornecedor')
      .populate('unidade')
      .sort({ nome: 1 });
  }

  // CREATE
  async salvar(produtoData) {
    try {
      // Verifica UNIDADE
      if (
        produtoData.unidade &&
        typeof produtoData.unidade === 'object' &&
        !produtoData.unidade._id
      ) {
        const novaUnidade = await Unidade.create(produtoData.unidade);
        produtoData.unidade = novaUnidade._id;
      }

      // Verifica FORNECEDOR
      if (
        produtoData.fornecedor &&
        typeof produtoData.fornecedor === 'object' &&
        !produtoData.fornecedor._id
      ) {
        const novoFornecedor = await Fornecedor.create(produtoData.fornecedor);
        produtoData.fornecedor = novoFornecedor._id;
      }

      const produto = new Produto(produtoData);
      return await produto.save();
    } catch (err) {
      console.error('❌ Erro ao salvar Produto:', err.message);
      throw err;
    }
  }

  // UPDATE
  async atualizar(id, novosDados) {
    try {
      // Trata UNIDADE
      if (novosDados.unidade && typeof novosDados.unidade === 'object') {
        if (novosDados.unidade._id) {
          await Unidade.findByIdAndUpdate(
            novosDados.unidade._id,
            novosDados.unidade
          );
        } else {
          const novaUnidade = await Unidade.create(novosDados.unidade);
          novosDados.unidade = novaUnidade._id;
        }
      }

      // Trata FORNECEDOR
      if (novosDados.fornecedor && typeof novosDados.fornecedor === 'object') {
        if (novosDados.fornecedor._id) {
          await Fornecedor.findByIdAndUpdate(
            novosDados.fornecedor._id,
            novosDados.fornecedor
          );
        } else {
          const novoFornecedor = await Fornecedor.create(novosDados.fornecedor);
          novosDados.fornecedor = novoFornecedor._id;
        }
      }

      const atualizado = await Produto.findByIdAndUpdate(id, novosDados, {
        new: true,
      })
        .populate('fornecedor')
        .populate('unidade');

      return atualizado;
    } catch (err) {
      console.error('Erro ao atualizar Produto:', err.message);
      throw err;
    }
  }

  // DELETE
  async excluir(id) {
    try {
      const produto = await Produto.findById(id);

      if (!produto) {
        throw new Error('Produto não encontrado para exclusão');
      }
      await Produto.findByIdAndDelete(id);

      return { mensagem: 'Produto excluído com sucesso' };
    } catch (err) {
      console.error('Erro ao excluir Produto:', err.message);
      throw err;
    }
  }
}

export default ProdutoDAO;