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

-- Usuário admin padrão (senha: Admin@123)
INSERT INTO usuarios (nome, email, senha) VALUES (
  'Administrador',
  'admin@email.com',
  '$2a$10$Kkl8xuNMbiwsaV9G4uDNtOFJgvBGlhxDcXKkbFJiPoiuyqBxv1fde'
);
