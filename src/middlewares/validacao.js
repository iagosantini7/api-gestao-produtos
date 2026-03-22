const { body, validationResult } = require('express-validator');

const produtoRules = [
  body('codigo')
    .notEmpty().withMessage('Código do produto é obrigatório')
    .isString().withMessage('Código deve ser texto')
    .isLength({ max: 50 }).withMessage('Código deve ter no máximo 50 caracteres')
    .trim(),

  body('nome')
    .notEmpty().withMessage('Nome do produto é obrigatório')
    .isString().withMessage('Nome deve ser texto')
    .isLength({ max: 150 }).withMessage('Nome deve ter no máximo 150 caracteres')
    .trim(),

  body('unidade')
    .notEmpty().withMessage('Unidade de medida é obrigatória')
    .isString().withMessage('Unidade deve ser texto')
    .isLength({ max: 20 }).withMessage('Unidade deve ter no máximo 20 caracteres')
    .trim(),

  body('valor')
    .notEmpty().withMessage('Valor do produto é obrigatório')
    .isFloat({ min: 0 }).withMessage('Valor deve ser um número maior ou igual a zero'),

  body('quantidade')
    .notEmpty().withMessage('Quantidade é obrigatória')
    .isFloat({ min: 0 }).withMessage('Quantidade deve ser um número maior ou igual a zero'),

  body('descricao')
    .optional({ nullable: true, checkFalsy: true })
    .isString().withMessage('Descrição deve ser texto')
    .isLength({ max: 500 }).withMessage('Descrição deve ter no máximo 500 caracteres')
    .trim(),
];

function validate(req, res, next) {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(422).json({
      status: 'error',
      message: 'Dados inválidos',
      errors: errors.array().map((e) => ({ campo: e.path, mensagem: e.msg })),
    });
  }
  next();
}

module.exports = { produtoRules, validate };
