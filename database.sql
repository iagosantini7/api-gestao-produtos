-- ============================================
-- Script de criação do banco de dados e tabela
-- API Cadastro de Produtos
-- ============================================

CREATE DATABASE IF NOT EXISTS banco_produtos
  CHARACTER SET utf8mb4
  COLLATE utf8mb4_unicode_ci;

USE banco_produtos;

CREATE TABLE IF NOT EXISTS produtos (
  id            INT           NOT NULL AUTO_INCREMENT,
  codigo        VARCHAR(50)   NOT NULL UNIQUE,
  nome          VARCHAR(150)  NOT NULL,
  unidade       VARCHAR(20)   NOT NULL,
  valor         DECIMAL(15,2) NOT NULL,
  quantidade    DECIMAL(15,3) NOT NULL,
  descricao     VARCHAR(500)  NULL,
  criado_em     DATETIME      NOT NULL DEFAULT CURRENT_TIMESTAMP,
  atualizado_em DATETIME      NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
