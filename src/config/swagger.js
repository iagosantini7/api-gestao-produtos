const swaggerJsdoc = require('swagger-jsdoc');

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'API Cadastro de Produtos',
      version: '1.0.0',
      description: 'API REST para cadastro e gerenciamento de produtos.',
      contact: {
        name: 'Suporte',
        email: 'suporte@empresa.com',
      },
    },
    servers: [
      {
        url: 'http://localhost:3000',
        description: 'Servidor de Desenvolvimento',
      },
    ],
    components: {
      securitySchemes: {
        bearerAuth: {
          type: 'http',
          scheme: 'bearer',
          bearerFormat: 'JWT',
        },
      },
      schemas: {
        Produto: {
          type: 'object',
          properties: {
            id: { type: 'integer', example: 1 },
            codigo: { type: 'string', example: 'PROD-001' },
            nome: { type: 'string', example: 'Parafuso Sextavado M8' },
            unidade: { type: 'string', example: 'UN' },
            valor: { type: 'number', format: 'float', example: 4.99 },
            quantidade: { type: 'number', format: 'float', example: 500 },
            descricao: { type: 'string', nullable: true, example: 'Parafuso sextavado galvanizado M8x25mm' },
            criado_em: { type: 'string', format: 'date-time' },
            atualizado_em: { type: 'string', format: 'date-time' },
          },
        },
        ProdutoInput: {
          type: 'object',
          required: ['codigo', 'nome', 'unidade', 'valor', 'quantidade'],
          properties: {
            codigo: { type: 'string', maxLength: 50, example: 'PROD-001', description: 'Código único do produto' },
            nome: { type: 'string', maxLength: 150, example: 'Parafuso Sextavado M8', description: 'Nome do produto' },
            unidade: { type: 'string', maxLength: 20, example: 'UN', description: 'Unidade de medida (UN, KG, LT, CX, etc.)' },
            valor: { type: 'number', format: 'float', minimum: 0, example: 4.99, description: 'Valor unitário do produto' },
            quantidade: { type: 'number', format: 'float', minimum: 0, example: 500, description: 'Quantidade em estoque' },
            descricao: { type: 'string', maxLength: 500, nullable: true, example: 'Parafuso galvanizado M8x25mm', description: 'Descrição curta (opcional)' },
          },
        },
        ErroValidacao: {
          type: 'object',
          properties: {
            status: { type: 'string', example: 'error' },
            message: { type: 'string', example: 'Dados inválidos' },
            errors: {
              type: 'array',
              items: {
                type: 'object',
                properties: {
                  campo: { type: 'string', example: 'codigo' },
                  mensagem: { type: 'string', example: 'Código do produto é obrigatório' },
                },
              },
            },
          },
        },
      },
    },
  },
  apis: ['./src/routes/*.js'],
};

const swaggerSpec = swaggerJsdoc(options);
module.exports = swaggerSpec;
