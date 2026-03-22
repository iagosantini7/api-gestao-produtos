const jwt      = require('jsonwebtoken');
const bcrypt   = require('bcryptjs');
const Usuario  = require('../models/Usuario');

// POST /auth/login
async function login(req, res) {
  try {
    const { email, senha } = req.body;

    if (!email || !senha) {
      return res.status(422).json({ status: 'error', message: 'E-mail e senha são obrigatórios.' });
    }

    const usuario = await Usuario.findByEmail(email);
    if (!usuario) {
      return res.status(401).json({ status: 'error', message: 'E-mail ou senha inválidos.' });
    }

    if (!usuario.ativo) {
      return res.status(403).json({ status: 'error', message: 'Usuário inativo. Contate o administrador.' });
    }

    const senhaOk = await bcrypt.compare(senha, usuario.senha);
    if (!senhaOk) {
      return res.status(401).json({ status: 'error', message: 'E-mail ou senha inválidos.' });
    }

    const token = jwt.sign(
      { id: usuario.id, nome: usuario.nome, email: usuario.email },
      process.env.JWT_SECRET,
      { expiresIn: process.env.JWT_EXPIRES_IN || '8h' }
    );

    return res.status(200).json({
      status: 'success',
      message: 'Login realizado com sucesso!',
      token,
      usuario: { id: usuario.id, nome: usuario.nome, email: usuario.email },
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ status: 'error', message: 'Erro interno do servidor.' });
  }
}

// POST /auth/register
async function register(req, res) {
  try {
    const { nome, email, senha } = req.body;

    if (!nome || !email || !senha) {
      return res.status(422).json({ status: 'error', message: 'Nome, e-mail e senha são obrigatórios.' });
    }

    if (senha.length < 6) {
      return res.status(422).json({ status: 'error', message: 'A senha deve ter no mínimo 6 caracteres.' });
    }

    const existe = await Usuario.findByEmail(email);
    if (existe) {
      return res.status(409).json({ status: 'error', message: 'E-mail já cadastrado.' });
    }

    const hash    = await bcrypt.hash(senha, 10);
    const usuario = await Usuario.create({ nome, email, senha: hash });

    return res.status(201).json({
      status: 'success',
      message: 'Usuário criado com sucesso!',
      usuario,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ status: 'error', message: 'Erro interno do servidor.' });
  }
}

// GET /auth/me  (rota protegida)
async function me(req, res) {
  try {
    const usuario = await Usuario.findById(req.usuario.id);
    if (!usuario) {
      return res.status(404).json({ status: 'error', message: 'Usuário não encontrado.' });
    }
    return res.status(200).json({ status: 'success', data: usuario });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ status: 'error', message: 'Erro interno do servidor.' });
  }
}

module.exports = { login, register, me };
