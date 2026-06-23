# ADR 007 - Uso do Gmail SMTP para Envio Real de E-mails e Fluxo de Migrações Automáticas

**Status:** Aceito
**Data:** 20/06/2026
**Decisores:** Jaianny Souza e Ana Clara Bizarria

## 1. Contexto

O sistema necessitava de um fluxo seguro e funcional de recuperação de senha por meio do envio de tokens para o e-mail dos usuários cadastrados. Durante o desenvolvimento inicial, identificamos dois desafios principais:

1. Restrições de Ambiente de Teste (Sandbox): Provedores modernos de e-mail marketing (como o Resend) exigem a validação de um domínio próprio (ex: @empresa.com) para realizar envios para caixas de entrada externas. Sem isso, os e-mails ficam presos em ambientes simulados de teste (Sandbox), impedindo a validação do fluxo real por múltiplos integrantes do grupo.
2. Sincronização de Banco de Dados: A introdução das colunas de token de recuperação exigia que todos os ambientes de desenvolvimento (bancos de dados locais e o banco de dados PostgreSQL hospedado no Neon) fossem atualizados de forma consistente para evitar o erro column "reset_password_token" does not exist.

## 2. Decisão

Tomamos a decisão de implementar as seguintes soluções:

* Utilizar o Gmail via SMTP Real: Criamos uma conta do Google dedicada ao projeto (sistemabpa2026@gmail.com) e configuramos uma Senha de App de 16 dígitos nas configurações de segurança da conta. Isso permite que o backend utilize o servidor SMTP do Google (smtp.gmail.com:465) com criptografia SSL/TLS ativa para disparar e-mails de recuperação reais para qualquer caixa de entrada (com limite gratuito de 500 envios diários).
* Criar um Script de Migração Idempotente: Desenvolvemos um arquivo SQL isolado (001_add_password_reset_columns.sql) utilizando a cláusula IF NOT EXISTS junto a um script em Node.js (migrate.js) conectado ao pool do banco de dados. Isso permite que qualquer desenvolvedor atualize a estrutura de tabelas executando um único comando no terminal.

## 3. Consequências Positivas

* Envios Reais de Graça: O grupo consegue realizar testes de ponta a ponta recebendo links reais em suas próprias caixas de entrada sem nenhum custo com domínio ou plataformas de e-mail.
* Segurança no Código: A Senha de App isola as credenciais da conta Google, e o uso de variáveis de ambiente no .env impede a exposição de chaves reais no repositório Git.
* Ambientes Sincronizados: O banco remoto no Neon e os bancos locais de cada integrante podem ser atualizados em segundos sem a necessidade de rodar scripts SQL manualmente em interfaces externas.

## 4. Consequências Negativas

* O limite de 500 e-mails por dia do Gmail pode ser atingido caso o sistema sofra testes massivos automatizados (embora seja mais do que suficiente para o escopo do projeto acadêmico).
* É necessário garantir que todas as integrantes do grupo atualizem seus arquivos .env locais usando o .env.example como base.

