const { pool } = require('../config/database');

class UsuarioModel {
  static async findByEmail(email) {
    const [rows] = await pool.query('SELECT * FROM usuarios WHERE email = ?', [email]);
    return rows[0] || null;
  }

  static async findById(id) {
    const [rows] = await pool.query(
      'SELECT id, nome, email, ativo, criado_em FROM usuarios WHERE id = ?', [id]
    );
    return rows[0] || null;
  }

  static async create({ nome, email, senha }) {
    const [result] = await pool.query(
      'INSERT INTO usuarios (nome, email, senha) VALUES (?, ?, ?)',
      [nome, email, senha]
    );
    return this.findById(result.insertId);
  }

  static async findAll() {
    const [rows] = await pool.query(
      'SELECT id, nome, email, ativo, criado_em FROM usuarios ORDER BY id DESC'
    );
    return rows;
  }
}

module.exports = UsuarioModel;
