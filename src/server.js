require('dotenv').config();
const express = require('express');
const cors = require('cors');
const swaggerUi = require('swagger-ui-express');
const swaggerSpec = require('./config/swagger');
const { testConnection } = require('./config/database');
const produtosRoutes = require('./routes/produtos');
const authRoutes     = require('./routes/auth');
const { autenticar } = require('./middlewares/auth');

const app = express();
const PORT = process.env.PORT || 3000;

// ─── Middlewares globais ────────────────────────────────────────────────────
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// ─── Swagger UI ────────────────────────────────────────────────────────────
app.use(
  '/api-docs',
  swaggerUi.serve,
  swaggerUi.setup(swaggerSpec, {
    customSiteTitle: 'API Produtos - Docs',
    swaggerOptions: { persistAuthorization: true },
  })
);

// Endpoint que expõe o JSON do Swagger (útil para importar no Postman)
app.get('/api-docs.json', (req, res) => {
  res.setHeader('Content-Type', 'application/json');
  res.send(swaggerSpec);
});

// ─── Rotas ─────────────────────────────────────────────────────────────────
app.use('/auth', authRoutes);
app.use('/produtos', autenticar, produtosRoutes);

// Rota raiz
app.get('/', (req, res) => {
  res.json({
    mensagem: '🚀 API Cadastro de Produtos está no ar!',
    documentacao: `http://localhost:${PORT}/api-docs`,
    versao: '1.0.0',
  });
});

// 404 handler
app.use((req, res) => {
  res.status(404).json({ status: 'error', message: 'Rota não encontrada' });
});

// Error handler global
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ status: 'error', message: 'Erro interno do servidor' });
});

// ─── Start ──────────────────────────────────────────────────────────────────
async function start() {
  await testConnection();
  app.listen(PORT, () => {
    console.log(`\n🚀 Servidor rodando em http://localhost:${PORT}`);
    console.log(`📄 Swagger UI:      http://localhost:${PORT}/api-docs`);
    console.log(`📦 Swagger JSON:    http://localhost:${PORT}/api-docs.json\n`);
  });
}

start();
