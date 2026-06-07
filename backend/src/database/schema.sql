-- CRIAÇÃO DAS TABELAS DO BANCO DE DADOS

--remover tabelas se já existirem
DROP TABLE IF EXISTS atendimento_procedimentos CASCADE;
DROP TABLE IF EXISTS atendimentos CASCADE;
DROP TABLE IF EXISTS procedimentos CASCADE;
DROP TABLE IF EXISTS enderecos CASCADE;
DROP TABLE IF EXISTS pacientes CASCADE;
DROP TABLE IF EXISTS profissionais CASCADE;
DROP TABLE IF EXISTS faturistas CASCADE;


--============================================
-- FATURISTA (responsável)
--============================================
CREATE TABLE faturistas(
    id SERIAL PRIMARY KEY,
    nome VARCHAR(100) NOT NULL,
    email VARCHAR(100) UNIQUE NOT NULL,
    cpf VARCHAR(14) UNIQUE NOT NULL, --(string para preservar formatação)
    telefone VARCHAR(20),
    senha VARCHAR(255) NOT NULL --armazenar em bcrypt (segurança)
);

--============================================
--PACIENTE
-- dados obrigatorios exigidos pelo BPA-I 
-- nome, data de nascimento, CPF, sexo, raça, etnia(se indigena), nacionalidade, cns
--============================================ 
CREATE TABLE pacientes(
    id  SERIAL PRIMARY KEY,
    nome  VARCHAR(200) NOT NULL,
    data_nascimento DATE NOT NULL,
    cpf VARCHAR(14) UNIQUE, --(podendo ser nulo para casos onde o paciente só possua CNS)
    sexo VARCHAR(20) NOT NULL,
    raca VARCHAR(30 ) NOT NULL,
    etnia VARCHAR(50), --obrigatório se raça for indigena
    nacionalidade VARCHAR(50),
    cns VARCHAR(20) UNIQUE NOT NULL,
    CONSTRAINT sexo_valido CHECK (sexo IN('Masculino', 'Feminino'))
);

--============================================
-- ENDEREÇO 
-- obrigatório para o BPA-I
-- tabela separada devido complexdade (CEP, logradouro, númeor, bairro)
--============================================
CREATE TABLE enderecos(
    id SERIAL PRIMARY KEY,
    cep VARCHAR(9) NOT NULL,
    logradouro VARCHAR(200) NOT NULL,
    numero VARCHAR(10),
    bairro VARCHAR(80) NOT NULL,
    cidade VARCHAR(150) NOT NULL,
    uf CHAR(2) NOT NULL,
    paciente_id INT UNIQUE NOT NULL,
    FOREIGN KEY (paciente_id) REFERENCES pacientes(id) ON DELETE CASCADE
);

--============================================
-- PROFISSIONAL
-- CBO obrigatório para o BPA-C
-- CRO pode ser nulo para estudantes
--============================================
CREATE TABLE profissionais(
    id SERIAL PRIMARY KEY,
    cpf VARCHAR(14) UNIQUE NOT NULL,
    cns VARCHAR(20) UNIQUE NOT NULL,
    nome VARCHAR(150) NOT NULL,
    cro VARCHAR(20) UNIQUE, --nulo para estudantes
    cro_uf VARCHAR(2),
    cbo VARCHAR(10) NOT NULL, 
    matricula VARCHAR(20) UNIQUE, -- apenas para estudantes
    tipo VARCHAR(30) NOT NULL,
    data_cadastro DATE DEFAULT CURRENT_DATE,
    CONSTRAINT tipo_profissional CHECK (tipo IN('profissional', 'estudante'))
);


--============================================
--PROCEDIMENTOS
--tipo define se é BPA-C ou BPA-I
-- Obs: tabela será preenchida pelo seed com os dados pré-definidos e disponibilizados pelo SUS/SIGTAP
--============================================
CREATE TABLE procedimentos(
    id SERIAL PRIMARY KEY,
    nome VARCHAR(250) NOT NULL,
    codigo VARCHAR(10) UNIQUE NOT NULL, -- não é do tipo INT porque os zeros à esquerda são importantes
    tipo VARCHAR(10) NOT NULL,
    data_cadastro DATE DEFAULT CURRENT_DATE,
    CONSTRAINT tipo_procedimento CHECK (tipo IN('BPA-C', 'BPA-I'))
);

--============================================
--ATENDIMENTOS
-- paciente_id é NULL pois BPA-C não precisar identificar paciente
-- para BPA-I é necessário o preenchimento, pois a identificação do paciente é obrigatória
--obs: cid é o código CID-10, ele é exigido em alguns procedimentos do tipo BPA-I
--============================================
CREATE TABLE atendimentos(
    id SERIAL PRIMARY KEY,
    data_atendimento DATE NOT NULL,
    cid VARCHAR(10),
    paciente_id INT,  --NULL para BPA-C
    profissional_id INT NOT NULL,
    FOREIGN KEY (paciente_id) REFERENCES pacientes(id),
    FOREIGN KEY (profissional_id) REFERENCES profissionais(id)
);

--============================================
--ATENDIMENTOS E PROCEDIMENTOS (tabela de junção)
--um atendimento pode ter vários procedimentos
--============================================
CREATE TABLE atendimento_procedimentos(
    id SERIAL PRIMARY KEY,
    quantidade INT NOT NULL DEFAULT 1, --registra quantas vezes o procedimento foi realizado(importante para BPA-C)
    atendimento_id INT NOT NULL,
    procedimento_id INT NOT NULL,
    FOREIGN KEY (atendimento_id) REFERENCES atendimentos(id) ON DELETE CASCADE,
    FOREIGN KEY (procedimento_id) REFERENCES procedimentos(id)
);


--============================================
-- ÍNDICES 
-- para buscas comuns serem mais rápidas 
--============================================
CREATE INDEX idx_pacientes_cns         ON pacientes(cns);
CREATE INDEX idx_pacientes_cpf         ON pacientes(cpf);
CREATE INDEX idx_atendimentos_data     ON atendimentos(data_atendimento);
CREATE INDEX idx_atendimentos_paciente ON atendimentos(paciente_id);
CREATE INDEX idx_procedimentos_codigo  ON procedimentos(codigo);
CREATE INDEX idx_procedimentos_tipo    ON procedimentos(tipo);