# ADR 005 — Uso de `bcrypt` e unificação do fluxo de cadastro/login do faturista

Data: 24/05/26
Status: Aceito
Autores: Jaianny Souza

## 1. Contexto

Durante o desenvolvimento e testes do backend do projeto foi identificado um problema de runtime causado por importações inconsistentes de bibliotecas de hashing de senha (`bcryptjs` vs `bcrypt`). Além disso, desejou-se unificar o fluxo de cadastro do `faturista` com o fluxo de autenticação (login) para simplificar a criação de conta seguida de login automático.

Foram feitas melhorias relacionadas a configuração do banco de dados (compatibilidade Neon/SSL e variáveis PG/DB), tratamento de erros e pequenos comentários em pontos sensíveis do código para facilitar manutenção.

## 2. Decisão

1. Padronizar o uso de `bcrypt` (biblioteca atualmente instalada) em todos os serviços que fazem hash/compare de senhas.
2. Unificar o fluxo de cadastro do faturista para passar pelo `authService.register(...)`, que:
   * valida campos obrigatórios
   * limpa e valida CPF
   * chama `criarFaturista(...)` (serviço) para persistir no banco
   * gera um JWT e retorna token + dados do faturista (login automático)
3. Atualizar os testes unitários (`Vitest`) para mockar `bcrypt` corretamente e manter cobertura sobre login e registro.
4. Melhorar a configuração de conexão com PostgreSQL (`src/config/db.js`) para aceitar variáveis `PG*` e `DB_*`, converter porta para `Number`, e ativar `ssl` condicionalmente quando apropriado (Neon/PGSSLMODE).

## 3. Justificativa

- `bcrypt` é a dependência instalada no ambiente de execução. Manter importações coerentes evita erros `ERR_MODULE_NOT_FOUND` em runtime.
- Unificar cadastro/login simplifica a UX (cadastro + token) e reduz duplicação de lógica de autenticação.
- Atualizações de DB aumentam compatibilidade com providers gerenciados (ex.: Neon) e evitam falhas na produção ao usar SSL/variantes de variáveis de ambiente.
- Testes atualizados garantem regressões minimizadas ao alterar implementação de hashing.

## 3. Consequências

- Requererá revisão do `package.json` para remover `bcryptjs` se não for mais usado e confirmar que `bcrypt` esteja corretamente instalado e compilado na CI (Node >= 18 recomendado para `bcrypt` 6.x).
- Dados de teste devem usar `cpf`/`email` únicos para evitar violação de constraint de unicidade no banco; o comportamento de erro de duplicidade é esperado e mantido (código HTTP 409 em controllers quando aplicável).
- Desenvolvedores devem estar cientes de que o endpoint de cadastro agora retorna token JWT e dados do faturista (login automático).
