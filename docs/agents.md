# AGENTS.md

`sujeito a mudanças`

## Visão Geral

O Projeto BPA é um sistema web para gerenciamento e preenchimento de informações relacionadas ao Boletim de Produção Ambulatorial (BPA). O sistema segue arquitetura em camadas e separação de responsabilidades entre Controllers, Services, Models e Banco de Dados.

## Objetivo do Projeto

Garantir o registro consistente, seguro e auditável das informações necessárias para o preenchimento do Boletim de Produção Ambulatorial, reduzindo erros operacionais e aumentando a confiabilidade dos dados.

---

# Linguagens, Frameworks e Tecnologias

## Backend

- JavaScript (ES Modules)
- Node.js
- Express.js
- PostgreSQL
- pg
- dotenv
- Vitest

## Frontend

- React
- Vite

## Banco de Dados

- PostgreSQL

## Controle de Versão

- Git
- GitHub

---

# Estrutura de Pastas

## Backend

```text
backend/
│
├── src/
│   ├── config/
│   │   └── db.js
│   │
│   ├── controllers/
│   │
│   ├── database/
│   │   ├── schema.sql
│   │   └── seed.sql
│   │
│   ├── middlewares/
│   │
│   ├── models/
│   │
│   ├── routes/
│   │
│   ├── services/
│   │
│   ├── tests/
│   │
│   └── validators/
│
├── .env
├── app.js
├── server.js
└── package.json
```

---

# Responsabilidade das Camadas

## Routes

Responsáveis apenas pelo mapeamento das rotas HTTP. Não devem conter regras de negócio.

---

## Controllers

Responsáveis por:

- Receber requisições HTTP
- Extrair parâmetros
- Chamar Services
- Retornar respostas HTTP

Não devem conter regras de negócio complexas.

---

## Services

Responsáveis por:

- Regras de negócio
- Validações
- Fluxos de cadastro
- Fluxos de atualização
- Verificações de duplicidade

Toda regra de negócio deve ser implementada nesta camada.

---

## Models

Responsáveis exclusivamente pela persistência de dados. Devem conter apenas consultas ao banco de dados. Não devem conter regras de negócio.

---

## Validators

Responsáveis pelas validações reutilizáveis do sistema.

Exemplos:

- validarCPF()
- validarCNS()
- validarCRO()
- validarSexo()
- validarTipo()
- validarDataNascimento()

---

## Middlewares

Responsáveis por comportamentos transversais da aplicação.

Exemplos:

- tratamento global de erros
- autenticação
- autorização
- logging

---

## Database

Responsável pela estrutura do banco de dados.

---

# Regras de Negócio Críticas

## Atendimento

Todo atendimento deve estar associado a:

- paciente válido
- procedimento válido
- profissional ou estudante válido

Não devem existir atendimentos órfãos.

---

# Invariantes do Sistema

As seguintes regras nunca devem ser quebradas:

## Integridade Cadastral

Não podem existir:

- CPFs duplicados
- CNS duplicados
- CROs duplicados

---

## Integridade Referencial

Não devem existir registros associados a entidades inexistentes.

Exemplos:

- atendimento sem paciente
- atendimento sem procedimento
- atendimento sem profissional

---

## Arquitetura em Camadas

Fluxo obrigatório:

```text
Route
 ↓
Controller
 ↓
Service
 ↓
Model
 ↓
Banco de Dados
```

---

## Persistência

Toda persistência deve ocorrer através dos Models. Services não devem executar SQL diretamente. Controllers não devem acessar o banco de dados.

---

# O Que Não Deve Ser Alterado

## Separação de Responsabilidades

Não mover regras de negócio para:

- Routes
- Controllers
- Models

As regras devem permanecer nos Services.

---

## Estrutura de Validação

As validações reutilizáveis devem permanecer centralizadas em:

```text
src/validators/
```

Evitar duplicação de código.

---

## Estrutura REST

Manter o padrão:

```http
GET    /
GET    /:id
POST   /
PUT    /:id
DELETE /:id
```

para todas as entidades CRUD.

---

## Banco de Dados

Não remover:

- chaves primárias
- chaves estrangeiras
- constraints de unicidade
- constraints de validação

As validações do banco complementam as validações da aplicação.

---

# Diretrizes para Novas Funcionalidades

Toda nova entidade deve possuir:

- Model
- Service
- Controller
- Route
- Testes

Sempre respeitando a arquitetura em camadas. Deve-se reutilizar validações existentes sempre que possível.