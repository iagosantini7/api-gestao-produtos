const express    = require('express');
const router     = express.Router();
const controller = require('../controllers/authController');
const { autenticar } = require('../middlewares/auth');

/**
 * @swagger
 * tags:
 *   name: Autenticação
 *   description: Endpoints de login, registro e dados do usuário logado
 */

/**
 * @swagger
 * /auth/login:
 *   post:
 *     summary: Realizar login
 *     tags: [Autenticação]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [email, senha]
 *             properties:
 *               email:
 *                 type: string
 *                 format: email
 *                 example: admin@email.com
 *               senha:
 *                 type: string
 *                 example: Admin@123
 *     responses:
 *       200:
 *         description: Login realizado com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:  { type: string, example: success }
 *                 token:   { type: string, example: eyJhbGciOiJIUzI1NiIsInR... }
 *                 usuario:
 *                   type: object
 *                   properties:
 *                     id:    { type: integer }
 *                     nome:  { type: string }
 *                     email: { type: string }
 *       401:
 *         description: E-mail ou senha inválidos
 *       422:
 *         description: Campos obrigatórios não informados
 */
router.post('/login', controller.login);

/**
 * @swagger
 * /auth/register:
 *   post:
 *     summary: Criar novo usuário
 *     tags: [Autenticação]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [nome, email, senha]
 *             properties:
 *               nome:  { type: string, example: João Silva }
 *               email: { type: string, format: email, example: joao@email.com }
 *               senha: { type: string, minLength: 6, example: Senha@123 }
 *     responses:
 *       201:
 *         description: Usuário criado com sucesso
 *       409:
 *         description: E-mail já cadastrado
 *       422:
 *         description: Dados inválidos
 */
router.post('/register', controller.register);

/**
 * @swagger
 * /auth/me:
 *   get:
 *     summary: Retorna dados do usuário autenticado
 *     tags: [Autenticação]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Dados do usuário logado
 *       401:
 *         description: Token inválido ou não informado
 */
router.get('/me', autenticar, controller.me);

module.exports = router;
