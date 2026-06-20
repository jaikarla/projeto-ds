# Boletim de Produção Ambulatorial - BPA

> construção do readme em andamento.

O projeto Boletim de Produção Ambulatorial (BPA), foi desenvolvido durante três meses para a Clínica de Especialidades Odontológicas (CEO), clínica escola do Hospital Odontológico (HO) da Universidade Federal de Pernambuco (UFPE).

## 💡Começando

Essas instruções permitirão que você obtenha uma cópia do projeto em operação na sua máquina local para fins de desenvolvimento e teste.

Consulte  `página a ser criada` para saber como implantar o projeto.

### Pré-requisitos

De que coisas você precisa para instalar o software e como instalá-lo?

### Instalação

Uma série de exemplos passo-a-passo que informam o que você deve executar para ter um ambiente de desenvolvimento em execução.


## ⚙️ Executando os testes

### Analise de testes de ponta a ponta

Explique que eles verificam esses testes e porquê.

### Testes de estilo de codificação

Explique que eles verificam esses testes e porquê.

## Recuperacao de senha

O fluxo de recuperacao usa um token temporario enviado por e-mail. Para habilitar envio real com Resend, configure no `.env` do backend:

```env
FRONTEND_URL=http://localhost:5173
EMAIL_PROVIDER=resend
RESEND_API_KEY=sua_chave_resend
EMAIL_FROM="Suporte BPA <senha@seudominio.com>"
```

Para envio por SMTP/nodemailer, use:

```env
FRONTEND_URL=http://localhost:5173
EMAIL_PROVIDER=smtp
EMAIL_HOST=smtp.seuprovedor.com
EMAIL_PORT=587
EMAIL_USER=usuario
EMAIL_PASS=senha
EMAIL_FROM="Suporte BPA <senha@seudominio.com>"
```

Em bancos ja criados, execute a migracao:

```bash
psql "$DATABASE_URL" -f backend/src/database/migration_password_reset.sql
```

Depois, teste com um faturista real cadastrado: acesse `/recuperar-senha`, solicite o link, confira caixa de entrada e spam, abra o link `/definir-nova-senha?token=...` recebido e faca login com a nova senha.

## 🛠️ Construído com

Mencione as ferramentas utilizadas para criar seu projeto.

## 📌 Versão

Nós usamos Git e Github para controle de versão. Para as versões dispoíveis `add aqui as informações pertinentes`

## 🖇️ Colaborando

Por favor, leia o  `página a ser criada`  para obter detalhes sobre o nosso código de conduta e o processo para nos enviar pedidos de solicitação.

## ✒️ Autores

Você pode ver a lista de todos os colaboradores que participaram deste projeto em [CONTRIBUTORS.md](./CONTRIBUTORS.md)

## 📄 Licença

Este projeto está sob licença - veja o arquivo [LICENSE](./LICENSE) para detalhes.
