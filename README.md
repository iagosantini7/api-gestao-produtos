# 🛒 API Cadastro de Produtos

API REST para cadastro e gerenciamento de produtos, construída com **Node.js + Express + MySQL**.

---

## 📋 Pré-requisitos

- Node.js **v18+**
- MySQL **8.0+**
- npm

---

## 🚀 Como rodar o projeto

### 1. Instalar dependências

```bash
npm install
```

### 2. Configurar o banco de dados

Execute o script SQL no seu MySQL:

```bash
mysql -u root -p < database.sql
```

Ou copie e execute o conteúdo do arquivo `database.sql` no MySQL Workbench / DBeaver.

### 3. Configurar variáveis de ambiente

Copie o arquivo `.env.example` para `.env` e preencha com seus dados:

```bash
cp .env.example .env
```

```env
PORT=3000
DB_HOST=localhost
DB_PORT=3306
DB_USER=root
DB_PASSWORD=sua_senha
DB_NAME=db_produtos
JWT_SECRET=sua_chave_secreta
JWT_EXPIRES_IN=tempo_para_expirar_token
```

### 4. Rodar a API

```bash
# Produção
npm start

# Desenvolvimento (com hot reload)
npm run dev
```

---

## 📄 Endpoints

| Método | Rota             | Descrição                    |
|--------|------------------|------------------------------|
| GET    | /produtos        | Listar todos os produtos     |
| GET    | /produtos/:id    | Buscar produto por ID        |
| POST   | /produtos        | Criar novo produto           |
| PUT    | /produtos/:id    | Atualizar produto            |
| DELETE | /produtos/:id    | Deletar produto              |

### Query params do GET /produtos

| Parâmetro | Tipo    | Padrão | Descrição                   |
|-----------|---------|--------|-----------------------------|
| page      | integer | 1      | Página atual                |
| limit     | integer | 10     | Itens por página            |
| nome      | string  | -      | Filtro por nome (parcial)   |
| codigo    | string  | -      | Filtro por código (parcial) |

---

## 📦 Campos do Produto

| Campo      | Tipo    | Obrigatório | Descrição                          |
|------------|---------|-------------|------------------------------------|
| codigo     | string  | ✅ Sim       | Código único do produto (max 50)  |
| nome       | string  | ✅ Sim       | Nome do produto (max 150)          |
| unidade    | string  | ✅ Sim       | Unidade de medida (UN, KG, LT...)  |
| valor      | decimal | ✅ Sim       | Valor unitário (>= 0)              |
| quantidade | decimal | ✅ Sim       | Quantidade em estoque (>= 0)       |
| descricao  | string  | ❌ Não       | Descrição curta (max 500)          |

---

## 📖 Swagger / Documentação

Após rodar a API, acesse:

- **Swagger UI:** http://localhost:3000/api-docs
- **Swagger JSON** (para importar no Postman): http://localhost:3000/api-docs.json

---

## 🧪 Importar no Postman

1. Abra o Postman
2. Clique em **Import**
3. Selecione **Link** e cole: `http://localhost:3000/api-docs.json`
4. Clique em **Import** — todos os endpoints serão carregados automaticamente!

---

## 📂 Estrutura do Projeto

```
api-produtos/
├── src/
│   ├── config/
│   │   ├── database.js      # Conexão MySQL
│   │   └── swagger.js       # Configuração Swagger
│   ├── controllers/
│   │   └── produtoController.js
│   ├── middlewares/
│   │   └── validacao.js     # Validação de campos
│   ├── models/
│   │   └── Produto.js       # Queries MySQL
│   ├── routes/
│   │   └── produtos.js      # Rotas + docs Swagger
│   └── server.js            # Entry point
├── database.sql             # Script de criação do banco
├── .env.example
├── package.json
└── README.md
```
