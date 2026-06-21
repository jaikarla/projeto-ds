# ADR 009 - Centralização de Dependências com npm workspaces

**Status:** Aceito
**Data:** 20/06/2026
**Decisores:** Jaianny Souza

## 1. Contexto

​O ecossistema do Sistema BPA é composto por duas aplicações distintas no mesmo repositório (monorepo): o frontend (React) e o backend (Node.js/Express). Originalmente, essas pastas funcionavam de forma isolada. Para instalar dependências ou rodar o projeto, o desenvolvedor era obrigado a navegar manualmente via terminal entre os diretórios (cd frontend && npm install, depois cd ../backend && npm install). Esse isolamento gerava redundância de arquivos node_modules, inconsistência de versões e complexidade no setup local por outras integrantes do grupo.

## 2. Decisão

​Decidimos reestruturar a raiz do repositório para adotar o NPM Workspaces. Configurando o arquivo package.json raiz para gerenciar os caminhos ./frontend e ./backend, passamos a tratar o ecossistema como subprojetos acoplados a um único orquestrador de dependências.

## 3. Consequências Positivas

* Instalação Unificada: O setup do projeto foi drasticamente simplificado. Executar um único comando npm install (ou o atalho npm i) na raiz instala automaticamente todas as dependências do frontend e do backend de uma só vez;
* Otimização de Armazenamento: O NPM centraliza o armazenamento físico das bibliotecas em uma única pasta `node_modules` localizada na raiz do projeto. Subpastas repetidas que usam a mesma versão de biblioteca não são duplicadas no disco;
* Orquestração via Parâmetro Workspace (-w): Permite executar scripts ou instalar dependências em pastas específicas direto da raiz (Ex: npm run migrate -w backend ou npm install cors -w backend).

## 4. Consequências Negativas

* Atenção ao Contexto do Terminal: Exige que os integrantes fiquem atentos à pasta em que estão no terminal. Executar comandos de inicialização ou instalação locais dentro das subpastas sem o sinalizador -w pode corromper a árvore de dependências do workspace se não for feito com cuidado.