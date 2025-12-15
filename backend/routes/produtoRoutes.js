import express from 'express';
import produtoDAO from '../dao/produtoDAO.js';

import { Router } from 'express';

const router = Router();
const dao = new produtoDAO();

// URL base: /produto/

// router.[acao] = ('[rota]', [funcao]{} )
// parametros: request, response
// sao proprios do express

// GET 
router.get('/', async (req, res) => {
    // recebe um JSON da resposta de dao.listar()
    res.json(await dao.listar());
  });
  

// POST/CREATE
router.post('/', async (req, res) => {
  // status de sucesso (201), chama dao.salvar e passa req.body
  res.status(201).json(await dao.salvar(req.body));
});

// PUT
// :id -> /produto/[id]
router.put('/:id', async (req, res) => {
  // chama dao.atualizar, passa o ID do dado na DB e passa req.body
  res.json(await dao.atualizar(req.params.id, req.body));
});

// DELETE
router.delete('/:id', async (req, res) => {
  // chama dao.atualizar, passa o ID do dado na DB
  await dao.excluir(req.params.id);
  res.json({ mensagem: 'Removido com sucesso!' });
  console.log("removido!!!!");
});

// Listagem c/ filtros
router.get("/filtrar", async (req, res) => {
  try {
    const { nome } = req.query; // ?nome=
    const lista = await dao.listarByName(nome);
    res.json(lista);
  } catch (err) {
    res.status(500).json({ erro: "Erro ao listar PJs", detalhe: err.message });
    console.log("erro ao listar!!");
  }
});