const { pool } = require('../config/database');

class ProdutoModel {
  // Buscar todos os produtos
  static async findAll({ page = 1, limit = 10, busca } = {}) {
    const offset = (page - 1) * limit;
    let where = '';
    const params = [];

    if (busca) {
      where += ' AND (nome LIKE ? OR codigo LIKE ?)';
      params.push(`%${busca}%`, `%${busca}%`);
    }

    const [rows] = await pool.query(
      `SELECT * FROM produtos WHERE 1=1 ${where} ORDER BY id DESC LIMIT ? OFFSET ?`,
      [...params, Number(limit), Number(offset)]
    );

    const [[{ total }]] = await pool.query(
      `SELECT COUNT(*) as total FROM produtos WHERE 1=1 ${where}`,
      params
    );

    return {
      data: rows,
      pagination: {
        total,
        page: Number(page),
        limit: Number(limit),
        totalPages: Math.ceil(total / limit),
      },
    };
  }

  // Buscar por ID
  static async findById(id) {
    const [rows] = await pool.query('SELECT * FROM produtos WHERE id = ?', [id]);
    return rows[0] || null;
  }

  // Buscar por código
  static async findByCodigo(codigo) {
    const [rows] = await pool.query('SELECT * FROM produtos WHERE codigo = ?', [codigo]);
    return rows[0] || null;
  }

  // Criar produto
  static async create({ codigo, nome, unidade, valor, quantidade, descricao }) {
    const [result] = await pool.query(
      `INSERT INTO produtos (codigo, nome, unidade, valor, quantidade, descricao)
       VALUES (?, ?, ?, ?, ?, ?)`,
      [codigo, nome, unidade, valor, quantidade, descricao || null]
    );
    return this.findById(result.insertId);
  }

  // Atualizar produto
  static async update(id, { codigo, nome, unidade, valor, quantidade, descricao }) {
    await pool.query(
      `UPDATE produtos SET codigo=?, nome=?, unidade=?, valor=?, quantidade=?, descricao=?
       WHERE id = ?`,
      [codigo, nome, unidade, valor, quantidade, descricao || null, id]
    );
    return this.findById(id);
  }

  // Deletar produto
  static async delete(id) {
    const [result] = await pool.query('DELETE FROM produtos WHERE id = ?', [id]);
    return result.affectedRows > 0;
  }
}

module.exports = ProdutoModel;