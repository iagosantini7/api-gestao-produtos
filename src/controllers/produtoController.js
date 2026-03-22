const ProdutoModel = require('../models/Produto');

// GET /produtos
async function listar(req, res) {
  try {
    const { page, limit, busca } = req.query;
    const resultado = await ProdutoModel.findAll({ page, limit, busca });
    return res.status(200).json({ status: 'success', ...resultado });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ status: 'error', message: 'Erro interno do servidor' });
  }
}

// GET /produtos/:id
async function buscarPorId(req, res) {
  try {
    const produto = await ProdutoModel.findById(req.params.id);
    if (!produto) {
      return res.status(404).json({ status: 'error', message: 'Produto não encontrado' });
    }
    return res.status(200).json({ status: 'success', data: produto });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ status: 'error', message: 'Erro interno do servidor' });
  }
}

// POST /produtos
async function criar(req, res) {
  try {
    const { codigo, nome, unidade, valor, quantidade, descricao } = req.body;

    const existente = await ProdutoModel.findByCodigo(codigo);
    if (existente) {
      return res.status(409).json({
        status: 'error',
        message: `Já existe um produto com o código "${codigo}"`,
      });
    }

    const produto = await ProdutoModel.create({ codigo, nome, unidade, valor, quantidade, descricao });
    return res.status(201).json({ status: 'success', message: 'Produto criado com sucesso', data: produto });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ status: 'error', message: 'Erro interno do servidor' });
  }
}

// PUT /produtos/:id
async function atualizar(req, res) {
  try {
    const produto = await ProdutoModel.findById(req.params.id);
    if (!produto) {
      return res.status(404).json({ status: 'error', message: 'Produto não encontrado' });
    }

    const { codigo, nome, unidade, valor, quantidade, descricao } = req.body;

    // Verifica se o novo código já pertence a outro produto
    if (codigo !== produto.codigo) {
      const existente = await ProdutoModel.findByCodigo(codigo);
      if (existente) {
        return res.status(409).json({
          status: 'error',
          message: `Já existe um produto com o código "${codigo}"`,
        });
      }
    }

    const atualizado = await ProdutoModel.update(req.params.id, { codigo, nome, unidade, valor, quantidade, descricao });
    return res.status(200).json({ status: 'success', message: 'Produto atualizado com sucesso', data: atualizado });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ status: 'error', message: 'Erro interno do servidor' });
  }
}

// DELETE /produtos/:id
async function deletar(req, res) {
  try {
    const produto = await ProdutoModel.findById(req.params.id);
    if (!produto) {
      return res.status(404).json({ status: 'error', message: 'Produto não encontrado' });
    }

    await ProdutoModel.delete(req.params.id);
    return res.status(200).json({ status: 'success', message: 'Produto deletado com sucesso' });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ status: 'error', message: 'Erro interno do servidor' });
  }
}

module.exports = { listar, buscarPorId, criar, atualizar, deletar };