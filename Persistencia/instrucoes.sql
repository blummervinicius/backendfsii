CREATE DATABASE sistema;

USE sistema;

CREATE TABLE aluno(
    alu_cpf VARCHAR(15) NOT NULL,
    alu_nome VARCHAR(100) NOT NULL,
    CONSTRAINT pk_aluno PRIMARY KEY(alu_cpf)
);

CREATE TABLE notas(
    nota_cpfAluno VARCHAR(15) NOT NULL,
    nota_nomeAluno VARCHAR(100) NOT NULL,
    nota_disciplina VARCHAR(5) NOT NULL,
    nota_dataAvaliacao DATE NOT NULL,
    nota_valorNota VARCHAR(10) NOT NULL,
    alu_cpf VARCHAR(15) NOT NULL,
    CONSTRAINT pk_notas PRIMARY KEY(nota_cpfAluno),
);