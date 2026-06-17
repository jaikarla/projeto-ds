# Boletim de Produção Ambulatorial - BPA

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
### Endpoints da API

Após iniciar o backend, alguns endpoints disponíveis são:

```http
GET    /api/profissionais
POST   /api/profissionais

GET    /api/pacientes
POST   /api/pacientes

GET    /api/atendimentos
POST   /api/atendimentos

GET    /api/procedimentos
POST   /api/procedimentos
```

As requisições podem ser testadas utilizando Postman, Insomnia ou outra ferramenta de sua preferência.

## 🛠️ Construído com

| Tecnologia | Versão | Finalidade |
|------------|---------|------------|
| JavaScript | ES2023+ | Linguagem principal do projeto |
| Node.js | 20+ | Ambiente de execução do backend |
| Express.js | 5.2.1 | Desenvolvimento da API REST |
| PostgreSQL (pg) | 8.20.0 | Conexão e manipulação do banco de dados PostgreSQL |
| Neon PostgreSQL | Cloud Service | Hospedagem do banco de dados em nuvem |
| React | 19.2.5 | Construção da interface do usuário |
| React Router DOM | 7.16.0 | Gerenciamento de rotas no frontend |
| Axios | 1.17.0 | Comunicação entre frontend e backend |
| Vite | 8.0.9 | Ambiente de desenvolvimento e build do frontend |
| JWT (jsonwebtoken) | 9.0.3 | Autenticação baseada em tokens |
| bcrypt | 6.0.0 | Criptografia de senhas |
| Vitest | 4.1.6 | Testes unitários do backend |
| Lucide React | 1.17.0 | Biblioteca de ícones para a interface |
| Git | Controle de versão | Gerenciamento do histórico do código |
| GitHub | Plataforma Web | Hospedagem e colaboração do projeto |

## 📌 Versão

Nós usamos Git e Github para controle de versão. Para as versões disponíveis `add aqui as informações pertinentes`

## 🖇️ Colaborando

Por favor, leia o  [CONTRIBUTING.md](./CONTRIBUTING.md)  para obter detalhes sobre o nosso código de conduta e o processo para nos enviar pedidos de solicitação.

## ✒️ Autores

Você pode ver a lista de todos os colaboradores que participaram deste projeto em [CONTRIBUTORS.md](./CONTRIBUTORS.md).

## 📄 Licença

Este projeto está sob licença - veja o arquivo [LICENSE](./LICENSE) para detalhes.