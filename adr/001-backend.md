# ADR 001 - Backend com Node.js e PostgreSQL

## Status
Accepted

## Contexto
Durante a sprint do sistema de BPA, foi necessário definir a arquitetura de backend responsável pelo processamento das regras de negócio, comunicação com o banco de dados e integração com o front-end.

## Decisão
Foi decidido utilizar Node.js com JavaScript no backend e PostgreSQL como banco de dados relacional.

A comunicação será feita via API REST e o sistema será organizado em camadas.

## Consequências

### Positivas
- Integração fácil com o front-end
- Desenvolvimento rápido
- Uso de uma única linguagem no projeto

### Negativas
- Falta de tipagem forte
- Necessidade de organização manual
- Maior cuidado na modelagem do banco
