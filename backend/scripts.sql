-- criar database hackathon_db
CREATE DATABASE hackathon_db

-- Criar tabela Avaliadores

CREATE TABLE avaliadores (
    id SERIAL PRIMARY KEY,
    nome VARCHAR(50) NOT NULL,
    login VARCHAR(50) NOT NULL,
    senha VARCHAR(50) NOT NULL
);

-- Criar tabela Equipes

CREATE TABLE equipes (
    id SERIAL PRIMARY KEY,
    nome VARCHAR(50) NOT NULL,
);

-- Criar tabela Avaliações

CREATE TABLE avaliacoes (
    id SERIAL PRIMARY KEY,
    avaliador_id INT NOT NULL,
    equipe_id INT NOT NULL,
	notas JSONB NOT NULL,
    FOREIGN KEY (avaliador_id) REFERENCES avaliadores(id),
    FOREIGN KEY (equipe_id) REFERENCES equipes(id)
);