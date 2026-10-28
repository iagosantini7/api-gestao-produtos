-- ============================================
-- Adicionar ao banco db_produtos existente
-- ============================================

USE db_produtos;

CREATE TABLE IF NOT EXISTS usuarios (
  id            INT           NOT NULL AUTO_INCREMENT,
  nome          VARCHAR(100)  NOT NULL,
  email         VARCHAR(150)  NOT NULL UNIQUE,
  senha         VARCHAR(255)  NOT NULL,
  ativo         TINYINT(1)    NOT NULL DEFAULT 1,
  criado_em     DATETIME      NOT NULL DEFAULT CURRENT_TIMESTAMP,
  atualizado_em DATETIME      NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Usuário padrão (senha: usuario123)
INSERT INTO usuarios (nome, email, senha) VALUES (
  'Usuário Teste',
  'usuarioteste@email.com',
  '$2a$10$arFTah0E2dHWMLOEi1sRs.mb/3hZbQJR35OfMGop3bOU2eDD4BtQ.'
);
