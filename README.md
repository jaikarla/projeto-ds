# Boletim de Produção Ambulatorial - BPA

> construção do readme em andamento.

O projeto Boletim de Produção Ambulatorial (BPA), foi desenvolvido durante três meses para a Clínica de Especialidades Odontológicas (CEO), clínica escola do Hospital Odontológico (HO) da Universidade Federal de Pernambuco (UFPE).

## 💡Começando

Essas instruções permitirão que você obtenha uma cópia do projeto em operação na sua máquina local para fins de desenvolvimento e teste.

### Pré-requisitos

Antes de iniciar, certifique-se de possuir os seguintes softwares instalados:

- Node.js (versão 20 ou superior);
- npm (instalado juntamente com o Node.js);
- Git;
- PostgreSQL (opcional para desenvolvimento local);
- Conta e banco de dados configurados no Neon PostgreSQL.

Verifique as versões instaladas:

```bash
node -v
npm -v
git --version
```

### Instalação

Uma série de exemplos passo-a-passo que informam o que você deve executar para ter um ambiente de desenvolvimento em execução.

#### 1. Clone o repositório

```bash
git clone https://github.com/jaikarla/projeto-ds.git
```

#### 2. Acesse o diretório do projeto

```bash
cd projeto-ds
```

#### 3. Instale as dependências do backend

```bash
cd backend
npm install
```

#### 4. Configure as variáveis de ambiente

Crie um arquivo `.env` na pasta `backend` utilizando o modelo [.env.example](./backend/.env.example).

#### 5. Configure o banco de dados

Execute o script de criação das tabelas disponível em:

```text
backend/src/database/schema.sql
```

Utilize o PostgreSQL ou Neon para executar o script.

#### 6. Inicie o servidor backend

Ainda na pasta `backend`, execute:

```bash
node server.js
```

ou, caso esteja utilizando o script configurado:

```bash
npm start
```

O servidor ficará disponível em:

```text
http://localhost:3000
```

#### 7. Instale as dependências do frontend

Abra um novo terminal:

```bash
cd frontend
npm install
```

#### 8. Execute o frontend

```bash
npm run dev
```

O sistema estará disponível em:

```text
http://localhost:5173
```

## ⚙️ Executando os testes

Para executar os testes automatizados do backend:

```bash
cd backend
npx vitest
```

Para executar um arquivo específico:

```bash
npx vitest backend/src/tests/<nomeDoArquivoDeTeste>
```

## 🛠️ Construído com

Mencione as ferramentas utilizadas para criar seu projeto.

## 📌 Versão

Nós usamos Git e Github para controle de versão. Para as versões disponíveis `add aqui as informações pertinentes`

## 🖇️ Colaborando

Por favor, leia o  `página a ser criada`  para obter detalhes sobre o nosso código de conduta e o processo para nos enviar pedidos de solicitação.

## ✒️ Autores

Você pode ver a lista de todos os colaboradores que participaram deste projeto em [CONTRIBUTORS.md](./CONTRIBUTORS.md)

## 📄 Licença

Este projeto está sob licença - veja o arquivo [LICENSE](./LICENSE) para detalhes.